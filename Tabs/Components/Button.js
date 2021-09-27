import React, { useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";

export function Buttona(props) {
  return (
    <Pressable style={styles.button} onPress={props.func}>
      <Text style={styles.buttonText}>{props.children}</Text>
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
});
