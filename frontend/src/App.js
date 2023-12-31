import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <Router>
      <React.Fragment>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            {isLoggedIn && <Route exact path="/user" element={<Welcome />} />}{" "}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </React.Fragment>
    </Router>
  );
}

export default App;
