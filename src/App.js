import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Stories from './pages/Stories';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookmarks from './pages/Bookmarks';
import Navbar from './components/Navbar';

function App() {
  const [route, setRoute] = React.useState('stories');

  return (
    <AuthProvider>
      <div className="container">
        <Navbar setRoute={setRoute} />
        {route === 'stories' && <Stories />}
        {route === 'bookmarks' && <Bookmarks />}
        {route === 'login' && <Login onDone={() => setRoute('stories')} />}
        {route === 'register' && <Register onDone={() => setRoute('login')} />}
      </div>
    </AuthProvider>
  );
}

export default App;
