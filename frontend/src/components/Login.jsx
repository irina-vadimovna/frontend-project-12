import { Formik, Field, Form, useFormik } from "formik";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../slices/AuthContext.jsx";
import avatar from '../assets/avatar.jpg';

const setErrorMessage = (error) => {
  switch (error) {
    case 'ERR_BAD_REQUEST':
      return 'Неверные имя пользователя или пароль';
    case 'ERR_NETWORK':
      return 'Ошибка сети';
    default:
      return 'Неопознанная ошибка';
  }
};

// const useAuth = () => useContext(AuthContext);

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const submitForm = async ({ username, password }) => {
    try {
      const response = await axios.post('/api/v1/login', { username, password });
      localStorage.setItem(
        'user',
        JSON.stringify({ token: response.data.token, username: response.data.username }),
      );
      navigate('/');
    } catch (error) {
      setError(setErrorMessage(error.code));
      navigate('/login');
    }
  };


  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light br-white">
        <div className="container">
          <a className="navbar-brand" href="#">Hexlet Chat</a>
          <button type="button" className="btn btn-primary">Выйти</button>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={avatar} className="rounded-circle" alt="Войти" />
                </div>
                <form className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <Formik initialValues={{ username: '', password: '' }} 
                  onSubmit={ (values) => {
                    alert(JSON.stringify(values, null, 2));
                    submitForm({ username: values.username, password: values.password })
                  }}>
                    <Form>
                      <div className="form-floating mb-3">
                        <Field
                          type="username"
                          name="username"
                          autocomplete="username"
                          required placeholder="Ваш ник"
                          id="username"
                          className={`form-control ${error ? 'is-invalid' : ''}`}
                        />
                        <label htmlFor="username">Ваш ник</label>
                      </div>
                      <div className="form-floating mb-4">
                        <Field
                          type="password"
                          name="password"
                          autocomplete="current-password"
                          required placeholder="Пароль"
                          id="password"
                          className={`form-control ${error ? 'is-invalid' : ''}`}
                        />
                        <label htmlFor="password">Пароль</label>
                        <div className="invalid-tooltip">{error}</div>
                      </div>
                      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                    </Form>
                  </Formik>
                </form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

