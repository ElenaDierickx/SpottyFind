import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFollowersList } from "../../utils/Firestore";

export function FollowersScreen({ route, navigation }) {
    const { uid } = route.params;
    const [followers, setFollowers] = useState([]);

    const getFollowers = async () => {
        var followers = await getFollowersList(navigation, uid);
        setFollowers(followers);
    };

    useEffect(() => {
        getFollowers();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Text style={styles.followingText}>Following</Text>
                <View>{followers}</View>
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
