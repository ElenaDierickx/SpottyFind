import React from "react";
import { createIconSetFromFontello } from "react-native-vector-icons";
import Firebase from "../Config/Firebase";
import { UserButton } from "../Tabs/Components/Button";
import { downloadImage, getMarkerImage } from "./Imaging";
import { sendFollowNotification, sendReviewNotification, sendMarkerNotification } from "./PushNotifications";

export const getFollowingList = async (uid) => {
    var followingList = [];
    var i = 0;
    var following = await Firebase.firestore().collection("users").doc(uid).collection("following").get();

    var promises = [];
    following.forEach((following) => {
        const promise = following.data().following.get();
        promises.push(promise);
    });
    var results = await Promise.all(promises);

    promises = [];
    results.forEach((result) => {
        const promise = downloadImage(result.id);
        promises.push(promise);
    });
    var images = await Promise.all(promises);

    results.map(async (result) => {
        let follow = result.data();
        follow.id = result.id;
        follow.image = images[i];
        followingList.push(follow);
        i++;
    });
    return followingList;
};

export const getFollowersList = async (uid) => {
    var followerList = [];
    var i = 0;
    var promises = [];
    var followers = await Firebase.firestore()
        .collectionGroup("following")
        .where("following", "==", Firebase.firestore().collection("users").doc(uid))
        .get();

    followers.forEach((follower) => {
        const promise = follower.ref.parent.parent.get();
        promises.push(promise);
    });
    var users = await Promise.all(promises);

    promises = [];
    users.forEach((user) => {
        const promise = downloadImage(user.id);
        promises.push(promise);
    });
    var images = await Promise.all(promises);

    users.map((user) => {
        let follower = user.data();
        follower.id = user.id;
        follower.image = images[i];
        followerList.push(follower);
        i++;
    });

    return followerList;
};

export const getUserSearch = async (searchInput) => {
    if (searchInput) {
        var users = await Firebase.firestore()
            .collection("users")
            .where("username", ">=", searchInput)
            .where("username", "<=", searchInput + "\uf8ff")
            .get();
        if (!users.empty) {
            var usernames = [];
            var i = 0;
            const promises = [];
            users.forEach((user) => {
                const promise = downloadImage(user.id);
                promises.push(promise);
            });
            var images = await Promise.all(promises);
            users.forEach((user) => {
                if (user.id != Firebase.auth().currentUser.uid) {
                    var username = user.data();
                    username.id = user.id;
                    username.image = images[i];
                    usernames.push(username);
                }
                i++;
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
    var userObj = user.data();
    userObj.id = user.id;
    return userObj;
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

export const follow = async (uid) => {
    Firebase.firestore()
        .collection("users")
        .doc(Firebase.auth().currentUser.uid)
        .collection("following")
        .add({
            following: Firebase.firestore().collection("users").doc(uid),
        });
    followNotification(uid);
};

export const getMarkersStat = async (uid) => {
    var markers = await Firebase.firestore().collection("markers").where("user", "==", uid).get();
    return markers.size;
};

export const getMarkersList = async (uid) => {
    var markers = await Firebase.firestore().collection("markers").where("user", "==", uid).get();

    var promises = [];
    markers.forEach((marker) => {
        const promise = getMarkerImage(marker.id);
        promises.push(promise);
    });
    var images = await Promise.all(promises);

    var markersList = [];
    var i = 0;
    markers.forEach((marker) => {
        markerWID = marker.data();
        markerWID.id = marker.id;
        markerWID.image = images[i];
        markersList.push(markerWID);
        i++;
    });

    return markersList;
};

export const getReviewAmounts = async (uid) => {
    reviews = await Firebase.firestore().collectionGroup("reviews").where("user", "==", uid).get();
    return reviews.size;
};

export const followNotification = async (uid) => {
    Firebase.firestore().collection("users").doc(uid).collection("notifications").add({
        type: "follow",
        user: Firebase.auth().currentUser.uid,
        seen: false,
        date: Date(),
    });
    const sender = await Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).get();
    const receiver = await Firebase.firestore().collection("users").doc(uid).get();
    if (receiver.data().expoPushToken) {
        sendFollowNotification(sender, receiver);
    }
};

export const reviewNotification = async (markerid) => {
    var marker = await Firebase.firestore().collection("markers").doc(markerid).get();
    Firebase.firestore().collection("users").doc(marker.data().user).collection("notifications").add({
        type: "review",
        user: Firebase.auth().currentUser.uid,
        marker: markerid,
        seen: false,
        date: Date(),
    });
    const sender = await Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).get();
    const receiver = await Firebase.firestore().collection("users").doc(marker.data().user).get();
    if (receiver.data().expoPushToken) {
        sendReviewNotification(sender, receiver, marker.data().title);
    }
};

export const spotNotification = async (markerid) => {
    var marker = await Firebase.firestore().collection("markers").doc(markerid).get();
    const promises = [];
    var followers = await Firebase.firestore()
        .collectionGroup("following")
        .where("following", "==", Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid))
        .get();

    followers.forEach((follower) => {
        const promise = follower.ref.parent.parent.get();
        promises.push(promise);
    });
    const users = await Promise.all(promises);
    const sender = await Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).get();
    users.forEach((user) => {
        Firebase.firestore().collection("users").doc(user.id).collection("notifications").add({
            type: "marker",
            user: Firebase.auth().currentUser.uid,
            marker: markerid,
            seen: false,
            date: Date(),
        });
        if (user.data().expoPushToken) {
            sendMarkerNotification(sender, user, marker.data().title);
        }
    });
};

export const getNotifications = async (uid) => {
    const notifications = await Firebase.firestore().collection("users").doc(uid).collection("notifications").get();
    var notificationsList = [];
    const imagePromises = [];
    const userPromises = [];
    const markerPromises = [];
    notifications.forEach((notification) => {
        userPromises.push(getUser(notification.data().user));
        if (notification.data().type == "follow") {
            imagePromises.push(downloadImage(notification.data().user));
        }
        if (notification.data().type == "review" || notification.data().type == "marker") {
            imagePromises.push(getMarkerImage(notification.data().marker));
            markerPromises.push(getMarker(notification.data().marker));
        }
    });
    var images = await Promise.all(imagePromises);
    var users = await Promise.all(userPromises);
    var markers = await Promise.all(markerPromises);
    var i = 0;
    var j = 0;
    notifications.forEach((notification) => {
        var notificationObj = notification.data();
        notificationObj.id = notification.id;
        notificationObj.image = images[i];
        notificationObj.user = users[i];
        if (notificationObj.type == "review" || notification.data().type == "marker") {
            notificationObj.marker = markers[j];
            j++;
        }
        notificationsList.push(notificationObj);
        i++;
    });
    notificationsList.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    return notificationsList;
};

export const unseenNotifications = async () => {
    const notifications = await Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).collection("notifications").get();
    var unseen = 0;
    notifications.forEach((notification) => {
        if (!notification.data().seen) {
            unseen++;
        }
    });
    return unseen;
};

export const getMarker = async (markerid) => {
    const marker = await Firebase.firestore().collection("markers").doc(markerid).get();
    var markerObj = marker.data();
    markerObj.id = marker.id;
    return markerObj;
};

export const setSeen = async (notifications) => {
    notifications.forEach((notification) => {
        if (!notification.seen) {
            Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).collection("notifications").doc(notification.id).update({
                seen: true,
            });
        }
    });
};
