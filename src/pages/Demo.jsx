// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import React, { useState, useEffect } from "react";

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate();
  const API_URL = 'https://playground.4geeks.com/contact/agendas/Youngjude'

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event, ) => {

    event.preventDefault()

    if (event.key == "Enter" && name.trim !== "" || phone !== "" || email !== "" || address !== "") {
      fetch(API_URL + "/contacts", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            phone: phone,
            email: email,
            address: address
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(resp => {
          console.log(resp)
          if (resp.ok) {
            setName(""), setPhone(""), setEmail(""), setAddress("")
          }
          
          console.log(resp.status)
          return resp.json()
        })
        .then((data) => {
          console.log(data)
          dispatch({
            type: "add-contact",
            payload: { ...store.contacts, data }
          })
          navigate("/")    
        })
    }
  }

  return (

    <div className="container">
      <form onSubmit={handleSubmit}>

        <div className="mb-2">
          <label htmlFor="formGroupExampleInput" className="form-label">Full name</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Full name"
            onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div className="mb-2">
          <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className="mb-2">
          <label htmlFor="formGroupExampleInput" className="form-label">Phone</label>
          <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Enter Phone"
            onChange={(e) => setPhone(e.target.value)} value={phone} />
        </div>
        <div className="mb-2">
          <label htmlFor="formGroupExampleInput2" className="form-label">Address</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)} value={address} />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary" >Save</button>
        </div>
      </form>

      <Link to="/home">
        <button className="btn btn-primary" >Back home</button>
      </Link>
    </div>
  );
};
