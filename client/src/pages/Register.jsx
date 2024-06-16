import { useEffect,useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Login from './Login';




export default function Register() {

    const navigate = useNavigate();

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    

   
    
    
    
    const register = () => {

      if(usernameReg == "" || passwordReg == ""){
        alert("preencha todos os campos")
        return
      }
        Axios.post("http://localhost:3001/register", {
          username: usernameReg,
          password: passwordReg,
          role: 'paciente',
        }).then((response) => {
          console.log(response);
          
         
          
        })

        
    }

    const userAuthenticated = () => {
      console.log("entrou")
          Axios.post("http://localhost:3001/register-ficha", {
            pacientename: usernameReg,
          }).then((response) => {
            console.log(response);  
            navigate("/login");
          })
          
        
          
    }
    const Login = () => {
      navigate("/login");
    }


    
   

    return (
      <section>
        <div className='login-box'>
            <h1>Registration</h1>
            <div className="input-box">
              
              <input type="text" onChange={(e)=>{setUsernameReg(e.target.value)}}  />
              <label > username </label>
            </div>

            <div className="input-box">

              <input type="text" onChange={(e)=>{setPasswordReg(e.target.value)}} />
              <label > password </label>     
            </div>
            <div>
              <input type="checkbox" required onClick={register}></input>
              <label className='checkbox' >Aceita os Termos de Serviço</label>
            </div>
            
            <button className='login-btn' onClick={userAuthenticated}>Registar</button>
            <button className='login-btn' onClick={Login}>voltar</button>
        </div>
      </section>
    )

}