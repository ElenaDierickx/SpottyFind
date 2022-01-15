import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Image, KeyboardAvoidingView } from "react-native";
import { CardButton } from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { addLocationImage } from "../../utils/Imaging";
import { addMarker } from "../../utils/MapHelper";

export function AddLocationCard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [errorText, setErrorText] = useState("");
    var imageContent;

    const pressedImage = async () => {
        var tempImage = await addLocationImage();
        setImage(tempImage);
    };

    const create = async () => {
        if (!image) {
            setErrorText("Please add an image");
        } else if (!description || !title) {
            setErrorText("Please fill all fields");
        } else {
            var result = await addMarker(title, image, description);
            if (result == "succes") {
                props.backFunc();
            } else {
                setErrorText(result);
            }
        }
    };

    image
        ? (imageContent = <Image style={styles.image} source={image} />)
        : (imageContent = <Ionicons style={styles.cameraIcon} name="camera-outline"></Ionicons>);

    return (
        <KeyboardAvoidingView style={styles.addLocationCard}>
            <View>
                <TextInput placeholder="Title" onChangeText={(title) => setTitle(title)} defaultValue={title} style={styles.input} maxLength={12} />
                <Pressable
                    onPress={() => {
                        pressedImage();
                    }}
                    style={styles.cameraPlaceholder}
                >
                    {imageContent}
                </Pressable>
                <TextInput
                    placeholder="Description"
                    onChangeText={(description) => setDescription(description)}
                    defaultValue={description}
                    style={styles.description}
                    multiline={true}
                    maxLength={120}
                />
                {errorText != "" && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>{errorText}</Text>
                    </View>
                )}
            </View>
            <View style={styles.buttons}>
                <CardButton func={props.backFunc}>Back</CardButton>
                <CardButton func={create}>Place</CardButton>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    addLocationCard: {
        height: 500,
        width: "95%",
        backgroundColor: "#FFFFFF",
        position: "absolute",
        bottom: 10,
        alignSelf: "center",
        borderRadius: 20,
        padding: 20,
        alignContent: "center",
        justifyContent: "space-between",
    },

    input: {
        backgroundColor: "rgba(231, 231, 231, 0.2)",
        borderRadius: 10,
        height: 40,
        paddingLeft: 5,
        alignSelf: "center",
        width: "95%",
    },
    errorContainer: {
        height: 40,
        width: "95%",
        backgroundColor: "rgba(230, 0, 0, 0.4)",
        alignSelf: "center",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        borderColor: "red",
        borderWidth: 2,
        marginTop: 10,
    },
    error: {
        color: "black",
        alignSelf: "center",
    },
    cameraPlaceholder: {
        backgroundColor: "#C4C4C4",
        height: 150,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
        marginTop: 20,
        justifyContent: "center",
    },
    cameraIcon: {
        fontSize: 50,
        color: "black",
        alignSelf: "center",
    },

    description: {
        backgroundColor: "rgba(231, 231, 231, 0.2)",
        borderRadius: 10,
        height: 120,
        paddingLeft: 5,
        alignSelf: "center",
        width: "95%",
        marginTop: 20,
        textAlignVertical: "top",
        paddingTop: 5,
    },

    buttons: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
    },

    image: {
        height: 150,
        borderRadius: 10,
        width: "100%",
    },
});
