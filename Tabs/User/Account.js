import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, GoToButton, SmallButton, StatButton } from "./../Components/Button";
import Firebase from "../../Config/Firebase";
import { useFocusEffect } from "@react-navigation/native";
import { uploadImage, downloadImage } from "../../utils/Imaging";
import { logOut } from "../../utils/Authorisation";

export function AccountScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [image, setImage] = useState(false);

    const onRender = function () {
        var user = Firebase.auth().currentUser;
        Firebase.firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
                if (doc) {
                    setUsername(doc.data().username);
                }
            });
        Firebase.firestore()
            .collection("users")
            .doc(Firebase.auth().currentUser.uid)
            .collection("following")
            .get()
            .then((doc) => {
                setFollowing(doc.size);
            });
        Firebase.firestore()
            .collectionGroup("following")
            .where("following", "==", Firebase.firestore().collection("users").doc(user.uid))
            .get()
            .then((doc) => {
                setFollowers(doc.size);
            });
    };

    useFocusEffect(onRender);

    const GetImage = async () => {
        try {
            var image = await downloadImage();
            setImage(image);
        } catch (error) {
            setImage(false);
        }
    };

    useEffect(() => {
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
                <StatButton func={() => logOutPress()}>Following</StatButton>
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
