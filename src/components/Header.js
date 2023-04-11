import logoMesto from '../images/header_logo.svg';

function Header() {
  return (
    <header className="header">
        <img className="header__logo" src={logoMesto} alt="Логотип Mesto Russia" />
    </header>
  );
}

export default Header;