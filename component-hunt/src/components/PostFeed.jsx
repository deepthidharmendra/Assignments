import posts from '../data/posts'
import PostCard from './PostCard'

function PostFeed() {
  return (
    <div className="post-feed">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostFeed