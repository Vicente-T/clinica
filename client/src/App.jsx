
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Registerficha from './pages/Register-ficha'


export default function App() {
  

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register-ficha" element={<Registerficha />} />
          
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}
