import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView } from "react-native";
import { postReview, getReviews, getReviewScore, hasReview, updateReview } from "../../../utils/MapHelper";
import { Ionicons } from "@expo/vector-icons";
import { CardButton, UserButton } from "../Button";
import Firebase from "../../../Config/Firebase";
import { getMarkerImage } from "../../../utils/Imaging";

export function EditMarker(props) {
    return (
        <View>
            <Text style={styles.subtitle}>Edit Marker</Text>
            <View>
                <TextInput
                    placeholder="Title"
                    onChangeText={(title) => props.setMarkerTitle(title)}
                    defaultValue={props.title}
                    style={styles.input}
                    maxLength={30}
                />
                <TextInput
                    placeholder="Description"
                    onChangeText={(description) => props.setMarkerDescription(description)}
                    defaultValue={props.description}
                    style={styles.description}
                    multiline={true}
                    maxLength={120}
                />
            </View>
            <View style={styles.buttons}>
                <CardButton func={props.back}>Back</CardButton>
                <CardButton func={props.edit}>Edit</CardButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        marginTop: 150,
        justifyContent: "space-between",
    },
    input: {
        backgroundColor: "rgba(231, 231, 231, 0.2)",
        borderRadius: 10,
        height: 40,
        paddingLeft: 5,
        alignSelf: "center",
        width: "95%",
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
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 50,
        marginTop: 15,
    },
});
