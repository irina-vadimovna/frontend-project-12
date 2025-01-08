import useAuth from "../hooks/index.jsx";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const auth = useAuth();

  return (
    <nav class="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className='container'>
        <a className='navbar-brand' href='/'>Hexlet Chat</a>
        {auth.loggedIn && (
        <Link
          onClick={auth.logOut}
          to={'/login'}
          type="button"
          className="btn btn-primary">
          Выйти
        </Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar;
