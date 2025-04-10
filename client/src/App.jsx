import Landing from './pages/Landing.jsx'
import Home from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'


import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}



export default App

