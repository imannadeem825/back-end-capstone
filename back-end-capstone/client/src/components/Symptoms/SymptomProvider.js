import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../UserProfiles/UserProfileProvider";


export const SymptomContext = React.createContext();

export const SymptomProvider = (props) => {

    const [symptoms, setSymptoms] = useState([]);
    /*
        Above line: Array destructoring, useState is returning what is declared 
        in the (), so in this instance it will be returning an array with a 0 
        index and a 1 index. 0 index is the state and 1 index is the function used
        to set state
    */


    const getAllSymptoms = () => {
        return (
            fetch(`/api/symptom`)
                .then((res) => res.json())
                .then(setSymptoms));
    };


    return (
        <SymptomContext.Provider value={{
            symptoms, getAllSymptoms
        }}>
            {props.children}
        </SymptomContext.Provider>
    );
};