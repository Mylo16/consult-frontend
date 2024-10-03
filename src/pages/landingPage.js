import images from "../utils/images";
import { Link, useLocation } from "react-router-dom";

export default function LandingPage() {
  const location = useLocation();

  return(
    <>
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
        <div className="header-links">
          <Link
            to="/summary"
            className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`}
          >
            Summary
          </Link>
          <Link
            to="/summary/points"
            className={`nav-link ${location.pathname === '/prizes' ? 'active-link' : ''}`}
          >
            Points
          </Link>
          <Link
            to="/summary/team"
            className={`nav-link ${location.pathname === '/rules' ? 'active-link' : ''}`}
          >
            Pick Team
          </Link>
          <Link
            to="/summary/transfers"
            className={`nav-link ${location.pathname === '/news' ? 'active-link' : ''}`}
          >
            Transfers
          </Link>
        </div>
        </div>
      </header>
    </>
  );
}