import React,{ useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import './NavbarBackend.css';
import logoImage from './images/backendlogo.png';
import { UserContext } from './UserContext';

// navbar for backend
function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const adminLogout = () => {
    localStorage.removeItem("adminusername")
  }

  return (
    <>
      <nav className='navbarb'>
      <img draggable="false" src={logoImage} alt='DSA' width={168} height={82} />
        
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/manage-users' className='navb-links' onClick={() => { closeMobileMenu();}}>
              Manage Users
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/manage-discussion' className='navb-links' onClick={closeMobileMenu}>
              Manage Discussion
            </Link>
          </li>
          <li className='nav-item'>
          <a href="/admin" className="navb-links" onClick={adminLogout}>
              Log-out
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;