import React from "react";
import Firebase from "../Config/Firebase";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import { Touchable } from "react-native";
import { Pressable } from "react-native";

export const addMarker = async (title, image, description) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        return "Please turn on your location";
    }

    let location = await Location.getLastKnownPositionAsync({});
    if (location) {
        var marker = await Firebase.firestore().collection("markers").add({
            user: Firebase.auth().currentUser.uid,
            title: title,
            description: description,
            location: location,
        });

        uploadImage(image.uri, marker.id);

        return "succes";
    } else {
        return "Please turn on your location";
    }
};

const uploadImage = async (uri, id) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = Firebase.storage()
        .ref()
        .child("images/markers/" + id);
    return ref.put(blob);
};

export const getMarkers = async () => {
    var markers = await Firebase.firestore().collection("markers").get();

    return markers;
};

export const getMarkerImage = async (id) => {
    try {
        let imageRef = Firebase.storage().ref("images/markers/" + id);
        return await imageRef.getDownloadURL();
    } catch (e) {
        return null;
    }
};
