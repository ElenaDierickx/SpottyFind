import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { getMarkersList } from "../../utils/Firestore";
import { UserButton } from "../Components/Button";

export function SpotsScreen({ route, navigation }) {
    const { uid } = route.params;
    const [markers, setMarkers] = useState([]);

    const getFollowing = async () => {
        var markers = await getMarkersList(uid, navigation);
        setMarkers(markers);
    };

    useEffect(() => {
        getFollowing();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Text style={styles.followingText}>Spots</Text>
                <ScrollView>
                    {markers.map((marker, index) => {
                        return (
                            <UserButton
                                func={() => {
                                    navigation.navigate("Map", {
                                        initialMarker: marker,
                                    });
                                }}
                                key={index}
                                img={marker.image}
                            >
                                {marker.title}
                            </UserButton>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        paddingTop: 50,
    },
    followingText: {
        marginLeft: 20,
        fontWeight: "bold",
        fontSize: 26,
        marginBottom: 20,
    },
});
