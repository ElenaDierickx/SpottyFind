import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, GoToButton, SmallButton, StatButton } from "./../Components/Button";
import Firebase from "../../Config/Firebase";
import { useFocusEffect } from "@react-navigation/native";
import { uploadImage, downloadImage } from "../../utils/Imaging";
import { logOut } from "../../utils/Authorisation";
import { getUser, getFollowerStat, getFollowingStat } from "../../utils/Firestore";

export function AccountScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [image, setImage] = useState(false);

    const onRender = async () => {
        var user = Firebase.auth().currentUser;
        setFollowers(await getFollowerStat(user.uid));

        setFollowing(await getFollowingStat(user.uid));

        var userData = await getUser(user.uid);
        setUsername(userData.username);
    };

    const GetImage = async () => {
        try {
            var image = await downloadImage(Firebase.auth().currentUser.uid);
            setImage(image);
        } catch (error) {
            setImage(false);
        }
    };

    useEffect(() => {
        onRender();

        GetImage();
    }, []);

    const logOutPress = () => {
        logOut().then(navigation.navigate("Map"));
    };

    const imageToLoad = image ? { uri: image } : require("./../../img/account.png");

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <SmallButton func={() => logOutPress()}>Log Out</SmallButton>
                <Pressable onPress={() => uploadImage()}>
                    <Image style={styles.logo} source={imageToLoad} />
                </Pressable>
            </View>
            <Text style={styles.username}>{username}</Text>

            <View style={styles.stats}>
                <View>
                    <Text style={styles.statNumber}>23</Text>
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
                    <Text style={styles.statNumber}>23</Text>
                    <Text style={styles.statText}>Reviews</Text>
                </View>
            </View>
            <View style={styles.statButtons}>
                <StatButton func={() => logOutPress()}>Spots</StatButton>
                <StatButton func={() => logOutPress()}>Followers</StatButton>
                <StatButton func={() => navigation.navigate("FollowingStack", { uid: Firebase.auth().currentUser.uid })}>Following</StatButton>
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
    statButtons: {
        marginTop: 60,
    },
});
