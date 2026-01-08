import './UpdateUser.css';
import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import  Button  from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const {id} = useParams();
    const navigate = useNavigate();  
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    });

    const handleInputChange = (event) => {
        const { name,value } = event.target;
        setFormdata({ ...formdata,[name]: value });
    };

    useEffect(() => {
   const fetchUserData = async () => {
     try {
       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/employee/${id}`);
         const data = await response.json();
         console.log("Fetched data:", data);
            setFormdata(data);
         } catch (error) {
              console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/employee/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formdata),
            });
            const data = await response.json();
            console.log("User data updated successfully:", data);
            // Optionally, you can redirect the user or show a success message here
            navigate("/");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
        
        
    }
    return (
        <>
        <div className="center-form">
         <h1> Edit Employee </h1>
            <form  onSubmit={handleSubmit} className="update-form">
               <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                 type="text"
                 name ="name"
                  placeholder="Enter Name"
                  value={formdata.name}
                  onChange={handleInputChange}
                   />
               </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                 type="email"
                 name ="email"
                  placeholder="Enter Email"
                  value={formdata.email}
                  onChange={handleInputChange}
                   />
               </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                 type="text"
                 name ="phone"
                  placeholder="Enter Phone"
                  value={formdata.phone}
                  onChange={handleInputChange}
                   />
               </Form.Group>

                   <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                 type="text"
                 name ="department"
                  placeholder="Enter Department"
                  value={formdata.department}
                  onChange={handleInputChange}
                   />
               </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Edit employee
                </Button>

            </form>
        </div>
        </>
    );
}

export default UpdateUser;
