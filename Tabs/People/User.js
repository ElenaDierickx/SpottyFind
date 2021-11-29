import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SmallButton, StatButton } from "./../Components/Button";
import { useFocusEffect } from "@react-navigation/native";
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
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert, VirtualizedList } from "react-native";
import Firebase from "../../Config/Firebase";

export function UserScreen({ route, navigation }) {
    const { uid } = route.params;
    const [username, setUsername] = useState("");
    const [following, setFollowing] = useState(false);
    const [followingStat, setFollowingStat] = useState(0);
    const [followersStat, setFollowersStat] = useState(0);
    const [markers, setMarkers] = useState(0);
    const [image, setImage] = useState(false);
    const [reviews, setReviews] = useState(0);

    const onRender = async () => {
        setFollowing(await getIsFollowing(uid));

        setFollowingStat(await getFollowingStat(uid));

        setFollowersStat(await getFollowerStat(uid));

        var user = await getUser(uid);
        setUsername(user.username);

        setMarkers(await getMarkersStat(uid));

        setReviews(await getReviewAmounts(user.uid));
    };

    useFocusEffect(
        React.useCallback(() => {
            onRender();
        }, [])
    );

    useEffect(() => {
        GetImage();
    }, []);

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

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <SmallButton func={followUser}>
                    {!following && "Follow"}
                    {following && "Unfollow"}
                </SmallButton>
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
                        navigation.push("SpotsStack", { uid: uid });
                    }}
                >
                    Spots
                </StatButton>
                <StatButton
                    func={() => {
                        navigation.push("FollowersStack", { uid: uid, account: false });
                    }}
                >
                    Followers
                </StatButton>
                <StatButton
                    func={() => {
                        navigation.push("FollowingStack", { uid: uid, account: false });
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
});
