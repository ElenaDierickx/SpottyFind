import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { postReview, getReviews, getReviewScore, hasReview, updateReview } from "../../../utils/MapHelper";
import { Ionicons } from "@expo/vector-icons";
import { CardButton, UserButton } from "../Button";
import Firebase from "../../../Config/Firebase";
import { getMarkerImage } from "../../../utils/Imaging";

export function EditMarker(props) {
    const deleteMarker = () => {
        Alert.alert("Delete Marker", "Are you sure you want to delete this marker?", [
            {
                text: "cancel",
            },
            {
                text: "delete",
                onPress: props.delete,
            },
        ]);
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View>
                <CardButton style={styles.deleteButton} func={deleteMarker}>
                    Delete
                </CardButton>
                <Text style={styles.subtitle}>Edit Marker</Text>
                <View>
                    <Text>Title</Text>
                    <TextInput
                        placeholder="Title"
                        onChangeText={(title) => props.setMarkerTitle(title)}
                        defaultValue={props.title}
                        style={styles.input}
                        maxLength={30}
                    />
                    <Text>Description</Text>
                    <TextInput
                        placeholder="Description"
                        onChangeText={(description) => props.setMarkerDescription(description)}
                        defaultValue={props.description}
                        style={styles.description}
                        multiline={true}
                        maxLength={120}
                    />
                </View>
                {props.error != "" && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>{props.error}</Text>
                    </View>
                )}
            </View>
            <View style={styles.buttons}>
                <CardButton func={props.back}>Back</CardButton>
                <CardButton func={props.edit}>Edit</CardButton>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        backgroundColor: "rgba(231, 231, 231, 0.2)",
        borderRadius: 10,
        height: 40,
        paddingLeft: 5,
        alignSelf: "center",
        width: "100%",
        marginBottom: 20,
        marginTop: 3,
    },
    errorContainer: {
        height: 40,
        width: "95%",
        backgroundColor: "rgba(230, 0, 0, 0.4)",
        alignSelf: "center",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        borderColor: "red",
        borderWidth: 2,
        marginTop: 10,
    },
    error: {
        color: "black",
        alignSelf: "center",
    },
    description: {
        backgroundColor: "rgba(231, 231, 231, 0.2)",
        borderRadius: 10,
        height: 120,
        paddingLeft: 5,
        alignSelf: "center",
        width: "100%",
        textAlignVertical: "top",
        paddingTop: 5,
        marginTop: 3,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 10,
    },
    deleteButton: {
        marginTop: 15,
        width: "100%",
    },
    container: {
        justifyContent: "space-between",
        height: 460,
    },
});
