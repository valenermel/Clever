"use client"

import { useState } from "react"
import { Search, Menu } from "lucide-react"
import "./Home.css"
import Sidebar from "../components/Sidebar"
import Post from "../components/Post"
import RightMenu from "../components/RightMenu"




// Datos de ejemplo
const users = [
  { id: 1, name: "Escuela Técnica 36", initial: "", isSchool: true },
  { id: 2, name: "Enzo Stella", initial: "E" },
  { id: 3, name: "Alan Uzal", initial: "A" },
  { id: 4, name: "Alejandra Masgoret", initial: "A" },
  { id: 5, name: "Marcelo Ortiz Pla", initial: "M" },
  { id: 6, name: "Mercedes Gutierrez", initial: "M" },
]

const posts = [
  {
    id: 1,
    username: "@username1",
    title: "Post",
    description: "Descripción del post",
    avatar: "/avatar1.png",
  },
  {
    id: 2,
    username: "@matiasjs",
    title: "Post",
    description: "Descripción del post",
    avatar: "/avatar2.png",
    image: "/image.png",
  },
]

function Home() {
  const [showRightMenu, setShowRightMenu] = useState(false)

  const toggleRightMenu = () => {
    setShowRightMenu(!showRightMenu)
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <h1>Clever</h1>
          <img className="logo-icon" src="/logo.png" alt="" />
        </div>
        <div className="header-actions">
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
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </main>

        <RightMenu isVisible={showRightMenu} />
      </div>
    </div>
  )
}
export default Home