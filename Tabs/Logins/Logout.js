import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button } from "../Components/Button";
import Firebase from "../../Config/Firebase";

export function LogoutScreen({ navigation }) {
  const logOut = async () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        navigation.navigate("LoginStack");
      })
      .catch((error) => {
        console.log(error.msg);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Image style={styles.logo} source={require("./../../img/logo.png")} />
      </View>
      <View>
        <Button func={logOut}>Log Out</Button>
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
