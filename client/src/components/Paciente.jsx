import React from "react";
import Axios from "axios";
import { useEffect,useState } from 'react';

export default function Paciente() {
    const CurrentDate = new Date();
    const [paciente,setPaciente] = useState("");
    const [consultas, setConsultas] = useState([]);
    const[medicoReg, setMedicoReg] = useState("")
    const[dateReg, setDateReg] = useState("")
    const[username, setusername] = useState("")
    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn === true){
                setusername(response.data.user[0].username)
                
            }
        })
    }, [])

    const searchconsultas = () => {
        Axios.get(`http://localhost:3001/pacienteagenda/${paciente}`)
            .then((response) => {
                console.log(response);
                setConsultas(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        if (!paciente) {
            alert('Paciente not found');
        }
    }

    const registerConsulta = () => {
            let convertedDate = new Date(dateReg);
            
            if (convertedDate > CurrentDate) {
                Axios.post("http://localhost:3001/consultas", {
                    medico: medicoReg,
                    date: dateReg,
                    paciente: username,
                  })
                  .then((response) => {
                    console.log(response);
                  }).catch((error) => {
                    console.error(error);
                  });
                  
                alert('Consulta marcada');
            } else {
              alert('Data impossivel');
            }
          }
          
      
    return (
        <div>
            <h1>Paciente</h1>
            <div>
                <h2>As suas consultas</h2>
                <label >Insira seu nome</label>
                <input type="text" onChange={(e)=>{setPaciente(e.target.value)}} />
                <button onClick={searchconsultas}>search</button>
                {consultas.map((val, key) => {
                    return (
                        <div key={key}>
                            {val.id}
                            {val.id_paciente}
                            {val.id_medicos}
                            {val.data}
                        </div>
                    );
                })}
            </div>
            <div>
                <h2>Registar Consultas</h2>
                <label >Nome do medico</label>
                <input type="text" onChange={(e)=>{setMedicoReg(e.target.value)}}  /> 
                <label >Data - YYYY-MM-DD</label>
                <input type="date" onChange={(e)=>{setDateReg(e.target.value)}}/>
                <button onClick={registerConsulta}>Registar consulta</button>
            </div>
        </div>
    )
}