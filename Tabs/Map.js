import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInputComponent,
  View,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export function Map() {
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View></View>
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
    backgroundColor: "#E7E7E7",
    borderRadius: 5,
    height: 50,
  },
});
