import React from 'react';
import AuthContext from '../context/AuthContext';

export default function Navbar({ setRoute }) {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <nav>
      <button onClick={() => setRoute('stories')}>Stories</button>
      <button onClick={() => setRoute('bookmarks')} className="secondary">Bookmarks</button>
      <div style={{ flex: 1 }} />
      {user ? (
        <>
          <span className="muted">Signed in as {user.username}</span>
          <button onClick={() => { logout(); setRoute('login'); }} style={{ marginLeft: 8 }}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => setRoute('login')} className="secondary">Login</button>
          <button onClick={() => setRoute('register')} style={{ marginLeft: 8 }}>Register</button>
        </>
      )}
    </nav>
  );
}
