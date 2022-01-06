import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Firebase from "../Config/Firebase";
import { StyleSheet, View, Text, Image, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { getMarker, getNotifications, reviewNotification, setSeen } from "../utils/Firestore";

export function NotificationsPage({ navigation }) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const onRender = async () => {
        const notifications = await getNotifications(Firebase.auth().currentUser.uid);
        setNotifications(notifications);
        setSeen(notifications);
        setLoading(false);
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
            <ScrollView style={styles.notifications}>
                {loading && <ActivityIndicator animating={true} size="large" color="#2CCB33" />}
                {!loading && notifications.length == 0 && <Text style={styles.noYet}>No notifications yet</Text>}
                {!loading &&
                    notifications.length > 0 &&
                    notifications.map((notification, index) => {
                        const imageToLoad = notification.image ? { uri: notification.image } : require("./../img/account.png");
                        if (notification.type == "follow") {
                            return (
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("People", {
                                            screen: "UserStack",
                                            params: {
                                                uid: notification.user.id,
                                            },
                                        });
                                    }}
                                    style={[styles.notification, !notification.seen && styles.unseen]}
                                    key={index}
                                >
                                    <Image style={styles.reviewImage} source={imageToLoad} />
                                    <Text style={styles.reviewText}>{notification.user.username} is now following you.</Text>
                                </Pressable>
                            );
                        }
                        if (notification.type == "review") {
                            return (
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("Map", {
                                            initialMarker: notification.marker,
                                        });
                                    }}
                                    style={[styles.notification, !notification.seen && styles.unseen]}
                                    key={index}
                                >
                                    <Image style={styles.reviewImage} source={imageToLoad} />
                                    <Text style={styles.reviewText}>
                                        {notification.user.username} placed a review on marker {notification.marker.title}.
                                    </Text>
                                </Pressable>
                            );
                        }
                        if (notification.type == "marker") {
                            return (
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("Map", {
                                            initialMarker: notification.marker,
                                        });
                                    }}
                                    style={[styles.notification, !notification.seen && styles.unseen]}
                                    key={index}
                                >
                                    <Image style={styles.reviewImage} source={imageToLoad} />
                                    <Text style={styles.reviewText}>
                                        {notification.user.username} placed a new marker: {notification.marker.title}.
                                    </Text>
                                </Pressable>
                            );
                        }
                    })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", justifyContent: "flex-start" },
    title: { marginTop: 50, marginLeft: 20, fontSize: 24, fontWeight: "bold" },
    notifications: { marginTop: 10 },
    notification: { flexDirection: "row", alignContent: "center", paddingTop: 12, paddingBottom: 12 },
    unseen: { backgroundColor: "#E7E7E7" },
    reviewImage: { width: 60, height: 60, marginLeft: 10, borderRadius: 100 },
    reviewText: { alignSelf: "center", width: 250, marginLeft: 15 },
    noYet: {
        marginLeft: 20,
        fontSize: 16,
    },
});
