import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header"

import { UserProfileProvider } from './components/UserProfiles/UserProfileProvider';
import { DailyReportProvider } from './components/DailyReports/DailyReportProvider';
import { DailyReportSymptomProvider } from './components/DailyReportSymptoms/DailyReportSymptomProvider';
import { SymptomProvider } from './components/Symptoms/SymptomProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <SymptomProvider>
        <DailyReportProvider>
          <DailyReportSymptomProvider>
            <Header />
            <ApplicationViews />
          </DailyReportSymptomProvider>
        </DailyReportProvider>
        </SymptomProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
