import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserScreen } from "./User";
import { SearchPeopleScreen } from "./SearchPeople";
import { FollowingScreen } from "../Common/Following";
import { FollowersScreen } from "../Common/Followers";

const PeopleStack = createNativeStackNavigator();

export function PeopleStackScreen() {
    return (
        <PeopleStack.Navigator>
            <PeopleStack.Screen
                name="PeopleStack"
                component={SearchPeopleScreen}
                options={{
                    headerShown: false,
                }}
            />
            <PeopleStack.Screen
                name="UserStack"
                component={UserScreen}
                options={{
                    headerShown: false,
                }}
            />
            <PeopleStack.Screen
                name="FollowingStack"
                component={FollowingScreen}
                options={{
                    headerShown: false,
                }}
            />
            <PeopleStack.Screen
                name="FollowersStack"
                component={FollowersScreen}
                options={{
                    headerShown: false,
                }}
            />
        </PeopleStack.Navigator>
    );
}
