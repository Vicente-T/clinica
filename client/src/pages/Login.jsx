import { useEffect,useState } from 'react'
import Axios from 'axios'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  Axios.defaults.withCredentials = true
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/login`).then((response) => {
      if(response.data.loggedIn === true){ 
        setLoginStatus(response.data.user[0].username)       
      }
    });
  }, [])

  const login = () => {
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      username: username,
      password: password,
    }).then((response) => {
      if(response.data.auth === false) {
          setLoginStatus(false);
      } else {
        setLoginStatus(true);
        localStorage.setItem("token",response.data.token);
        
      }

      
    });
  }

  const userAuthenticated = () => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/isUserAuth`,{
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
        console.log(response)
        navigate("/home");
      })
  }

  return (
    <section>
      <div className='login-box'>
        <h1>Login</h1>
        

        <div className="input-box">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="1em" width="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
          <input type="text"  onChange={(e)=>{setUsername(e.target.value)}} required/>
          <label htmlFor="username">username</label>
        </div>
        
        <div className="input-box">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" height="1em" width="1em" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
          <span className="icon"></span>
          <input type="password"  onChange={(e)=>{setPassword(e.target.value)}} required />
          <label htmlFor="Password">Password</label>
        </div>

      
        <button className='login-btn' onClick={login}>Login</button>
        <div className='register-link'>
              <p>Não tens conta?</p>
              <button  onClick={() => navigate("/register")}>Registar</button>
        </div>
        <h1 >{loginStatus &&(<button className='login-status' onClick={userAuthenticated}>Check if autheticated</button>)}</h1>

        
      </div>
    </section>
  )

}