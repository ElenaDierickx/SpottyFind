import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { postReview, getReviews, getReviewScore, hasReview, updateReview } from "../../../utils/MapHelper";
import { Ionicons } from "@expo/vector-icons";
import { CardButton, UserButton } from "../Button";
import Firebase from "../../../Config/Firebase";
import { getMarkerImage } from "../../../utils/Imaging";

export function ReviewDetails(props) {
    const imageToLoad = props.marker.user.img ? { uri: props.marker.user.img } : require("./../../../img/account.png");
    if (props.loading) {
        return <ActivityIndicator animating={true} style={styles.indicator} size="large" color="#2CCB33" />;
    }
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
            <View style={styles.details}>
                <View>
                    <Text style={styles.creatorTitle}>Creator</Text>
                    <Pressable
                        style={styles.details}
                        onPress={() => {
                            if (props.marker.user.id == Firebase.auth().currentUser.uid) {
                                props.navigation.navigate("Account", {
                                    screen: "AccountStack",
                                });
                            } else {
                                props.navigation.navigate("People", {
                                    screen: "UserStack",
                                    params: {
                                        uid: props.marker.user.id,
                                    },
                                });
                            }
                        }}
                    >
                        <View style={styles.user}>
                            <View style={styles.userDetails}>
                                <Image source={imageToLoad} style={styles.userimage} />
                                <Text>{props.marker.user.username}</Text>
                            </View>
                            {Firebase.auth().currentUser.uid == props.marker.user.id && (
                                <CardButton style={styles.reviewButton} func={props.editMarker}>
                                    Edit Marker
                                </CardButton>
                            )}
                        </View>
                    </Pressable>
                </View>
                <View>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.description}>{props.marker.description}</Text>
                </View>
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
    image: {
        marginTop: 10,
        width: 320,
        height: 200,
        borderRadius: 10,
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 5,
    },
    creatorTitle: {
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
    userimage: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 10,
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    userDetails: {
        flexDirection: "row",
        alignItems: "center",
    },
    details: {
        marginTop: 5,
    },
});
