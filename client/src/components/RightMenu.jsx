import { useState } from "react"
import { useNavigate } from "react-router-dom"

const RightMenu = ({ isVisible, user, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()
  const menuItems = [
    { label: "Perfil", action: () => navigate("/profile") },
    { label: "Amigos" },
    { label: "Grupos" },
    { label: "Tareas" },
    { label: "Clever AI" },
    { label: "Cerrar sesión", action: onLogout },
  ]

  return (
    <div className={`sidebar right-sidebar ${isVisible ? "visible" : "hidden"}`}>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="menu-item"
            onClick={item.action}
            style={{ cursor: item.action ? "pointer" : "default" }}
          >
            {item.label}
          </li>
        ))}
      </ul>
      {showProfile && user && (
        <div className="profile-card">
          <h3>Perfil</h3>
          <div className="profile-row"><b>Usuario:</b> {user.username}</div>
          <div className="profile-row"><b>Email:</b> {user.email}</div>
          <div className="profile-row"><b>Creado:</b> {new Date(user.createdAt).toLocaleDateString()}</div>
          <div className="profile-row"><b>Actualizado:</b> {new Date(user.updatedAt).toLocaleDateString()}</div>
        </div>
      )}
    </div>
  )
}

export default RightMenu

