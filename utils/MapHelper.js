import React from "react";
import Firebase from "../Config/Firebase";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import { Touchable } from "react-native";
import { Pressable } from "react-native";
import { downloadImage } from "./Imaging";

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
    var markersList = [];

    markers.forEach((marker) => {
        markerWID = marker.data();
        markerWID.id = marker.id;
        markersList.push(markerWID);
    });
    return markersList;
};

export const getMarkerImage = async (id) => {
    try {
        let imageRef = Firebase.storage().ref("images/markers/" + id);
        return await imageRef.getDownloadURL();
    } catch (e) {
        return null;
    }
};

export const postReview = async (markerid, stars, review) => {
    Firebase.firestore().collection("markers").doc(markerid).collection("reviews").add({
        user: Firebase.auth().currentUser.uid,
        score: stars,
        review: review,
    });
};

export const updateReview = async (markerid, reviewid, stars, review) => {
    Firebase.firestore().collection("markers").doc(markerid).collection("reviews").doc(reviewid).update({
        score: stars,
        review: review,
    });
};

export const getReviews = async (markerid) => {
    const reviews = await Firebase.firestore().collection("markers").doc(markerid).collection("reviews").get();
    var reviewList = [];
    const userPromises = [];
    const imagePromises = [];
    reviews.forEach((review) => {
        reviewList.push(review.data());
        userPromises.push(Firebase.firestore().collection("users").doc(review.data().user).get());
        imagePromises.push(downloadImage(review.data().user));
    });
    const users = await Promise.all(userPromises);
    const userImages = await Promise.all(imagePromises);
    var i = 0;
    users.forEach((user) => {
        reviewList[i].userdata = user.data();
        i++;
    });
    i = 0;
    userImages.forEach((image) => {
        reviewList[i].userdata.image = image;
    });
    return reviewList;
};

export const getReviewScore = async (markerid) => {
    const reviews = await Firebase.firestore().collection("markers").doc(markerid).collection("reviews").get();
    var score = 0;
    reviews.forEach((review) => {
        score += review.data().score;
    });
    score = score / reviews.size;
    return score;
};

export const hasReview = async (markerid) => {
    var ownReview;
    const reviews = await Firebase.firestore()
        .collection("markers")
        .doc(markerid)
        .collection("reviews")
        .where("user", "==", Firebase.auth().currentUser.uid)
        .get();
    reviews.forEach((review) => {
        ownReview = review.data();
        ownReview.id = review.id;
    });
    return ownReview;
};
