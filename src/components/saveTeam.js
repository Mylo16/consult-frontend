import { Link, useNavigate, useNavigation } from "react-router-dom";
import images from "../utils/images";
import PlayerDetails from "./playerDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import '../css/playerList.css';
import '../css/saveTeam.css';
import { addSubstitute, makeCaptain } from "../redux/playerSelectSlice";

const SaveTeam = ({ showTeam }) => {
  const dispatch = useDispatch();
  const { startingForwards, startingMidfielders, startingDefenders, startingGk, substitutes } = useSelector((state) => state.squad);
  const navigate = useNavigate();
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [playerDetails, setPlayerDetails] = useState('');
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [highlight, setHighlight] = useState([]);
  const [isSwapMode, setIsSwapMode] = useState(false);
  const targetViewRef = useRef(null);
  const [swapModal, setSwapModal] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const [captaincy, setCaptaincy] = useState(false);

  const scrollToDiv = () => {
    targetViewRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    targetViewRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  const handlePlayerJerseyClick = (player, positionClass, event) => {
    event.stopPropagation();
    if(captaincy) {
      setShowPlayerModal(true);
      setPlayerDetails(player);
      return;
    }
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

  const handleSaveTeam = () => {
    setCaptaincy(true);
    scrollToTop();
  };

  const handleSignin = () => {
    navigate('/login');
  }

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
  }

  const closeModal = () => {
    setShowPlayerModal(false);
    setShowPlayerDetails(false);
    document.body.style.overflow = 'auto';
  };

  const handleSubstituteClick = (sub) => {
    if (!highlight.includes(sub.position)) return;

    dispatch(addSubstitute({playerOut: playerDetails, playerIn: sub}));
    setIsSwapMode(false);
    setHighlight([]);
  };

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

  return (
    <>
      <div ref={targetViewRef} className="st-ctn">
        <div className="sln-row1">
          <div>{captaincy? 'Select Your Captain':'Pick Your Starting 11'}</div>
          <div onClick={showTeam}>
            <span>&#8592;</span>
            <Link>Back</Link>
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
          <div ref={targetViewRef} className="squad save">
            <div className="sq-container">
              <div className="fwd-row">{startingForwards.map((fwd, index) => renderPlayer(fwd, index, "fwd"))}</div>
              <div className="mid-row">{startingMidfielders.map((mid, index) => renderPlayer(mid, index, "mid"))}</div>
              <div className="def-row">{startingDefenders.map((def, index) => renderPlayer(def, index, "def"))}</div>
              <div className="gk-row">{startingGk.map((gk, index) => renderPlayer(gk, index, "gk"))}</div>
              {!captaincy && (
                <>
              <div className="subs-ctn">
                {substitutes.map((sub, index) => (
                  <div key={index} className={`sub-ctn ${highlight.includes(sub.position) ? 'highlighted' : ''}`}>
                    {renderPlayer(sub, index, "sub")}
                  </div>
                ))}
              </div>
              <div className="subs-txt">Substitutes</div>
              </>
              )}
              <button onClick={ captaincy ? handleSignin : handleSaveTeam } className="create-tm-btn save">{ captaincy ? 'Signin to Continue':'Save Team'}</button>

              {showPlayerDetails && (
                <div className={`pd-ctn ${showPlayerDetails ? 'show':''}`} onClick={(e) => e.stopPropagation()}>
                  <PlayerDetails details={playerDetails} closeDetails={closeModal} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPlayerModal && (
        <>
          <div className="modal-overlay"></div>
          <div className="plyr-modal-ctn">
            <button onClick={captaincy ? () => handlePlayerCaptaincy(playerDetails) : handlePlayerSwap} className={`plyr-modal-btn ${isSub ? 'none' : ''}`}>{captaincy ? 'Make Captain' : 'Swap'}</button>
            <button className="plyr-modal-btn" onClick={() => { setShowPlayerDetails(true); document.body.style.overflow = 'hidden'; }}>Player Details</button>
          </div>
        </>
      )}
      {swapModal && (
        <div className="modal-overlay"></div>
      )}
    </>
  );
};

export default SaveTeam;
