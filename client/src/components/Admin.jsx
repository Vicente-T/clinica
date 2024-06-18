import React from "react";
import { useState } from 'react'
import Axios from 'axios'
import '../styles/paciente.css'
import '../styles/header.css'
export default function Admin() {
    Axios.defaults.withCredentials = true
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const[medicoReg, setMedicoReg] = useState("")
    const[pacienteReg, setPacienteReg] = useState("")
    const[dateReg, setDateReg] = useState("")
    const[faramcosReg, setFaramcosReg] = useState("")

    const[showp, setshowp] = useState(false)
    const[showc, setshowc] = useState(false)
    const[showr, setshowr] = useState(false)
    const[showf, setshowf] = useState(false)
    const[showregistermain, setshowregistermain] = useState(true)
    const[showregsecon, setshowregsecon] = useState(false)

    const [genero, setGenero] = useState("");
    const [NomeCompleto, setNomeCompleto] = useState("");
    const [Contacto, setContato] = useState("");
    const [Email, setEmail] = useState("");
    const [Morada, setMorada] = useState("");
    const [DataDeNascimento, setDataDeNascimento] = useState("");

    const [DataDeNascimento2, setDataDeNascimento2] = useState("");
    const [Contacto2, setContato2] = useState("");
    const [Email2, setEmail2] = useState("");


    const register = () => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
          username: usernameReg,
          role: 'medico',
          password: passwordReg,
          
        }).then((response) => {
          console.log(response);
          
        })
    }
    const register1 = () => {

        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
          username: usernameReg,
          role: 'paciente',
          password: passwordReg,
        }).then((response) => {
          console.log(response);
        })
    }

    const registerConsulta = () => {
      
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/consultas`, {
      medico:medicoReg,
      paciente:pacienteReg,
      date:dateReg,
      farmacos:faramcosReg
    }).then((response) => {
      console.log(response);
    })
    }
    const handleSubmit = async () => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/register-ficha`, {
          pacientename: usernameReg,
          genero: genero,
          NomeCompleto: NomeCompleto,
          Contacto: Contacto,
          Email: Email,
          Morada: Morada,
          DataDeNascimento: DataDeNascimento,
        }) .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.error(error);
        });
        
      };

      const handleempregados = async () => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/empregados`, {
            username: usernameReg,
            DataDeNascimento: DataDeNascimento2,
            Contacto: Contacto2,
            Email: Email2
        }) .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.error(error);
        });
        
      };

    const showProfile = () => {
      if (showp) {
          setshowp(false)
      } else {
          setshowp(true)
          setshowc(false)
          setshowr(false)
          setshowf(false)
      }
  }

  const showCalendar = () => {
      if (showc) {
          setshowc(false)
      } else {
          setshowc(true)
          setshowp(false)
          setshowr(false)
          setshowf(false)
      }
  }

  const showRegister = () => {
      if (showr) {
          setshowr(false)
      } else {
          setshowr(true)
          setshowp(false)
          setshowc(false)
          setshowf(false)
      }
  }

  const showFicha = () => {
      if (showf) {
          setshowf(false)
      } else {
          setshowf(true)
          setshowp(false)
          setshowc(false)
          setshowr(false)
      }
  }

  const showRegisterMain = () => {
      if (showregistermain) {
          setshowregistermain(false)
          setshowregsecon(true)
      } else {
          setshowregistermain(true)
          setshowregsecon(false)
      }
  }
  const handleshowRegister = () => {
      if(showregsecon){
          setshowregsecon(false)
          setshowregistermain(true)
      }else{
          setshowregsecon(true)
          setshowregistermain(false)
      }
  }
    return (
      <section>
          <div className="wrapper">

          <div className="navside">
                    <ul>
                        <li className="list active">
                            <a  onClick={showProfile}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="1.5em" width="1.5em" viewBox="0 0 512 512"><path fill="#74C0FC" d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                            <span className="title">Profile</span>
                            </a>
                        </li>
                        <li className="list">
                            <a  onClick={showRegister}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="1.5em" width="1.5em" viewBox="0 0 576 512"><path fill="#74C0FC" d="M48 0C21.5 0 0 21.5 0 48V256H144c8.8 0 16 7.2 16 16s-7.2 16-16 16H0v64H144c8.8 0 16 7.2 16 16s-7.2 16-16 16H0v80c0 26.5 21.5 48 48 48H265.9c-6.3-10.2-9.9-22.2-9.9-35.1c0-46.9 25.8-87.8 64-109.2V271.8 48c0-26.5-21.5-48-48-48H48zM152 64h16c8.8 0 16 7.2 16 16v24h24c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H184v24c0 8.8-7.2 16-16 16H152c-8.8 0-16-7.2-16-16V152H112c-8.8 0-16-7.2-16-16V120c0-8.8 7.2-16 16-16h24V80c0-8.8 7.2-16 16-16zM512 272a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM288 477.1c0 19.3 15.6 34.9 34.9 34.9H541.1c19.3 0 34.9-15.6 34.9-34.9c0-51.4-41.7-93.1-93.1-93.1H381.1c-51.4 0-93.1 41.7-93.1 93.1z"/></svg>
                            <span className="title">Pacientes</span>
                            </a>
                        </li>
                        <li className="list">
                            <a  onClick={showFicha}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="1.5em" width="1.5em" viewBox="0 0 448 512"><path fill="#74C0FC" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                            <span className="title">Medicos</span>
                            </a>
                        </li>
                        <li className="list">
                            <a  onClick={showCalendar}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="1.5em" width="1.5em" viewBox="0 0 448 512"><path fill="#74C0FC" d="M0 96C0 43 43 0 96 0H384h32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384 96c-53 0-96-43-96-96V96zM64 416c0 17.7 14.3 32 32 32H352V384H96c-17.7 0-32 14.3-32 32zM208 112v48H160c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V224h48c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H272V112c0-8.8-7.2-16-16-16H224c-8.8 0-16 7.2-16 16z"/></svg>
                            <span className="title">Consultas</span>
                            </a>
                        </li>
                    </ul>
                    
                
                </div>

            {showp &&
            <h1>Profile</h1>

            }
            {showf && showregistermain ? (
                
            
            <div className="container">
                <h2>Registar Medicos</h2>
                <input type="text" placeholder='Type username...' onChange={(e)=>{setUsernameReg(e.target.value)}}  />           
                <input type="text" placeholder='Type password...' onChange={(e)=>{setPasswordReg(e.target.value)}}/>
                <button onClick={() => { register(); showRegisterMain(); }}>continue</button>

            </div>
            ) : null}

            {showf && showregsecon ? (
                <div className="container">
                    <h2>Registar Medicos</h2>
                    <div className='input-box-2'>
                        <input type="date" onChange={(e) => setDataDeNascimento2(e.target.value)} />
                        <label htmlFor="alergias">Data de nascimento</label>
                    </div>
                    <div className='input-box-2'>
                        <input type="text" onChange={(e) => setContato2(e.target.value)} />
                        <label htmlFor="peso">Contacto</label>
                     </div>
                     <div className='input-box-2'>
                        <input type="email" onChange={(e) => setEmail2(e.target.value)} />
                        <label htmlFor="idade">email</label>
                    </div>
                    <button onClick={() => { handleempregados(); showRegisterMain(); }}>register</button>
                </div>
            ) : null}

            {showr && showregistermain ? (
                <div className="container">
                    <h2>Registar pacientes</h2>
                    <input type="text" placeholder='Type username...' onChange={(e)=>{setUsernameReg(e.target.value)}}  />
                    <input type="text" placeholder='Type password...' onChange={(e)=>{setPasswordReg(e.target.value)}}/>
                    <button onClick={() => { register1(); showRegisterMain(); }}>continue</button>
                </div>
            ) : null}

            {showr && showregsecon ? (
                <div className="container">
                    <h2>Registar Pacientes</h2>
                    <div className='input-cover'>
              <div className='input-box-2'>
                <input type="text" onChange={(e) => setNomeCompleto(e.target.value)} />
                <label htmlFor="genero">Nome Completo</label>
              </div>

              <div className='input-box-2'> 
                <input type="text" onChange={(e) => setGenero(e.target.value)} />
                <label htmlFor="genero">Genero </label>
              </div>
              
            </div>

            <div className='input-cover'>
              
              <div className='input-box-2'>
                <input type="text" onChange={(e) => setContato(e.target.value)} />
                <label htmlFor="peso">Contacto</label>
              </div>
              <div className='input-box-2'>
                  <input type="text" onChange={(e) => setMorada(e.target.value)} />
                  <label htmlFor="peso">Morada</label>
              </div>
              
            </div>
            <div className='input-cover'>

              <div className='input-box-2'>
                <input type="date" onChange={(e) => setDataDeNascimento(e.target.value)} />
                <label htmlFor="alergias">Data de nascimento</label>
              </div>
              <div className='input-box-2'>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="idade">email</label>
                </div>
            </div>
            <button className='login-btn' onClick={() => { handleSubmit(); handleshowRegister(); }}>Register</button>
                </div>
            ) : null}

            {showc &&
            <div className="container">
                <h2>Registar Consultas</h2>
                <label >Nome do medico</label>
                <input type="text" onChange={(e)=>{setMedicoReg(e.target.value)}}  /> 
                <label >Nome do paciente</label>          
                <input type="text" onChange={(e)=>{setPacienteReg(e.target.value)}}/>
                <label >Data - YYYY-MM-DD</label>
                <input type="date" onChange={(e)=>{setDateReg(e.target.value)}}/>
                <label >Farmacos</label>
                <input type="text" onChange={(e)=>{setFaramcosReg(e.target.value)}}/>
                <button onClick={registerConsulta}>Registar consulta</button>
          </div>
            }

          </div>
      </section>
    )
}