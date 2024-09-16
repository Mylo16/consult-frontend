import React from "react";
import { Link } from "react-router-dom";
import images from "../utils/images";

const Footer = () => {
  return(
    <>
    <div className="footer-container">
      <div className="fa-txt">GPL Fantasy</div>
      <div className="fa-quicklinks">
        <ul>
          <li><Link to="#home">Home</Link></li>
          <li><Link to="#home">Fixtures</Link></li>
          <li><Link to="#home">Transfers</Link></li>
        </ul>
        <ul>
          <li><Link to="#home">My Team</Link></li>
          <li><Link to="#home">Stats</Link></li>
          <li><Link to="#home">Leagues</Link></li>
        </ul>
      </div>
      <div className="social-txt">Follow Us On</div>
      <div className="social-media">
        <div><img className="social" src={images.twitter}/></div>
        <div><img className="social" src={images.youtube}/></div>
        <div><img className="social" src={images.facebook}/></div>
        <div><img className="social" src={images.linkedin}/></div>
      </div>
    </div>
    <div className="terms">
      <div>
        <Link>Privacy</Link>
        <Link>Terms and conditions</Link>
        <Link>Cookie policy</Link>
      </div>
      <div>
        <Link>Policies</Link>
        <Link>Back To Top</Link>
      </div>
      <div>
        <img src={images.logo}/>
        <div className="gpl-txt">Ghana Premier League</div>
      </div>
    </div>
    </>
  );
}

export default Footer;