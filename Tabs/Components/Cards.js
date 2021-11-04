import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { CardButton } from "./Button";
import { Ionicons } from "@expo/vector-icons";

export function AddLocationCard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <View style={styles.addLocationCard}>
            <TextInput placeholder="Title" onChangeText={(title) => setTitle(title)} defaultValue={title} style={styles.input} maxLength={30} />
            <View style={styles.cameraPlaceholder}>
                <Ionicons style={styles.cameraIcon} name="camera-outline"></Ionicons>
            </View>
            <TextInput
                placeholder="Description"
                onChangeText={(description) => setDescription(description)}
                defaultValue={description}
                style={styles.description}
                multiline={true}
                maxLength={255}
            />
            <View style={styles.buttons}>
                <CardButton func={props.backFunc}>Back</CardButton>
                <CardButton>Place</CardButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    addLocationCard: {
        height: 450,
        width: "95%",
        backgroundColor: "#FFFFFF",
        position: "absolute",
        bottom: 10,
        alignSelf: "center",
        borderRadius: 20,
        padding: 20,
        alignContent: "center",
    },

    input: {
        backgroundColor: "rgba(231, 231, 231, 0.2)",
        borderRadius: 10,
        height: 40,
        paddingLeft: 5,
        alignSelf: "center",
        width: "95%",
    },

    cameraPlaceholder: {
        backgroundColor: "#C4C4C4",
        height: 150,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
        marginTop: 20,
        justifyContent: "center",
    },
    cameraIcon: {
        fontSize: 50,
        color: "black",
        alignSelf: "center",
    },

    description: {
        backgroundColor: "rgba(231, 231, 231, 0.2)",
        borderRadius: 10,
        height: 120,
        paddingLeft: 5,
        alignSelf: "center",
        width: "95%",
        marginTop: 20,
        textAlignVertical: "top",
        paddingTop: 5,
    },

    buttons: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
    },
});
