function AuthForm({disabled, onSubmit, children, buttonText}) {
    return (
      <form className="form form__login" onSubmit={onSubmit} noValidate>
        {children}
        <button disabled = {disabled} className = {disabled ? "login__button login__button_inactive" : "login__button"} type="submit">
          {buttonText}
        </button>
      </form>
    );
  }
  
export default AuthForm;