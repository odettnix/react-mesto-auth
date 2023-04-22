import {Link} from "react-router-dom";
import AuthForm from "./AuthForm";
import ValidationForm from "../hooks/ValidationForm";

function Register({register}) {

  const {handleChange, errors, formValue } = ValidationForm();

  function handelSubmit(e) {
    e.preventDefault();
    register(formValue.password, formValue.email);
    formValue.password = "";
    formValue.email = "";
  }

  return (
    <main className="content">
      <div className="login">
      <h2 className="login__title">Регистрация</h2>
        <AuthForm
          onSubmit={handelSubmit}
          disabled={!(errors.email === "" && errors.password === "")}
          buttonText={"Зарегистрироваться"}
        >
          <input
            id="email"
            className="login__input"
            name="email"
            type="email"
            placeholder="Email"
            value={formValue.email || ''}
            onChange={handleChange}
            autoComplete="off"
            minLength="2"
            required
          />
          <span className="popup__input-error">{errors.email}</span>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            className="login__input"
            value={formValue.password || ''}
            onChange={handleChange}
            minLength="4"
            required
          />
          <span className="popup__input-error">{errors.password}</span>
         
        </AuthForm>
        <Link to="/sign-in" className="login__paragraph">Уже зарегистрировались? Войти</Link>
        </div>
    </main>
  );
} 

export default Register;
