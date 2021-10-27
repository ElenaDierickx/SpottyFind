import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFollowingList } from "../../utils/Firestore";

export function FollowingScreen({ route, navigation }) {
  const { uid, account } = route.params;
  const [following, setFollowing] = useState([]);

  const getFollowing = async () => {
    var following = await getFollowingList(navigation, uid, account);
    setFollowing(following);
  };

  useEffect(() => {
    getFollowing();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.followingText}>Following</Text>
        <View>{following}</View>
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
