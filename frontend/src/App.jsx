import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './slices/AuthContext.jsx';
import { General } from './components/General.jsx';
import { Login } from './components/Login.jsx';
import { NotFound } from './components/NotFoundPage.jsx';


function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuthenticated ? <General /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthProvider>
  );
}

export default App;