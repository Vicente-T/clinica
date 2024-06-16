import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registerficha() {
  const navigate = useNavigate();

  
  const [genero, setGenero] = useState("");
  const [peso, setPeso] = useState("");
  const [alergias, setAlergias] = useState("");
  const [idade, setIdade] = useState("");
  const pacientename = "Manuel" ;

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setName(response.data.user[0].username);
      }
      console.log(pacientename);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      await Axios.put(`http://localhost:3001/register-ficha/${pacientename}`, {
        genero,
        peso,
        alergias,
        idade,
      });
      console.log("Registration successful");
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <h2>Ficha do paciente</h2>
      <div>
        <label htmlFor="genero">genero</label>
        <input type="text" onChange={(e) => setGenero(e.target.value)} />
      </div>
      <div>
        <label htmlFor="peso">peso</label>
        <input type="text" onChange={(e) => setPeso(e.target.value)} />
      </div>
      <div>
        <label htmlFor="alergias">alergias</label>
        <input type="text" onChange={(e) => setAlergias(e.target.value)} />
      </div>
      <div>
        <label htmlFor="idade">idade</label>
        <input type="text" onChange={(e) => setIdade(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}