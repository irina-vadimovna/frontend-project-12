import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { General } from './pages/General.jsx';
import { Login } from './pages/Login.jsx';
import { NotFound } from './pages/NotFoundPage.jsx';
import AuthProvider, { PrivateRoute } from './context/AuthProvider.jsx';


function App() {
  return (
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}>
      <div className="d-flex h-100 flex-column">
        <AuthProvider>
          <Routes>
            <Route path={'/'} element={(
              <PrivateRoute>
                <General />
              </PrivateRoute>
              )} 
            />
            <Route path={'/login'} element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;