import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
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
import { unseenNotifications } from "./utils/Firestore";

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
    const notificationListener = useRef();
    const responseListener = useRef();
    const [notifications, setNotifications] = useState(null);

    const getUnseenNotifications = async () => {
        const notifications = await unseenNotifications();
        if (notifications == 0) {
            setNotifications(null);
        } else {
            setNotifications(notifications);
        }
    };

    Firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
    });

    var navigationRef;

    useEffect(() => {
        if (user) {
            getUnseenNotifications();
            // This listener is fired whenever a notification is received while the app is foregrounded
            notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
                getUnseenNotifications();
            });

            // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
            responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
                getUnseenNotifications();
            });

            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
            };
        }
    }, [user]);

    if (user) {
        return (
            <NavigationContainer ref={navigationRef}>
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
                            tabBarBadge: notifications,
                        }}
                        listeners={{
                            tabPress: (e) => {
                                setNotifications(null);
                            },
                        }}
                    />
                    <Tab.Screen
                        name="People"
                        component={PeopleStackScreen}
                        unmountOnBlur={true}
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
