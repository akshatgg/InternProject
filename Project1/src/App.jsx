import React from 'react';
import './App.css';
import Home from './Component/Home/Home.jsx';
import Footer from './Component/Footer/Footer.jsx'
import Navbar from './Component/Navbar/Navbar.jsx'
const App = () => {
  return (
  <div>
    <Navbar/>
   <Home/>
   <Footer/>
  </div>
  );
};

export default App;
