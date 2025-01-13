import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import EntryPage from "./components/EntryPage";
import ViewPage from "./components/ViewPage"; // Import the ViewPage component
import './index.css';
import Authentication from "./components/Authentication";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "./PageNotFound";
import Logo from "./components/Logo";

const App = () => {
  return (
    <Router>
      <div>
        {/* Main App Layout */}
        <header >
          <Logo />
        </header>
        <main className="p-4">
          {/* Conditional rendering for login/signup buttons or routes */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Authentication />} />

            {/* Private Routes wrapped with PrivateRoute */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/entry"
              element={
                <PrivateRoute>
                  <EntryPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/view"
              element={
                <PrivateRoute>
                  <ViewPage />
                </PrivateRoute>
              }
            />

            {/* Catch-all Route for Page Not Found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
