import "./PostUser.css";
import Form from "react-bootstrap/Form";
import  Button  from "react-bootstrap/Button";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const PostUser = () =>{

    const [formdata,setFormdata] = useState({
        name:"",
        email:"",
        phone:"",
        department:""
    })

    const handleInputChange = (event) =>{
        const {name,value} = event.target;
        setFormdata({...formdata,[name]:value});
    }
 const navigate = useNavigate();
    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(formdata);
        try{
            const response = await fetch("http://localhost:8080/api/employee",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formdata)
            });
            const data = await response.json();
            console.log("Success:",data);
            alert("Employee added successfully");
            navigate("/");
        }catch(error){
            console.log("error creating employee",error.message);
        }
    }

    return(
        <>
        <div className="center-form">
         <h1> Post  New employee </h1>
            <form onSubmit={handleSubmit}>
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
                  value={formdata. email}
                  onChange={handleInputChange}
                   />
               </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                 type="text"
                 name ="phone"
                  placeholder="Enter Phone"
                  value={formdata. phone}
                  onChange={handleInputChange}
                   />
               </Form.Group>

                   <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                 type="text"
                 name ="department"
                  placeholder="Enter Department"
                  value={formdata. department}
                  onChange={handleInputChange}
                   />
               </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  post employee
                </Button>

            </form>
        </div>
        </>
    )
}

export default PostUser;