import React from "react";
import Firebase from "../Config/Firebase";
import * as Notifications from "expo-notifications";

const auth = Firebase.auth();

export const logOut = async () => {
    const user = await Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).get();
    const tokens = user.data().expoPushToken;

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
    if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
    }
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
