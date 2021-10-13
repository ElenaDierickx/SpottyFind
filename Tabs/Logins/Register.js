import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { Button } from "../Components/Button";
import Firebase from "../../Config/Firebase";

const auth = Firebase.auth();
const database = Firebase.database();

export function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const onCreate = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            database.ref("users/" + user.user.uid).set({
              email: user.user.email,
              uid: user.user.uid,
              username: username,
            });
            navigation.navigate("Map");
          });
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Image style={styles.logo} source={require("./../../img/logo.png")} />
      </View>
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          defaultValue={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          onChangeText={(username) => setUsername(username)}
          defaultValue={username}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          defaultValue={password}
          style={styles.input}
          secureTextEntry={true}
        />
        <Button func={onCreate}>Create</Button>
        <Text style={styles.already}>Already have an account?</Text>
        <Button func={() => navigation.navigate("LoginStack")}>Log in</Button>
        <Text>{loginError}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  navbar: {
    justifyContent: "space-evenly",
    flexDirection: "row",
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
  button: {
    backgroundColor: "#2CCB33",
    borderRadius: 5,
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 5,
    marginBottom: 10,
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 24,
    alignSelf: "center",
    color: "#FFFFFF",
  },
  logo: {
    alignSelf: "center",
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  already: {
    textAlign: "center",
    marginTop: 20,
  },
});
