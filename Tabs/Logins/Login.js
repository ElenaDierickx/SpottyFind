import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, GoToButton } from "./../Components/Button";
import { loginUser } from "../../utils/Authorisation";

export function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const onLogin = async () => {
        var error = await loginUser(email, password);
        if (error) {
            setLoginError(error);
        } else {
            navigation.navigate("Map");
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Image style={styles.logo} source={require("./../../img/logo.png")} />
            </View>
            <View>
                <TextInput placeholder="Email" onChangeText={(email) => setEmail(email)} defaultValue={email} style={styles.input} />
                <TextInput
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    defaultValue={password}
                    style={styles.input}
                    secureTextEntry={true}
                />
                <Button func={onLogin}>Log in</Button>
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
        marginBottom: 50,
    },
    forgotPass: {
        textAlign: "center",
        marginBottom: 50,
    },
});
