import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import routes from './utils/routes';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './components/Pages/MainLayout';
import LoginPage from './pages/LoginPage';
import AuthProvider from './contexts/AuthProvider';
import store from './store/store';
import ChatPage from './pages/ChatPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './contexts/PrivateRoute';

const App = () => (
  <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
    <Provider store={store}>
      <AuthProvider>
        <MainLayout>
          <Routes>
            <Route
              path={routes.mainPagePath()}
              element={(
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )}
            />
            <Route path={routes.loginPagePath()} element={<LoginPage />} />
            <Route path={routes.signUpPagePath()} element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);

export default App;