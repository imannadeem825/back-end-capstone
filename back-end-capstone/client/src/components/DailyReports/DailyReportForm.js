import React, { useContext, useEffect, useState } from "react"
import { SymptomContext } from "../Symptoms/SymptomProvider"
import { DailyReportContext } from "./DailyReportProvider"
import { UserProfileContext } from "../UserProfiles/UserProfileProvider"
import { useHistory, useParams } from 'react-router-dom';

let currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
console.log(currentUser)


export const DailyReportForm = () => {

    const { symptoms, getAllSymptoms } = useContext(SymptomContext)
    const { addDailyReport, getAllDailyReports, getDailyReportById, dailyReportId } = useContext(DailyReportContext)
    const history = useHistory();


    useEffect(() => {
        console.log("get symptoms")
        getAllSymptoms()
    }, [])


    useEffect(() => {

        console.log(dailyReportId)
        if (dailyReportId.id > 0) {
            const accessDailyReportId = dailyReportId.id
            history.push(`/dailyReportSymptomForm/${accessDailyReportId}`)
        }
    }, [dailyReportId])


    const [dailyReport, setDailyReport] = useState({

        userProfileId: currentUser.id,
        date: "2001-05-04"
    });


    console.log(dailyReport, "daily report test")


    const handleSaveDailyReport = (e) => {
        e.preventDefault()
        addDailyReport({
            userProfileId: dailyReport.userProfileId,
            date: dailyReport.date
        })
    }


    return (
        <form className="dailyReportButton">
            <button className="btn btn-primary"
                onClick={
                    handleSaveDailyReport
                }>
                Track My Symptoms
            </button>
        </form>
    )
}


