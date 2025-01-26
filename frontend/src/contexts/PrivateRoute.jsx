import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();

  return loggedIn ? children : <Navigate to={routes.loginPagePath()} />;
};

export default PrivateRoute;
