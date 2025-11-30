import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faPencil, faPhone, faTrash, faMessage } from '@fortawesome/free-solid-svg-icons';

export const Home = () => {

    const { store, dispatch } = useGlobalReducer();
    const API_URL = 'https://playground.4geeks.com/contact/agendas/Youngjude';

    // Si la agenda NO existe, la crea
    const createContact = () => {
        return fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((resp) => resp.json());
    };

    // Trae la lista de contactos
    const bringList = () => {
        fetch(API_URL + "/contacts")
            .then((resp) => {
                if (resp.status === 404) {
                    return createContact();
                }
                return resp.json();
            })
            .then((data) => {
                const list = Array.isArray(data.contacts) ? data.contacts : [];
                dispatch({
                    type: "set-contacts",
                    payload: list
                });
            })
            .catch((error) => console.log(error));
    };

    // Eliminar contacto
    const deleteContact = (id) => {
        fetch(`${API_URL}/contacts/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                if (!res.ok) throw new Error("failed to delete this contact");

                const newList = store.contacts.filter(item => item.id !== id);

                dispatch({
                    type: "set-contacts",
                    payload: newList
                });
            });
    };

    useEffect(() => {
        bringList();
    }, []);

    return (
        <div className="container-c">
            <div className="add-button ">
                <Link to="/demo">
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>

            <ul>
                <li>
                    {store.contacts.map((item, id) =>
                        <div className="contact-container" key={id}>
                            <div className="container-profile">
                                <div className="contact-image">
                                    <img
                                        className="rounded-circle"
                                        src="https://picsum.photos/170/170/"
                                        alt="Contact"
                                    />
                                </div>

                                <div className="contact-info">
                                    <h5>{item.name}</h5>
                                    <p><FontAwesomeIcon icon={faLocationPin} /> {item.address}</p>
                                    <p><FontAwesomeIcon icon={faPhone} /> {item.phone}</p>
                                    <p><FontAwesomeIcon icon={faMessage} /> {item.email}</p>
                                </div>
                            </div>

                            <div className="contact-button">
                                <Link className="fa-editar" to={"/edit/" + item.id}>
                                    <FontAwesomeIcon icon={faPencil} />
                                </Link>

                                <button 
                                    className="button-trash"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#modal-${item.id}`}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>

                                {/* Modal dinámico para cada contacto */}
                                <div className="modal fade" id={`modal-${item.id}`} tabIndex="-1">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5">Are you sure?</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                            </div>

                                            <div className="modal-body">
                                                If you delete it, you won't be able to recover it.
                                            </div>

                                            <div className="modal-footer">
                                                <button className="btn btn-primary" data-bs-dismiss="modal">Oh no!</button>
                                                <button 
                                                    className="btn btn-secondary" 
                                                    data-bs-dismiss="modal" 
                                                    onClick={() => deleteContact(item.id)}
                                                >
                                                    Yes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </li>
            </ul>
        </div>
    );
};









