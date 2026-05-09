import React from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user') || 'null'));

  const saveAuth = (t, u) => {
    setToken(t);
    setUser(u);
    if (t) localStorage.setItem('token', t); else localStorage.removeItem('token');
    if (u) localStorage.setItem('user', JSON.stringify(u)); else localStorage.removeItem('user');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, user, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
