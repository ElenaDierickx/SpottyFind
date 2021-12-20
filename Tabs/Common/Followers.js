import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { getFollowersList } from "../../utils/Firestore";
import { UserButton } from "../Components/Button";
import Firebase from "../../Config/Firebase";

export function FollowersScreen({ route, navigation }) {
    const { uid, account } = route.params;
    const [followers, setFollowers] = useState([]);

    const getFollowers = async () => {
        var followers = await getFollowersList(uid);
        setFollowers(followers);
    };

    useEffect(() => {
        getFollowers();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Text style={styles.followingText}>Followers</Text>
                <ScrollView>
                    {followers.map((follower, index) => {
                        return (
                            <UserButton
                                key={index}
                                img={follower.image}
                                func={() => {
                                    if (follower.id == Firebase.auth().currentUser.uid) {
                                        navigation.navigate("Account");
                                    } else if (account) {
                                        navigation.navigate("People", {
                                            screen: "UserStack",
                                            params: {
                                                uid: follower.id,
                                            },
                                        });
                                    } else {
                                        navigation.navigate("UserStack", { uid: follower.id });
                                    }
                                }}
                            >
                                {follower.username}
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
