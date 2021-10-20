import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert, VirtualizedList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserButton } from "./../Components/Button";
import Firebase from "../../Config/Firebase";
import { useFocusEffect } from "@react-navigation/native";

export function SearchPeopleScreen({ navigation }) {
    const [searchInput, setSearchInput] = useState("");
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        if (searchInput) {
            Firebase.firestore()
                .collection("users")
                .where("username", ">=", searchInput)
                .where("username", "<=", searchInput + "\uf8ff")
                .get()
                .then((doc) => {
                    if (!doc.empty) {
                        var usernames = [];
                        var i = 0;
                        doc.forEach((doc) => {
                            if (doc.id != Firebase.auth().currentUser.uid)
                                usernames.push(
                                    <UserButton key={i} func={() => navigation.navigate("UserStack", { uid: doc.id })}>
                                        {doc.data().username}
                                    </UserButton>
                                );
                            i++;
                        });
                        setUsers(usernames);
                    } else {
                        setUsers();
                    }
                });
        } else {
            setUsers();
        }
    }, [searchInput]);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         console.log("fff");
    //         var following = [];
    //         var i = 0;
    //         Firebase.firestore()
    //             .collection("users")
    //             .doc(Firebase.auth().currentUser.uid)
    //             .collection("following")
    //             .get()
    //             .then((doc) => {
    //                 doc.forEach((doc) => {
    //                     doc.data()
    //                         .following.get()
    //                         .then((res) => {
    //                             promises.push(promise);
    //                             following.push(
    //                                 <UserButton key={i} func={() => navigation.navigate("UserStack", { uid: res.id })}>
    //                                     {res.data().username}
    //                                 </UserButton>
    //                             );
    //                             console.log(res.data().username);
    //                         });
    //                     i++;
    //                 });
    //             });
    //     }, [])
    // );

    useFocusEffect(
        React.useCallback(() => {
            var following = [];
            var i = 0;
            Firebase.firestore()
                .collection("users")
                .doc(Firebase.auth().currentUser.uid)
                .collection("following")
                .get()
                .then((doc) => {
                    const promises = [];
                    doc.forEach((doc) => {
                        const promise = doc.data().following.get();
                        promises.push(promise);
                    });
                    Promise.all(promises).then((results) => {
                        results.map((result) => {
                            following.push(
                                <UserButton key={i} func={() => navigation.navigate("UserStack", { uid: result.id })}>
                                    {result.data().username}
                                </UserButton>
                            );
                        });
                        setFollowing(following);
                    });
                });
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
                <View>{users}</View>
                <Text style={styles.followingText}>Following</Text>
                <View>{following}</View>
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
