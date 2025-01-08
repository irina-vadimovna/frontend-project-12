import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { General } from './pages/General.jsx';
import { Login } from './pages/Login.jsx';
import { NotFound } from './pages/NotFoundPage.jsx';
import AuthProvider, { PrivateRoute } from './context/AuthProvider.jsx';
import NavBar from './components/NavBar.jsx';


function App() {
  return (
    <BrowserRouter>
      <div class="d-flex flex-column h-100">
        <NavBar />
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