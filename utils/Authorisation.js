import React from "react";
import Firebase from "../Config/Firebase";

export const logOut = async () => {
    Firebase.auth().signOut();
};
