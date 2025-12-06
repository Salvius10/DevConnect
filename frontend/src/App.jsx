import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from "./pages/Profile";
import EditPage from './pages/EditPage'
import DeveloperProfile from './pages/DeveloperProfile'
import Developers from './pages/Developers'
import CreatePost from './pages/CreatePost'
import AllPosts from './pages/AllPosts'
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
          <Route path='/developers' element={<ProtectedRoute><Developers/></ProtectedRoute>}/>
          <Route path='/developer/:id' element={<ProtectedRoute><DeveloperProfile/></ProtectedRoute>}/>
          <Route path='/create-post' element={<ProtectedRoute><CreatePost/></ProtectedRoute>}/>
          <Route path="/all-posts" element={<ProtectedRoute><AllPosts /></ProtectedRoute>} />

        </Routes>
    </BrowserRouter>
  )
}

export default App
