import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from "./pages/Profile";
import EditPage from './pages/EditPage'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/edit-profile" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />

        </Routes>
    </BrowserRouter>
  )
}

export default App
