import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Touchable, Pressable, TextInput } from "react-native";
import { getMarkerImage, postReview } from "../../utils/MapHelper";
import { Ionicons } from "@expo/vector-icons";
import { CardButton } from "./Button";
import Firebase from "../../Config/Firebase";

export function MarkerCard(props) {
    const [image, setImage] = useState(null);
    const [review, setReview] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState(5);

    const imageToLoad = image ? { uri: image } : require("./../../img/account.png");

    const onRender = async () => {
        const imageTemp = await getMarkerImage(props.marker.id);
        setImage(imageTemp);
    };

    const placeReview = () => {
        postReview(props.marker.id, stars, reviewText);
        setReview(false);
    };

    useEffect(() => {
        onRender();
        setReview(false);
    }, [props.marker]);

    return (
        <View style={styles.markerCard}>
            <View style={styles.topView}>
                <Text style={styles.title}>{props.marker.title}</Text>
                <Pressable onPress={props.close} style={styles.closeView}>
                    <Ionicons style={styles.close} name="close"></Ionicons>
                </Pressable>
            </View>
            {!review && (
                <View>
                    <Image style={styles.image} source={imageToLoad} />
                    <View style={styles.reviewView}>
                        <Text style={styles.score}>5</Text>
                        <View style={styles.stars}>
                            <Ionicons style={styles.star} name="star"></Ionicons>
                            <Ionicons style={styles.star} name="star"></Ionicons>
                            <Ionicons style={styles.star} name="star"></Ionicons>
                            <Ionicons style={styles.star} name="star"></Ionicons>
                            <Ionicons style={styles.star} name="star"></Ionicons>
                        </View>
                        {Firebase.auth().currentUser && (
                            <CardButton
                                style={styles.reviewButton}
                                func={() => {
                                    setReview(true);
                                }}
                            >
                                Review
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
                            }}
                        >
                            Back
                        </CardButton>
                        <CardButton func={placeReview}>Place</CardButton>
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
        width: 300,
        height: 200,
        borderRadius: 10,
    },
    descriptionTitle: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {},
    reviewView: {
        flexDirection: "row",

        marginTop: 10,
    },
    score: {
        fontSize: 40,
    },
    stars: {
        flexDirection: "row",
        alignSelf: "center",
        marginLeft: 20,
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
    reviewButton: {
        alignSelf: "center",
        marginLeft: 30,
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
});
