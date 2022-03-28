import React,{ useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImage from './images/bitLogo.png';
import ReactSession from 'react-client-session/dist/ReactSession';
import { UserContext } from './UserContext';
import discboardpic from './images/discboard.png';

// navbar for the entire website
function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [userName, setUserName] = useState('Login/Registerx');

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  console.log(userName)
  const {value,setValue} = useContext(UserContext);

  return (
    <>
      <nav className='navbar'>
      <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
      <img src={logoImage} alt='' width={168} height={82} />
      </Link>
        
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/login-form' className='nav-links' onClick={closeMobileMenu}>
            {value}
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/information' className='nav-links' onClick={() => { closeMobileMenu();}}>
              Introduction
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/sorting-algorithms' className='nav-links' onClick={closeMobileMenu}>
              Sorting Algorithms
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/shortest-path-algorithms' className='nav-links' onClick={closeMobileMenu}>
              Path Finding Algorithms
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/data-structures' className='nav-links' onClick={closeMobileMenu}>
              Data Structures
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/comments' className='nav-links' onClick={closeMobileMenu}>
            <img src={discboardpic} alt='comment' width={90} height={68} style={{marginTop:"30px"}} />
            </Link>
          </li>
          {/* <li className='nav-item'>
            <Link to='/login-form' className='nav-links' onClick={closeMobileMenu}>
              Login/Register
            </Link>
          </li> */}
          {/* <li className='nav-item' onClick={closeMobileMenu}>
          {ReactSession.get("username")}
          </li> */}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;