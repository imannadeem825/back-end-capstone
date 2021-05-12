import React, { useContext, useEffect, useState } from "react"
import { SymptomContext } from "../Symptoms/SymptomProvider"
import { DailyReportContext } from "../DailyReports/DailyReportProvider"
import { DailyReportSymptomContext } from "../DailyReportSymptoms/DailyReportSymptomProvider"
import { useHistory, useParams } from 'react-router-dom';

// this module is for the symptom severity dropdown (appears once a symptom is checked)
// it displays the severity text for the user to see in the dropdown rather than an id

export const Severity = ({ symptomId, getSymptomDetailsBySymptomId, handleSelect }) => {

    const [symptomDetails, setSymptomDetails] = useState([])

    const taco = symptomDetails.symptomDetails
    console.log(taco)

    useEffect(() => {
        console.log(getSymptomDetailsBySymptomId, "symptom details")
        getSymptomDetailsBySymptomId(symptomId).then(setSymptomDetails)
    }, [])

    console.log(symptomDetails)

    if (symptomId === 1) {

        return taco ? (
            <fieldset className="control">
                <div className="select">
                    <select id="classId" className="form-control"
                        onChange={(e) => {
                            handleSelect(`${symptomId}`, e.target.value);
                        }}
                    >
                        <option value="0">Symptom Severity </option>
                        {taco.map(s => (
                            <option key={s.id} value={s.urgencyLevel}>
                                {s.severity}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        ) : null;

    } else if (symptomId === 2) {

        return taco ? (

            <fieldset className="control">
                <div className="select">
                    <select id="classId" className="form-control"
                        onChange={(e) => {
                            handleSelect(`${symptomId}`, e.target.value);
                        }}
                    >
                        <option value="0">Symptom Severity </option>
                        {taco.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.severity}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        ) : null
    } else if (symptomId === 3) {

        return taco ? (

            <fieldset className="control">
                <div className="select">
                    <select id="classId" className="form-control"
                        onChange={(e) => {
                            handleSelect(`${symptomId}`, e.target.value);
                        }}
                    >
                        <option value="0">Symptom Severity </option>
                        {taco.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.severity}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        ) : null
    } else if (symptomId === 4) {

        return taco ? (

            <fieldset className="control">
                <div className="select">
                    <select id="classId" className="form-control"
                        onChange={(e) => {
                            handleSelect(`${symptomId}`, e.target.value);
                        }}
                    >
                        <option value="0">Symptom Severity </option>
                        {taco.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.severity}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        ) : null
    } else if (symptomId === 5) {

        return taco ? (

            <fieldset className="control">
                <div className="select">
                    <select id="classId" className="form-control"
                       onChange={(e) => {
                        handleSelect(`${symptomId}`, e.target.value);
                    }}
                    >
                        <option value="0">Symptom Severity </option>
                        {taco.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.severity}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        ) : null
    } else {

        return taco ? (

            <fieldset className="control">
                <div className="select">
                    <select id="classId" className="form-control"
                        onChange={(e) => {
                            handleSelect(`${symptomId}`, e.target.value);
                        }}
                    >
                        <option value="0">Symptom Severity </option>
                        {taco.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.severity}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        ) : null
    }
}

