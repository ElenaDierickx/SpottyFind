import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert, VirtualizedList } from "react-native";
import Firebase from "../../Config/Firebase";
import { useFocusEffect } from "@react-navigation/native";
import { getFollowingList, getUserSearch } from "../../utils/Firestore";
import { UserButton } from "../Components/Button";

export function SearchPeopleScreen({ navigation }) {
    const [searchInput, setSearchInput] = useState("");
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]);

    const getSearch = async () => {
        var users = await getUserSearch(searchInput);
        setUsers(users);
    };

    useEffect(() => {
        getSearch();
    }, [searchInput]);

    const getFollowing = async () => {
        var following = await getFollowingList(Firebase.auth().currentUser.uid);
        setFollowing(following);
    };

    useFocusEffect(
        React.useCallback(() => {
            getFollowing();
        }, [])
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <TextInput
                    placeholder="Search other users"
                    onChangeText={(searchInput) => setSearchInput(searchInput)}
                    defaultValue={searchInput}
                    style={styles.input}
                />
                <View>
                    {users &&
                        users.map((user, index) => {
                            return (
                                <UserButton key={index} img={user.image} func={() => navigation.navigate("UserStack", { uid: user.id })}>
                                    {user.username}
                                </UserButton>
                            );
                        })}
                </View>
                <Text style={styles.followingText}>Following</Text>
                <View>
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
                                    } else {
                                        navigation.navigate("UserStack", { uid: follow.id });
                                    }
                                }}
                            >
                                {follow.username}
                            </UserButton>
                        );
                    })}
                </View>
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
    input: {
        backgroundColor: "rgba(231, 231, 231, 0.2)",
        borderRadius: 5,
        height: 50,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 5,
    },
    followingText: {
        marginLeft: 20,
        fontWeight: "bold",
        fontSize: 26,
        marginBottom: 20,
    },
});
