import { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';



export default function Register() {

    const navigate = useNavigate();

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    
    
    
    const register = () => {
      navigate("/login");
        Axios.post("http://localhost:3001/register", {
          username: usernameReg,
          password: passwordReg,
        }).then((response) => {
          console.log(response);
        })
    }

    return (
        <div className='login'>
            <h1>Registration</h1>
            <label > username </label>
            <input type="text" onChange={(e)=>{setUsernameReg(e.target.value)}}  />
            <label > password </label>
            <input type="text" onChange={(e)=>{setPasswordReg(e.target.value)}}/>
      
            <button onClick={register}>Register</button>
        </div>
    )

}