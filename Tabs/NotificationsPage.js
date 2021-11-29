import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Firebase from "./../Config/Firebase";
import { StyleSheet, View, Text, Image } from "react-native";

export function NotificationsPage() {
    const onRender = async () => {};

    useFocusEffect(
        React.useCallback(() => {
            onRender();
        }, [])
    );

    const imageToLoad = require("./../img/account.png");

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.notifications}>
                <View style={styles.notification}>
                    <Image style={styles.reviewImage} source={imageToLoad} />
                    <Text style={styles.reviewText}>Zeekoe heeft een review geplaatst op je spot: J - lokaal</Text>
                </View>
                <View style={styles.notification}>
                    <Image style={styles.reviewImage} source={imageToLoad} />
                    <Text style={styles.reviewText}>Zeebas heeft een review geplaatst op je spot: OOF</Text>
                </View>
                <View style={styles.notification}>
                    <Image style={styles.reviewImage} source={imageToLoad} />
                    <Text style={styles.reviewText}>Zeester heeft een nieuwe spot geplaatst: BANK</Text>
                </View>
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
