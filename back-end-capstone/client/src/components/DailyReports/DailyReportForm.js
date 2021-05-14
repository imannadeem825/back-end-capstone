import React, { useContext, useEffect, useState } from "react"
import { SymptomContext } from "../Symptoms/SymptomProvider"
import { DailyReportContext } from "./DailyReportProvider"
import { UserProfileContext } from "../UserProfiles/UserProfileProvider"
import { useHistory, useParams } from 'react-router-dom';



export const DailyReportForm = () => {

    let currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    // console.log(currentUser)

    const { symptoms, getAllSymptoms } = useContext(SymptomContext)
    const { addDailyReport, dailyReportId, setDailyReportId } = useContext(DailyReportContext)
    const history = useHistory();
    

    

    useEffect(() => {
        

        // debugger
      
        getAllSymptoms()
    }, [dailyReportId])


    // setDailyReportId(() => { 

    //     {...dailyReportId}
    //     dailyReportId = 0
        
    // }

    // useEffect(() => {

    //     console.log(dailyReportId)
    //     // debugger
    //     if (dailyReportId.id > 0) {
    //         const accessDailyReportId = dailyReportId.id
    //         history.push(`/dailyReportSymptomForm/${accessDailyReportId}`)
    //     }
    // }, [dailyReportId])


   


    // console.log(dailyReport, "daily report test")


    const handleSaveDailyReport = (e) => {
        e.preventDefault()
        addDailyReport()
        .then((response) => response.json())
        .then((jsonResponse) => {history.push(`/dailyReportSymptomForm/${jsonResponse.id}`)
            // console.log(jsonResponse, "json response")
        })
    }


    return (
        <>{console.log(dailyReportId)}
        <form className="dailyReportButton">
            <button className="btn btn-primary"
                onClick={
                    handleSaveDailyReport
                }>
                Track My Symptoms
            </button>
        </form>
        </>
    )
}


