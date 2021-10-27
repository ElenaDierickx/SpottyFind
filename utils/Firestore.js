import React from "react";
import Firebase from "../Config/Firebase";
import { UserButton } from "../Tabs/Components/Button";
import { downloadImage } from "./Imaging";

export const getFollowingList = async (navigation, uid, account) => {
  var followingList = [];
  var i = 0;
  var following = await Firebase.firestore()
    .collection("users")
    .doc(uid)
    .collection("following")
    .get();
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
    followingList.push(
      <UserButton
        key={i}
        img={images[i]}
        func={() => {
          if (account) {
            navigation.navigate("People", {
              screen: "UserStack",
              params: {
                uid: result.id,
              },
            });
          } else {
            navigation.push("UserStack", { uid: result.id });
          }
        }}
      >
        {result.data().username}
      </UserButton>
    );
    i++;
  });
  return followingList;
};

export const getFollowersList = async (navigation, uid, account) => {
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
    followerList.push(
      <UserButton
        key={i}
        img={images[i]}
        func={() => {
          if (account) {
            navigation.navigate("People", {
              screen: "UserStack",
              params: {
                uid: user.id,
              },
            });
          } else {
            navigation.push("UserStack", { uid: user.id });
          }
        }}
      >
        {user.data().username}
      </UserButton>
    );
    i++;
  });

  return followerList;
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
      const promises = [];
      users.forEach((user) => {
        const promise = downloadImage(user.id);
        promises.push(promise);
      });
      var images = await Promise.all(promises);
      users.forEach((user) => {
        if (user.id != Firebase.auth().currentUser.uid) {
          usernames.push(
            <UserButton
              key={i}
              img={images[i]}
              func={() => navigation.navigate("UserStack", { uid: user.id })}
            >
              {user.data().username}
            </UserButton>
          );
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
  var following = await Firebase.firestore()
    .collection("users")
    .doc(uid)
    .collection("following")
    .get();
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
    .where(
      "following",
      "==",
      Firebase.firestore().collection("users").doc(uid)
    );
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
