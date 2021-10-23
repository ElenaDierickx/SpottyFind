import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FollowingScreen } from "../Common/Following";
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
            <AccountStack.Screen
                name="FollowingStack"
                component={FollowingScreen}
                options={{
                    headerShown: false,
                }}
            />
        </AccountStack.Navigator>
    );
}
