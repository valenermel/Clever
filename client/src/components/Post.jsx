const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.avatar || "/placeholder.svg"}
          alt={post.username}
          className="post-avatar"
          onError={(e) => {
            e.target.src = `/placeholder.svg?height=40&width=40`
          }}
        />
        <span className="post-username">{post.username}</span>
      </div>
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-description">{post.description}</p>

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

