import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView } from "react-native";
import { postReview, getReviews, getReviewScore, hasReview, updateReview } from "../../../utils/MapHelper";
import { Ionicons } from "@expo/vector-icons";
import { CardButton } from "../Button";
import Firebase from "../../../Config/Firebase";
import { getMarkerImage } from "../../../utils/Imaging";

export function ReviewDetails(props) {
    return (
        <View>
            <Image style={styles.image} source={props.imageToLoad} />
            <View style={styles.reviewView}>
                <View style={styles.totalScore}>
                    <Text style={styles.score}>{props.score}</Text>
                    <View style={styles.stars}>
                        {props.score >= 1 && <Ionicons style={styles.star} name="star"></Ionicons>}
                        {props.score < 1 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                        {props.score >= 2 && <Ionicons style={styles.star} name="star"></Ionicons>}
                        {props.score < 2 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                        {props.score >= 3 && <Ionicons style={styles.star} name="star"></Ionicons>}
                        {props.score < 3 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                        {props.score >= 4 && <Ionicons style={styles.star} name="star"></Ionicons>}
                        {props.score < 4 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                        {props.score >= 5 && <Ionicons style={styles.star} name="star"></Ionicons>}
                        {props.score < 5 && <Ionicons style={styles.star} name="star-outline"></Ionicons>}
                    </View>
                </View>
                {Firebase.auth().currentUser && (
                    <CardButton style={styles.reviewButton} func={props.getReviewList}>
                        Reviews
                    </CardButton>
                )}
            </View>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{props.marker.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
    reviewButton: {
        alignSelf: "center",
        marginTop: 10,
    },
    totalScore: {
        flexDirection: "row",
    },
});
