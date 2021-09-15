import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { DailyReportContext } from "./DailyReportProvider"
import { DailyReportSymptomContext } from "../DailyReportSymptoms/DailyReportSymptomProvider"
import {DailyReportSymptom}   from "../DailyReportSymptoms/DailyReportSymptom"



export const DailyReportDetails = () => {

    const { getDailyReportById, deleteDailyReport } = useContext(DailyReportContext)
    const { getDailyReportSymptomById, getAllDailyReportSymptoms, dailyReportSymptoms } = useContext(DailyReportSymptomContext)
    const [dailyReport, setDailyReport] = useState({})
    const { dailyReportId } = useParams();
    const history = useHistory();

    
    const handleDailyReportDelete = () => {
        deleteDailyReport(dailyReportId)
        .then(() => {
            history.push("/dailyReport")
        })
    }
    
    // useEffect(() => {
        //     getDailyReportSymptomById()
        // }, [])
        
        useEffect(() => {
            getAllDailyReportSymptoms()
        }, [])
        
        useEffect(() => {
            console.log("useEffect", dailyReportId)
            getDailyReportById(dailyReportId)
            .then((response) => {
                setDailyReport(response)
            })
        }, [])
        
        
        const filteredDailyReportSymptoms = dailyReportSymptoms.filter(dailyReportSymptom => dailyReportSymptom.dailyReportId === parseInt(dailyReportId))
        
        console.log(filteredDailyReportSymptoms, "filtered daily report symptoms")
      
        return (
            <div>
                <h2 className="dailyReport__title">Daily Report: {dailyReport.date}</h2>
              
            {filteredDailyReportSymptoms.map(dailyReportSymptom => (
                <DailyReportSymptom key={dailyReportSymptom.id} dailyReportSymptom={dailyReportSymptom} />
            ))}
            
           
            <button onClick={handleDailyReportDelete}>Delete Daily Report</button>
        </div>
    )
}



// map over dailyreportsymptom objects by dailyReportsById to populate only the symptoms/symptom details the patient saved to daily report
    // get dailyreport by id, then have all dailyreportsymptom objects populate in a list



    // const dailyReportsById = dailyReports.filter(dailyReport => dailyReport.id)

    //   dailyReports.map(dailyReport => {
    //     
    //     if (checkedSymptoms.includes(dailyReportId)) {
    //         return (<>

    //             {/* this returns the symptom name and severity */}
    //             <div className="form-group">
    //                 <label htmlFor="">{symptom.name}</label>
    //                 <div>{symptom.severity}</div>
    //             </div>

    //                {/* this returns the comment}
    //              <div>
    //                  <label htmlFor="">Comment: </label>
    //                  <div>{dailyReportSymptom.comment}</div>
    //             </div>              
    //         </>
    //         )
    //     }
    // })