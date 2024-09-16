import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import images from '../utils/images';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const dispatch = useDispatch();

  const handleLinkClicked = (index) => {
    setActiveLink(index);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    // Check if the click was inside the menu icon or links container
    if (isOpen && !event.target.closest('.nav') && !event.target.closest('.links')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="nav">
        <div className="logo">
          <img className='logo-pic' src={images.leagueLogo}/>
        </div>
        <div className='sign-in'>
          <img className='profile' src={images.profile} />
          <p>Sign in</p>
        </div>
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <span className={`icon-bar ${isOpen ? 'rotate' : ''}`}></span>
          <span className={`icon-bar ${isOpen ? 'fade-out' : ''}`}></span>
          <span className={`icon-bar ${isOpen ? 'rotate-reverse' : ''}`}></span>
        </div>
        <div className={`links ${isOpen ? 'open' : ''}`}>
          <ul className="side-links">
            <li className={`side-link ${activeLink === 1 ? 'active' : ''}`} onClick={() => handleLinkClicked(1)}>
              <Link className="link" to="/home">Home</Link>
            </li>
            <li className={`side-link ${activeLink === 2 ? 'active' : ''}`} onClick={() => handleLinkClicked(2)}>
              <Link className="link" to="/clubs">Clubs</Link>
            </li>
            <li className={`side-link ${activeLink === 3 ? 'active' : ''}`} onClick={() => handleLinkClicked(3)}>
              <Link className="link" to="https://www.ghanafa.org/category/premier-league">GH - Premier League</Link>
            </li>
            <li className={`side-link ${activeLink === 4 ? 'active' : ''}`} onClick={() => handleLinkClicked(4)}>
              <Link className="link" to="/resource">Resource Center</Link>
            </li>
            <li className={`side-link ${activeLink === 5 ? 'active' : ''}`} onClick={() => handleLinkClicked(5)}>
              <Link className="link" to="/webinars">Webinars</Link>
            </li>
            <li className={`side-link ${activeLink === 6 ? 'active' : ''}`} onClick={() => handleLinkClicked(6)}>
              <Link className="link" to="/about">About Us</Link>
            </li>
          </ul>
        </div>
        {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
      </nav>
      <div className="outlet"><Outlet /></div>
    </>
  );
}

export default Navbar;
