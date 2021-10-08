import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View, Dimensions, Alert, Text } from "react-native";
import { LocationButton } from "./Components/Button";

export function Map() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        getLocation();
    }, []);

    async function getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }
        let location = await Location.getLastKnownPositionAsync({});
        setLocation(location);
        console.log("oof");
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {location && (
                <MapView
                    showsMyLocationButton={false}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    followUserLocation={true}
                    showsUserLocation={true}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                />
            )}
            <LocationButton
                onPress={() => {
                    getLocation();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    map: {
        flex: 1,
        zIndex: -1,
    },
});
