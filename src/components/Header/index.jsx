import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './Header.css'

function Header({ children, direita }) {
  return (
    <header className="header-component">
      <h1>LOGO</h1>
      {children}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favoritos">Favoritos</Link></li>
        {direita}
      </ul>
    </header>
  )
}

Header.propTypes = {
  children: PropTypes.node,
  direita: PropTypes.node,
}

export default Header;
