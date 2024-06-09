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
    Axios.get("http://localhost:3001/login").then((response) => {
      if(response.data.loggedIn === true){ 
        setLoginStatus(response.data.user[0].username)       
      }
    });
  }, [])

  const login = () => {
    Axios.post("http://localhost:3001/login", {
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
    Axios.get("http://localhost:3001/isUserAuth",{
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
        console.log(response)
        navigate("/home");
      })
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      
      <input type="text" placeholder='username' onChange={(e)=>{setUsername(e.target.value)}}/>
      
      <input type="text" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}} />
      <button onClick={login}>Login</button>

      <h1>{loginStatus &&(<button onClick={userAuthenticated}>Check if autheticated</button>)}</h1>

      
    </div>
  )

}