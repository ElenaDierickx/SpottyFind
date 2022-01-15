import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { CardButton } from "./Button";

export function IntroModal(props) {
    const [introPage, setIntroPage] = useState(1);
    return (
        <View style={styles.centeredView}>
            {introPage == 1 && (
                <View style={styles.modalView}>
                    <View>
                        <Text style={styles.IntroTitle}>Welcome to SpottyFind!</Text>
                        <Image style={styles.image} source={require("./../../img/intro1.jpg")} />
                        <Text>Browse the map and find nice spots to hang out.</Text>
                    </View>
                    <View style={[styles.navButtons, styles.right]}>
                        <CardButton
                            func={() => {
                                setIntroPage(2);
                            }}
                        >
                            Next
                        </CardButton>
                    </View>
                </View>
            )}
            {introPage == 2 && (
                <View style={styles.modalView}>
                    <View>
                        <Text style={styles.IntroTitle}>Welcome to SpottyFind!</Text>
                        <Image style={styles.image} source={require("./../../img/intro2.jpg")} />
                        <Text>Press a marker to find out what's there.</Text>
                    </View>
                    <View style={styles.navButtons}>
                        <CardButton
                            func={() => {
                                setIntroPage(1);
                            }}
                        >
                            Back
                        </CardButton>
                        <CardButton
                            func={() => {
                                setIntroPage(3);
                            }}
                        >
                            Next
                        </CardButton>
                    </View>
                </View>
            )}
            {introPage == 3 && (
                <View style={styles.modalView}>
                    <View>
                        <Text style={styles.IntroTitle}>Welcome to SpottyFind!</Text>
                        <Image style={styles.image} source={require("./../../img/intro3.jpg")} />
                        <Text>Log in to add new markers and leave reviews.</Text>
                    </View>
                    <View style={styles.navButtons}>
                        <CardButton
                            func={() => {
                                setIntroPage(2);
                            }}
                        >
                            Back
                        </CardButton>
                        <CardButton
                            func={() => {
                                setIntroPage(4);
                            }}
                        >
                            Next
                        </CardButton>
                    </View>
                </View>
            )}
            {introPage == 4 && (
                <View style={styles.modalView}>
                    <View>
                        <Text style={styles.IntroTitle}>Welcome to SpottyFind!</Text>
                        <Image style={styles.image} source={require("./../../img/intro1.jpg")} />
                        <Text>Follow other users to get notifications and filter on their spots.</Text>
                    </View>
                    <View style={styles.navButtons}>
                        <CardButton
                            func={() => {
                                setIntroPage(3);
                            }}
                        >
                            Back
                        </CardButton>
                        <CardButton func={props.close}>Close</CardButton>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
        height: 700,
        bottom: 30,
        alignSelf: "center",
        justifyContent: "space-between",
        position: "absolute",
    },
    IntroTitle: {
        fontSize: 24,
    },
    image: {
        width: "90%",
        height: 440,
        resizeMode: "stretch",
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
    },
    navButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    right: {
        flexDirection: "row-reverse",
    },
});
