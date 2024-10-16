import { Link, useLocation } from "react-router-dom";
import images from "../utils/images";

const Header = () => {
  const location = useLocation();
  
  return(
    <header>
        <video autoPlay loop muted className="background-video">
          <source src={images.bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="ll-container">
          <img className="league-logo" src={images.leagueLogo} alt="league-logo" />
        </div>
        <div className="bg-overlay"></div>
        <div className="overlay-content">
          <div className="banner-pics">
            <img className="banner-pic1" src={images.bannerPic} alt="banner-pic" />
          </div>
          <h1 className="header-title">GPL Play</h1>
          <div className="header-links-ctn">
            <div className="header-links">
              <Link
                to="/summary"
                className={`nav-link ${location.pathname === '/summary' ? 'active-link' : ''}`}
              >
                Summary
              </Link>
              <Link
                to="/summary/points"
                className={`nav-link ${location.pathname === '/summary/points' ? 'active-link' : ''}`}
              >
                Points
              </Link>
              <Link
                to="/summary/team"
                className={`nav-link ${location.pathname === '/summary/team' ? 'active-link' : ''}`}
              >
                Pick Team
              </Link>
              <Link
                to="/summary/transfers"
                className={`nav-link ${location.pathname === '/summary/transfers' ? 'active-link' : ''}`}
              >
                Transfers
              </Link>
              <Link
                to="/summary/leagues"
                className={`nav-link ${location.pathname === '/summary/leagues' ? 'active-link' : ''}`}
              >
                Leagues
              </Link>
              <Link
                to="/summary/news"
                className={`nav-link ${location.pathname === '/summary/news' ? 'active-link' : ''}`}
              >
                News & Clues
              </Link>
              <Link
                to="/summary/rules"
                className={`nav-link ${location.pathname === '/summary/rules' ? 'active-link' : ''}`}
              >
                Rules
              </Link>
              <Link
                to="/summary/prizes"
                className={`nav-link ${location.pathname === '/summary/prizes' ? 'active-link' : ''}`}
              >
                Prizes
              </Link>
            </div>
          </div>
        </div>
    </header>
  );
}

export default Header;