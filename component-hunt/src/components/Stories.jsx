import { stories } from '../data/posts'

function Stories() {
  return (
    <div className="stories-container">
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <div className={`story-avatar ${story.isYou ? 'your-story' : ''}`}>
            {story.avatar}
            {story.isYou && <span className="story-add">+</span>}
          </div>
          <span className="story-user">{story.user}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories