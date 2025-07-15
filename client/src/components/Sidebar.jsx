import { Link } from 'react-router-dom'

const Sidebar = ({ users }) => {
  return (
    <div className="sidebar left-sidebar">
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <Link to={`/profile/${user._id}`} style={{display:'flex',alignItems:'center',textDecoration:'none',color:'inherit',width:'100%'}}>
              <div className="user-avatar">
                {user.username ? user.username.charAt(0).toUpperCase() : '?'}
              </div>
              <span className="user-name">{user.username}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar

