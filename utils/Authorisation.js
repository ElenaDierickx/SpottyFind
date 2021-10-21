import React from "react";
import Firebase from "../Config/Firebase";

const auth = Firebase.auth();

export const logOut = async () => {
    auth.signOut();
};

export const loginUser = async (email, password) => {
    try {
        if (email !== "" && password !== "") {
            await auth.signInWithEmailAndPassword(email, password).then(() => {
                return false;
            });
        }
    } catch (error) {
        return error.message;
    }
};

export const createUser = async (email, password, username) => {
    try {
        if (email !== "" && password !== "") {
            let user = await auth.createUserWithEmailAndPassword(email, password);
            await Firebase.firestore().collection("users").doc(user.user.uid).set({
                email: user.user.email,
                username: username,
            });
            return false;
        }
    } catch (error) {
        console.log("oopsie");
        console.log(error.message);
        return error.message;
    }
};
