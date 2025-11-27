import { useEffect, useState } from "react"
import { Link, } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {

  const { store, dispatch } = useGlobalReducer()

  const { contactId } = useParams()


  let navigate = useNavigate();
  const API_URL = 'https://playground.4geeks.com/contact/agendas/Youngjude'

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  useEffect(() => {
    const editContact = store.contacts.find(contact => contact.id === parseInt(contactId))

    if (editContact) {
      setInfo({
        name: editContact.name,
        email: editContact.email,
        phone: editContact.phone,
        address: editContact.address,
      })
    }
  }, [contactId])

  const handleEdit = (event, id,) => {

    event.preventDefault()

    fetch(`${API_URL}/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        info: {
          name: name,
          phone: phone,
          email: email,
          address: address
        }
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(resp => {
        if (resp.ok)
          return resp.json()
      })
      .then((data) => {
        if (data) {

          const updated = store.contacts.map(contact => {
            if (contact.id == id) {
              contact = data
            }
            return contact
          })
          dispatch({
            type: "add-contact",
            payload: { contacts: updated }
          })

        }

      })

  }

  return (
    <div>
      <form onSubmit={handleEdit}>
        <div className="mb-2">
          <label htmlFor="formGroupExampleInput" className="form-label">Full name</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Full name"
            onChange={(e) => setInfo({ ...info, name: e.target.value })} value={info.name} />
        </div>
        <div className="mb-2">
          <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter email"
            onChange={(e) => setInfo({ ...info, email: e.target.value })} value={info.email} />
        </div>
        <div className="mb-2">
          <label htmlFor="formGroupExampleInput" className="form-label">Phone</label>
          <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Enter Phone"
            onChange={(e) => setInfo({ ...info, phone: e.target.value })} value={info.phone} />
        </div>
        <div className="mb-2">
          <label htmlFor="formGroupExampleInput2" className="form-label">Address</label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter Address"
            onChange={(e) => setInfo({ ...info, address: e.target.value })} value={info.address} />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary" >Save</button>
        </div>
      </form>
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>

    </div>
  )

}