import React from "react"
import { Link } from "react-router-dom"


export const DailyReport = ({ dailyReport}) => {
  return (
    <section className="dailyReport">
      <h3 className="dailyReport__title">
        <Link to={`/dailyReport/detail/${dailyReport.id}`}>
          { dailyReport.date }
        </Link>
      </h3>
  </section>
)}
