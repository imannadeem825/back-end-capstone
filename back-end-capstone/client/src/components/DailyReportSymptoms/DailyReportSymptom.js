import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';


export const DailyReportSymptom = ({ dailyReportSymptom }) => {
    console.log(dailyReportSymptom, "dailyreportsymptom object")
    const history = useHistory()
    const [comment, setComment] = useState({})
    return (
        <section className="dailyReportSymptom">
            <div className="form-group">
                {/* <label htmlFor="">{dailyReportSymptom.symptom.name}</label> */}

            </div>
            <div>
                <h3>{dailyReportSymptom.symptom.name} </h3>
                <div>Comment: {dailyReportSymptom.comment}</div>
                
                <button onClick={() => {
                    history.push(`/dailyReportSymptom/edit/${dailyReportSymptom.id}`)
                }}>Edit
                </button>
                
            </div>
        </section>
    )
}


//if (dailyReportSymptom.symptomId === symptomId) {return symptom.name} 