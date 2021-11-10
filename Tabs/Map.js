import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View, Dimensions, Alert, Text } from "react-native";
import { LocationButton, AddLocationButton } from "./Components/Button";
import { AddLocationCard } from "./Components/AddLocationCard";
import { getMarkers } from "../utils/MapHelper";
import { MarkerCard } from "./Components/MarkerCard";
import Firebase from "../Config/Firebase";
import { useFocusEffect } from "@react-navigation/native";

export function Map() {
  const [location, setLocation] = useState(null);
  const [addLocationOn, setaddLocationOn] = useState(false);
  const [markers, setMarkers] = useState(null);
  const [markerCard, setMarkerCard] = useState(null);
  const [disabledMap, setDisabledMap] = useState(true);
  var map;

  const gettingMarkers = async () => {
    var markers = await getMarkers();
    setMarkers(markers);
  };

  useFocusEffect(
    React.useCallback(() => {
      getLocation();
      gettingMarkers();
    }, [])
  );

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
        moveOnMarkerPress={false}
        showsMyLocationButton={false}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        followUserLocation={true}
        showsUserLocation={true}
        ref={(ref) => (map = ref)}
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
          markers.map((marker, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.location.coords.latitude,
                  longitude: marker.location.coords.longitude,
                }}
                onPress={() => {
                  if (disabledMap) {
                    let r = {
                      latitude: marker.location.coords.latitude - 0.0035,
                      longitude: marker.location.coords.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    };
                    map.animateToRegion(r, 1000);
                    setMarkerCard(marker);
                  }
                }}
              />
            );
          })}
      </MapView>

      <LocationButton
        onPress={() => {
          getLocation();
          let r = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          map.animateToRegion(r, 1000);
        }}
      />
      {Firebase.auth().currentUser && (
        <AddLocationButton
          onPress={() => {
            setaddLocationOn(true);

            setDisabledMap(false);
            let r = {
              latitude: location.coords.latitude - 0.0035,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            map.animateToRegion(r, 1000);
          }}
        />
      )}

      {addLocationOn && (
        <AddLocationCard
          backFunc={() => {
            setDisabledMap(true);
            setaddLocationOn(false);
          }}
        />
      )}

      {markerCard && disabledMap && (
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
