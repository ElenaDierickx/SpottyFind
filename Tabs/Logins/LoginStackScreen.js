import { RegisterScreen } from "./Register";
import { LoginScreen } from "./Login";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
