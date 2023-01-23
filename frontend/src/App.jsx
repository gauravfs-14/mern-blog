import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserContext from "./contexts/UserContext";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";
import axios from "axios";

axios.defaults.withCredentials = true;

const App = () => {
  const { isLogin } = useContext(UserContext);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          {isLogin && isLogin == true ? (
            <>
              <Route path="dashboard" element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route path="dashboard" element={<NotFound />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
