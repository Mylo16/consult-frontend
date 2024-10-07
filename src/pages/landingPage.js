import images from "../utils/images";
import { Link, useLocation } from "react-router-dom";
import '../css/landingPage.css';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PlayerDetails from "../components/playerDetails";
import Partners from '../components/partners';
import Footer from '../components/footer';

export default function LandingPage() {
  const location = useLocation();
  const { FWD, MID, DEF, GK } = useSelector((state) => state.squad);
  const [weekTeam, setWeekTeam] = useState(null);
  const [playerDetails, setPlayerDetails] = useState('');
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ensure that FWD, MID, DEF, and GK are not undefined or null
    if (FWD && MID && DEF && GK) {
      const sortedFWD = [...FWD].sort((a, b) => b.points - a.points);
      const sortedMID = [...MID].sort((a, b) => b.points - a.points);
      const sortedDEF = [...DEF].sort((a, b) => b.points - a.points);
      const sortedGK = [...GK].sort((a, b) => b.points - a.points);

      // Set the week team using sorted players
      setWeekTeam([
        sortedGK[0],
        sortedDEF[0], sortedDEF[1], sortedDEF[2],
        sortedMID[0], sortedMID[1], sortedMID[2], sortedMID[3],
        sortedFWD[0], sortedFWD[1], sortedFWD[2]
      ]);
    }
  }, [FWD, MID, DEF, GK]);

  useEffect(()=> {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPlayerDetails && !event.target.closest('.plyr-modal-ctn')) {
        handleCloseDetails();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPlayerDetails]);

  const handlePlayerInfo = (player, event) => {
    event.stopPropagation();
    setPlayerDetails(player);
    setShowPlayerDetails(true);
    document.body.style.overflow = 'hidden';
  }

  const handleCloseDetails = () => {
    setPlayerDetails('');
    setShowPlayerDetails(false);
    document.body.style.overflow = 'auto';

  }

  return (
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
      <section>
        <div className="sm-row1">
          <div className="sm-row1-title">Gameweek 1</div>
          <div className="sm-row1-ctn">
            <div className="sm-circles">
              <div className="sm-circle-ctn">
                <div>Average Points</div>
                <div className="sm-circle">50</div>
              </div>
              <div className="sm-circle-ctn">
                <div>Highest Points</div>
                <div className="sm-circle">130</div>
              </div>
            </div>
            <div className={`sm-highlight1 ${isVisible ? 'slide-in1' : ''}`}>
              <div>Most Transferred in</div>
              <div className="highlight-name">I. Kuka</div>
            </div>
            <div className={`sm-highlight2 ${isVisible ? 'slide-in2' : ''}`}>
              <div>Most Captained</div>
              <div className="highlight-name">A. Okrah</div>
            </div>
          </div>
        </div>
        <div className="sm-row2">
          <div className="sm-row2-title">
            <div className="th-img"><img src={images.thunder} alt="thunder"/></div>
            <div>Best 11 of the Week</div>
          </div>
          <div className="sm-row3">
            <div className="sm-row3-info">Info</div>
            <div className="sm-row3-pos">Pos</div>
            <div className="sm-row3-name">Name</div>
            <div className="sm-row3-pts">Pts</div>
            <div className="sm-row3-tm">Club</div>
          </div>
          <div>
            {weekTeam && (
              weekTeam.map((player) => (
                <div className="tow-plyr" key={player.id}>
                  <div onClick={(event) => handlePlayerInfo(player, event)} className="tow-plyr-info"><img src={images.info} alt="info-icon"/></div>
                  <div className="tow-plyr-pos">{player.position}</div>
                  <div className="tow-plyr-name">
                    <img src={player.jersey} alt="player-jersey"/>
                    <div>{player.name}</div>
                  </div>
                  <div className="tow-plyr-pts">{player.points}</div>
                  <div className="tow-plyr-tm no-border">{player.team}</div>
                </div>
              ))
            )}
            {showPlayerDetails && (
              <>
                <div className="modal-overlay"></div>
                <div className={`pd-ctn ${showPlayerDetails ? 'show':''}`}>
                  <PlayerDetails details={playerDetails} closeDetails={handleCloseDetails} />
                </div>
              </>
            )}
            
          </div>
        </div>
        <div className="sm-row4">
          <div className="sm-row2-title mvp-title">
            <div className="th-img"><img src={images.thunder} alt="thunder"/></div>
            <div>MVP of the Week</div>
          </div>
          <div className="mvp-ctn">
            <div className="mvp-sub-ctn">
              <div className="mvp">
                <div className="mvp-jersey-ctn">
                  <img className="mvp-jersey" src={images.aduanaKit} alt="mvp-jersey"/>
                </div>
                <div>
                  <div className="mvp-name">A. Okrah</div>
                  <div className="mvp-info">
                    <div>GW1</div>
                    <div>15 pts</div>
                  </div>
                </div>
              </div>
              <div className="mvp">
                <div className="mvp-jersey-ctn">
                  <img className="mvp-jersey" src={images.heartOfLionsKit} alt="mvp-jersey"/>
                </div>
                <div>
                  <div className="mvp-name">I. Kuka</div>
                  <div className="mvp-info">
                    <div>GW2</div>
                    <div>13 pts</div>
                  </div>
                </div>
              </div><div className="mvp">
                <div className="mvp-jersey-ctn">
                  <img className="mvp-jersey" src={images.aduanaKit} alt="mvp-jersey"/>
                </div>
                <div>
                  <div className="mvp-name">D. Taylor</div>
                  <div className="mvp-info">
                    <div>GW3</div>
                    <div>17 pts</div>
                  </div>
                </div>
              </div><div className="mvp">
                <div className="mvp-jersey-ctn">
                  <img className="mvp-jersey" src={images.heartsKit} alt="mvp-jersey"/>
                </div>
                <div>
                  <div className="mvp-name">E. Baffour</div>
                  <div className="mvp-info">
                    <div>GW4</div>
                    <div>13 pts</div>
                  </div>
                </div>
              </div>
              <div className="mvp">
                <div className="mvp-jersey-ctn">
                  <img className="mvp-jersey" src={images.aduanaKit} alt="mvp-jersey"/>
                </div>
                <div>
                  <div className="mvp-name">H. Issah</div>
                  <div className="mvp-info">
                    <div>GW5</div>
                    <div>15 pts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Partners />
      <Footer />
    </>
  );
}
