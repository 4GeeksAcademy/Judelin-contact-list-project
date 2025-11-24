import React, {useState, useEffect} from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const {store, dispatch} =useGlobalReducer()

  const [info, setInfo] = useState([])
  const API_URL =  'https://playground.4geeks.com/contact/agendas/Youngjude'

  const createContact = () => {
	fetch(API_URL, {
		method: "POST",
		headers:{
			"Content-Types" : "application/json"
		},
	})
	.then(resp => console.log(resp))
	.then((data) => console.log(data))
	.catch((error) => console.log(error))
  };

  const bringList = () => {
	fetch(API_URL + "/contacts")
	.then((resp) => {
		if(resp.status === 404){
			return createContact()
		}
		return resp.json()
	})
	.then((data) => {
		console.log(data.contacts)
		setInfo(data.contacts)
	})
	.catch((error)=> console.log(error))
  }

  useEffect(() => {
	bringList()
}, [])

	return (
		<div className="text-center">
			<h1>Contact List</h1>
			<ul>
				<li>
					<div>
						<img src="https://www.istockphoto.com/photo/freelance-professional-typing-on-laptop-sipping-coffee-near-window-in-minimalist-gm2230406898-646063595" />

					</div>
					{
						info.map((item, index) => 
						<div key={index}>
							<h5>{item.name}</h5>
							<p>{item.address}</p>
							<p>{item.phone}</p>
							<p>{item.email}</p>

						</div>
						)
						
					}
				</li>
			</ul>
		</div>
	);
};

