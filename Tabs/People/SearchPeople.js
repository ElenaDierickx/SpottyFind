import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
                  <UserButton
                    key={i}
                    func={() =>
                      navigation.navigate("UserStack", { uid: doc.id })
                    }
                  >
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

  const getFollowing = async () => {
    console.log("nu");
    var following = [];
    var i = 0;
    var followingData = await Firebase.firestore()
      .collection("following")
      .where("follower", "==", Firebase.auth().currentUser.uid)
      .get();
    followingData.forEach(async (followingData) => {
      var user = await Firebase.firestore()
        .collection("users")
        .doc(followingData.data().following)
        .get();
      console.log(i, ": ", user.data().username);
      following.push(
        <UserButton
          key={i}
          func={() => navigation.navigate("UserStack", { uid: user.id })}
        >
          {user.data().username}
        </UserButton>
      );
      i++;
    });

    console.log("done");
    console.log(following);
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
