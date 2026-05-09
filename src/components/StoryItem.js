import React from 'react';
import AuthContext from '../context/AuthContext';

export default function StoryItem({ story, onToggle, bookmarked }) {
  const { token } = React.useContext(AuthContext);

  const handleBookmark = async () => {
    if (!token) return alert('Login required');
    try {
      await onToggle(story._id);
    } catch (err) {
      alert(err.message || 'Unable to update bookmark');
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href={story.url} target="_blank" rel="noreferrer"><b>{story.title}</b></a>
        <button onClick={handleBookmark} className={`bookmark-btn ${bookmarked ? 'bookmark-on' : ''}`}>
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div>
      <div className="muted">Points: {story.points} — Author: {story.author} — {story.postedAt}</div>
    </div>
  );
}
