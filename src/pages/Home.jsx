import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()


	const API_URL = 'https://playground.4geeks.com/contact/agendas/Youngjude'

	const createContact = () => {
		fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Types": "application/json"
			},
		})
			.then(resp => console.log(resp))
			.then((data) => console.log(data))
			.catch((error) => console.log(error))
	};

	const bringList = () => {
		fetch(API_URL + "/contacts")
			.then((resp) => {
				if (resp.status === 404) {
					return createContact()
				}
				return resp.json()
			})
			.then((data) => {
				console.log(data.contacts)
				dispatch({
					type: "add-contact",
					payload: data.contacts
				})
			})
			.catch((error) => console.log(error))
	}

	const deleteContact = (id, getStore, setStore) => {
		fetch(`${API_URL}/contacts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((res) => {
				if (!res.ok) throw new error("failed to delete this contact")
				dispatch({
					type: "add-contact",
					payload: store.contacts.filter(item => item.id !== id)
				})
			})


	}

	useEffect(() => {
		bringList()
	}, [])

	const [editContact, setEditContact] = useState(null);
	const handleChange = (e) => {
    const { name, value } = e.target;
    setEditContact({ ...editContact, [name]: value });
  };

	return (
		<div className="text-center">
			<ul>
				<li>

					{
						store.contacts.map(item =>
							<div key={item.id}>
								<div>
									<img src="https://www.istockphoto.com/photo/freelance-professional-typing-on-laptop-sipping-coffee-near-window-in-minimalist-gm2230406898-646063595" />

								</div>
								<h5>{item.name}</h5>
								<p>{item.address}</p>
								<p>{item.phone}</p>
								<p>{item.email}</p>
								<div>
									<Link to="/info" onClick={() => handleChange(item)}>
										Edit
									</Link>
									<button onClick={() => deleteContact(item.id)}
									>delete</button>
								</div>
							</div>


						)
					}
				</li>
			</ul>
		</div>
	);
};

