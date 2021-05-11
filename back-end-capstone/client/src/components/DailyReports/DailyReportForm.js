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


