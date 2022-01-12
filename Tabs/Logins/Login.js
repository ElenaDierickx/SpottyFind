import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert, KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, GoToButton } from "./../Components/Button";
import { loginUser, forgotPassword } from "../../utils/Authorisation";

export function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [passwordReset, setPasswordReset] = useState(null);

    const onLogin = async () => {
        var error = await loginUser(email, password);
        if (error) {
            setLoginError(error);
        } else {
            navigation.navigate("Map");
        }
    };

    const onPasswordReset = async () => {
        var error = await forgotPassword(email);
        if (error) {
            setLoginError(error);
        } else {
            setPasswordReset("An email has been sent to " + email);
            setTimeout(() => {
                setPasswordReset(null);
            }, 3000);
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
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    defaultValue={password}
                    style={styles.input}
                    secureTextEntry={true}
                />
                <Text style={styles.error}>{loginError}</Text>
                <Button func={onLogin}>Log in</Button>
                <Button style={styles.forgot} func={onPasswordReset}>
                    Forgot Password
                </Button>
                <Button
                    func={() => {
                        navigation.navigate("RegisterStack");
                    }}
                >
                    Create new account
                </Button>
            </View>

            {passwordReset && (
                <View style={styles.passwordResetCard}>
                    <Text>{passwordReset}</Text>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    forgot: {
        marginBottom: 50,
        marginTop: 10,
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
    error: {
        color: "red",
        alignSelf: "center",
    },
    passwordResetCard: {
        height: 60,
        width: "95%",
        backgroundColor: "#FFFFFF",
        position: "absolute",
        bottom: 10,
        alignSelf: "center",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
});
