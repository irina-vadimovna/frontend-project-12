import { useState, useMemo } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userName, setUsername] = useState(localStorage.getItem('username') || '');

  const logIn = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setLoggedIn(true);
    setUsername(username);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
    setUsername('');
  };

  const authValue = useMemo(
    () => ({
      loggedIn,
      userName,
      logIn,
      logOut,
    }),
    [loggedIn, userName],
  );

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
