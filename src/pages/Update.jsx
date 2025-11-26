
import React, { Link } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"; 

const Update = () => {

    const { store, dispatch } = useGlobalReducer()

    return (
        <div>
            hola desde Update
        </div>
    )
}

export default Update