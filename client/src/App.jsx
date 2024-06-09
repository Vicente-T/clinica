import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Axios from 'axios'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

export default function App() {
  

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}
