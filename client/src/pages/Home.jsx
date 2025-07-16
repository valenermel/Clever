"use client"

import { useState, useEffect } from "react"
import { Search, Menu } from "lucide-react"
import "./Home.css"
import Sidebar from "../components/Sidebar"
import Post from "../components/Post"
import RightMenu from "../components/RightMenu"
import { userRequest, removeToken, logoutRequest, getPostsRequest, createPostRequest, getAllUsersRequest } from "../api/auth"
import { useNavigate } from "react-router-dom"




function Home() {
  const [showRightMenu, setShowRightMenu] = useState(false)
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ title: "", description: "" })
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    userRequest()
      .then(res => setUser(res.data))
      .catch(() => {
        removeToken()
        navigate("/")
      })
    getAllUsersRequest()
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]))
  }, [navigate])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await getPostsRequest()
      setPosts(res.data)
    } catch (err) {
      setPosts([])
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    if (!newPost.title || !newPost.description) return
    try {
      await createPostRequest(newPost)
      setNewPost({ title: "", description: "" })
      fetchPosts()
    } catch (err) {
      alert(err)
    }
  }

  const toggleRightMenu = () => {
    setShowRightMenu(!showRightMenu)
  }

  const handleLogout = async () => {
    await logoutRequest()
    removeToken()
    navigate("/")
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <h1>Clever</h1>
          <img className="logo-icon" src="/logo.png" alt="" />
        </div>
        <div className="header-actions">
          {user && <span className="user-header">{user.username}</span>}
          <button className="icon-button">
            <Search size={24} color="white" />
          </button>
          <button className="icon-button" onClick={toggleRightMenu}>
            <Menu size={24} color="white" />
          </button>
        </div>
      </header>

      <div className="content">
        <Sidebar users={users} />

        <main className="main-content">
          {/* Formulario para crear post */}
          <form onSubmit={handleCreatePost} className="post post-creator-form">
            <div className="post-header">
              <div className="post-avatar" style={{display:'flex',alignItems:'center',justifyContent:'center',background:'#e5e9f0'}}>
                <span role="img" aria-label="avatar" style={{fontSize:'1.3rem'}}>👤</span>
              </div>
              <span className="post-username">@{user?.username || 'usuario'}</span>
            </div>
            <div className="post-content">
              <input
                className="post-title post-creator-title"
                placeholder="Escribe un título..."
                value={newPost.title}
                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                required
                maxLength={60}
                style={{marginBottom:'0.5rem'}}
              />
              <textarea
                className="post-description post-creator-desc"
                placeholder="Describe tu publicación..."
                value={newPost.description}
                onChange={e => setNewPost({ ...newPost, description: e.target.value })}
                required
                rows={3}
                style={{marginBottom:'0.7rem'}}
              />
              <div style={{display:'flex',justifyContent:'flex-end'}}>
                <button type="submit" className="post-creator-btn">Publicar</button>
              </div>
            </div>
          </form>
          {posts.map((post) => (
            <Post key={post._id} post={post} currentUser={user} onPostDeleted={(id) => setPosts(posts.filter(p => p._id !== id))} />
          ))}
        </main>

        <RightMenu isVisible={showRightMenu} user={user} onLogout={handleLogout} />
      </div>
    </div>
  )
}
export default Home