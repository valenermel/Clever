

import { useState } from "react"
import "./Landing.css"
import Register from "../components/Register.jsx"

function Landing() {
  const [showSignupModal, setShowSignupModal] = useState(false)

  const handleOpenSignup = () => {
    setShowSignupModal(true)
  }

  const handleCloseSignup = () => {
    setShowSignupModal(false)
  }

  return (
    <div id="body">
      <header>
        <h1 id="title">Clever</h1>
        <div id="logo"></div>
      </header>
      <main>
        <div id="computerImg"></div>
        <div id="sloganLoginContainer">
          <h2 id="slogan">
            Organiza, comunica, aprende, <br /> Todo en un solo lugar.
          </h2>
          <div id="loginRegisterContainer">
            <button className="loginButton" id="loginButton" onClick={handleOpenSignup}>
              Crear cuenta
            </button>
            <button className="loginButton" id="registerButton">
              Iniciar sesión
            </button>
          </div>
        </div>
      </main>

      {showSignupModal && <Register onClose={handleCloseSignup} />}
    </div>
  )
}

export default Landing
