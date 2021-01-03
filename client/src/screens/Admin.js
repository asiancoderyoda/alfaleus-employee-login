import React, {useContext} from 'react';
import "./Admin.css";
import {UserContext} from '../App'

const Admin = () => {

    const {state, dispatch} = useContext(UserContext)
    console.log(state);

    const length = state ? state.employee_id.length : "Loading"
    const emp__id = state ?  state.employee_id.replace(/\d+/,"*") : "Loading"

    return (
        <div className="admin container">
            <h1>Welcome {emp__id}</h1>

            <h6>Employee Name: {state ? state.name : "Loading"}</h6>
            <h6>Employee Email: {state ? state.email : "Loading"}</h6>
        </div>
    )
}

export default Admin
