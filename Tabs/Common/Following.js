import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { getFollowingList } from "../../utils/Firestore";
import { UserButton } from "../Components/Button";
import Firebase from "../../Config/Firebase";
import { Ionicons } from "@expo/vector-icons";

export function FollowingScreen({ route, navigation }) {
    const { uid, account } = route.params;
    const [following, setFollowing] = useState([]);

    const getFollowing = async () => {
        var following = await getFollowingList(uid);
        setFollowing(following);
    };

    useEffect(() => {
        getFollowing();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <View style={styles.topView}>
                    <Text style={styles.followingText}>Following</Text>
                    <Pressable
                        onPress={() => {
                            navigation.goBack(null);
                        }}
                    >
                        <Ionicons style={styles.backButton} name="arrow-back-outline"></Ionicons>
                    </Pressable>
                </View>
                <ScrollView>
                    {following.map((follow, index) => {
                        return (
                            <UserButton
                                key={index}
                                img={follow.image}
                                func={() => {
                                    if (follow.id == Firebase.auth().currentUser.uid) {
                                        navigation.navigate("Account", {
                                            screen: "AccountStack",
                                        });
                                    } else if (account) {
                                        navigation.navigate("People", {
                                            screen: "UserStack",
                                            initial: false,
                                            params: {
                                                uid: follow.id,
                                            },
                                        });
                                    } else {
                                        navigation.navigate("UserStack", { uid: follow.id });
                                    }
                                }}
                            >
                                {follow.username}
                            </UserButton>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        paddingTop: 50,
    },
    followingText: {
        marginLeft: 20,
        fontWeight: "bold",
        fontSize: 26,
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    backButton: {
        fontSize: 26,
        alignSelf: "center",
        marginRight: 20,
    },
});
