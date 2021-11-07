import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Image } from "react-native";
import { CardButton } from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { addLocationImage } from "../../utils/Imaging";
import { addMarker } from "../../utils/MapHelper";
import { getMarkerImage } from "../../utils/MapHelper";

export function MarkerCard(props) {
    return (
        <View style={styles.markerCard}>
            <Text style={styles.title}>{props.marker.title}</Text>
            <Image style={styles.image} source={image} />
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    markerCard: {
        height: 460,
        width: "95%",
        backgroundColor: "#FFFFFF",
        position: "absolute",
        bottom: 10,
        alignSelf: "center",
        borderRadius: 20,
        padding: 20,
        alignContent: "center",
    },
    title: {
        fontSize: 20,
    },
    image: {},
    descriptionTitle: {},
    description: {},
});
