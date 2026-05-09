import React from 'react';
import StoryItem from '../components/StoryItem';
import AuthContext from '../context/AuthContext';
import { apiFetch } from '../api';

export default function Stories() {
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [bookmarks, setBookmarks] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState({ page: 1, limit: 10, totalPages: 1, totalStories: 0 });
  const { token } = React.useContext(AuthContext);

  const fetchStories = async (pageNumber = page) => {
    setError(null);
    setLoading(true);
    try {
      const data = await apiFetch(`/api/stories?page=${pageNumber}&limit=10`);
      setStories(data.stories || []);
      setPagination(data.pagination || { page: pageNumber, limit: 10, totalPages: 1, totalStories: 0 });
    } catch (err) {
      setError(err.message || 'Failed to load stories');
    } finally { setLoading(false); }
  };

  const fetchBookmarks = async () => {
    if (!token) { setBookmarks([]); return; }
    try {
      const data = await apiFetch('/api/stories/me/bookmarks', {}, token);
      setBookmarks((data.bookmarks || []).map(b => b._id));
    } catch (err) {
      // ignore bookmark load errors for now
    }
  };

  const toggle = async (id) => {
    if (!token) return alert('Please login to bookmark');
    try {
      const data = await apiFetch(`/api/stories/${id}/bookmark`, { method: 'POST' }, token);
      setBookmarks((data.bookmarks || []).map(b => b._id));
    } catch (err) {
      throw err;
    }
  };

  React.useEffect(() => { fetchStories(page); }, [page]);
  React.useEffect(() => { fetchBookmarks(); }, [token]);

  const goPrev = () => setPage((current) => Math.max(current - 1, 1));
  const goNext = () => setPage((current) => Math.min(current + 1, pagination.totalPages));

  return (
    <div>
      <h3>Top Stories</h3>
      {loading && <div><span className="spinner"/> Loading stories...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && stories.length === 0 && <div className="muted">No stories found</div>}
      <div>
        {stories.map(s => (
          <StoryItem key={s._id} story={s} onToggle={toggle} bookmarked={bookmarks.includes(s._id)} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <span className="muted">
          Page {pagination.page} of {pagination.totalPages} · {pagination.totalStories} stories
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={goPrev} className="secondary" disabled={page <= 1 || loading}>Previous</button>
          <button onClick={goNext} disabled={page >= pagination.totalPages || loading}>Next</button>
        </div>
      </div>
    </div>
  );
}
