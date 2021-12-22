import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { postReview, getReviews, getReviewScore, hasReview, updateReview } from "../../../utils/MapHelper";
import { Ionicons } from "@expo/vector-icons";
import { CardButton } from "../Button";
import Firebase from "../../../Config/Firebase";
import { getMarkerImage } from "../../../utils/Imaging";

export function ReviewList(props) {
    if (props.loading) {
        return <ActivityIndicator animating={true} style={styles.indicator} size="large" color="#2CCB33" />;
    }
    return (
        <View>
            <ScrollView style={styles.reviewsContainer}>
                {props.reviewList &&
                    props.reviewList.map((review, index) => {
                        const imageToLoad = review.userdata.image ? { uri: review.userdata.image } : require("./../../../img/account.png");
                        return (
                            <View style={styles.reviewContainer} key={index}>
                                <View style={styles.singleReview}>
                                    <View style={styles.row}>
                                        <Image source={imageToLoad} style={styles.userImage} />
                                        <Text style={styles.profileName}>{review.userdata.username}</Text>
                                    </View>
                                    <View style={styles.row}>
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
                                </View>
                                <Text style={styles.singleDescription}>{review.review}</Text>
                            </View>
                        );
                    })}
            </ScrollView>
            <View style={styles.buttons}>
                <CardButton func={props.back}>Back</CardButton>
                {!(props.user.id == Firebase.auth().currentUser.uid) && props.hasReviewed && <CardButton func={props.edit}>Edit</CardButton>}
                {!(props.user.id == Firebase.auth().currentUser.uid) && !props.hasReviewed && <CardButton func={props.place}>Place</CardButton>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    score: {
        fontSize: 26,
        alignSelf: "center",
    },
    stars: {
        flexDirection: "row",
        alignSelf: "center",
    },
    star: {
        color: "yellow",
        fontSize: 20,
    },
    starsSingle: {
        flexDirection: "row",
        alignSelf: "center",
        marginLeft: 10,
    },
    singleReview: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 10,
    },
    buttons: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    profileName: {
        alignSelf: "center",
        marginLeft: 5,
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
        height: 400.5,
    },
    row: {
        flexDirection: "row",
    },
});
