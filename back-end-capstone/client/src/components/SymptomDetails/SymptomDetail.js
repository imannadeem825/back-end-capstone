import React, { useContext, useEffect, useState } from "react"
import { SymptomContext } from "../Symptoms/SymptomProvider"
import { DailyReportContext } from "../DailyReports/DailyReportProvider"
import { DailyReportSymptomContext } from "../DailyReportSymptoms/DailyReportSymptomProvider"
import { useHistory, useParams } from 'react-router-dom';

export const Severity = () => {

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

    return (

        <fieldset className="control">
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
        </fieldset>
    )

    

}

