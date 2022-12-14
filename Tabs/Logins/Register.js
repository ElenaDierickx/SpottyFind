import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, KeyboardAvoidingView } from "react-native";
import { Button } from "../Components/Button";
import { createUser } from "../../utils/Authorisation";

export function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const onCreate = async () => {
        var error = await createUser(email, password, username);
        if (error) {
            setLoginError(error);
        } else {
            navigation.navigate("Map");
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Image style={styles.logo} source={require("./../../img/logo.png")} />
            </View>
            <View>
                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(email) => setEmail(email)}
                    defaultValue={email}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Username"
                    onChangeText={(username) => setUsername(username)}
                    defaultValue={username}
                    autoCapitalize="none"
                    style={styles.input}
                    maxLength={11}
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    defaultValue={password}
                    style={styles.input}
                    secureTextEntry={true}
                />
                {loginError != "" && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>{loginError}</Text>
                    </View>
                )}
                <Button func={onCreate}>Create</Button>
                <Text style={styles.already}>Already have an account?</Text>
                <Button func={() => navigation.navigate("LoginStack")}>Log in</Button>
            </View>
        </KeyboardAvoidingView>
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
    errorContainer: {
        height: 60,
        width: "95%",
        backgroundColor: "rgba(230, 0, 0, 0.4)",
        alignSelf: "center",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        borderColor: "red",
        borderWidth: 2,
        marginBottom: 10,
    },
    error: {
        color: "white",
        alignSelf: "center",
    },
});
