const RightMenu = ({ isVisible }) => {
  const menuItems = ["Perfil", "Amigos", "Grupos", "Tareas", "Clever AI", "Cerrar sesión"]

  return (
    <div className={`sidebar right-sidebar ${isVisible ? "visible" : "hidden"}`}>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RightMenu

