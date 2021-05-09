import logo from './logo.svg';
import './App.css';
import { UserProfileProvider } from './components/UserProfiles/UserProfileProvider';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { DailyReportProvider } from './components/DailyReports/DailyReportProvider';
import { DailyReportSymptomProvider } from './components/DailyReportSymptoms/DailyReportSymptomProvider';
import { SymptomProvider } from './components/Symptoms/SymptomProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        {/* <Header /> */}
        <SymptomProvider>
        <DailyReportProvider>
          <DailyReportSymptomProvider>

            <ApplicationViews />
          </DailyReportSymptomProvider>
        </DailyReportProvider>

        </SymptomProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
