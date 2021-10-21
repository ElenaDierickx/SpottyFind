import React from "react";
import Firebase from "../Config/Firebase";
import { UserButton } from "../Tabs/Components/Button";

export const getFollowingList = async (navigation) => {
    var followingList = [];
    var i = 0;
    var following = await Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).collection("following").get();
    const promises = [];
    following.forEach((following) => {
        const promise = following.data().following.get();
        promises.push(promise);
    });
    var results = await Promise.all(promises);
    results.map((result) => {
        followingList.push(
            <UserButton key={i} func={() => navigation.navigate("UserStack", { uid: result.id })}>
                {result.data().username}
            </UserButton>
        );
        i++;
    });
    return followingList;
};

export const getUserSearch = async (searchInput, navigation) => {
    if (searchInput) {
        var users = await Firebase.firestore()
            .collection("users")
            .where("username", ">=", searchInput)
            .where("username", "<=", searchInput + "\uf8ff")
            .get();
        if (!users.empty) {
            var usernames = [];
            var i = 0;
            users.forEach((user) => {
                if (user.id != Firebase.auth().currentUser.uid) {
                    usernames.push(
                        <UserButton key={i} func={() => navigation.navigate("UserStack", { uid: user.id })}>
                            {user.data().username}
                        </UserButton>
                    );
                    i++;
                }
            });
            return usernames;
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export const getIsFollowing = async (uid) => {
    following = await Firebase.firestore()
        .collection("users")
        .doc(Firebase.auth().currentUser.uid)
        .collection("following")
        .where("following", "==", Firebase.firestore().collection("users").doc(uid))
        .get();
    if (following.size > 0) {
        return true;
    } else {
        return false;
    }
};

export const getFollowerStat = async (uid) => {
    var followers = await Firebase.firestore()
        .collectionGroup("following")
        .where("following", "==", Firebase.firestore().collection("users").doc(uid))
        .get();
    return followers.size;
};

export const getFollowingStat = async (uid) => {
    var following = await Firebase.firestore().collection("users").doc(uid).collection("following").get();
    return following.size;
};

export const getUser = async (uid) => {
    var user = await Firebase.firestore().collection("users").doc(uid).get();
    return user.data();
};

export const unfollow = (uid) => {
    var query = Firebase.firestore()
        .collection("users")
        .doc(Firebase.auth().currentUser.uid)
        .collection("following")
        .where("following", "==", Firebase.firestore().collection("users").doc(uid));
    query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });
};

export const follow = (uid) => {
    Firebase.firestore()
        .collection("users")
        .doc(Firebase.auth().currentUser.uid)
        .collection("following")
        .add({
            following: Firebase.firestore().collection("users").doc(uid),
        });
};
