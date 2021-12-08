import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { getFollowingList } from "../../utils/Firestore";
import { UserButton } from "../Components/Button";
import Firebase from "../../Config/Firebase";

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
                <Text style={styles.followingText}>Following</Text>
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
                                            params: {
                                                uid: follow.id,
                                            },
                                        });
                                    } else {
                                        navigation.push("UserStack", { uid: follow.id });
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
        marginBottom: 20,
    },
});
