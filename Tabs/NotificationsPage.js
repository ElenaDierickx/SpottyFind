import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Firebase from "../Config/Firebase";
import { StyleSheet, View, Text, Image } from "react-native";
import { getNotifications } from "../utils/Firestore";

export function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);

    const onRender = async () => {
        setNotifications(await getNotifications(Firebase.auth().currentUser.uid));
    };

    useFocusEffect(
        React.useCallback(() => {
            onRender();
        }, [])
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.notifications}>
                {notifications.map((notification, index) => {
                    const imageToLoad = notification.image ? { uri: notification.image } : require("./../img/account.png");
                    return (
                        <View style={styles.notification} key={index}>
                            <Image style={styles.reviewImage} source={imageToLoad} />
                            <Text style={styles.reviewText}>{notification.user.username} volgt je nu.</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", justifyContent: "flex-start" },
    title: { marginTop: 50, marginLeft: 20, fontSize: 24, fontWeight: "bold" },
    notifications: { marginTop: 10 },
    notification: { flexDirection: "row", alignContent: "center", marginTop: 20 },
    reviewImage: { width: 60, height: 60, marginLeft: 10, borderRadius: 100 },
    reviewText: { alignSelf: "center", width: 250, marginLeft: 15 },
});
