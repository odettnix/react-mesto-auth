import logoMesto from '../images/header_logo.svg';
import {Route, Link, Routes } from 'react-router-dom';

function Header({userEmail, signOut}) {
  return (
    <header className="header">
        <img className="header__logo" src={logoMesto} alt="Логотип Mesto Russia" />
        <Routes>
          <Route path="/sign-up" element={
            <Link to={"/sign-in"} className="header__navLink header__navLink_active">Войти</Link>}/>
          <Route path="/sign-in" element={
            <Link to={"/sign-up"} className="header__navLink header__navLink_active">Регистрация</Link>}/>
          <Route path="/" element={
            <div className="header__userElements">
              <p className="header__userElements-email">{userEmail}</p>
              <button onClick={signOut} className="header__userElements-logout">Выйти</button>
            </div>
          }/>
        </Routes>
    </header>
  );
}

export default Header;