import { Link } from 'react-router-dom'
import { votePostRequest, deletePostRequest } from '../api/auth'
import { useState } from 'react'

const Post = ({ post, currentUser, onPostDeleted }) => {
  const [votosPos, setVotosPos] = useState(post.votos_positivos || 0)
  const [votosNeg, setVotosNeg] = useState(post.votos_negativos || 0)
  const [deleting, setDeleting] = useState(false)
  const [userVote, setUserVote] = useState(() => {
    if (!currentUser || !post.votedBy) return null
    const found = post.votedBy.find(v => v.user === currentUser.id || v.user === currentUser._id)
    return found ? found.type : null
  })
  const [error, setError] = useState("")

  const handleVote = async (type) => {
    setError("")
    try {
      const res = await votePostRequest(post._id, type)
      setVotosPos(res.data.votos_positivos)
      setVotosNeg(res.data.votos_negativos)
      if (currentUser && res.data.votedBy) {
        const found = res.data.votedBy.find(v => v.user === currentUser.id || v.user === currentUser._id)
        setUserVote(found ? found.type : null)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al votar")
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres borrar este post?')) return
    setDeleting(true)
    try {
      await deletePostRequest(post._id)
      if (onPostDeleted) onPostDeleted(post._id)
    } catch {}
    setDeleting(false)
  }

  const diff = votosPos - votosNeg
  const diffColor = diff < 0 ? 'red' : 'green'

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.user?.avatar || "/avatar1.png"}
          alt={post.user?.username || post.username}
          className="post-avatar"
          onError={(e) => {
            e.target.src = `/placeholder.svg?height=40&width=40`
          }}
        />
        {post.user ? (
          <Link to={`/profile/${post.user._id}`} className="post-username">
            @{post.user.username}
          </Link>
        ) : (
          <span className="post-username">{post.username}</span>
        )}
        {currentUser && post.user && (currentUser.id === post.user._id || currentUser._id === post.user._id) && (
          <button onClick={handleDelete} disabled={deleting} style={{marginLeft: 'auto', color: 'red', border: 'none', background: 'none', cursor: 'pointer'}}>🗑️</button>
        )}
      </div>
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-description">{post.description}</p>
        <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.4rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
              <button
                onClick={() => handleVote('up')}
                disabled={userVote === 'up'}
                style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center'}}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5L6 13H18L12 5Z" fill={userVote === 'up' ? '#27ae60' : '#bdbdbd'} stroke={userVote === 'up' ? '#27ae60' : '#bdbdbd'} strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </button>
              <span style={{fontWeight:500}}>{votosPos}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
              <button
                onClick={() => handleVote('down')}
                disabled={userVote === 'down'}
                style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center'}}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 19L6 11H18L12 19Z" fill={userVote === 'down' ? '#e74c3c' : '#bdbdbd'} stroke={userVote === 'down' ? '#e74c3c' : '#bdbdbd'} strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </button>
              <span style={{fontWeight:500}}>{votosNeg}</span>
            </div>
          </div>
        </div>
        {error && <div style={{color: 'red', fontSize: '0.9rem'}}>{error}</div>}
        {post.image && (
          <div className="post-image-container">
            <div className="post-image">(Imagen)</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Post

