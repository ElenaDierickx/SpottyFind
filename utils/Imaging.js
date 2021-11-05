import React from "react";
import * as ImagePicker from "expo-image-picker";
import Firebase from "../Config/Firebase";

export const uploadImage = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
        try {
            await upload(result.uri);
            return true;
        } catch (e) {
            return false;
        }
    }
};

const upload = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = Firebase.storage()
        .ref()
        .child("images/profiles/" + Firebase.auth().currentUser.uid);
    return ref.put(blob);
};

export const downloadImage = async (uid) => {
    try {
        let imageRef = Firebase.storage().ref("images/profiles/" + uid);
        return await imageRef.getDownloadURL();
    } catch (e) {
        return null;
    }
};

export const addLocationImage = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
        try {
            return result;
        } catch (e) {
            return e;
        }
    }
};
