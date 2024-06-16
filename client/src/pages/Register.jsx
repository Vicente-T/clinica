import { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function Register() {

    const navigate = useNavigate();

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
   
    
    
    
    const register = () => {

        Axios.post("http://localhost:3001/register", {
          username: usernameReg,
          password: passwordReg,
          role: 'paciente',
        }).then((response) => {
          console.log(response);
        })
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

              <input type="text" onChange={(e)=>{setPasswordReg(e.target.value)}}/>
              <label > password </label>     
            </div>
      
            <button className='login-btn' onClick={register}>Register</button>
        </div>
      </section>
    )

}