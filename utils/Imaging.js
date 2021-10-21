import React from "react";
import * as ImagePicker from "expo-image-picker";
import Firebase from "../Config/Firebase";

export const uploadImage = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
        upload(result.uri)
            .then(() => {
                console.log("Succes");
            })
            .catch((error) => {
                console.log(error);
            });
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

export const downloadImage = async () => {
    let imageRef = Firebase.storage().ref("images/profiles/" + Firebase.auth().currentUser.uid);
    return await imageRef.getDownloadURL();
};
