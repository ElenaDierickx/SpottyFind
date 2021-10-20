import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, GoToButton, SmallButton, StatButton } from "./../Components/Button";
import Firebase from "../../Config/Firebase";
import { useFocusEffect } from "@react-navigation/native";

export function UserScreen({ route, navigation }) {
    const { uid } = route.params;
    const [username, setUsername] = useState("");
    const [following, setFollowing] = useState(false);
    const [followingStat, setFollowingStat] = useState(0);
    const [followersStat, setFollowersStat] = useState(0);

    const onRender = function () {
        Firebase.firestore()
            .collection("users")
            .doc(Firebase.auth().currentUser.uid)
            .collection("following")
            .where("following", "==", Firebase.firestore().collection("users").doc(uid))
            .get()
            .then((doc) => {
                if (doc.size > 0) {
                    setFollowing(true);
                }
            });
        Firebase.firestore()
            .collection("users")
            .doc(Firebase.auth().currentUser.uid)
            .collection("following")
            .get()
            .then((doc) => {
                setFollowersStat(doc.size);
            });
        Firebase.firestore()
            .collection("users")
            .doc(uid)
            .collection("following")
            .get()
            .then((doc) => {
                setFollowingStat(doc.size);
            });
        if (uid) {
            Firebase.firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((doc) => {
                    if (doc) {
                        setUsername(doc.data().username);
                    }
                });
        }
    };

    useFocusEffect(onRender);

    const followUser = async () => {
        if (following) {
            var query = Firebase.firestore()
                .collection("users")
                .doc(Firebase.auth().currentUser.uid)
                .collection("following")
                .where("following", "==", Firebase.firestore().collection("users").doc(uid));
            query.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
                setFollowing(false);
            });
        } else {
            Firebase.firestore()
                .collection("users")
                .doc(Firebase.auth().currentUser.uid)
                .collection("following")
                .add({
                    following: Firebase.firestore().collection("users").doc(uid),
                })
                .then(() => setFollowing(true));
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <SmallButton func={followUser}>
                    {!following && "Follow"}
                    {following && "Unfollow"}
                </SmallButton>
                <Image style={styles.logo} source={require("./../../img/account.png")} />
            </View>
            <Text style={styles.username}>{username}</Text>

            <View style={styles.stats}>
                <View>
                    <Text style={styles.statNumber}>23</Text>
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
                    <Text style={styles.statNumber}>23</Text>
                    <Text style={styles.statText}>Reviews</Text>
                </View>
            </View>
            <View style={styles.statButtons}>
                <StatButton func={followUser}>Spots</StatButton>
                <StatButton func={followUser}>Followers</StatButton>
                <StatButton func={followUser}>Following</StatButton>
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
