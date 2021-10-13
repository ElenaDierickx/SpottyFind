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
import {
  Button,
  GoToButton,
  SmallButton,
  StatButton,
} from "./../Components/Button";
import Firebase from "../../Config/Firebase";

export function SearchPeopleScreen({ navigation }) {
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    Firebase.database()
      .ref("users")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUsers(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  function AllUsers(props) {
    console.log(props.users);
    let output = [];
    if (props.users) {
      output = Object.entries(props.users).map(([userId, user]) => {
        <View>
          <Text>{user}</Text>
        </View>;
      });
    }

    return output;
  }

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
          <Text>{JSON.stringify(users, null, 2)}</Text>
          <AllUsers users={users} />
        </View>
        <Text style={styles.followingText}>Following:</Text>
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
  },
});
