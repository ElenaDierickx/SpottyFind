import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { LoginStackScreen } from "./Tabs/Logins/LoginStackScreen";
import { AccountStackScreen } from "./Tabs/User/AccountStackScreen";
import { PeopleStackScreen } from "./Tabs/People/PeopleStackSreen";
import { NotificationsPage } from "./Tabs/NotificationsPage";
import { Map } from "./Tabs/Map";
import Firebase from "./Config/Firebase";
import { LogBox } from "react-native";
import * as Notifications from "expo-notifications";

LogBox.ignoreLogs(["Setting a timer"]);

const Tab = createMaterialBottomTabNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const [user, setUser] = useState("");

    Firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
    });

    useEffect(() => {
        registerPushNotifications();
    }, []);

    const registerPushNotifications = async () => {
        if (Firebase.auth().currentUser.uid) {
            // const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            // let finalStatus = status;

            // if (status !== "granted") {
            //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            //     finalStatus = status;
            // }

            // if (finalStatus !== "granted") {
            //     return;
            // }

            // let token = await Notifications.getExpoPushTokenAsync();

            var token = await registerPushNotificationsAsync();

            Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).update({
                expoPushToken: token,
            });
        }
    };

    if (user) {
        return (
            <NavigationContainer>
                <Tab.Navigator activeColor="#2CCB33" barStyle={{ backgroundColor: "#FFFFFF" }}>
                    <Tab.Screen
                        name="Map"
                        component={Map}
                        initialParams={{ initialMarker: "none" }}
                        options={{
                            tabBarIcon: ({ color }) => <Ionicons name="map-outline" color={color} size={22}></Ionicons>,
                            headerShown: false,
                        }}
                    />
                    <Tab.Screen
                        name="Notifications"
                        component={NotificationsPage}
                        options={{
                            tabBarIcon: ({ color }) => <Ionicons name="notifications-outline" color={color} size={22}></Ionicons>,
                            headerShown: false,
                        }}
                    />
                    <Tab.Screen
                        name="People"
                        component={PeopleStackScreen}
                        options={{
                            tabBarIcon: ({ color }) => <Ionicons name="people-outline" color={color} size={22}></Ionicons>,
                            headerShown: false,
                        }}
                    />
                    <Tab.Screen
                        name="Account"
                        component={AccountStackScreen}
                        options={{
                            tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" color={color} size={22}></Ionicons>,
                            headerShown: false,
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Tab.Navigator activeColor="#2CCB33" barStyle={{ backgroundColor: "#FFFFFF" }}>
                    <Tab.Screen
                        name="Map"
                        component={Map}
                        initialParams={{ initialMarker: "none" }}
                        options={{
                            tabBarIcon: ({ color }) => <Ionicons name="map-outline" color={color} size={22}></Ionicons>,
                            headerShown: false,
                        }}
                    />
                    <Tab.Screen
                        name="Login"
                        component={LoginStackScreen}
                        options={{
                            tabBarIcon: ({ color }) => <Ionicons name="log-in-outline" color={color} size={22}></Ionicons>,
                            headerShown: false,
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}
