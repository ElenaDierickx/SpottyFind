import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SmallButton, StatButton } from "./../Components/Button";
import {
    getIsFollowing,
    getFollowerStat,
    getFollowingStat,
    getUser,
    unfollow,
    follow,
    getMarkersStat,
    getReviewAmounts,
} from "../../utils/Firestore";
import { downloadImage } from "../../utils/Imaging";
import { StyleSheet, Text, View, TextInput, Image, Pressable, ActivityIndicator } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export function UserScreen({ route, navigation }) {
    const { uid } = route.params;
    const [username, setUsername] = useState("");
    const [following, setFollowing] = useState(false);
    const [followingStat, setFollowingStat] = useState(0);
    const [followersStat, setFollowersStat] = useState(0);
    const [markers, setMarkers] = useState(0);
    const [image, setImage] = useState(false);
    const [reviews, setReviews] = useState(0);
    const [loading, setLoading] = useState(true);

    const onRender = async () => {
        setFollowing(await getIsFollowing(uid));

        setFollowingStat(await getFollowingStat(uid));

        setFollowersStat(await getFollowerStat(uid));

        var user = await getUser(uid);
        setUsername(user.username);

        setMarkers(await getMarkersStat(uid));

        setReviews(await getReviewAmounts(uid));

        setLoading(false);
    };

    useEffect(() => {
        onRender();
        GetImage();
    }, [uid]);

    const GetImage = async () => {
        try {
            var image = await downloadImage(uid);
            setImage(image);
        } catch (error) {
            setImage(false);
        }
    };

    const imageToLoad = image ? { uri: image } : require("./../../img/account.png");

    const followUser = async () => {
        if (following) {
            unfollow(uid);
            setFollowing(false);
        } else {
            follow(uid);
            setFollowing(true);
        }
        setFollowersStat(await getFollowerStat(uid));
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={true} style={styles.indicator} size="large" color="#2CCB33" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <View style={styles.topButtons}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("PeopleStack");
                        }}
                    >
                        <Ionicons style={styles.backButton} name="arrow-back-outline"></Ionicons>
                    </Pressable>
                    <SmallButton func={followUser}>
                        {!following && "Follow"}
                        {following && "Unfollow"}
                    </SmallButton>
                </View>

                <Image style={styles.logo} source={imageToLoad} />
            </View>
            <Text style={styles.username}>{username}</Text>

            <View style={styles.stats}>
                <View>
                    <Text style={styles.statNumber}>{markers}</Text>
                    <Text style={styles.statText}>Spots</Text>
                </View>
                <View>
                    <Text style={styles.statNumber}>{followersStat}</Text>
                    <Text style={styles.statText}>Followers</Text>
                </View>
                <View>
                    <Text style={styles.statNumber}>{followingStat}</Text>
                    <Text style={styles.statText}>Following</Text>
                </View>
                <View>
                    <Text style={styles.statNumber}>{reviews}</Text>
                    <Text style={styles.statText}>Reviews</Text>
                </View>
            </View>
            <View style={styles.statButtons}>
                <StatButton
                    func={() => {
                        navigation.navigate("SpotsStack", { uid: uid });
                    }}
                >
                    Spots
                </StatButton>
                <StatButton
                    func={() => {
                        navigation.navigate("FollowersStack", { uid: uid, account: false });
                    }}
                >
                    Followers
                </StatButton>
                <StatButton
                    func={() => {
                        navigation.navigate("FollowingStack", { uid: uid, account: false });
                    }}
                >
                    Following
                </StatButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
    },
    indicator: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        alignSelf: "center",
        width: 150,
        height: 150,
        marginTop: 20,

        borderRadius: 100,
    },
    username: {
        textAlign: "center",
        fontSize: 36,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 40,
    },
    statNumber: {
        textAlign: "center",
        fontSize: 28,
    },
    statText: {
        textAlign: "center",
        fontSize: 16,
    },
    statButtons: { marginTop: 60 },
    topButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 10,
    },
    backButton: {
        fontSize: 26,
        alignSelf: "center",
        marginTop: 50,
        marginLeft: 10,
    },
});
