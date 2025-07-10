import { useEffect, useState } from "react"
import { userRequest } from "../api/auth"
import "./Profile.css"
import { useNavigate } from "react-router-dom"

function Profile() {
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState("posts")
  const navigate = useNavigate()

  useEffect(() => {
    userRequest().then(res => setUser(res.data)).catch(() => navigate("/"))
  }, [navigate])

  if (!user) return <div className="profile-loading">Cargando...</div>

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-navbar">
          <h1 className="profile-logo">Clever</h1>
          <img className="profile-logo-icon" src="/logo.png" alt="logo" />
          <div className="profile-search-menu">
            <button className="profile-search-btn">🔍</button>
            <button className="profile-menu-btn">☰</button>
          </div>
        </div>
        <div className="profile-banner">(banner)</div>
        <div className="profile-main-info">
          <img className="profile-avatar" src="/avatar1.png" alt="avatar" />
          <div className="profile-user-info">
            <h2>{user.username}</h2>
            <div className="profile-username">@{user.username?.toLowerCase().replace(/ /g, "")}</div>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-value" style={{color: '#4caf50'}}>15k</span>
              <span className="profile-stat-label">Votos de posts</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">75</span>
              <span className="profile-stat-label">Posts totales</span>
            </div>
          </div>
        </div>
        <div className="profile-tabs">
          <button className={tab==="posts" ? "active" : ""} onClick={()=>setTab("posts")}>Posts</button>
          <button className={tab==="respuestas" ? "active" : ""} onClick={()=>setTab("respuestas")}>Respuestas</button>
          <button className={tab==="comunidades" ? "active" : ""} onClick={()=>setTab("comunidades")}>Comunidades</button>
        </div>
      </header>
      <main className="profile-content">
        {tab === "posts" && (
          <div className="profile-post">
            <div className="profile-post-header">
              <img className="profile-post-avatar" src="/avatar1.png" alt="avatar" />
              <span className="profile-post-username">@{user.username?.toLowerCase().replace(/ /g, "")}</span>
            </div>
            <div className="profile-post-title">Post</div>
            <div className="profile-post-desc">Descripción del post</div>
            <div className="profile-post-image">(imagen)</div>
          </div>
        )}
        {tab === "respuestas" && <div className="profile-placeholder">No hay respuestas aún.</div>}
        {tab === "comunidades" && <div className="profile-placeholder">No hay comunidades aún.</div>}
      </main>
    </div>
  )
}

export default Profile 