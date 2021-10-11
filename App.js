import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginStackScreen } from "./Tabs/Logins/LoginStackScreen";
import { Map } from "./Tabs/Map";
import Firebase from "./Config/Firebase";

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState("");

  Firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });
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
        {user && (
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
        )}
        {!user && (
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
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
