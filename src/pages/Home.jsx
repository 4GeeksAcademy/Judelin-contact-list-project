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

	const deleteContact = (id,) => {
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

	const handleId = (e) => {
		const buttonId = e.currentTarget.id;

		console.log("Id del boton", buttonId)
		alert(`este es id: ${buttonId}`)
	}

	return (
		<div className="">
			<div className="add-button">
				<Link to="/demo">
					<button className="btn btn-primary">Add new contact</button>
				</Link>
			</div>
			<ul>
				<li>

					{
						store.contacts.map(item =>
							<div className="contact-container" key={item.id}>
								<div className="contact-image">
									<img
										className="rounded-circle"
										src="https://picsum.photos/170/170/"
										alt="Contact"

									/>
								</div>
								<div className="contact-info">
									<h5>{item.name}</h5>
									<p>{item.address}</p>
									<p>{item.phone}</p>
									<p>{item.email}</p>
								</div>

								<div className="contact-button">
									<Link to={"/edit/" + item.id} >
										edit
									</Link>
									{/* <button onClick={() => deleteContact(item.id)}
									>delete</button> */}

									<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleId} >
										delete
									</button>

									<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
										<div className="modal-dialog">
											<div className="modal-content">
												<div className="modal-header">
													<h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
													<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>
												<div className="modal-body">
													...
												</div>
												<div className="modal-footer">
													<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
													<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => deleteContact(item.id)}>Save changes</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					}
				</li>
			</ul>
		</div>
	);
};

