import React, { useContext, useEffect, useState } from "react"
import { SymptomContext } from "../Symptoms/SymptomProvider"
import { DailyReportContext } from "../DailyReports/DailyReportProvider"
import { DailyReportSymptomContext } from "../DailyReportSymptoms/DailyReportSymptomProvider"
import { useHistory, useParams } from 'react-router-dom';

//this module is for the symptom severity dropdown (appears once a symptom is checked)
// it displays the severity text for the user to see in the dropdown rather than an id

export const Severity = ({symptomId, getSymptomDetailsBySymptomId}) => {
    const [symptomDetails, setSymptomDetails] = useState([])

    useEffect(() => {
        console.log("symptom details")
        getSymptomDetailsBySymptomId(symptomId).then(setSymptomDetails)
    }, [])


    if (symptomId === 1) {
     
        
    return (

        <fieldset className="control">
            <div className="select"> Mouth Sores
                <select id="classId" className="form-control" 
                // onChange={handleControlledInputChange}
                >
                    <option value="0">Symptom Severity </option>
                    {symptomDetails.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.severity}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
    )
    } else if (symptomId === 2) {
        
    return (

        <fieldset className="control">
            <div className="select"> Vomiting
                <select id="classId" className="form-control" 
                // onChange={handleControlledInputChange}
                >
                    <option value="0">Symptom Severity </option>
                    {symptomDetails.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.severity}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
    )
    } else if (symptomId === 3 ) {
        
    return (

        <fieldset className="control">
            <div className="select"> Nausea
                <select id="classId" className="form-control" 
                // onChange={handleControlledInputChange}
                >
                    <option value="0">Symptom Severity </option>
                    {symptomDetails.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.severity}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
    )
    } else if (symptomId === 4) {
        
    return (

        <fieldset className="control">
            <div className="select"> Fever
                <select id="classId" className="form-control" 
                // onChange={handleControlledInputChange}
                >
                    <option value="0">Symptom Severity </option>
                    {symptomDetails.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.severity}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
    )
    } else if (symptomId === 5) {
        
    return (

        <fieldset className="control">
            <div className="select"> Diarrhea
                <select id="classId" className="form-control" 
                // onChange={handleControlledInputChange}
                >
                    <option value="0">Symptom Severity </option>
                    {symptomDetails.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.severity}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
    )
    } else {
        
    return (

        <fieldset className="control">
            <div className="select"> Pain
                <select id="classId" className="form-control" 
                // onChange={handleControlledInputChange}
                >
                    <option value="0">Symptom Severity </option>
                    {symptomDetails.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.severity}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
    )
    }



    

}

