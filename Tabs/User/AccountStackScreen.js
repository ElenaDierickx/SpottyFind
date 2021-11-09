import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FollowingScreen } from "../Common/Following";
import { AccountScreen } from "./Account";
import { FollowersScreen } from "../Common/Followers";
import { SpotsScreen } from "../Common/Spots";

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
            <AccountStack.Screen
                name="FollowersStack"
                component={FollowersScreen}
                options={{
                    headerShown: false,
                }}
            />
            <AccountStack.Screen
                name="SpotsStack"
                component={SpotsScreen}
                options={{
                    headerShown: false,
                }}
            />
        </AccountStack.Navigator>
    );
}
