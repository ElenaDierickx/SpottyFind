import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginStackScreen } from "./Tabs/Logins/LoginStackScreen";
import { AccountStackScreen } from "./Tabs/User/AccountStackScreen";
import { PeopleStackScreen } from "./Tabs/People/PeopleStackSreen";
import { Map } from "./Tabs/Map";
import Firebase from "./Config/Firebase";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState("");

  Firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  if (user) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Map"
            component={Map}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="map-outline"
                  color={color}
                  size={size}
                ></Ionicons>
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="People"
            component={PeopleStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="people-outline"
                  color={color}
                  size={size}
                ></Ionicons>
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountStackScreen}
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
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Map"
            component={Map}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="map-outline"
                  color={color}
                  size={size}
                ></Ionicons>
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
                  name="log-in-outline"
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
}
