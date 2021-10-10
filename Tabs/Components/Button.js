import React, { useState } from "react";
import { StyleSheet, Text, Pressable, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function Button(props) {
    return (
        <Pressable style={styles.button} onPress={props.func}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </Pressable>
    );
}

export function LocationButton(props) {
    return (
        <Pressable style={styles.location} onPress={props.onPress}>
            <Ionicons style={styles.buttonIcon} name="locate-outline"></Ionicons>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#2CCB33",
        borderRadius: 5,
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 5,
        marginBottom: 10,
        justifyContent: "center",
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 24,
        alignSelf: "center",
        color: "#FFFFFF",
    },
    location: {
        backgroundColor: "#2CCB33",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        top: 40,
        right: 20,
        position: "absolute",
    },
    buttonIcon: {
        fontSize: 30,
        color: "white",
    },
});
