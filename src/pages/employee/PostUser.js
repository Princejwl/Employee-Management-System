import "./PostUser.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { getIdToken } from "firebase/auth";

const PostUser = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    department: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formdata);

    try {
      // 🔹 Get the current logged-in Firebase user
      const user = auth.currentUser;

      if (!user) {
        alert("Please log in first to add an employee.");
        return;
      }

      // 🔹 Get user's UID and ID token
      const uid = user.uid;
      const token = await getIdToken(user);

      // 🔹 Prepare data
      const employeeData = { ...formdata, userId: uid };

      // 🔹 Send request to backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(employeeData)
      });

      const data = await response.json();
      console.log("Success:", data);

      alert("Employee added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating employee:", error.message);
      alert("Something went wrong while adding employee.");
    }
  };

  return (
    <div className="center-form">
      <h1>Post New Employee</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formdata.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formdata.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter Phone"
            value={formdata.phone}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="department"
            placeholder="Enter Department"
            value={formdata.department}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Post Employee
        </Button>
      </form>
    </div>
  );
};

export default PostUser;
