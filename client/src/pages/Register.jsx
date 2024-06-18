import { useEffect,useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Login from './Login'

export default function Register() {

    const navigate = useNavigate();

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [genero, setGenero] = useState("");
    const [NomeCompleto, setNomeCompleto] = useState("");
    const [Contacto, setContato] = useState("");
    const [Email, setEmail] = useState("");
    const [Morada, setMorada] = useState("");
    const [DataDeNascimento, setDataDeNascimento] = useState("");
    

    const [showRegister, setShowRegister] = useState(true);
    const [showFicha, setFicha] = useState(false);


    const register = () => {

      if(usernameReg == "" || passwordReg == ""){
        alert("preencha todos os campos")
        return
      }
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
          username: usernameReg,
          password: passwordReg,
          role: 'paciente',
        }).then((response) => {
          
          console.log(response);
          alert("Cadastrado com sucesso");
          
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
        Login();
      }).catch((error) => {
        console.error(error);
      });
      
    };

    
    const Login = () => {
      navigate("/login");
    }

    const handleshowRegister = () => {
      if(usernameReg == "" || passwordReg == ""){
        
        return
      }
      if (showRegister) {
          
          setShowRegister(false);
          setFicha(true);
      } else {
        
          setShowRegister(true);
          setFicha(true);
      }
  }



    return (
      <section>

        {showRegister &&
        <div className='login-box'>
            <h1>Registo</h1>
            <div className="input-box">
              
              <input type="text" onChange={(e)=>{setUsernameReg(e.target.value)}}  />
              <label > username </label>
            </div>

            <div className="input-box">

              <input type="text" onChange={(e)=>{setPasswordReg(e.target.value)}} />
              <label > password </label>     
            </div>
            
            
            <button className='login-btn' onClick={() => {register(); handleshowRegister();}}>continuar</button>
            <button className='login-btn' onClick={Login}>voltar</button>
        </div>
        }

        {showFicha &&
        <div className='login-box-2'>
            <h1>Registo</h1>
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
            <button className='login-btn' onClick={handleSubmit}>Register</button>
        </div>
        }
      </section>
    )

}