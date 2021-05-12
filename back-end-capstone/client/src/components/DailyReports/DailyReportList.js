import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { DailyReportContext } from "./DailyReportProvider"
import { DailyReport } from "./DailyReport"



export const DailyReportList = () => {

    const { dailyReports, getAllDailyReports } = useContext(DailyReportContext)
    const history = useHistory()
    let currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    console.log(currentUser)

    useEffect(() => {
        console.log("DailyReportList: useEffect - getDailyReports")
        getAllDailyReports()
    }, [])

    const filteredDailyReportsByUser = dailyReports.filter(dailyReport => dailyReport.currentUser === parseInt(currentUser))

    return (
        <div className="dailyReports">
            {console.log("DailyReportList: Render", dailyReports)}

            <h2 className="dailyReportList__title">Daily Reports</h2>
            {
                filteredDailyReportsByUser.map(dailyReport => {
                    return <DailyReport key={dailyReport.id} dailyReport={dailyReport} />
                })
            }
        </div>
    )
}
