import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  TextInputComponent,
  View,
  Dimensions,
} from "react-native";

export function Map() {
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
