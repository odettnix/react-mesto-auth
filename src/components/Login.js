import ValidationForm from "../hooks/ValidationForm";
import AuthForm from "./AuthForm";

function Login({login}) {
  
  const {handleChange, errors, formValue } = ValidationForm();

  function handelSubmit(e) {
    e.preventDefault();
    login(formValue.password, formValue.email);
    formValue.password = "";
    formValue.email = "";
  }

  return (
    <main className="content">
        <div className="login">
        <h2 className="login__title">Вход</h2>
        <AuthForm
          onSubmit={handelSubmit}
          disabled={!(errors.email === "" && errors.password === "")}
          buttonText={"Войти"}
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
            minLength="2"
            required
          />
          <span className="popup__input-error">{errors.password}</span>
        </AuthForm>
        </div>
    </main>
  );
}

export default Login;