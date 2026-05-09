import React from 'react';
import AuthContext from '../context/AuthContext';
import { apiFetch } from '../api';

export default function Bookmarks() {
  const { token } = React.useContext(AuthContext);
  const [bookmarks, setBookmarks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchBookmarks = async () => {
    setError(null);
    if (!token) return; // protected
    setLoading(true);
    try {
      const data = await apiFetch('/api/stories/me/bookmarks', {}, token);
      setBookmarks(data.bookmarks || []);
    } catch (err) {
      setError(err.message || 'Failed to load bookmarks');
    } finally { setLoading(false); }
  };

  const remove = async (id) => {
    try {
      const data = await apiFetch(`/api/stories/${id}/bookmark`, { method: 'POST' }, token);
      setBookmarks(data.bookmarks || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to update bookmark');
    }
  };

  React.useEffect(() => { fetchBookmarks(); }, [token]);

  if (!token) return <div className="card">Please login to view bookmarks</div>;

  return (
    <div>
      <h3>Bookmarks</h3>
      {loading && <div><span className="spinner"/> Loading bookmarks...</div>}
      {error && <div className="error">{error}</div>}
      {bookmarks.length === 0 && !loading && <div className="muted">No bookmarks yet</div>}
      {bookmarks.map(b => (
        <div key={b._id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href={b.url} target="_blank" rel="noreferrer"><b>{b.title}</b></a>
            <button onClick={() => remove(b._id)} className="bookmark-btn bookmark-on">Remove</button>
          </div>
          <div className="muted">Points: {b.points} — {b.author} — {b.postedAt}</div>
        </div>
      ))}
    </div>
  );
}
