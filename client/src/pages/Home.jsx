import React, { useEffect,useState } from "react"
import Axios from "axios"
import Paciente from "../components/Paciente"
import Medico from "../components/Medico"
import Admin from "../components/Admin"



export default function Home() {

    const[role, setRole] = useState("")
    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/login`).then((response) => {
            if(response.data.loggedIn === true){
                setRole(response.data.user[0].role)
            }
        })
    }, [])

    return (
        <div>
            {role == "paciente" && <Paciente/>}
            {role == "medico" && <Medico/>}
            {role == "admin" && <Admin/>}
            
        </div>
    )
}