import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View, Dimensions, Alert, Text, Picker } from "react-native";
import { LocationButton, AddLocationButton } from "./Components/Button";
import { AddLocationCard } from "./Components/AddLocationCard";
import { deleteMarker, getMarkers } from "../utils/MapHelper";
import { MarkerCard } from "./Components/MarkerCard";
import Firebase from "../Config/Firebase";
import { useFocusEffect } from "@react-navigation/native";
import { createPortal } from "react-dom";

const map = React.createRef();

export function Map({ route, navigation }) {
    const [location, setLocation] = useState(null);
    const [addLocationOn, setaddLocationOn] = useState(false);
    const [markers, setMarkers] = useState(null);
    const [markerCard, setMarkerCard] = useState(null);
    const [disabledMap, setDisabledMap] = useState(true);
    const { initialMarker } = route.params;
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("all");

    const mapToLocation = (location, offset) => {
        var r;
        if (offset) {
            r = {
                latitude: location.coords.latitude - 0.0035,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
        } else {
            r = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
        }

        map.current.animateToRegion(r, 1000);
    };

    const gettingMarkers = async (filter) => {
        if (filter) {
            console.log(filter);
            var markers = await getMarkers(filter);
        } else {
            console.log(selectedFilter);
            var markers = await getMarkers(selectedFilter);
        }
        setMarkers(markers);
    };

    useFocusEffect(
        React.useCallback(() => {
            getLocation();
            gettingMarkers();
        }, [])
    );

    useEffect(() => {
        if (initialMarker != "none" && map) {
            mapToLocation(initialMarker.location, true);
            setMarkerCard(initialMarker);
        }
    }, [initialMarker]);

    async function getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        const isOn = await Location.hasServicesEnabledAsync();
        if (status !== "granted") {
            setErrorMessage("Permission to access location was denied");
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
            return null;
        } else if (!isOn) {
            setErrorMessage("Please turn on your location");
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
            return null;
        } else {
            setErrorMessage(null);
            let location = await Location.getLastKnownPositionAsync({});
            if (location) {
                location.latitudeDelta = 0.2;
                location.longitudeDelta = 0.2;
                setLocation(location);
                return location;
            }
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
                moveOnMarkerPress={false}
                showsMyLocationButton={false}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                followUserLocation={true}
                showsUserLocation={true}
                ref={map}
                initialRegion={{
                    latitude: locationH.coords.latitude,
                    longitude: locationH.coords.longitude,
                    latitudeDelta: locationH.latitudeDelta,
                    longitudeDelta: locationH.longitudeDelta,
                }}
                pitchEnabled={disabledMap}
                zoomEnabled={disabledMap}
                scrollEnabled={disabledMap}
                rotateEnabled={disabledMap}
                onPress={() => {
                    if (addLocationOn) {
                        setaddLocationOn(false);
                        setDisabledMap(true);
                    }
                    if (markerCard) {
                        setMarkerCard(null);
                    }
                }}
            >
                {markers &&
                    markers.map((marker) => {
                        var color = "red";
                        if (Firebase.auth().currentUser) {
                            if (Firebase.auth().currentUser.uid == marker.user.id) {
                                color = "green";
                            }
                        }
                        return (
                            <Marker
                                key={marker.id + color}
                                coordinate={{
                                    latitude: marker.location.coords.latitude,
                                    longitude: marker.location.coords.longitude,
                                }}
                                onPress={() => {
                                    if (disabledMap) {
                                        mapToLocation(marker.location, true);
                                        setMarkerCard(marker);
                                    }
                                }}
                                pinColor={color}
                            />
                        );
                    })}
            </MapView>
            <View style={styles.filterContainer}>
                <Picker
                    selectedValue={selectedFilter}
                    style={styles.filter}
                    itemStyle={styles.filteritem}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedFilter(itemValue);
                        gettingMarkers(itemValue);
                    }}
                >
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label=">4 Stars" value="4stars" />
                    <Picker.Item label=">3 Stars" value="3stars" />
                    {Firebase.auth().currentUser && <Picker.Item label="Following" value="following" />}
                </Picker>
            </View>

            <LocationButton
                onPress={async () => {
                    const location = await getLocation();
                    if (location) {
                        mapToLocation(location, false);
                    }
                }}
            />
            {Firebase.auth().currentUser && (
                <AddLocationButton
                    onPress={async () => {
                        const location = await getLocation();
                        if (location) {
                            setaddLocationOn(true);
                            setDisabledMap(false);
                            mapToLocation(location, true);
                        }
                    }}
                />
            )}
            {addLocationOn && (
                <AddLocationCard
                    backFunc={() => {
                        setDisabledMap(true);
                        setaddLocationOn(false);
                    }}
                    succes={() => {
                        setDisabledMap(true);
                        setaddLocationOn(false);
                        gettingMarkers();
                    }}
                />
            )}
            {markerCard && disabledMap && (
                <MarkerCard
                    marker={markerCard}
                    deleteMarker={() => {
                        setMarkerCard(null);
                        gettingMarkers(selectedFilter);
                        deleteMarker(markerCard.id);
                    }}
                    close={() => {
                        setMarkerCard(null);
                    }}
                    navigation={navigation}
                />
            )}
            {errorMessage && (
                <View style={styles.errorCard}>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
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
    errorCard: {
        height: 60,
        width: "95%",
        backgroundColor: "rgba(230, 0, 0, 0.4)",
        position: "absolute",
        bottom: 10,
        alignSelf: "center",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        borderColor: "red",
        borderWidth: 2,
    },
    errorMessage: {
        color: "white",
        fontSize: 16,
    },
    filter: {
        color: "#FFFFFF",
        width: 140,
        height: 30,
    },
    filteritem: {
        fontWeight: "bold",
    },
    filterContainer: {
        backgroundColor: "#2CCB33",
        width: 140,
        height: 30,
        top: 50,
        left: 20,
        position: "absolute",
        borderRadius: 20,
    },
});
