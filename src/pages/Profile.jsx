import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    image: user?.image || "",
  });
  const { logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("first_name", formData.first_name);
    formDataToSubmit.append("last_name", formData.last_name);
    formDataToSubmit.append("email", formData.email);

    if (formData.image) {
      formDataToSubmit.append("image", formData.image);
    }

    try {
      const response = await axios.post("/api/user/update", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      setUser(response.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  if (!user) return null;

  return (
    <div className="container">
      <span className="borderLine"></span>
      <form>
        <h2> profile</h2>
        <div className="form-group mb-4">
          <h1 className="text-2xl font-bold text-white ">
            <b className="font-extrabold text-yellow-400 ">Name:</b>{" "}
            {user.first_name} {user.last_name}
          </h1>
        </div>
        <div className="form-group mb-4">
          <h1 className="text-2xl font-bold text-white ">
            <b className="font-extrabold text-yellow-400 ">Email:</b>{" "}
            {user.email}
          </h1>
        </div>
        <div className="form-group mb-4">
          <h1 className="text-2xl font-bold text-white ">
            <b className="font-extrabold text-yellow-400 ">rle:</b> {user.role}
          </h1>
        </div>
        <div className="form-group mb-4">
          <h1 className="text-2xl font-bold text-white ">
            <b className="font-extrabold text-yellow-400 ">status:</b>{" "}
            {user.status}
          </h1>
        </div>

        <button
          type="submit"
          onClick={logout}
          className="form-btn w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
        >
          تسجيل الخروج
        </button>
      </form>
    </div>
  );
};

export default Profile;
