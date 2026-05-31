import { useState } from 'react'

function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [saved, setSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <div className="post-card">

      {/* Post Header */}
      <div className="post-header">
        <div className="post-user-info">
          <div className="post-avatar">{post.avatar}</div>
          <div>
            <p className="post-username">{post.user}</p>
            <p className="post-time">{post.time}</p>
          </div>
        </div>
        <button className="more-btn">•••</button>
      </div>

      {/* Post Image */}
      <div className="post-image">{post.image}</div>

      {/* Post Actions */}
      <div className="post-actions">
        <div className="action-left">
          <button className={`action-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
            {liked ? '❤️' : '🤍'}
          </button>
          <button className="action-btn" onClick={() => setShowComments(!showComments)}>
            💬
          </button>
          <button className="action-btn">📤</button>
        </div>
        <button className={`action-btn ${saved ? 'saved' : ''}`} onClick={() => setSaved(!saved)}>
          {saved ? '🔖' : '🏷️'}
        </button>
      </div>

      {/* Likes */}
      <p className="post-likes">{likes.toLocaleString()} likes</p>

      {/* Caption */}
      <p className="post-caption">
        <span className="post-username">{post.user}</span> {post.caption}
      </p>

      {/* Comments */}
      {showComments && (
        <div className="post-comments">
          {post.comments.map((comment, i) => (
            <p key={i} className="comment">
              <span className="post-username">{comment.user}</span> {comment.text}
            </p>
          ))}
        </div>
      )}

      {/* Add Comment */}
      <div className="add-comment">
        <input type="text" placeholder="Add a comment..." className="comment-input" />
        <button className="post-btn">Post</button>
      </div>

    </div>
  )
}

export default PostCard