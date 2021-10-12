import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, GoToButton } from "./../Components/Button";
import Firebase from "../../Config/Firebase";

export function AccountScreen({ navigation }) {
    const [username, setUsername] = useState("");

    Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            Firebase.database()
                .ref()
                .child("users")
                .child(user.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setUsername(snapshot.val().username);
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });

    const logOut = async () => {
        Firebase.auth()
            .signOut()
            .then(() => {
                navigation.navigate("Map");
            })
            .catch((error) => {
                console.log(error.msg);
            });
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>{username}</Text>
            <Button func={logOut}>Log Out</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
});
