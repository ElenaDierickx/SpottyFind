import React from "react";
import Firebase from "../Config/Firebase";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = Firebase.auth();

export const logOut = async () => {
    const user = await Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).get();
    const tokens = user.data().expoPushToken;

    const value = await AsyncStorage.getItem("@pushToken");
    if (value) {
        const index = tokens.indexOf(value);
        if (index > -1) {
            tokens.splice(index, 1);
        }
    }

    Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).update({
        expoPushToken: tokens,
    });

    auth.signOut();
};

const registerForPushNotificationsAsync = async () => {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    // if (finalStatus !== "granted") {
    //     alert("Failed to get push token for push notification!");
    //     return;
    // }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
};

const registerPushNotifications = async () => {
    var token = await registerForPushNotificationsAsync();

    const user = await Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).get();
    var tokens = user.data().expoPushToken;

    if (!tokens) {
        tokens = [];
    }

    if (!tokens.includes(token)) {
        tokens.push(token);
    }

    await AsyncStorage.setItem("@pushToken", token);

    Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).update({
        expoPushToken: tokens,
    });
};

export const loginUser = async (email, password) => {
    try {
        if (email !== "" && password !== "") {
            await auth.signInWithEmailAndPassword(email, password);
            registerPushNotifications();
            return false;
        }
    } catch (error) {
        return error.message;
    }
};

export const createUser = async (email, password, username) => {
    username = username.toLowerCase();
    const users = await Firebase.firestore().collection("users").where("username", "==", username).get();
    if (users.size > 0) {
        return "This username already exists.";
    }
    try {
        if (email !== "" && password !== "") {
            let user = await auth.createUserWithEmailAndPassword(email, password);
            await Firebase.firestore().collection("users").doc(user.user.uid).set({
                email: user.user.email,
                username: username,
            });
            registerPushNotifications();
            return false;
        }
    } catch (error) {
        return error.message;
    }
};
