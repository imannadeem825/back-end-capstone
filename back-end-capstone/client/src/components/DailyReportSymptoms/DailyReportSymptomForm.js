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




// condition ? exprIfTrue : exprIfFalse

import React, { useContext, useEffect, useState } from "react"
import { SymptomContext } from "../Symptoms/SymptomProvider"
import { DailyReportContext } from "../DailyReports/DailyReportProvider"
import { DailyReportSymptomContext } from "./DailyReportSymptomProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Severity } from "../SymptomDetails/SymptomDetail"



export const DailyReportSymptomForm = () => {

    const { symptoms, symptomDetails, getAllSymptoms, getSymptomDetailsBySymptomId } = useContext(SymptomContext)
    const { getDailyReportById } = useContext(DailyReportContext)
    const { dailyReportSymptoms, getAllDailyReportSymptoms, addDailyReportSymptom } = useContext(DailyReportSymptomContext)
    const { dailyReportId } = useParams()
    const history = useHistory();


    useEffect(() => {
        console.log("get symptoms")
        getAllSymptoms()
    }, [])


    useEffect(() => {
        console.log("get daily report symptoms")
        getAllDailyReportSymptoms()
    }, [])


    const [dailyReportSymptom, setDailyReportSymptom] = useState({
        DailyReportId: "",
        SymptomId: "",
        Comment: false,
        Urgency: ""
    });


    const [checkedSymptoms, setCheckedSymptoms] = useState([])


    const handleCheckboxChangeTwo = (event) => {
        const symptomId = parseInt(event.target.value)
        const idPosition = checkedSymptoms.indexOf(symptomId)
        if (idPosition >= 0) {
            const copy = [...checkedSymptoms]
            copy.splice(idPosition, 1)
            setCheckedSymptoms(copy)
        } else if (idPosition < 0) {
            setCheckedSymptoms([symptomId, ...checkedSymptoms])
        }
    }


    const handleSaveDailyReportSymptoms = (event) => {
        if (dailyReportSymptoms.comment === "" || dailyReportSymptoms.urgency === "" || dailyReportSymptoms.notes === "") {
            window.alert("Please add details of dailyReportSymptom")
        } else {
            addDailyReportSymptom({
                dailyReportId: parseInt(dailyReportId),
                symptomId: dailyReportSymptom.symptomId,
                comment: dailyReportSymptom.comment,
                urgency: dailyReportSymptom.urgency,
            })
                .then(() => history.push("/dailyReport"))
        }
    }


    return (

        <form className="dailyReportForm">
            <h2 className="dailyReportForm__title">Record Symptoms</h2>
            {/* this is mapping over the six symptoms that are displayed before any checkboxes are checked */}
            {
                symptoms.map(symptom => {
                    const symptomId = parseInt(symptom.id)

                    console.log(symptoms)
                    if (checkedSymptoms.includes(symptomId)) {
                        return (<>
                            {/* this returns the label and the checkbox */}
                            <div className="form-group">
                                <label htmlFor="">{symptom.name}</label>
                                <input key={symptom.id} type="checkbox" checked={checkedSymptoms.includes(symptomId)} id="checkbox" onChange={(e) => handleCheckboxChangeTwo(e)} value={symptom.id} />
                            </div>
                            {/* this is the dropdown once checkbox is checked */}
                            <label htmlFor="">Comment</label>
                            <textarea ></textarea>
                            {/* severity is imported from symptom detail module, which is for the dropdown */}
                            <Severity symptomId={symptomId} symptomDetails={symptomDetails} getSymptomDetailsBySymptomId={getSymptomDetailsBySymptomId} />
                        </>
                        )
                    }
                    return (
                        <div className="form-group">
                            <label htmlFor="">{symptom.name}</label>
                            <input key={symptom.id} type="checkbox" checked={checkedSymptoms.includes(symptomId)} id="checkbox" onChange={(e) => handleCheckboxChangeTwo(e)} value={symptom.id} />
                        </div>
                    )
                })
            }



          
        </form>
    )
}


            //     <button className="btn btn-primary"
            //         onClick={event => {
            //             event.preventDefault()
            //             handleSaveSymptom()
            //         }}>
            //         Save Symptom
            // </button>
            // </div>


