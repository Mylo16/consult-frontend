import { Link, useLocation } from "react-router-dom";
import Squad from "../components/squad";
import images from "../utils/images";
import Fixtures from "../components/fixtures";
import Partners from "../components/partners";
import Footer from "../components/footer";
import PlayerList from "../components/playerList";
import { useState } from "react";

function CreateTeam() {
  const location = useLocation();
  const [showPlayerList, setShowPlayerList] = useState(false);

  const handleShowPlayerListClicked = () => {
    setShowPlayerList(!showPlayerList);
  }

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
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`}
          >
            Create team
          </Link>
          <Link
            to="/prizes"
            className={`nav-link ${location.pathname === '/prizes' ? 'active-link' : ''}`}
          >
            Prizes
          </Link>
          <Link
            to="/rules"
            className={`nav-link ${location.pathname === '/rules' ? 'active-link' : ''}`}
          >
            How to play
          </Link>
          <Link
            to="/news"
            className={`nav-link ${location.pathname === '/news' ? 'active-link' : ''}`}
          >
            News
          </Link>
        </div>
        </div>
      </header>
      <section className="pick-sq-container">
        <div className={`pick-sq ${showPlayerList ? 'slide-out' : ''}`}>
          <div className="go-home-link">
            <img src={images.arrowLeft} alt="go-home" />
            <Link to='/home'>Go Home</Link>
          </div>
          <div className="pick-sq-txt">Pick your squad</div>
          <div onClick={handleShowPlayerListClicked} className="plyr-list">
            <Link>Players List</Link>
            <span>&#8594;</span>
          </div>
          <div className="pick-sq-div1">
            <div className="player-budget-container">
              <div className="player-picks">
                <div className="picks-txt">Players</div>
                <div className="picks-num">0/15</div>
              </div>
              <div className="budget">
                <div className="budget-txt">Budget</div>
                <div className="budget-value">₵100m</div>
              </div>
            </div>
            <div className="fill-refresh-container">
              <button className="fill-btn">Auto-fill</button>
              <div>
                <img src={images.refresh} alt="refresh" className="refresh"/>
              </div>
            </div>
          </div>
          
          <div className="pick-squad-div2">
            <div className="pitch-sponsors">
              <img className="sponsor1" src={images.pitchSponsor} alt="pitch-sponsor"/>
              <img className="sponsor1" src={images.pitchSponsor} alt="pitch-sponsor"/>
            </div>
            <div className="pitch-container">
              <img className="pitch" src={images.pitch} alt="pitch" />
            </div>
            <div className="squad">
              <Squad />
            </div>
          </div>
        </div>
        <div className={`player-list-container ${showPlayerList ? 'slide-in' : ''}`}>
          {showPlayerList && <PlayerList showSquad={handleShowPlayerListClicked} />}
        </div>
      </section>
      <Fixtures />
      <Partners />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default CreateTeam;