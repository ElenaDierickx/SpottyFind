import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Touchable,
  Pressable,
} from "react-native";
import { getMarkerImage } from "../../utils/MapHelper";
import { Ionicons } from "@expo/vector-icons";
import { CardButton } from "./Button";
import Firebase from "../../Config/Firebase";

export function MarkerCard(props) {
  const [image, setImage] = useState(null);

  const imageToLoad = image
    ? { uri: image }
    : require("./../../img/account.png");

  const onRender = async () => {
    const imageTemp = await getMarkerImage(props.marker.id);
    setImage(imageTemp);
  };

  useEffect(() => {
    onRender();
  }, []);

  return (
    <View style={styles.markerCard}>
      <View style={styles.topView}>
        <Text style={styles.title}>{props.marker.title}</Text>
        <Pressable onPress={props.close} style={styles.closeView}>
          <Ionicons style={styles.close} name="close"></Ionicons>
        </Pressable>
      </View>
      <Image style={styles.image} source={imageToLoad} />
      <View style={styles.reviewView}>
        <Text style={styles.score}>5</Text>
        <View style={styles.stars}>
          <Ionicons style={styles.star} name="star"></Ionicons>
          <Ionicons style={styles.star} name="star"></Ionicons>
          <Ionicons style={styles.star} name="star"></Ionicons>
          <Ionicons style={styles.star} name="star"></Ionicons>
          <Ionicons style={styles.star} name="star"></Ionicons>
        </View>
        {Firebase.auth().currentUser && (
          <CardButton style={styles.reviewButton}>Review</CardButton>
        )}
      </View>
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.description}>{props.marker.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  markerCard: {
    height: 460,
    width: "95%",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    borderRadius: 20,
    padding: 20,
    alignContent: "center",
  },
  title: {
    fontSize: 40,
  },
  image: {
    marginTop: 10,
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  descriptionTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {},
  reviewView: {
    flexDirection: "row",

    marginTop: 10,
  },
  score: {
    fontSize: 40,
  },
  stars: {
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: 20,
  },
  star: {
    color: "yellow",
    fontSize: 20,
  },
  reviewButton: {
    alignSelf: "center",
    marginLeft: 30,
    marginTop: 10,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  close: {
    fontSize: 25,
  },
  closeView: {
    alignSelf: "center",
    marginRight: 10,
  },
});
