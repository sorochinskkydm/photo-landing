import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Navbar.css';

const NAV_LINKS = [
  { id: 'greeting', label: 'Главная' },
  { id: 'info', label: 'О нас' },
  { id: 'works', label: 'Работы' },
];

export default function Navbar({ onNavigate }) {
  return (
    <nav className="nav">
      <div className="container nav__wrapper">
        <button
          type="button"
          className="nav__logo"
          onClick={() => onNavigate('greeting')}
          aria-label="На главную"
        >
          <img src="/logo.svg" alt="" className="nav__logo-image" />
        </button>
        <div className="nav__links">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.id}
              className="nav__link"
              onClick={() => onNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
          <Link to="/panel" className="nav__link nav__link--muted">
            Админ
          </Link>
          <Button size="small" onClick={() => onNavigate('contacts')}>
            Связаться
          </Button>
        </div>
      </div>
    </nav>
  );
}
