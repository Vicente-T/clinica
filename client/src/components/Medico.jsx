import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../styles/paciente.css'
import '../styles/header.css'

export default function Medico() {
    const [paciente, setPaciente] = useState("");
    const [medic, setMedic] = useState("");
    const [pacienteinfo, setPacienteinfo] = useState([]);
    const[medicinfo, setMedicinfo] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [farmacos, setFarmacos] = useState([]);
    const navigate = useNavigate();
    const[username, setusername] = useState("")

    const[showp, setshowp] = useState(false)
    const[showc, setshowc] = useState(false)
    const[showr, setshowr] = useState(false)
    const[showf, setshowf] = useState(false)


    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn === true){
                setusername(response.data.user[0].username)
                
            }
        })
    }, [])
    

    const todos = () => {
        Axios.get("http://localhost:3001/pacientesficha")
            .then((response) => {
                console.log(response);
                setPacienteinfo(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        
    }
    const search = () => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/pacientesficha/${paciente}`)
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

    const searchmedic = () => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/empregados/${username}`)
            .then((response) => {
                console.log(response);
                setMedicinfo(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        if (!username) {
            alert('Medic not found');
        }
    }

    const searchconsultas = () => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/medicoagenda/${username}`)
            .then((response) => {
                console.log(response);
                
                setConsultas(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        Axios.get(`http://localhost:3001/farmacos`)
            .then((response) => {
                console.log(response);
                setFarmacos(response.data);

            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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



    return (
        <section>
            <div className="wrapper">
                <div className="navside">
                    <ul>
                        <li className="list active">
                        <a onClick={() => {
                                        showProfile();
                                        searchmedic();
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="1.5em" width="1.5em" viewBox="0 0 640 512"><path fill="#74C0FC" d="M614.3 247c16.3-25 25.7-54.9 25.7-87C640 71.6 568.4 0 480 0c-32.1 0-61.9 9.4-87 25.7c-7.9 5.2-8.5 16.2-1.8 22.9L591.4 248.8c6.7 6.7 17.8 6.2 22.9-1.8zM567 294.3c7.9-5.2 8.5-16.2 1.8-22.9L368.6 71.2c-6.7-6.7-17.8-6.2-22.9 1.8c-16.3 25-25.7 54.9-25.7 87c0 88.4 71.6 160 160 160c32.1 0 61.9-9.4 87-25.7zM301.5 368H18.5c-9.5 0-16.9 8.2-15 17.5C18.9 457.8 83.1 512 160 512s141.1-54.2 156.5-126.5c2-9.3-5.5-17.5-15-17.5zm0-32c9.5 0 16.9-8.2 15-17.5C301.1 246.2 236.9 192 160 192S18.9 246.2 3.5 318.5c-2 9.3 5.5 17.5 15 17.5H301.5z"/></svg>
                            <span className="title">Farmacos</span>
                            </a>
                        </li>
                        <li className="list">
                            <a  onClick={showFicha}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="1.5em" width="1.5em" viewBox="0 0 384 512"><path fill="#74C0FC" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z"/></svg>
                            <span className="title">Ficha do Paciente</span>
                            </a>
                        </li>
                    </ul>
                    
                
                </div>
            
                {showp &&
                    <div class = "container">
                        <h1>Profile</h1>
                        {medicinfo.map((val, key) => {
                    return <div className="profile" key={key}>
                        <div className="profile-details">
                            <div className="profile-Name">
                                <div className="profile-name">
                                    <div>{val.id}-</div>
                                    <div>{val.empregadosname}</div>
                                    
                                    
                                </div>
                                
                                <div className="profile-img"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="15em" width="15em" viewBox="0 0 512 512"><path fill="white" d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                                </div>  
                            </div>
                            <div className="profile-bio">
                                <div>Data de nascimento- {val.data_de_nascimento}</div>
                                <div>Contacto-{val.Contacto}</div>
                                <div> {val.Email}</div>
                                
                                
                                
                            </div>
                        </div>
                        
                    </div>
                    
                })}
                    </div> 
                }
            
            {showf &&
                <div className="container">
                    <h2>Ficha de pacientes</h2>
                    <div className="m-searchs">
                        <label>Insira o nome</label>
                        <input type="text" onChange={(e) => { setPaciente(e.target.value) }} />
                        
                    </div>
                    <div className="m-buttons">
                        <button onClick={todos}>Mostrar Todos</button>
                        <button onClick={search}>Search</button>
                    </div>
                        <div className="m-table">
                            {pacienteinfo.map((val, key) => {
                                return (
                                    <table className="m-row" key={key}>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Genero</th>
                                            
                                            <th>Contacto</th>
                                            <th>Email</th>
                                            <th>Morada</th>
                                            <th>Data De Nascimento</th>

                                        </tr>
                                        <tr className="m-info">
                                            <th>{val.id}</th>
                                            <th>{val.Nome_Completo}</th>
                                            <th>{val.genero}</th>
                                            
                                            <th>{val.Contacto}</th>
                                            <th>{val.email}</th>
                                            <th>{val.Morada}</th>
                                            <th>{val.data_de_nascimento}</th>
                                            
                                        </tr>

                                        
                                    </table>
                                );
                            })}
                        </div>
                </div>
            }




            {showc &&
            <div className="container">
                <h2>Agenda consultas</h2>
                
                <div className="btnconsultas">
                    <button  onClick={searchconsultas}>Mostrar consultas</button>
                </div>
                

                {consultas.map((val, key) => {
                    return (
                        <table className="m-row"  key={key}>
                            <tr>
                                <th>ID</th>
                                <th>Paciente</th>
                                <th>Medico</th>
                                <th>Data</th>
                            </tr>
                            <tr className="m-info">
                                <th>{val.id}</th>
                                <th>{val.id_paciente}</th>
                                <th>{val.id_medicos}</th>
                                <th>{val.data}</th>
                            </tr>
                        </table>
                    );
                })}
            </div>

}

            {showr &&
            <div className="container">
                <h1>Farmacos</h1>

                {farmacos.map((val, key) => {
                    return (
                        <div className="m-farmacos" key={key}>
                            <div>{val.id}</div>
                            <div>{val.nome}</div>
                        </div>
                    );
                })}

            </div>
}
            </div> 
        </section>
    )
}