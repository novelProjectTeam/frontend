import  { useState, useEffect } from "react";
import { gsap } from "gsap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";



function App() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language; // Update the `lang` attribute
  }, [language]);

 

  return (
    <Router>
  

        <Routes>
          
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />

          {/* Add more routes as needed */}
        </Routes>
    </Router>
  );
}

export default App;
