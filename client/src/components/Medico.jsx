import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Medico() {
    const [paciente, setPaciente] = useState("");
    const [medic, setMedic] = useState("");
    const [pacienteinfo, setPacienteinfo] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [farmacos, setFarmacos] = useState([]);

    Axios.defaults.withCredentials = true;

    const search = () => {
        Axios.get(`http://localhost:3001/pacientesficha/${paciente}`)
            .then((response) => {
                console.log(response);
               
                setPacienteinfo(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const searchconsultas = () => {
        Axios.get(`http://localhost:3001/medicoagenda/${medic}`)
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



    return (
        <div>
            <h1>Medico</h1>
            <div>
                <h2>Ficha de pacientes</h2>
                <label>Insira seu nome</label>
                <input type="text" onChange={(e) => { setPaciente(e.target.value) }} />
                <button onClick={search}>Search</button>

                {pacienteinfo.map((val, key) => {
                    return (
                        <div key={key}>
                            {val.id}
                            {val.pacientename}
                        </div>
                    );
                })}
            </div>
            <div>
                <h2>Agenda consultas</h2>
                <label>Insira seu nome</label>
                <input type="text" onChange={(e) => { setMedic(e.target.value) }} />
                <button onClick={searchconsultas}>Search</button>

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
                <h2>Farmacos</h2>

                {farmacos.map((val, key) => {
                    return (
                        <div key={key}>
                            {val.id}
                            {val.nome}
                        </div>
                    );
                })}

            </div>
        </div>
    )
}