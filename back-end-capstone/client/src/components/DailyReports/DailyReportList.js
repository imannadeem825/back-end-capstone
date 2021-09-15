import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { DailyReportContext } from "./DailyReportProvider"
import { DailyReport } from "./DailyReport"



export const DailyReportList = () => {

    const { dailyReports, getAllDailyReports } = useContext(DailyReportContext)
    const history = useHistory()
    let currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

    
    const userProfileId = currentUser.id

    useEffect(() => {
       
        getAllDailyReports()
    }, [])

    const filteredDailyReportsByUser = dailyReports.filter(dailyReport => dailyReport.userProfileId === parseInt(userProfileId))

    return (
        <div className="dailyReports">
          

            <h2 className="dailyReportList__title">Daily Reports</h2>
            {
                filteredDailyReportsByUser.map(dailyReport => {
                    return <DailyReport key={dailyReport.id} dailyReport={dailyReport} />
                })
            }
        </div>
    )
}


//order by most recent at the top, and make the link a readable date in this format dd--mm--yyyy