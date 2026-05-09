import React from 'react';
import { apiFetch } from '../api';

export default function Register({ onDone }) {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!username || !email || !password) return setError('All fields are required');
    setLoading(true);
    try {
      const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      if (data) {
        alert('Registered successfully — please login');
        if (onDone) onDone();
      } else {
        setError(data.message || 'Register failed');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400 }} className="card">
      <h3>Register</h3>
      <div className="form-row">
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button type="submit" disabled={loading}>{loading ? <span className="spinner"/> : 'Register'}</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
