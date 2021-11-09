import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View, Dimensions, Alert, Text } from "react-native";
import { LocationButton, AddLocationButton } from "./Components/Button";
import { AddLocationCard } from "./Components/AddLocationCard";
import { getMarkers } from "../utils/MapHelper";
import { MarkerCard } from "./Components/MarkerCard";

export function Map() {
    const [location, setLocation] = useState(null);
    const [addLocationOn, setaddLocationOn] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [markerCard, setMarkerCard] = useState(null);

    const gettingMarkers = async () => {
        var markers = await getMarkers();
        var index = 0;
        var markerlist = [];

        markers.forEach((marker) => {
            markerlist.push(
                <Marker
                    key={index}
                    coordinate={{
                        latitude: marker.data().location.coords.latitude,
                        longitude: marker.data().location.coords.longitude,
                    }}
                    title={marker.data().title}
                    description={marker.data().description}
                    onPress={() => {
                        setMarkerCard(marker);
                    }}
                />
            );
            index++;
        });

        setMarkers(markerlist);
    };

    useEffect(() => {
        getLocation();

        gettingMarkers();
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

    const locationH = location
        ? location
        : {
              coords: { latitude: 50.8503, longitude: 4.3517 },
              latitudeDelta: 2,
              longitudeDelta: 2,
          };

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
                onPress={() => {
                    if (addLocationOn) {
                        setaddLocationOn(false);
                    }
                    if (markerCard) {
                        setMarkerCard(null);
                    }
                }}
            >
                {markers}
            </MapView>

            <LocationButton
                onPress={() => {
                    getLocation();
                }}
            />

            <AddLocationButton
                onPress={() => {
                    setaddLocationOn(true);
                }}
            />

            {addLocationOn && (
                <AddLocationCard
                    backFunc={() => {
                        setaddLocationOn(false);
                    }}
                />
            )}

            {markerCard && (
                <MarkerCard
                    marker={markerCard}
                    close={() => {
                        setMarkerCard(null);
                    }}
                />
            )}
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
