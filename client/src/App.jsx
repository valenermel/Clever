import Landing from './pages/Landing.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { isAuthenticated } from './api/auth'

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />
}

function App() {
  return (
    <>
  
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App

