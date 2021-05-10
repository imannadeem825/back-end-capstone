import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../UserProfiles/UserProfileProvider";


export const DailyReportSymptomContext = React.createContext();

export const DailyReportSymptomProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [dailyReportSymptoms, setDailyReportSymptoms] = useState([]);
    /*
        Above line: Array destructoring, useState is returning what is declared 
        in the (), so in this instance it will be returning an array with a 0 
        index and a 1 index. 0 index is the state and 1 index is the function used
        to set state
    */

    const apiUrl = "/api/dailyReportSymptom"

    const getAllDailyReportSymptoms = () => {

        return getToken().then((token) =>
        
        fetch(`${apiUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`}})
        .then(res => res.json())
        .then(setDailyReportSymptoms))
        }

    const getDailyReportSymptomById = (dailyReportSymptomId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/getById/${dailyReportSymptomId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))
    };


    const addDailyReportSymptom = (dailyReportSymptom) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dailyReportSymptom),
            })
        )
    };


    const editDailyReportSymptom = (dailyReportSymptom) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${dailyReportSymptom.id}/edit`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dailyReportSymptom),
            })
        )
    };


    const deleteDailyReportSymptom = (dailyReportSymptomId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/delete/${dailyReportSymptomId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };


    return (
        <DailyReportSymptomContext.Provider value={{
            dailyReportSymptoms, getAllDailyReportSymptoms, getDailyReportSymptomById,
            addDailyReportSymptom, editDailyReportSymptom, deleteDailyReportSymptom
        }}>
            {props.children}
        </DailyReportSymptomContext.Provider>
    );
};