import logo from './logo.svg';
import './App.css';
import { UserProfileProvider } from './components/UserProfiles/UserProfileProvider';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        {/* <Header /> */}
        <ApplicationViews />
      </UserProfileProvider>
    </Router>
  );
}

export default App;
