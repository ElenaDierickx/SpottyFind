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
        if (location) {
            location.latitudeDelta = 0.2;
            location.longitudeDelta = 0.2;
            setLocation(location);
        }
    }

    const locationH = location ? location : { coords: { latitude: 50.8503, longitude: 4.3517 }, latitudeDelta: 2, longitudeDelta: 2 };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <MapView
                showsMyLocationButton={false}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                followUserLocation={true}
                showsUserLocation={true}
                region={{
                    latitude: locationH.coords.latitude,
                    longitude: locationH.coords.longitude,
                    latitudeDelta: locationH.latitudeDelta,
                    longitudeDelta: locationH.longitudeDelta,
                }}
            />

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
