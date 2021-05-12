// display form: make sure all 6 symptoms show
//     fetch symptoms from API (get all symptoms method), map over them, make a checkbox for each symptom, display button with onClick
// make sure new daily report is saved in back end with userId on it--"track my symptoms" button can direct them to the form, and create the dailyreport object/send to database
// when a checkbox is clicked, state must be updated in form 
// when "save" is clicked, all data must save to back end (x number of records of dailyreportsymptom table)

// read react hook form/watch videos
// const { register, handleSubmit, errors, formState } = useForm()
// register contains data, handleSubmit. console.log register
// instantiate dailyreport object, connect dailyreportform table
// get checkboxes working/returning true and false




import React, { useContext, useEffect, useState } from "react"
import { SymptomContext } from "../Symptoms/SymptomProvider"
import { DailyReportContext } from "../DailyReports/DailyReportProvider"
import { DailyReportSymptomContext } from "./DailyReportSymptomProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Severity } from "../SymptomDetails/SymptomDetail"



export const DailyReportSymptomForm = () => {

    const { symptoms, symptomDetails, getAllSymptoms, getSymptomDetailsBySymptomId } = useContext(SymptomContext)
    const { getDailyReportById } = useContext(DailyReportContext)
    const { addDailyReportSymptom } = useContext(DailyReportSymptomContext)
    const { accessDailyReportId } = useParams()
    const history = useHistory();

    console.log(parseInt(accessDailyReportId))

    useEffect(() => {
        console.log("get symptoms")
        getAllSymptoms()
    }, [])


    const [dailyReportSymptom, setDailyReportSymptom] = useState({
        // DailyReportId: 0,
        // SymptomId: 0,
        // Comment: "",
        // Urgency: 0
    });

    const [dailyReportSymptoms, setDailyReportSymptoms] = useState([])


    const [checkedSymptoms, setCheckedSymptoms] = useState([])


    const handleCheckboxChange = (event) => {
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

    // make array to push new objects to, and save that

    const handleSaveDailyReportSymptoms = (event) => {
        event.preventDefault()

        if (dailyReportSymptoms.comment === "" || dailyReportSymptoms.urgency === 0) {
            window.alert("Please add details about symptom")
        } else {
            let dailyReportSymptoms = newDailyReportSymptoms.filter((i) => i.urgency !== "0")
            addDailyReportSymptom(parseInt(accessDailyReportId), dailyReportSymptoms).then(() => { history.push("/dailyReport") })
        }
    }



    let newDailyReportSymptoms = [...dailyReportSymptoms]

    const urgencyForSymptoms = (symptomId, urgency) => {
        let dailyReportSymptomToEdit = newDailyReportSymptoms.find(d => parseInt(d.symptomId) === (parseInt(symptomId)))

        if (dailyReportSymptomToEdit) {
            let dailyReportSymptomIndex = newDailyReportSymptoms.findIndex((i => i.symptomId === symptomId));
            newDailyReportSymptoms[dailyReportSymptomIndex].urgency = parseInt(urgency)
            setDailyReportSymptoms(newDailyReportSymptoms);

        } else {
            let newDailyReportSymptom = { ...dailyReportSymptom }
            newDailyReportSymptom.DailyReportId = parseInt(accessDailyReportId);
            newDailyReportSymptom.SymptomId = parseInt(symptomId);
            newDailyReportSymptom.Urgency = parseInt(urgency);
            // newDailyReportSymptom.Comment = comment

            newDailyReportSymptoms.push(newDailyReportSymptom);
            setDailyReportSymptoms(newDailyReportSymptoms);
        }
    }

    console.log(newDailyReportSymptoms)



    return (
        <form className="dailyReportForm">
            <h2 className="dailyReportForm__title">Record Symptoms</h2>
            {/* this is mapping over the six symptoms that are displayed before any checkboxes are checked */}
            {
                symptoms.map(symptom => {
                    const symptomId = parseInt(symptom.id)
                    if (checkedSymptoms.includes(symptomId)) {
                        return (<>
                            {/* this returns the label and the checkbox */}
                            <div className="form-group">
                                <label htmlFor="">{symptom.name}</label>
                                <input key={symptom.id} type="checkbox" checked={checkedSymptoms.includes(symptomId)} id="checkbox" onChange={(e) => handleCheckboxChange(e)} value={symptom.id} />
                            </div>
                            {/* this is what appears after checkbox is checked: symptom severity select and comment */}
                            {/* severity is imported from symptom detail module, which is for the dropdown */}
                            <Severity symptomId={symptomId} symptomDetails={symptomDetails} getSymptomDetailsBySymptomId={getSymptomDetailsBySymptomId} handleSelect={urgencyForSymptoms} />
                            <label htmlFor="">Comment</label>
                            <textarea id={symptomId}></textarea>
                        </>
                        )
                    }
                    return (
                        <div className="form-group">
                            <label htmlFor="">{symptom.name}</label>
                            <input key={symptom.id} type="checkbox" checked={checkedSymptoms.includes(symptomId)} id="checkbox" onChange={(e) => handleCheckboxChange(e)} value={symptom.id} />
                        </div>
                    )
                })
            }
            <button className="btn btn-primary"
                onClick={handleSaveDailyReportSymptoms}>
                Save Daily Report
            </button>
        </form>
    )
}



