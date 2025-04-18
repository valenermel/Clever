const Sidebar = ({ users }) => {
  return (
    <div className="sidebar left-sidebar">
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {user.isSchool ? (
              <div className="user-avatar school">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            ) : (
              <div className="user-avatar">{user.initial}</div>
            )}
            <span className="user-name">{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar

