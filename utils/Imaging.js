import React from "react";
import * as ImagePicker from "expo-image-picker";
import Firebase from "../Config/Firebase";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const compressImage = async (uri, format = SaveFormat.JPEG) => {
    // SaveFormat.PNG
    const result = await manipulateAsync(uri, [{ resize: { width: 1200 } }], { compress: 0.7, format });

    return { name: `${Date.now()}.${format}`, type: `image/${format}`, ...result };
    // return: { name, type, width, height, uri }
};

export const uploadImage = async () => {
    let result = await ImagePicker.launchCameraAsync();
    let compressed = await compressImage(result.uri);

    if (!result.cancelled) {
        try {
            await upload(compressed.uri);
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
    let compressed = await compressImage(result.uri);

    if (!result.cancelled) {
        try {
            return compressed;
        } catch (e) {
            return e;
        }
    }
};

export const getMarkerImage = async (id) => {
    try {
        let imageRef = Firebase.storage().ref("images/markers/" + id);
        return await imageRef.getDownloadURL();
    } catch (e) {
        return null;
    }
};
