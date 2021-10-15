import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserScreen } from "./User";
import { SearchPeopleScreen } from "./SearchPeople";

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
        </PeopleStack.Navigator>
    );
}
