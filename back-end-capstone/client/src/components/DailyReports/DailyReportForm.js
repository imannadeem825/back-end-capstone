// display form: make sure all 6 symptoms show
//     fetch symptoms from API (get all symptoms method), map over them, make a checkbox for each symptom, display button with onClick
// make sure new daily report is saved in back end with userId on it--"track my symptoms" button can direct them to the form, and create the dailyreport object/send to database
// when a checkbox is clicked, state must be updated in form 
// when "save" is clicked, all data must save to back end (x number of records of dailyreportsymptom table)
// 

// read react hook form/watch videos
// const { register, handleSubmit, errors, formState } = useForm()
// register contains data, handleSubmit. console.log register
// instantiate dailyreport object, connect dailyreportform table
// get checkboxes working/returning true and false
// 


import React, { useContext, useEffect, useState } from "react"
import { SymptomContext } from "../Symptoms/SymptomProvider"
import { DailyReportContext } from "./DailyReportProvider"
import { UserProfileContext } from "../UserProfiles/UserProfileProvider"
import { useHistory, useParams } from 'react-router-dom';

const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));



export const DailyReportForm = () => {

    const { symptoms, getAllSymptoms } = useContext(SymptomContext)
    const { addDailyReport, getAllDailyReports, getDailyReportById } = useContext(DailyReportContext)
    const { dailyReportId } = useParams()
    const history = useHistory();

    useEffect(() => {
        console.log("get symptoms")
        getAllSymptoms()
    }, [])


    const [dailyReport, setDailyReport] = useState({
        UserId: currentUser.id,
        Date: "",
    });


    const handleSaveDailyReport= (event) => {
        if (dailyReport.date === "") {
            window.alert("Please add details of dailyReport")
        } else {
            addDailyReport({
                userId: currentUser.id,
                date: dailyReport.date,
            })
                .then(() => history.push("/dailyReportSymptom/create"))
        }
    }

    useEffect(() => {
        getAllDailyReports().then(() => {
            if (dailyReportId) {
                getDailyReportById(dailyReportId)
                    .then(dailyReport => {
                        setDailyReport(dailyReport)
                    })
            }
        })
    }, [])



    return (
        <form className="dailyReportButton">
            <button className="btn btn-primary"
                onClick={event => {
                    event.preventDefault()
                    handleSaveDailyReport()
                }}>
                Track My Symptoms
            </button>
        </form>
    )
}


