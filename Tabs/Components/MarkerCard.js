import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView } from "react-native";
import { getMarkerImage, postReview, getReviews, getReviewScore, hasReview, updateReview } from "../../utils/MapHelper";
import { Ionicons } from "@expo/vector-icons";
import { CardButton } from "./Button";
import Firebase from "../../Config/Firebase";

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
        console.log(reviews);
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

    return (
        <View style={styles.markerCard}>
            <View style={styles.topView}>
                <Text style={styles.title}>{props.marker.title}</Text>
                <Pressable onPress={props.close} style={styles.closeView}>
                    <Ionicons style={styles.close} name="close"></Ionicons>
                </Pressable>
            </View>
            {!review && !reviewListing && (
                <View>
                    <Image style={styles.image} source={imageToLoad} />
                    <View style={styles.reviewView}>
                        <View style={styles.totalScore}>
                            <Text style={styles.score}>{score}</Text>
                            <View style={styles.stars}>
                                {score >= 1 && <Ionicons style={styles.star} name="star"></Ionicons>}
                                {score < 1 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                                {score >= 2 && <Ionicons style={styles.star} name="star"></Ionicons>}
                                {score < 2 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                                {score >= 3 && <Ionicons style={styles.star} name="star"></Ionicons>}
                                {score < 3 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                                {score >= 4 && <Ionicons style={styles.star} name="star"></Ionicons>}
                                {score < 4 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                                {score >= 5 && <Ionicons style={styles.star} name="star"></Ionicons>}
                                {score < 5 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                            </View>
                        </View>
                        {Firebase.auth().currentUser && (
                            <CardButton
                                style={styles.reviewButton}
                                func={() => {
                                    getReviewList();
                                }}
                            >
                                Reviews
                            </CardButton>
                        )}
                    </View>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.description}>{props.marker.description}</Text>
                </View>
            )}
            {review && (
                <View>
                    <View style={styles.starsReview}>
                        {stars >= 1 && (
                            <Pressable onPress={() => setStars(1)}>
                                <Ionicons style={styles.starReview} name="star"></Ionicons>
                            </Pressable>
                        )}
                        {stars < 1 && (
                            <Pressable onPress={() => setStars(1)}>
                                <Ionicons style={styles.starReview} name="star-outline"></Ionicons>
                            </Pressable>
                        )}
                        {stars >= 2 && (
                            <Pressable onPress={() => setStars(2)}>
                                <Ionicons style={styles.starReview} name="star"></Ionicons>
                            </Pressable>
                        )}
                        {stars < 2 && (
                            <Pressable onPress={() => setStars(2)}>
                                <Ionicons style={styles.starReview} name="star-outline"></Ionicons>
                            </Pressable>
                        )}
                        {stars >= 3 && (
                            <Pressable onPress={() => setStars(3)}>
                                <Ionicons style={styles.starReview} name="star"></Ionicons>
                            </Pressable>
                        )}
                        {stars < 3 && (
                            <Pressable onPress={() => setStars(3)}>
                                <Ionicons style={styles.starReview} name="star-outline"></Ionicons>
                            </Pressable>
                        )}
                        {stars >= 4 && (
                            <Pressable onPress={() => setStars(4)}>
                                <Ionicons style={styles.starReview} name="star"></Ionicons>
                            </Pressable>
                        )}
                        {stars < 4 && (
                            <Pressable onPress={() => setStars(4)}>
                                <Ionicons style={styles.starReview} name="star-outline"></Ionicons>
                            </Pressable>
                        )}
                        {stars >= 5 && (
                            <Pressable onPress={() => setStars(5)}>
                                <Ionicons style={styles.starReview} name="star"></Ionicons>
                            </Pressable>
                        )}
                        {stars < 5 && (
                            <Pressable onPress={() => setStars(5)}>
                                <Ionicons style={styles.starReview} name="star-outline"></Ionicons>
                            </Pressable>
                        )}
                    </View>
                    <TextInput
                        placeholder="Review"
                        onChangeText={(reviewText) => setReviewText(reviewText)}
                        defaultValue={reviewText}
                        style={styles.input}
                        multiline={true}
                        maxLength={255}
                    />
                    <View style={styles.buttons}>
                        <CardButton
                            func={() => {
                                setReview(false);
                                getReviewList();
                            }}
                        >
                            Back
                        </CardButton>
                        {hasReviewed && <CardButton func={editReview}>Edit</CardButton>}
                        {!hasReviewed && <CardButton func={placeReview}>Place</CardButton>}
                    </View>
                </View>
            )}
            {reviewListing && (
                <View>
                    <ScrollView style={styles.reviewsContainer}>
                        {reviewList &&
                            reviewList.map((review, index) => {
                                const imageToLoad = review.userdata.image ? { uri: review.userdata.image } : require("./../../img/account.png");
                                return (
                                    <View style={styles.reviewContainer} key={index}>
                                        <View style={styles.singleReview}>
                                            <Image source={imageToLoad} style={styles.userImage} />
                                            <Text style={styles.profileName}>{review.userdata.username}</Text>
                                            <Text style={styles.score}>{review.score}</Text>
                                            <View style={styles.starsSingle}>
                                                {review.score >= 1 && <Ionicons style={styles.star} name="star"></Ionicons>}
                                                {review.score < 1 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                                                {review.score >= 2 && <Ionicons style={styles.star} name="star"></Ionicons>}
                                                {review.score < 2 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                                                {review.score >= 3 && <Ionicons style={styles.star} name="star"></Ionicons>}
                                                {review.score < 3 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                                                {review.score >= 4 && <Ionicons style={styles.star} name="star"></Ionicons>}
                                                {review.score < 4 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                                                {review.score >= 5 && <Ionicons style={styles.star} name="star"></Ionicons>}
                                                {review.score < 5 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                                            </View>
                                        </View>
                                        <Text style={styles.singleDescription}>{review.review}</Text>
                                    </View>
                                );
                            })}
                    </ScrollView>
                    <View style={styles.buttons}>
                        <CardButton
                            func={() => {
                                setReviewListing(false);
                            }}
                        >
                            Back
                        </CardButton>
                        {hasReviewed && (
                            <CardButton
                                func={() => {
                                    setReviewListing(false);
                                    setReview(true);
                                }}
                            >
                                Edit
                            </CardButton>
                        )}
                        {!hasReviewed && (
                            <CardButton
                                func={() => {
                                    setReviewListing(false);
                                    setReview(true);
                                }}
                            >
                                Place
                            </CardButton>
                        )}
                    </View>
                </View>
            )}
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
        fontSize: 40,
    },
    image: {
        marginTop: 10,
        width: 320,
        height: 200,
        borderRadius: 10,
    },
    descriptionTitle: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {},
    reviewView: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between",
    },
    score: {
        fontSize: 40,
    },
    stars: {
        flexDirection: "row",
        alignSelf: "center",
        marginLeft: 5,
    },
    star: {
        color: "yellow",
        fontSize: 20,
    },
    starReview: {
        color: "yellow",
        fontSize: 40,
    },
    starsReview: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 60,
        marginBottom: 40,
    },
    starsSingle: {
        flexDirection: "row",
        alignSelf: "center",
        marginLeft: 10,
    },
    singleReview: {
        flexDirection: "row",
    },
    reviewButton: {
        alignSelf: "center",
        marginTop: 10,
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

    buttons: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
    },
    input: {
        backgroundColor: "rgba(231, 231, 231, 0.2)",
        borderRadius: 10,
        height: 140,
        paddingLeft: 5,
        alignSelf: "center",
        width: "95%",
        marginTop: 20,
        textAlignVertical: "top",
        paddingTop: 5,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    profileName: {
        alignSelf: "center",
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 40,
    },
    reviewContainer: {
        marginTop: 10,
    },
    singleDescription: {
        backgroundColor: "rgba(231, 231, 231, 0.2)",
        borderRadius: 10,
        height: 100,
        width: "95%",
        alignSelf: "center",
        marginTop: 20,
        padding: 10,
    },
    reviewsContainer: {
        height: "75%",
    },
    totalScore: {
        flexDirection: "row",
    },
});
