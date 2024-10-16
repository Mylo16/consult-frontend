import React, { useEffect, useState } from 'react';
import '../css/points.css';
import Header from '../components/header';
import images from '../utils/images';
import PlayerDetails from '../components/playerDetails';
import { useSelector } from 'react-redux';
import Footer from '../components/footer';
import Partners from '../components/partners';
import Fixtures from '../components/fixtures';

function GameweekPoints() {
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [playerDetails, setPlayerDetails] = useState('');
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const { startingForwards, startingMidfielders, startingDefenders, startingGk, substitutes } = useSelector((state) => state.squad);
  const [count, setCount] = useState(0);
  const target = 50;
  const duration = 2000;

  useEffect(() => {
    const start = performance.now(); // Track animation start time

    const animateCounter = (time) => {
      const elapsedTime = time - start;
      const progress = Math.min(elapsedTime / duration, 1); // Normalized to [0, 1]
      const easeOut = 1 - Math.pow(1 - progress, 3); // Ease-out effect (cubic easing)

      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    };

    requestAnimationFrame(animateCounter);
  }, [target, duration]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPlayerModal && !event.target.closest('.plyr-modal-ctn')) closeModal();
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showPlayerModal]);


  const handlePlayerJerseyClick = (player, event) => {
    event.stopPropagation();
    setShowPlayerModal(true);
    setPlayerDetails(player);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowPlayerModal(false);
    setShowPlayerDetails(false);
    document.body.style.overflow = 'auto';
  };

  const renderPlayer = (player, index, positionClass) => (
    <div key={index} className={positionClass} onClick={(event) => handlePlayerJerseyClick(player, event)}>
      {player.isCaptain && <div className="captain">C</div>}
      <div className="js-container">
        <img className="jersey" src={player.jersey} alt="player-jersey" />
      </div>
      <div className="plyr-detail">
        <div className="plyr-name">{player.name}</div>
        <div className="plyr-price">{player.points}</div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="gw-points-ctn">
        <div className='arrow-left'><img src={images.arrowLeft} alt="Scroll Left"/></div>
        <div className="gw-ctn">
          <div className="gw">Game Week 1</div>
          <div className="gw-points">{Math.floor(count)}</div>
        </div>
        <div className='arrow-right'><img src={images.arrowRight} alt="Scroll Right"/></div>
      </div>
      <div className='gw-details-ctn'>
        <div className='gw-details-row bordered'>
          <div className='gw-details-col bordered'>
            <div className='gw-details-link'>Highest Points <span>&#8594;</span></div>
            <div className='gw-details-value'>130</div>
          </div>
          <div className='gw-details-col'>
            <div>Average Points</div>
            <div className='gw-details-value'>50</div>
          </div>
        </div>
        <div className='gw-details-row'>
          <div className='gw-details-col bordered'>
            <div className='gw-details-link'>Transfers <span>&#8594;</span></div>
            <div className='gw-details-value'>0</div>
          </div>
          <div className='gw-details-col'>
            <div>GW Rank</div>
            <div className='gw-details-value'>4,957,666</div>
          </div>
        </div>
      </div>

      <div className="pick-squad-div2">
        <div className="pitch-sponsors">
          <img className="sponsor1" src={images.pitchSponsor} alt="pitch-sponsor" />
          <img className="sponsor1" src={images.pitchSponsor} alt="pitch-sponsor" />
        </div>
        <div className="pitch-container">
          <img className="pitch2" src={images.pitch} alt="pitch" />
        </div>
        <div className="squad save">
          <div className="sq-container">
            <div className="fwd-row">{startingForwards.map((fwd, index) => renderPlayer(fwd, index, "fwd"))}</div>
            <div className="mid-row">{startingMidfielders.map((mid, index) => renderPlayer(mid, index, "mid"))}</div>
            <div className="def-row">{startingDefenders.map((def, index) => renderPlayer(def, index, "def"))}</div>
            <div className="gk-row">{startingGk.map((gk, index) => renderPlayer(gk, index, "gk"))}</div>
            <div className="subs-ctn">
              {substitutes.map((sub, index) => renderPlayer(sub, index, "sub"))}
            </div>
            <div className="subs-txt">Substitutes</div>
            {showPlayerDetails && (
              <div className={`pd-ctn ${showPlayerDetails ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                <PlayerDetails details={playerDetails} closeDetails={closeModal} />
              </div>
            )}
          </div>
        </div>
      </div>

      {showPlayerModal && (
        <>
          <div className="modal-overlay"></div>
          <div className="plyr-modal-ctn">
            <button className="plyr-modal-btn" onClick={() => { setShowPlayerDetails(true); document.body.style.overflow = 'hidden'; }}>
              Player Details
            </button>
          </div>
        </>
      )}
      <Fixtures />
      <Partners />
      <Footer />
    </>
  );
}

export default GameweekPoints;
