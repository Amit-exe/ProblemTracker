import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import ProblemTracker from "./Components/ProblemTracker";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/problems"
            element={
              <PrivateRoute>
                <ProblemTracker />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/problems" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
