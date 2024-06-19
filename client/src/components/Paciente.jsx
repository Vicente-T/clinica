import React from "react";
import Axios from "axios";
import { useEffect,useState } from 'react';
import '../styles/paciente.css'
import '../styles/header.css'

export default function Paciente() {
    const CurrentDate = new Date();
    const [paciente,setPaciente] = useState("");
    const [consultas, setConsultas] = useState([]);
    const[medicoReg, setMedicoReg] = useState("")
    const[dateReg, setDateReg] = useState("")
    const[username, setusername] = useState("")
    const[pacienteinfo, setPacienteinfo] = useState([]);

    const[showp, setshowp] = useState(false)
    const[showc, setshowc] = useState(false)
    const[showr, setshowr] = useState(false)

    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn === true){
                setusername(response.data.user[0].username)
                
            }
        })
    }, [])

    const searchconsultas = () => {
        Axios.get(`http://localhost:3001/pacienteagenda/${username}`)
            .then((response) => {
                console.log(response);
                setConsultas(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        if (!username) {
            alert('Paciente not found');
        }
    }

    const search = () => {
        Axios.get(`http://localhost:3001/pacientesficha/${username}`)
            .then((response) => {
                console.log(response);
                setPacienteinfo(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        if (!username) {
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


    const showProfile = () => {
        if (showp) {
            setshowp(false)
        } else {
            setshowp(true)
            setshowc(false)
            setshowr(false)
        }
    }

    const showCalendar = () => {
        if (showc) {
            setshowc(false)
        } else {
            setshowc(true)
            setshowp(false)
            setshowr(false)
        }
    }

    const showRegister = () => {
        if (showr) {
            setshowr(false)
        } else {
            setshowr(true)
            setshowp(false)
            setshowc(false)
        }
    }
          
      
    return (
        
        <section>
            <div className="wrapper">
            <div className="navside">
            <ul>
                <li className="list active">
                <a onClick={() => {
                                        showProfile();
                                        search();
                                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="1.5em" width="1.5em" viewBox="0 0 512 512"><path fill="#74C0FC" d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                    <span className="title">Profile</span>
                    </a>
                </li>
                <li className="list">
                    <a  onClick={showCalendar}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="1.5em" width="1.5em" viewBox="0 0 448 512"><path fill="#74C0FC" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>
                    <span className="title">Agenda de Consultas</span>
                    </a>
                </li>
                <li className="list">
                    <a  onClick={showRegister}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="1.5em" width="1.5em" viewBox="0 0 512 512"><path fill="#74C0FC" d="M96 352V96c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V293.5c0 17-6.7 33.3-18.7 45.3l-58.5 58.5c-12 12-28.3 18.7-45.3 18.7H160c-35.3 0-64-28.7-64-64zM272 128c-8.8 0-16 7.2-16 16v48H208c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V256h48c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H320V144c0-8.8-7.2-16-16-16H272zm24 336c13.3 0 24 10.7 24 24s-10.7 24-24 24H136C60.9 512 0 451.1 0 376V152c0-13.3 10.7-24 24-24s24 10.7 24 24l0 224c0 48.6 39.4 88 88 88H296z"/></svg>
                    <span className="title">Marcar Consulta</span>
                    </a>
                </li>
            </ul>
            
           
        </div>
            
            

            {showp &&
            <div class = "container">
                <h1>Profile</h1>
                {pacienteinfo.map((val, key) => {
                    return <div className="profile" key={key}>
                        <div className="profile-details">
                            <div className="profile-Name">
                                <div className="profile-name">
                                    <div>{val.id}-</div>
                                    <div>{val.pacientename}</div>
                                    
                                    
                                    
                                </div>
                                

                                <div className="profile-img"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="15em" width="15em" viewBox="0 0 512 512"><path fill="white" d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                                </div>  
                            </div>
                            <div className="profile-bio">
                                <div>Data de nascimento- {val.data_de_nascimento}</div>
                                <div>Contacto-{val.Contacto}</div>
                                <div> {val.email}</div>
                                
                                
                                
                            </div>
                        </div>
                        
                    </div>
                    
                })}
                        
            </div> 
            }
            

            {showc &&
                <div className="container">
                    <div>
                    <h1>As Suas Consultas</h1>
                    </div>
                
                   <div>
                    <button onClick={searchconsultas}>Mostrar Consultas</button>
                   </div>
                    <div className="tableconsultas">
                        {consultas.map((val, key) => {
                            return (
                                <table className="m-row" key={key}>

                                    <tr>
                                        <th>ID</th>
                                        <th>Paciente</th>
                                        <th>Medico</th>
                                        <th>Data</th>
                                    </tr>
                                    <tr>
                                        <th>{val.id}</th>
                                        <th>{val.id_paciente}</th>
                                        <th>{val.id_medicos}</th>
                                        <th>{val.data}</th>
                                    </tr>
                                    
                                </table>
                            );
                        })}
                    </div>
                   
                </div>
            }

            {showr &&
                <div className="container">
                    <div>
                    <h1>Registar Consultas</h1>
                    </div>
                    
                    <div className="inputs">
                        <label >Nome do medico</label>
                        <input type="text" onChange={(e)=>{setMedicoReg(e.target.value)}}  /> 
                        <label >Data </label>
                        <input type="date" onChange={(e)=>{setDateReg(e.target.value)}}/>
                    </div>
                    <div>
                        <button onClick={registerConsulta}>Registar consulta</button>
                    </div>
                   
                </div>
                
            }
        </div>
    </section>
    )
}