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


    const handleControlledInputChange = (event) => {
        const newDailyReportSymptom = { ...dailyReportSymptom }
        let selectedVal = event.target.value

        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newDailyReportSymptom[event.target.id] = selectedVal
        setDailyReportSymptom(newDailyReportSymptom)
    }


    //for symptom of symptoms 

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



    // const handleCheckboxChange = (event) => {
    //     const newDailyReportSymptom = { ...dailyReportSymptom }
    //     newDailyReportSymptom[event.target.id] = event.target.checked
    //     setDailyReportSymptom(newDailyReportSymptom)
    // }


    const handleCheckboxChange = (event) => {
        
        const newDailyReportSymptom = { ...dailyReportSymptom }
        newDailyReportSymptom[event.target.name] = event.target.checked
         if (event.target.name === ("diarrhea") ) {
            Severity()
         } else {
             return null;
         }
        setDailyReportSymptom(newDailyReportSymptom)
    }

    //ternary if isChecked == true, then display other checkboxes for urgency and comment textarea
    // first hard code options that come up after checkbox click
    // dropdown for urgency instead of checkboxes
    //collapse reactstrap
    // for each (symptom : map) {addCheckbox();} 
    // if checkbox {add div} else {remove div}

    //var checkbox = document.querySelector("input[name=checkbox]");

    /*checkbox.addEventListener('change', function () {
        if (this.checked) {
            console.log("Checkbox is checked..");
        } else {
            console.log("Checkbox is not checked..");
        }
    }); */
    return (

        <form className="dailyReportForm">
            <h2 className="dailyReportForm__title">Record Symptoms</h2>

            {
                symptoms.map(symptom => {
                    console.log(symptoms)
                    return (
                        <div className="form-group">
                            <label htmlFor="">{symptom.name}</label>
                            <input type="checkbox" name="diarrhea" className="checkbox" id="checkbox" onChange={handleCheckboxChange} required autoFocus className="form-control" value={symptom.name} />
                        </div>
                    )
                })
            }

{/* for (symptom of symptoms) */}

            {/* <fieldset className="control">
                <div className="select">
                    <select id="classId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Symptom Severity </option>
                        {symptomDetails.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.severity}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset> */}
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="">1-3 Stools per day:</label>
                    <input type="checkbox" className="checkbox" id="diarrheaUrgency1" onChange={handleCheckboxChange} required autoFocus className="form-control" value={symptom.urgency} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="">3-5 Stools per day:</label>
                    <input type="checkbox" className="checkbox" id="diarrheaUrgency2" onChange={handleCheckboxChange} required autoFocus className="form-control" value={symptom.urgency} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="">5-7 Stools per day:</label>
                    <input type="checkbox" className="checkbox" id="diarrheaUrgency3" onChange={handleCheckboxChange} required autoFocus className="form-control" value={symptom.urgency} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="">Comments:</label>
                    <input type="textarea" className="comment" id="symptomComment" onChange={handleCheckboxChange} required autoFocus className="form-control" value={symptom.urgency} />
                </div>
            </fieldset> */}
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


