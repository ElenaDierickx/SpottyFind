import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, KeyboardAvoidingView } from "react-native";
import { postReview, getReviews, getReviewScore, hasReview, updateReview, updateMarker, deleteMarker } from "../../utils/MapHelper";
import { Ionicons } from "@expo/vector-icons";
import { CardButton } from "./Button";
import Firebase from "../../Config/Firebase";
import { ReviewDetails } from "./MarkerCard/ReviewDetails";
import { ReviewList } from "./MarkerCard/ReviewList";
import { ReviewPlace } from "./MarkerCard/ReviewPlace";
import { EditMarker } from "./MarkerCard/EditMarker";
import { getMarkerImage } from "../../utils/Imaging";
import { useLinkProps } from "@react-navigation/native";

export function MarkerCard(props) {
    const [image, setImage] = useState(null);
    const [review, setReview] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState(0);
    const [reviewListing, setReviewListing] = useState(false);
    const [reviewList, setReviewList] = useState(null);
    const [score, setScore] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(null);
    const [editMarker, setEditMarker] = useState(null);
    const [title, setTitle] = useState(props.marker.title);
    const [description, setDescription] = useState(props.marker.description);
    const [loadDetails, setLoadDetails] = useState(true);
    const [loadReviews, setLoadReviews] = useState(true);
    const [editError, setEditError] = useState("");
    const [reviewError, setReviewError] = useState("");

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

        setLoadDetails(false);
    };

    const getReviewList = async () => {
        setReviewListing(true);
        const reviews = await getReviews(props.marker.id);
        setReviewList(reviews);
        setLoadReviews(false);
    };

    const placeReview = () => {
        if (reviewText != "") {
            setReviewError("");
            postReview(props.marker.id, stars, reviewText);
            setReview(false);
            getReviewList();
            onRender();
        } else {
            setReviewError("Please fill in a description.");
        }
    };

    const editReview = () => {
        if (reviewText != "") {
            setReviewError("");
            updateReview(props.marker.id, hasReviewed.id, stars, reviewText);
            setReview(false);
            getReviewList();
            onRender();
        } else {
            setReviewError("Please fill in a description.");
        }
    };

    useEffect(() => {
        setLoadDetails(true);
        setLoadReviews(true);
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
        <KeyboardAvoidingView style={styles.markerCard}>
            <View style={styles.topView}>
                <View>
                    <Text style={styles.title}>{props.marker.title}</Text>
                </View>
                <Pressable onPress={props.close} style={styles.closeView}>
                    <Ionicons style={styles.close} name="close"></Ionicons>
                </Pressable>
            </View>
            {!review && !reviewListing && !editMarker && (
                <ReviewDetails
                    navigation={props.navigation}
                    imageToLoad={imageToLoad}
                    score={score}
                    getReviewList={() => {
                        getReviewList();
                    }}
                    marker={props.marker}
                    editMarker={() => {
                        setEditMarker(true);
                    }}
                    loading={loadDetails}
                />
            )}
            {review && (
                <ReviewPlace
                    stars={stars}
                    back={() => {
                        setReview(false);
                        getReviewList();
                    }}
                    error={reviewError}
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
                    loading={loadReviews}
                />
            )}
            {editMarker && (
                <EditMarker
                    back={() => {
                        setEditMarker(false);
                    }}
                    setMarkerTitle={(title) => {
                        setTitle(title);
                    }}
                    setMarkerDescription={(description) => {
                        setDescription(description);
                    }}
                    title={title}
                    description={description}
                    error={editError}
                    edit={() => {
                        if (title != "" && description != "") {
                            setEditError("");
                            updateMarker(props.marker.id, title, description);
                            setEditMarker(false);
                            props.marker.title = title;
                            props.marker.description = description;
                        } else {
                            setEditError("Please fill in all fields.");
                        }
                    }}
                    delete={props.deleteMarker}
                />
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    markerCard: {
        height: 550,
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
