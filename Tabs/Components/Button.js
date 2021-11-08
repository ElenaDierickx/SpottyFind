import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function Button(props) {
  return (
    <Pressable style={styles.button} onPress={props.func}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </Pressable>
  );
}

export function SmallButton(props) {
  return (
    <Pressable style={styles.smallButton} onPress={props.func}>
      <Text style={styles.smallButtonText}>{props.children}</Text>
    </Pressable>
  );
}

export function CardButton(props) {
  return (
    <Pressable style={[styles.cardButton, props.style]} onPress={props.func}>
      <Text style={styles.smallButtonText}>{props.children}</Text>
    </Pressable>
  );
}

export function LocationButton(props) {
  return (
    <Pressable style={styles.location} onPress={props.onPress}>
      <Ionicons style={styles.buttonIcon} name="locate-outline"></Ionicons>
    </Pressable>
  );
}

export function AddLocationButton(props) {
  return (
    <Pressable style={styles.addLocation} onPress={props.onPress}>
      <Ionicons style={styles.buttonIcon} name="location-outline"></Ionicons>
    </Pressable>
  );
}

export function StatButton(props) {
  return (
    <Pressable style={styles.StatButton} onPress={props.func}>
      <Text style={styles.StatButtonText}>{props.children}</Text>
      <Text style={styles.StatButtonText}>{">"}</Text>
    </Pressable>
  );
}

export function UserButton(props) {
  const imageToLoad = props.img
    ? { uri: props.img }
    : require("./../../img/account.png");

  return (
    <Pressable style={styles.UserButton} onPress={props.func}>
      <Image style={styles.ProfilePicture} source={imageToLoad} />
      <Text style={styles.UserButtonText}>{props.children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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

  location: {
    backgroundColor: "#2CCB33",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    top: 40,
    right: 20,
    position: "absolute",
  },
  addLocation: {
    backgroundColor: "#2CCB33",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    bottom: 40,
    right: 20,
    position: "absolute",
  },
  buttonIcon: {
    fontSize: 30,
    color: "white",
  },

  smallButton: {
    backgroundColor: "#2CCB33",
    borderRadius: 5,
    height: 40,
    width: 100,
    paddingLeft: 5,
    marginBottom: 10,
    justifyContent: "center",
    marginTop: 50,
    alignSelf: "flex-end",
    marginRight: 25,
  },
  cardButton: {
    backgroundColor: "#2CCB33",
    borderRadius: 5,
    height: 40,
    width: 100,
    paddingLeft: 5,
    marginBottom: 10,
    justifyContent: "center",
  },
  smallButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
    color: "#FFFFFF",
  },

  StatButton: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 5,
    marginBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },
  StatButtonText: {
    fontWeight: "bold",
    fontSize: 24,
    alignSelf: "center",
  },

  UserButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  UserButtonText: {
    marginLeft: 20,
    fontSize: 20,
  },

  ProfilePicture: {
    width: 60,
    height: 60,
    marginLeft: 20,
    borderRadius: 100,
  },
});
