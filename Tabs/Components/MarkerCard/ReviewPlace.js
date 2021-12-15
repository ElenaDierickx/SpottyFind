import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView } from "react-native";
import { getMarkerImage, postReview, getReviews, getReviewScore, hasReview, updateReview } from "../../../utils/MapHelper";
import { Ionicons } from "@expo/vector-icons";
import { CardButton } from "../Button";
import Firebase from "../../../Config/Firebase";

export function ReviewPlace(props) {
    return (
        <View>
            <Text style={styles.subtitle}>
                {props.hasReviewed && "Edit"}
                {!props.hasReviewed && "Place"} Review
            </Text>
            <View style={styles.starsReview}>
                {props.stars >= 1 && (
                    <Pressable onPress={() => props.setStars(1)}>
                        <Ionicons style={styles.starReview} name="star"></Ionicons>
                    </Pressable>
                )}
                {props.stars < 1 && (
                    <Pressable onPress={() => props.setStars(1)}>
                        <Ionicons style={styles.starReview} name="star-outline"></Ionicons>
                    </Pressable>
                )}
                {props.stars >= 2 && (
                    <Pressable onPress={() => props.setStars(2)}>
                        <Ionicons style={styles.starReview} name="star"></Ionicons>
                    </Pressable>
                )}
                {props.stars < 2 && (
                    <Pressable onPress={() => props.setStars(2)}>
                        <Ionicons style={styles.starReview} name="star-outline"></Ionicons>
                    </Pressable>
                )}
                {props.stars >= 3 && (
                    <Pressable onPress={() => props.setStars(3)}>
                        <Ionicons style={styles.starReview} name="star"></Ionicons>
                    </Pressable>
                )}
                {props.stars < 3 && (
                    <Pressable onPress={() => props.setStars(3)}>
                        <Ionicons style={styles.starReview} name="star-outline"></Ionicons>
                    </Pressable>
                )}
                {props.stars >= 4 && (
                    <Pressable onPress={() => props.setStars(4)}>
                        <Ionicons style={styles.starReview} name="star"></Ionicons>
                    </Pressable>
                )}
                {props.stars < 4 && (
                    <Pressable onPress={() => props.setStars(4)}>
                        <Ionicons style={styles.starReview} name="star-outline"></Ionicons>
                    </Pressable>
                )}
                {props.stars >= 5 && (
                    <Pressable onPress={() => props.setStars(5)}>
                        <Ionicons style={styles.starReview} name="star"></Ionicons>
                    </Pressable>
                )}
                {props.stars < 5 && (
                    <Pressable onPress={() => props.setStars(5)}>
                        <Ionicons style={styles.starReview} name="star-outline"></Ionicons>
                    </Pressable>
                )}
            </View>
            <TextInput
                placeholder="Review"
                onChangeText={(reviewText) => props.setReviewText(reviewText)}
                defaultValue={props.reviewText}
                style={styles.input}
                multiline={true}
                maxLength={120}
            />
            <View style={styles.buttons}>
                <CardButton func={props.back}>Back</CardButton>
                {props.hasReviewed && <CardButton func={props.editReview}>Edit</CardButton>}
                {!props.hasReviewed && <CardButton func={props.placeReview}>Place</CardButton>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    close: {
        fontSize: 25,
    },
    buttons: {
        flexDirection: "row",
        marginTop: 90,
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
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
