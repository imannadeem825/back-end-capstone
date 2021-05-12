import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { DailyReportContext } from "./DailyReportProvider"



export const DailyReportDetails = () => {

  const { getDailyReportById, deleteDailyReport } = useContext(DailyReportContext)
  const [dailyReport, setDailyReport] = useState({})
  const { dailyReportId } = useParams();
  const history = useHistory();
  

  const handleDelete = () => {
    deleteDailyReport(dailyReport.id)
      .then(() => {
        history.push("/dailyReports")
      })
  }


  useEffect(() => {
    console.log("useEffect", dailyReportId)
    getDailyReportById(dailyReportId)
      .then((response) => {
        setDailyReport(response)
      })
  }, [])

//   const dailyReportsById = dailyReports.filter(dailyReport => dailyReport.id)

//map over dailyReportsById to populate only the symptoms/symptom details the patient saved to daily report
//   dailyReports.map(dailyReport => {
//     const dailyReportId = parseInt(dailyReport.id)
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

  return (
    <section className="dailyReport">
      <h2 className="dailyReport__title">dailyReport Title: {dailyReport.date}</h2>
      <h3 className="symptom__title">Symptoms Reported</h3>
        {/* <div className="feel__title">Feel:</div>
        <div className="feel__text">{dailyReport.feel}</div>
      
      <div className="dailyReport__lyricSummary">
        <div className="lyricSummary__title">Lyric Summary:</div>
        <div className="lyricSummary__text">{dailyReport.lyricSummary}</div>
      </div>
      <div className="dailyReport__startDate">
        <div className="startDate__title">Start Date:</div>
        <div className="startDate__text">{dailyReport.startDate}</div>
      </div>
      <div className="dailyReport__completionDateGoal">
        <div className="completionDate__title">Completion Date Goal:</div>
        <div className="completionDateGoal__text">{dailyReport.completionDateGoal}</div>
      </div>
      <div className="dailyReport__progress">
        <div className="progress__title">Progress:</div>
        <div className="progress__text">{dailyReport.progress}</div>
      </div>
      <div className="dailyReport__productionGoals">
        <div className="productionGoals__title">Production Goals:</div>
        <div className="productionGoals__text"
        
        >{dailyReport.productionGoals}</div>
      </div>
      <div className="dailyReport__cowriters">
        <div className="cowriters__title">Co-writers:</div>
        <div className="cowriters__text">{dailyReport.cowriters}</div>
      </div> */}
      <button onClick={() => {
        history.push(`/dailyReports/edit/${dailyReport.id}`)
      }}>Edit
      </button>
      <button onClick={handleDelete}>Delete Daily Report</button>
    </section>
  )
}

