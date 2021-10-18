import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert,
  VirtualizedList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  GoToButton,
  SmallButton,
  StatButton,
} from "./../Components/Button";
import Firebase from "../../Config/Firebase";

export function UserScreen({ route, navigation }) {
  const { uid } = route.params;
  const [username, setUsername] = useState("");
  const [account, setAccount] = useState("");
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    Firebase.firestore()
      .collection("following")
      .where("follower", "==", Firebase.auth().currentUser.uid)
      .where("following", "==", uid)
      .get()
      .then((doc) => {
        if (doc.size > 0) {
          setFollowing(true);
        }
      });
    setAccount(Firebase.auth().currentUser.uid);
    if (uid) {
      Firebase.firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc) {
            setUsername(doc.data().username);
          }
        });
    }
  }, []);

  const followUser = async () => {
    if (following) {
      var query = Firebase.firestore()
        .collection("following")
        .where("follower", "==", Firebase.auth().currentUser.uid)
        .where("following", "==", uid);
      query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
        setFollowing(false);
      });
    } else {
      Firebase.firestore()
        .collection("following")
        .add({
          follower: account,
          following: uid,
        })
        .then(() => setFollowing(true));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <SmallButton func={followUser}>
          {!following && "Follow"}
          {following && "Unfollow"}
        </SmallButton>
        <Image
          style={styles.logo}
          source={require("./../../img/account.png")}
        />
      </View>
      <Text style={styles.username}>{username}</Text>

      <View style={styles.stats}>
        <View>
          <Text style={styles.statNumber}>23</Text>
          <Text style={styles.statText}>Spots</Text>
        </View>
        <View>
          <Text style={styles.statNumber}>23</Text>
          <Text style={styles.statText}>Followers</Text>
        </View>
        <View>
          <Text style={styles.statNumber}>23</Text>
          <Text style={styles.statText}>Following</Text>
        </View>
        <View>
          <Text style={styles.statNumber}>23</Text>
          <Text style={styles.statText}>Reviews</Text>
        </View>
      </View>
      <View style={styles.statButtons}>
        <StatButton func={followUser}>Spots</StatButton>
        <StatButton func={followUser}>Followers</StatButton>
        <StatButton func={followUser}>Following</StatButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  logo: {
    alignSelf: "center",
    width: 150,
    height: 150,
    marginTop: 20,
  },
  username: {
    textAlign: "center",
    fontSize: 36,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  statNumber: {
    textAlign: "center",
    fontSize: 28,
  },
  statText: {
    textAlign: "center",
    fontSize: 16,
  },
  statButtons: { marginTop: 60 },
});
