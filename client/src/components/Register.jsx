
import "../pages/Landing.css"

function Register({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Crear cuenta</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Nombre completo</label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input type="text" placeholder="Ingresa tu nombre y apellido" />
            </div>
            <div className="example-text">Ej. Juan Pérez</div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-container">
              <span className="input-icon">✉️</span>
              <input type="email" placeholder="Ingresa tu email" />
            </div>
            <div className="example-text">Ej. juanperez@ejemplo.com</div>
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input type="password" placeholder="Crea una contraseña" />
            </div>
            <div className="example-text">Tu contraseña debe tener al menos 8 caracteres</div>
          </div>

          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <div className="input-container">
              <span className="input-icon">📅</span>
              <input type="text" placeholder="DD/MM/AAAA" />
            </div>
            <div className="example-text">Ej. 14/10/2003</div>
          </div>

          <button className="create-button">Crear</button>

          <div className="login-link">
            ¿Ya tienes una cuenta? <a href="#">Iniciar Sesión</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
