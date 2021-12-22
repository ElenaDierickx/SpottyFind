import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { getFollowersList } from "../../utils/Firestore";
import { UserButton } from "../Components/Button";
import Firebase from "../../Config/Firebase";
import { Ionicons } from "@expo/vector-icons";

export function FollowersScreen({ route, navigation }) {
    const { uid, account } = route.params;
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getFollowers = async () => {
        var followers = await getFollowersList(uid);
        setFollowers(followers);
        setLoading(false);
    };

    useEffect(() => {
        getFollowers();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <View style={styles.topView}>
                    <Text style={styles.followingText}>Followers</Text>
                    <Pressable
                        onPress={() => {
                            navigation.goBack(null);
                        }}
                    >
                        <Ionicons style={styles.backButton} name="arrow-back-outline"></Ionicons>
                    </Pressable>
                </View>
                <ScrollView>
                    {loading && <ActivityIndicator animating={true} size="large" color="#2CCB33" />}
                    {!loading &&
                        followers.map((follower, index) => {
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
                                                initial: false,
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
