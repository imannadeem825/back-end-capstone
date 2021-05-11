import React, { useState, createContext, useContext } from "react";
import { DailyReportSymptomProvider } from "../DailyReportSymptoms/DailyReportSymptomProvider";
import { UserProfileContext } from "../UserProfiles/UserProfileProvider";


export const DailyReportContext = React.createContext();

export const DailyReportProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
   
    const [dailyReports, setDailyReports] = useState([]);
    const [dailyReportId, setDailyReportId] = useState(0) 
    /*
        Above line: Array destructoring, useState is returning what is declared 
        in the (), so in this instance it will be returning an array with a 0 
        index and a 1 index. 0 index is the state and 1 index is the function used
        to set state
    */

    const apiUrl = "/api/dailyReport"

    const getAllDailyReports = () => {

        return getToken().then((token) =>

            fetch(`${apiUrl}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(setDailyReports))
    }

    const getDailyReportById = (dailyReportId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/getById/${dailyReportId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))
    };


    const addDailyReport = (dailyReport) => {
        return getToken().then((token) =>
            fetch(`/api/DailyReport`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dailyReport),
            })
                .then((response) => response.json())
                .then((jsonResponse) => {
                    setDailyReportId(jsonResponse)
                }))
    }


    const deleteDailyReport = (dailyReportId) => {
        return getToken().then((token) =>
            fetch(`/dailyReport/delete/${dailyReportId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };


    return (
        <DailyReportContext.Provider value={{
            dailyReports, getAllDailyReports, getDailyReportById,
            addDailyReport, deleteDailyReport, dailyReportId
        }}>
            {props.children}
        </DailyReportContext.Provider>
    );
};