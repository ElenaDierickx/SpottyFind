import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginStackScreen } from "./Tabs/Logins/Login";
import { Map } from "./Tabs/Map";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map-outline" color={color} size={size}></Ionicons>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person-circle-outline"
                color={color}
                size={size}
              ></Ionicons>
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyASHg7I2UOiCl8qGzB8tUdSjtg37bdWS3U",
  authDomain: "spottyfind.firebaseapp.com",
  databaseURL:
    "https://spottyfind-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spottyfind",
  storageBucket: "spottyfind.appspot.com",
  messagingSenderId: "587867110235",
  appId: "1:587867110235:web:539356700169d66809f87e",
  measurementId: "G-WY0BELDQQY",
};

const app = initializeApp(firebaseConfig);

const styles = StyleSheet.create({});

// Get a reference to the database service
//export const database = getDatabase(app);
