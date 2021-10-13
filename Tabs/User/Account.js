import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

export function AccountScreen({ navigation }) {
  const [username, setUsername] = useState("");

  Firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      Firebase.database()
        .ref()
        .child("users")
        .child(user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUsername(snapshot.val().username);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  const logOut = async () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        navigation.navigate("Map");
      })
      .catch((error) => {
        console.log(error.msg);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <SmallButton func={logOut}>Log Out</SmallButton>
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
        <StatButton func={logOut}>Spots</StatButton>
        <StatButton func={logOut}>Followers</StatButton>
        <StatButton func={logOut}>Following</StatButton>
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
  statButtons: {
    marginTop: 60,
  },
});