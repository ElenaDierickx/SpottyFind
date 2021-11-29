import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Firebase from "./../Config/Firebase";
import { StyleSheet, View } from "react-native";

export function Notifications() {
    const onRender = async () => {};

    useFocusEffect(
        React.useCallback(() => {
            onRender();
        }, [])
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
