import { useEffect, useState } from "react"
import { userRequest, getPostsRequest } from "../api/auth"
import "./Profile.css"
import { useNavigate, useParams } from "react-router-dom"
import Post from "../components/Post"

function Profile() {
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState("posts")
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let userData
        if (id) {
          // Obtener perfil de otro usuario
          const res = await fetch(`http://localhost:4000/api/users/${id}`, { credentials: "include" })
          userData = await res.json()
        } else {
          // Perfil propio
          const res = await userRequest()
          userData = res.data
        }
        setUser(userData)
      } catch {
        navigate("/")
      }
    }
    fetchUser()
  }, [id, navigate])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPostsRequest()
        if (id) {
          setPosts(res.data.filter(post => post.user?._id === id))
        } else if (user) {
          setPosts(res.data.filter(post => post.user?._id === user.id || post.user?._id === user._id))
        }
      } catch {
        setPosts([])
      }
    }
    fetchPosts()
  }, [id, user])

  useEffect(() => {
    userRequest().then(res => setAuthUser(res.data)).catch(() => setAuthUser(null))
  }, [])

  if (!user) return <div className="profile-loading">Cargando...</div>

  const diff = posts.reduce((acc, p) => acc + (p.votos_positivos || 0), 0) - posts.reduce((acc, p) => acc + (p.votos_negativos || 0), 0)
  const diffColor = diff < 0 ? 'red' : 'green'

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
              <span className="profile-stat-value" style={{color: diffColor}}>{diff}</span>
              <span className="profile-stat-label">Votos de posts</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{posts.length}</span>
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
          posts.length > 0 ? posts.map(post => <Post key={post._id} post={post} currentUser={authUser && (!id || authUser.id === id || authUser._id === id) ? authUser : null} onPostDeleted={(id) => setPosts(posts.filter(p => p._id !== id))} />) : <div className="profile-placeholder">No hay posts aún.</div>
        )}
        {tab === "respuestas" && <div className="profile-placeholder">No hay respuestas aún.</div>}
        {tab === "comunidades" && <div className="profile-placeholder">No hay comunidades aún.</div>}
      </main>
    </div>
  )
}

export default Profile 