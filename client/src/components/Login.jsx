import { useState } from "react"
import "../pages/Landing.css"
import { loginRequest, isAuthenticated } from "../api/auth"

function Login({ onClose, onLoginSuccess, onOpenRegister }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await loginRequest({ email, password })
      setLoading(false)
      // Si la cookie de token está presente, login exitoso
      if (isAuthenticated()) {
        if (onLoginSuccess) onLoginSuccess()
        onClose()
      } else {
        setError("No se pudo iniciar sesión. Intenta de nuevo.")
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al iniciar sesión. Verifica tus datos."
      )
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Iniciar sesión</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
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
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="example-text">Tu contraseña debe tener al menos 8 caracteres</div>
          </div>

          {error && <div className="example-text" style={{ color: 'red' }}>{error}</div>}

          <button className="create-button" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
          <div className="login-link">
            ¿No tienes una cuenta? <a href="#" onClick={e => { e.preventDefault(); if (typeof onOpenRegister === 'function') onOpenRegister(); }}>Regístrate</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login 