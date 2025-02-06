import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setImage(null);
        navigate('/login');

        // Store the token in localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2048000) {
      setError("Image size should be less than 2MB");
      return;
    }
    setImage(file);
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-white text-white">First Name</label>
          <input
            type="text"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full p-2 placeholder:text-blue-700 bg-transparent focus:bg-white transition-all duration-1000 border border-sky-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-white">Last Name</label>
          <input
            type="text"
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full p-2 placeholder:text-blue-700 bg-transparent focus:bg-white transition-all duration-1000 border border-sky-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 placeholder:text-blue-700 bg-transparent focus:bg-white transition-all duration-1000 border border-sky-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 placeholder:text-blue-700 bg-transparent focus:bg-white transition-all duration-1000 border border-sky-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-white">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 placeholder:text-blue-700 bg-transparent focus:bg-white transition-all duration-1000 border border-sky-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-white">Profile Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 placeholder:text-blue-700 bg-transparent focus:bg-white transition-all duration-1000 border border-sky-700"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Register;
