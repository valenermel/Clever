

import { useState } from "react"
import "./Landing.css"
import Register from "../components/Register.jsx"
import Login from "../components/Login.jsx"
import { useNavigate } from "react-router-dom"

function Landing() {
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const navigate = useNavigate()

  const handleOpenSignup = () => {
    setShowSignupModal(true)
  }

  const handleCloseSignup = () => {
    setShowSignupModal(false)
  }

  const handleOpenLogin = () => {
    setShowLoginModal(true)
  }

  const handleCloseLogin = () => {
    setShowLoginModal(false)
  }

  const handleLoginSuccess = () => {
    navigate("/home")
  }

  const handleRegisterSuccess = () => {
    navigate("/home")
  }
    

  return (
    <div id="body">
      <header id="header">
        <h1 id="title">Clever</h1>
        <img id="logo" src="/logo.png"/>
      </header>
      <main>
        <img id="computerImg" src="/dispositivos.jpg"/>
        <div id="sloganLoginContainer">
          <h2 id="slogan">
            Organiza, comunica, aprende, <br /> Todo en un solo lugar.
          </h2>
          <div id="loginRegisterContainer">
            <button className="loginButton zoom" id="loginButton" onClick={handleOpenSignup}>
              Crear cuenta
            </button>
            <button className="loginButton zoom" id="registerButton" onClick={handleOpenLogin}>
              Iniciar sesión
            </button>
          </div>
        </div>
      </main>

      {showSignupModal && <Register onClose={handleCloseSignup} onRegisterSuccess={handleRegisterSuccess} onOpenLogin={() => { setShowSignupModal(false); setShowLoginModal(true); }} />}
      {showLoginModal && <Login onClose={handleCloseLogin} onLoginSuccess={handleLoginSuccess} onOpenRegister={() => { setShowLoginModal(false); setShowSignupModal(true); }} />}
    </div>
  )
}

export default Landing
