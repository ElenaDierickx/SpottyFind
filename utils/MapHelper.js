import React from "react";
import Firebase from "../Config/Firebase";
import * as Location from "expo-location";
import { downloadImage } from "./Imaging";
import { getUser, reviewNotification, spotNotification } from "./Firestore";

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
        spotNotification(marker.id);

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

export const getMarkers = async (filter) => {
    if (filter == "all") {
        var markers = await Firebase.firestore().collection("markers").get();
    } else if (filter == "following") {
        var following = await Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).collection("following").get();
        const promises = [];
        following.forEach((following) => {
            const promise = following.data().following.get();
            promises.push(promise);
        });
        var users = await Promise.all(promises);
        const markerPromises = [];
        users.forEach((user) => {
            const promise = Firebase.firestore().collection("markers").where("user", "==", user.id).get();
            markerPromises.push(promise);
        });

        var markerlists = await Promise.all(markerPromises);
        var markers = [];
        markerlists.map((markerlist) => {
            markerlist.forEach((marker) => {
                markers.push(marker);
            });
        });
    } else if (filter == "4stars") {
        const allmarkers = await Firebase.firestore().collection("markers").get();
        var markerlist = [];
        allmarkers.forEach((marker) => {
            markerlist.push(marker);
        });

        var markers = [];
        for (var marker of markerlist) {
            var reviewList = [];
            const reviews = await Firebase.firestore().collection("markers").doc(marker.id).collection("reviews").get();
            reviews.forEach((review) => {
                reviewList.push(review.data());
            });
            var score = 0;
            for (var review of reviewList) {
                score = score + review.score;
            }
            if (reviewList.length >= 1) {
                score = score / reviewList.length;
                if (score >= 4) {
                    markers.push(marker);
                }
            }
        }
    } else if (filter == "3stars") {
        const allmarkers = await Firebase.firestore().collection("markers").get();
        var markerlist = [];
        allmarkers.forEach((marker) => {
            markerlist.push(marker);
        });

        var markers = [];
        for (var marker of markerlist) {
            var reviewList = [];
            const reviews = await Firebase.firestore().collection("markers").doc(marker.id).collection("reviews").get();
            reviews.forEach((review) => {
                reviewList.push(review.data());
            });
            var score = 0;
            for (var review of reviewList) {
                score = score + review.score;
            }
            if (reviewList.length >= 1) {
                score = score / reviewList.length;
                if (score >= 3) {
                    markers.push(marker);
                }
            }
        }
    }

    const userImagePromises = [];
    const userPromises = [];
    markers.forEach((marker) => {
        const userImage = downloadImage(marker.data().user);
        const promise = getUser(marker.data().user);
        userPromises.push(promise);
        userImagePromises.push(userImage);
    });
    const userlist = await Promise.all(userPromises);
    const userImages = await Promise.all(userImagePromises);

    var i = 0;
    var markersList = [];
    if (markers) {
        markers.forEach((marker) => {
            markerWID = marker.data();
            markerWID.id = marker.id;
            markerWID.user = userlist[i];
            markerWID.user.img = userImages[i];
            markersList.push(markerWID);
            i++;
        });
    }

    return markersList;
};

export const postReview = async (markerid, stars, review) => {
    Firebase.firestore().collection("markers").doc(markerid).collection("reviews").add({
        user: Firebase.auth().currentUser.uid,
        score: stars,
        review: review,
    });
    reviewNotification(markerid);
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
    score = (score / reviews.size) * 100;
    score = Math.round(score) / 100;

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

export const updateMarker = (markerId, title, description) => {
    Firebase.firestore().collection("markers").doc(markerId).update({
        title: title,
        description: description,
    });
};

export const deleteMarker = async (markerId) => {
    Firebase.firestore().collection("markers").doc(markerId).delete();
    var deleteThis = await Firebase.firestore().collectionGroup("notifications").where("marker", "==", markerId).get();
    deleteThis.forEach((notification) => {
        notification.ref.delete();
    });
};
