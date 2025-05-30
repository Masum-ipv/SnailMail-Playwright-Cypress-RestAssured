import { useState } from "react";
import "./App.css";
import { Inbox } from "./components/Inbox";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProfile } from "./components/UserProfile";
import { ErrorPage } from "./components/ErrorPage";
import { Login } from "./components/Login";

//Welcome to App.tsx! This is the main component of our React App
//Any other components we create will rendered here before they are visible
function App() {
  {
    /* the return() of a component is just the view. what the component looks like */
  }
  return (
    <div>
      <BrowserRouter>
        {/* Simple Top Navbar */}
        <nav className="border-bottom mb-5">
          <h2 className="font-monospace">🐌 SnailMail 🐌</h2>
        </nav>

        {/* Routes - these components will only render when their endpoint is in the URL */}
        <Routes>
          <Route path="/" element={<Login />} />{" "}
          {/* This component renders by default */}
          <Route path="profile" element={<UserProfile />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="*" element={<ErrorPage />} />{" "}
          {/* This component renders for any URL endpoint that isn't listen in the Routes */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
