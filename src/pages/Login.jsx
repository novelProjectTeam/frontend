import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { user } = useAuth();
  if(user){
      navigate('/profile'); 

      
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        await login(response.data.token); 
        navigate('/profile'); 
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };
  

  return (
    <div className="container">
    <span className="borderLine"></span>
    <form onSubmit={handleLogin}>
      <h2>تسجيل الدخول</h2>
      <div className="form-group mb-4">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border-none bg-slate-700 text-white rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
        <label htmlFor="email" className="absolute top-0 right-0 text-sm font-medium text-gray-100 transform -translate-y-1/2">
          البريد الإلكتروني
        </label>
        <i></i>
      </div>
      <div className="form-group mb-4">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border-none bg-slate-700 text-white rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
        <label htmlFor="password" className="absolute top-0 right-0 text-sm font-medium text-gray-100 transform -translate-y-1/2">
          كلمة المرور
        </label>
        <i></i>
      </div>
  
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
  
      <div className="links flex justify-between mt-4 text-sm text-gray-600">
        <a href="#">نسيت كلمة المرور؟</a>
        <Link to="/register" className="text-blue-500 hover:underline">
          لا تملك حسابا؟
        </Link>
      </div>
  
      <button type="submit" className="form-btn w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6">
        تسجيل الدخول
      </button>
    </form>
  </div>
  
  );
}

export default Login;
