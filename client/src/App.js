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
import Dashboard from "./app/dashboard/page";
import EditStatuses from "./app/edit-statuses/page";
import Details from "./app/details/[id]/page";
import Analytics from "./app/analytics/page";
import Email from "./app/email/page";
import Error from "./app/error/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/edit-statuses" Component={EditStatuses} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/details/*" Component={Details} />
        <Route path="/analytics" Component={Analytics} />
        <Route path="/email" Component={Email} />
        <Route path="*" Component={Error} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
