import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from "react-native";
import { SmallButton, StatButton } from "./../Components/Button";
import Firebase from "../../Config/Firebase";
import { useFocusEffect } from "@react-navigation/native";
import { uploadImage, downloadImage } from "../../utils/Imaging";
import { logOut } from "../../utils/Authorisation";
import { getUser, getFollowerStat, getFollowingStat, getMarkersStat, getReviewAmounts } from "../../utils/Firestore";

export function AccountScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [markers, setMarkers] = useState(0);
    const [image, setImage] = useState(false);
    const [reviews, setReviews] = useState(0);
    const [loading, setLoading] = useState(true);

    const onRender = async () => {
        var user = Firebase.auth().currentUser;
        setFollowers(await getFollowerStat(user.uid));

        setFollowing(await getFollowingStat(user.uid));

        var userData = await getUser(user.uid);
        setUsername(userData.username);

        setMarkers(await getMarkersStat(user.uid));

        setReviews(await getReviewAmounts(user.uid));

        setLoading(false);
    };

    const GetImage = async () => {
        try {
            var image = await downloadImage(Firebase.auth().currentUser.uid);
            setImage(image);
        } catch (error) {
            setImage(false);
        }
    };

    const ImageUploading = async () => {
        var isSucces = await uploadImage();
        if (isSucces) {
            GetImage();
        }
    };

    useEffect(() => {
        GetImage();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            onRender();
        }, [])
    );

    const logOutPress = () => {
        logOut().then(navigation.navigate("Map"));
    };

    const imageToLoad = image ? { uri: image } : require("./../../img/account.png");

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
                    <SmallButton func={() => logOutPress()}>Log Out</SmallButton>
                </View>
                <Pressable onPress={ImageUploading}>
                    <Image style={styles.logo} source={imageToLoad} />
                </Pressable>
            </View>
            <Text style={styles.username}>{username}</Text>

            <View style={styles.stats}>
                <View>
                    <Text style={styles.statNumber}>{markers}</Text>
                    <Text style={styles.statText}>Spots</Text>
                </View>
                <View>
                    <Text style={styles.statNumber}>{followers}</Text>
                    <Text style={styles.statText}>Followers</Text>
                </View>
                <View>
                    <Text style={styles.statNumber}>{following}</Text>
                    <Text style={styles.statText}>Following</Text>
                </View>
                <View>
                    <Text style={styles.statNumber}>{reviews}</Text>
                    <Text style={styles.statText}>Reviews</Text>
                </View>
            </View>
            <View style={styles.statButtons}>
                <StatButton
                    func={() =>
                        navigation.navigate("SpotsStack", {
                            uid: Firebase.auth().currentUser.uid,
                        })
                    }
                >
                    Spots
                </StatButton>
                <StatButton
                    func={() =>
                        navigation.navigate("FollowersStack", {
                            uid: Firebase.auth().currentUser.uid,
                            account: true,
                        })
                    }
                >
                    Followers
                </StatButton>
                <StatButton
                    func={() =>
                        navigation.navigate("FollowingStack", {
                            uid: Firebase.auth().currentUser.uid,
                            account: true,
                        })
                    }
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
    statButtons: {
        marginTop: 60,
    },
    topButtons: {
        marginRight: 10,
    },
});
