import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route,useParams } from 'react-router-dom';
import Profile from './Component/Userprofile/profile.jsx';
import './App.css'
import User from "./Component/Alluser/user.jsx"
function App() {
  return (
    <div>
      <Router>
         <Routes>
            <Route path="" element={<User/>} />
            <Route path="/user/:id" element={<Profile/>}/>
         </Routes>
      </Router>



    </div>
  )
}

export default App
