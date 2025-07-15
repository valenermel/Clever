import { useState } from "react"
import "../pages/Landing.css"
import { registerRequest, setToken } from "../api/auth"

function Register({ onClose, onRegisterSuccess, onOpenLogin }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await registerRequest({ username, email, password })
      if (res.data) {
        setSuccess(true)
        setLoading(false)
        // Si el backend devuelve token, lo guardamos
        if (res.data.token) setToken(res.data.token)
        setTimeout(() => {
          if (onRegisterSuccess) onRegisterSuccess()
          onClose()
        }, 1200)
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al registrarse. Verifica los datos."
      )
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Crear cuenta</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre completo</label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Ingresa tu nombre y apellido"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="example-text">Ej. Juan Pérez</div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-container">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="example-text">Ej. juanperez@ejemplo.com</div>
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Crea una contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="example-text">Tu contraseña debe tener al menos 6 caracteres</div>
          </div>

          {/* El campo de fecha de nacimiento es solo visual, no se envía al backend */}
 

          {error && <div className="example-text" style={{ color: 'red' }}>{error}</div>}
          {success && <div className="example-text" style={{ color: 'green' }}>¡Registro exitoso!</div>}

          <button className="create-button" type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear"}
          </button>

          <div className="login-link">
            ¿Ya tienes una cuenta? <a href="#" onClick={e => { e.preventDefault(); if (typeof onOpenLogin === 'function') onOpenLogin(); }}>Iniciar Sesión</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
