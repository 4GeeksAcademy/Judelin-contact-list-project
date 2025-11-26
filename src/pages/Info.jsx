import {useEffect, useState} from "react"
import { Link, useParams } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer"; 

export const Info =()=>{

const { store, dispatch } = useGlobalReducer()
// let navigate = useNavigate();
  const API_URL = 'https://playground.4geeks.com/contact/agendas/Youngjude'

const [info, setInfo] = useState({
    name:"",
    email:"",
    phone:"",
    address:""
})



    return(
        <div>
           
   <div className="mb-2">
          <label htmlFor="formGroupExampleInput" className="form-label">Full name</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Full name"
            onChange={(e) => setInfo({...info, name: e.target.value})} value={info.name}  />
        </div>
        <div className="mb-2">
          <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter email"
            onChange={(e) => setInfo({...info, email: e.target.value})} value={info.email}  />
        </div>
        <div className="mb-2">
          <label htmlFor="formGroupExampleInput" className="form-label">Phone</label>
          <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Enter Phone"
            onChange={(e) => setInfo({...info, phone: e.target.value})} value={info.phone}  />
        </div>
        <div className="mb-2">
          <label htmlFor="formGroupExampleInput2" className="form-label">Address</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter Address"
            onChange={(e) => setInfo({...info, address: e.target.value})} value={info.address}  />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary" >Save</button>
        </div>
     
        </div>
    )

}