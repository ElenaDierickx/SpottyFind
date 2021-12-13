import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView, ProgressBarAndroidComponent } from "react-native";
import { postReview, getReviews, getReviewScore, hasReview, updateReview } from "../../utils/MapHelper";
import { Ionicons } from "@expo/vector-icons";
import { CardButton } from "./Button";
import Firebase from "../../Config/Firebase";
import { ReviewDetails } from "./MarkerCard/ReviewDetails";
import { ReviewList } from "./MarkerCard/ReviewList";
import { ReviewPlace } from "./MarkerCard/ReviewPlace";
import { getMarkerImage } from "../../utils/Imaging";

export function MarkerCard(props) {
    const [image, setImage] = useState(null);
    const [review, setReview] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState(0);
    const [reviewListing, setReviewListing] = useState(false);
    const [reviewList, setReviewList] = useState(null);
    const [score, setScore] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(null);

    const imageToLoad = image ? { uri: image } : require("./../../img/account.png");

    const onRender = async () => {
        const imageTemp = await getMarkerImage(props.marker.id);
        setImage(imageTemp);

        var score = await getReviewScore(props.marker.id);
        if (isNaN(score)) {
            score = 0;
        }
        setScore(score);

        if (Firebase.auth().currentUser) {
            const reviewed = await hasReview(props.marker.id);
            setHasReviewed(reviewed);
            if (reviewed) {
                setReviewText(reviewed.review);
                setStars(reviewed.score);
            }
        }
    };

    const getReviewList = async () => {
        setReviewListing(true);
        const reviews = await getReviews(props.marker.id);
        setReviewList(reviews);
    };

    const placeReview = () => {
        postReview(props.marker.id, stars, reviewText);
        setReview(false);
        getReviewList();
        onRender();
    };

    const editReview = () => {
        updateReview(props.marker.id, hasReviewed.id, stars, reviewText);
        setReview(false);
        getReviewList();
        onRender();
    };

    useEffect(() => {
        onRender();
        setReview(false);
        setReviewList(null);
        setReviewListing(false);
        setHasReviewed(null);
        setReviewText("");
        setStars(0);
    }, [props.marker]);

    callbackFunction = (childData) => {
        setReviewText(childData);
    };

    return (
        <View style={styles.markerCard}>
            <View style={styles.topView}>
                <View>
                    <Text style={styles.title}>{props.marker.title}</Text>
                    <Text style={styles.author}>Author: {props.marker.user.username}</Text>
                </View>
                <Pressable onPress={props.close} style={styles.closeView}>
                    <Ionicons style={styles.close} name="close"></Ionicons>
                </Pressable>
            </View>
            {!review && !reviewListing && (
                <ReviewDetails
                    imageToLoad={imageToLoad}
                    score={score}
                    getReviewList={() => {
                        getReviewList();
                    }}
                    marker={props.marker}
                />
            )}
            {review && (
                <ReviewPlace
                    stars={stars}
                    back={() => {
                        setReview(false);
                        getReviewList();
                    }}
                    editReview={editReview}
                    placeReview={placeReview}
                    reviewText={reviewText}
                    hasReviewed={hasReviewed}
                    setReviewText={(reviewTest) => {
                        setReviewText(reviewTest);
                    }}
                    setStars={(score) => {
                        setStars(score);
                    }}
                />
            )}
            {reviewListing && (
                <ReviewList
                    reviewList={reviewList}
                    hasReviewed={hasReviewed}
                    user={props.marker.user}
                    back={() => {
                        setReviewListing(false);
                    }}
                    edit={() => {
                        setReviewListing(false);
                        setReview(true);
                    }}
                    place={() => {
                        setReviewListing(false);
                        setReview(true);
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    markerCard: {
        height: 470,
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
        fontSize: 40,
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    close: {
        fontSize: 25,
    },
    closeView: {
        alignSelf: "center",
        marginRight: 10,
    },
    author: {
        fontSize: 12,
        fontWeight: "bold",
    },
});
