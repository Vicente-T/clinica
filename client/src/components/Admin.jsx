import React from "react";
import { useState } from 'react'
import Axios from 'axios'

export default function Admin() {
    Axios.defaults.withCredentials = true
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const[medicoReg, setMedicoReg] = useState("")
    const[pacienteReg, setPacienteReg] = useState("")
    const[dateReg, setDateReg] = useState("")

    const register = () => {
      

        Axios.post("http://localhost:3001/register", {
          username: usernameReg,
          role: 'medico',
          password: passwordReg,
          
        }).then((response) => {
          console.log(response);
        })
        
    }
    const register1 = () => {

        Axios.post("http://localhost:3001/register", {
          username: usernameReg,
          role: 'medico',
          password: passwordReg,
          
        }).then((response) => {
          console.log(response);
        })
        
    }

    const registerConsulta = () => {
      
    Axios.post("http://localhost:3001/consultas", {
      medico:medicoReg,
      paciente:pacienteReg,
      date:dateReg
    }).then((response) => {
      console.log(response);
    })
    }
    return (
        <div>
            <h1>Admin</h1>
            <div>
                <h2>Registar Medicos</h2>
                <input type="text" placeholder='Type username...' onChange={(e)=>{setUsernameReg(e.target.value)}}  />           
                <input type="text" placeholder='Type password...' onChange={(e)=>{setPasswordReg(e.target.value)}}/>
                <button onClick={register}>Register</button>

            </div>
            <div>
                <h2>Registar pacientes</h2>
                <input type="text" placeholder='Type username...' onChange={(e)=>{setUsernameReg(e.target.value)}}  />           
                <input type="text" placeholder='Type password...' onChange={(e)=>{setPasswordReg(e.target.value)}}/>
                <button onClick={register1}>Register</button>

            </div>
            <div>
                <h2>Registar Consultas</h2>
                <label >Nome do medico</label>
                <input type="text" onChange={(e)=>{setMedicoReg(e.target.value)}}  /> 
                <label >Nome do paciente</label>          
                <input type="text" onChange={(e)=>{setPacienteReg(e.target.value)}}/>
                <label >Data - YYYY-MM-DD</label>
                <input type="date" onChange={(e)=>{setDateReg(e.target.value)}}/>
                <button onClick={registerConsulta}>Registar consulta</button>
                
                
            </div>
        </div>
    )
}