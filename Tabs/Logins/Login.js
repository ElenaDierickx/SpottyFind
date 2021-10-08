import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Button, GoToButton } from "./../Components/Button";
import { RegisterScreen } from "./Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Image style={styles.logo} source={require("./../../img/logo.png")} />
      </View>
      <View>
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
        <Button func={() => Alert.alert("Beep")}>Log in</Button>
        <Pressable onPress={() => Alert.alert("Beep")}>
          <Text style={styles.forgotPass}>Forgotten password?</Text>
        </Pressable>
        <Button
          func={() => {
            navigation.navigate("RegisterStack");
          }}
        >
          Create new account
        </Button>
      </View>
    </View>
  );
}

const LoginStack = createNativeStackNavigator();

export function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginStack"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="RegisterStack"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </LoginStack.Navigator>
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
    marginBottom: 50,
  },
  forgotPass: {
    textAlign: "center",
    marginBottom: 50,
  },
});
