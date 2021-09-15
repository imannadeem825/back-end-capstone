import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello"

import { UserProfileContext } from "./UserProfiles/UserProfileProvider"

import { DailyReportProvider } from "./DailyReports/DailyReportProvider"
import { DailyReportForm } from "./DailyReports/DailyReportForm"
import { DailyReportDetails } from "./DailyReports/DailyReportDetails"
import { DailyReportList } from "./DailyReports/DailyReportList"

import { DailyReportSymptomForm } from "./DailyReportSymptoms/DailyReportSymptomForm"

import {CommentEditForm} from "./DailyReportSymptoms/CommentEditForm"

import { SymptomProvider } from "./Symptoms/SymptomProvider";
import { DailyReportSymptomProvider } from "./DailyReportSymptoms/DailyReportSymptomProvider";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>

                {/* DAILY REPORT */}
                <Route exact path="/dailyReport/dailyReportForm">
                    <DailyReportForm />
                </Route>
                <Route exact path="/dailyReport">
                    <DailyReportList />
                </Route>
                <Route exact path="/dailyReport/detail/:dailyReportId(\d+)">
                    <DailyReportDetails />
                </Route>
                <Route  path="/dailyReportSymptom/edit/:dailyReportSymptomId(\d+)" exact>
                    <CommentEditForm />
                </Route>
              

                {/* DAILY REPORT SYMPTOM  */}

                <Route exact path="/dailyReportSymptomForm/:dailyReportId(\d+)">    
                    <DailyReportSymptomForm />  
                </Route>
            </Switch>
        </main>
    )
}