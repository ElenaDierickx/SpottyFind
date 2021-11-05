import React from "react";
import Firebase from "../Config/Firebase";
import * as Location from "expo-location";

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
