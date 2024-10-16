import images from "../utils/images";
import '../css/landingPage.css';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PlayerDetails from "../components/playerDetails";
import Partners from '../components/partners';
import Footer from '../components/footer';
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { FWD, MID, DEF, GK } = useSelector((state) => state.squad);
  const [weekTeam, setWeekTeam] = useState(null);
  const [playerDetails, setPlayerDetails] = useState('');
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate()

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
      <Header />
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
          <div className="sm-ranking-ctn">
            <div className="sm-ranking-title">Rankings</div>
            <div className="sm-ranking-header">
              <div className="sm-league-header">League</div>
              <div className="sm-rank-header">Rank</div>
            </div>
            <div className="sm-ranking-row">
              <div className="sm-ranking-name">
                <img className="sm-ranking-logo" src={images.world} alt="team-logo"/>
                <div>World Leaderboard</div>
              </div>
              <div>2,345,789</div>
            </div>
            <div className="sm-ranking-row">
              <div className="sm-ranking-name">
                <img className="sm-ranking-logo" src={images.kotoko} alt="team-logo"/>
                <div>Asante Kotoko</div>
              </div>
              <div>533</div>
            </div>
          </div>
          <button className="show-more" onClick={() => navigate('/summary/leagues')}>Show more</button>
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
