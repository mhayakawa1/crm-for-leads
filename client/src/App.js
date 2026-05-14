"use client"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import Signup from "./app/signup/page";
import Login from "./app/login/page";
import dashboard from "./app/dashboard/page";
import Error from "./app/error/page";

function App() {
  const fetchData = async () => {
    const url = "http://localhost:5000/api/users";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
    } catch (error) {
      return error;
    }
  };
  fetchData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" Component={dashboard} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="*" Component={Error} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
