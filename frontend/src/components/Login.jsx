import { Formik, Field, Form } from "formik";

export const Login = () => {
  return (
    <form className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">Войти</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => { // здесь что-то при отправке формы
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <div className="form-floating mb-3">
            <Field
              type="username"
              name="username"
              autocomplete="username"
              required placeholder="Ваш ник"
              id="username"
              className="form-control"
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
              className="form-control"
            />
            <label htmlFor="password">Пароль</label>
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
        </Form>
      </Formik>
    </form>
  );
}

