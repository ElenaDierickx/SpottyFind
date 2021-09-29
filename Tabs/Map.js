import { StatusBar } from "expo-status-bar";
import React, { useState, Component, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SearchBar } from "react-native-elements";
import * as Location from "expo-location";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import { LocationButton } from "./Components/Button";

export function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        showsMyLocationButton={false}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        followUserLocation={true}
        showsUserLocation={true}
      />
      <View>
        <LocationButton
          onPress={() => {
            getLocation;
            Alert.alert(location);
          }}
        />
      </View>
    </View>
  );
}

async function getLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }
  let location = await Location.getLastKnownPositionAsync({});
  setLocation(location);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
});
