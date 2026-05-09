import React from 'react';
import AuthContext from '../context/AuthContext';
import { apiFetch } from '../api';

export default function Login({ onDone }) {
  const { saveAuth } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) return setError('Email and password are required');
    setLoading(true);
    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (data.token) {
        saveAuth(data.token, data.user);
        if (onDone) onDone();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400 }} className="card">
      <h3>Login</h3>
      <div className="form-row">
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button type="submit" disabled={loading}>{loading ? <span className="spinner"/> : 'Login'}</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
