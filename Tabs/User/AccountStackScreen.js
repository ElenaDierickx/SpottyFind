import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AccountScreen } from "./Account";

const AccountStack = createNativeStackNavigator();

export function AccountStackScreen() {
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen
                name="AccountStack"
                component={AccountScreen}
                options={{
                    headerShown: false,
                }}
            />
        </AccountStack.Navigator>
    );
}
