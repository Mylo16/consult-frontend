import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header";
import images from "../utils/images";
import { useEffect, useRef, useState } from "react";
import PlayerDetails from "../components/playerDetails";
import { addSubstitute, makeCaptain } from "../redux/playerSelectSlice";

function PickTeam() {
  const dispatch = useDispatch();
  const { startingForwards, startingMidfielders, startingDefenders, startingGk, substitutes } = useSelector((state) => state.squad);
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [playerDetails, setPlayerDetails] = useState('');
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [highlight, setHighlight] = useState([]);
  const [isSwapMode, setIsSwapMode] = useState(false);
  const targetViewRef = useRef(null);
  const [swapModal, setSwapModal] = useState(false);
  const [isSub, setIsSub] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPlayerModal && !event.target.closest('.plyr-modal-ctn')) {
        closeModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPlayerModal]);

  const handleSubstituteClick = (sub) => {
    if (!highlight.includes(sub.position)) return;

    dispatch(addSubstitute({playerOut: playerDetails, playerIn: sub}));
    if(playerDetails.isCaptain) {
      dispatch(makeCaptain({ player: sub }));
    }
    setIsSwapMode(false);
    setHighlight([]);
  };

  const handlePlayerJerseyClick = (player, positionClass, event) => {
    event.stopPropagation();
    if(isSwapMode) {
      return handleSubstituteClick(player), setSwapModal(false), document.body.style.overflow = 'auto';
    }
    setShowPlayerModal(true);

    if(positionClass === 'sub') {
        setIsSub(true);
    } else {
      setIsSub(false);
    }

    setPlayerDetails(player);
    document.body.style.overflow = 'hidden';
    
  };

  const scrollToDiv = () => {
    targetViewRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const closeModal = () => {
    setShowPlayerModal(false);
    setShowPlayerDetails(false);
    document.body.style.overflow = 'auto';
  };

  const handleSaveTeam = () => {
  };

  const handlePlayerSwap = () => {
    scrollToDiv();
    setShowPlayerModal(false);
    setSwapModal(true);
    if (playerDetails.position === 'GK') {
      setHighlight(['GK']);
    } else {
      setHighlight(['FWD', 'MID', 'DEF']);
    }
    setIsSwapMode(true);
  };

  const handlePlayerCaptaincy = (player) => {
    dispatch(makeCaptain({ player }));
    setShowPlayerModal(false);
    document.body.style.overflow = 'auto';
  }

  const renderPlayer = (player, index, positionClass) => (
    <div key={index} className={`${positionClass} ${player.id === playerDetails.id && isSwapMode ? 'highlighted' : ''}`}>
      <img className={`sub-arrow ${isSwapMode && (player.id === playerDetails.id || positionClass === 'sub') ? '' : 'none'}`} src={positionClass === 'sub' ? images.arrowUp : images.arrowDown } alt="arrow" />
      {player.isCaptain && (<div className="captain">C</div>)}
      <div onClick={(event) => handlePlayerJerseyClick(player, positionClass, event)}>
        <div className="js-container">
          <img className="jersey" src={player.jersey} alt="player-jersey" />
        </div>
        <div className="plyr-detail">
          <div className="plyr-name">{player.name}</div>
          <div className="plyr-price">{player.position}</div>
        </div>
      </div>
    </div>
  );
  return(
    <>
      <Header />
      <div>
        <div>ManBoy Squad</div>
        <div>Game Week 2</div>
        <div>Deadline: 22 October, 2024</div>
      </div>
      <div className="pick-squad-div2">
          <div className="pitch-sponsors">
            <img className="sponsor1" src={images.pitchSponsor} alt="pitch-sponsor" />
            <img className="sponsor1" src={images.pitchSponsor} alt="pitch-sponsor" />
          </div>
          <div className="pitch-container">
            <img className="pitch2" src={images.pitch} alt="pitch" />
          </div>
          <div ref={targetViewRef} className="squad save">
            <div className="sq-container">
              <div className="fwd-row">{startingForwards.map((fwd, index) => renderPlayer(fwd, index, "fwd"))}</div>
              <div className="mid-row">{startingMidfielders.map((mid, index) => renderPlayer(mid, index, "mid"))}</div>
              <div className="def-row">{startingDefenders.map((def, index) => renderPlayer(def, index, "def"))}</div>
              <div className="gk-row">{startingGk.map((gk, index) => renderPlayer(gk, index, "gk"))}</div>
              
              <div className="subs-ctn">
                {substitutes.map((sub, index) => (
                  <div key={index} className={`sub-ctn ${highlight.includes(sub.position) ? 'highlighted' : ''}`}>
                    {renderPlayer(sub, index, "sub")}
                  </div>
                ))}
              </div>
              <div className="subs-txt">Substitutes</div>
              <button onClick={ handleSaveTeam } className="create-tm-btn save">Save Team</button>

              {showPlayerDetails && (
                <div className={`pd-ctn ${showPlayerDetails ? 'show':''}`} onClick={(e) => e.stopPropagation()}>
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
              <button onClick={handlePlayerSwap} className={`plyr-modal-btn ${isSub ? 'none' : ''}`}>Swap</button>
              <button onClick={() => handlePlayerCaptaincy(playerDetails)} className={`plyr-modal-btn ${isSub ? 'none' : ''}`}>Make Captain</button>
              <button className="plyr-modal-btn" onClick={() => { setShowPlayerDetails(true); document.body.style.overflow = 'hidden'; }}>Player Details</button>
            </div>
          </>
        )}
        {swapModal && (
          <div className="modal-overlay"></div>
        )}
    </>
  );
}

export default PickTeam;