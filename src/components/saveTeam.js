import { Link } from "react-router-dom";
import images from "../utils/images";
import PlayerDetails from "./playerDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import '../css/playerList.css';
import '../css/saveTeam.css';
import { addSubstitute } from "../redux/playerSelectSlice";

const SaveTeam = ({ showTeam }) => {
  const dispatch = useDispatch();
  const { startingForwards, startingMidfielders, startingDefenders, startingGk, substitutes } = useSelector((state) => state.squad);

  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [playerDetails, setPlayerDetails] = useState('');
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [highlight, setHighlight] = useState([]);
  const [isSwapMode, setIsSwapMode] = useState(false);

  const handlePlayerJerseyClick = (player, event) => {
    event.stopPropagation();
    setShowPlayerModal(true);
    setPlayerDetails(player);
    document.body.style.overflow = 'hidden';
  };

  const handleSaveTeam = () => {
    // Implement the save team logic
  };

  const handlePlayerSwap = () => {
    // Enable swap mode and highlight eligible substitutes
    if (playerDetails.position === 'FWD') {
      setHighlight(['FWD', 'MID', 'DEF']);
    }
    setIsSwapMode(true); // Enable swap mode
    document.body.classList.add('swap-active'); // Add class to freeze the page
  };

  const closeModal = () => {
    setShowPlayerModal(false);
    setShowPlayerDetails(false);
    document.body.style.overflow = 'auto';
    setIsSwapMode(false); // Disable swap mode after closing
    document.body.classList.remove('swap-active'); // Remove the swap mode freeze
  };

  const handleSubstituteClick = (sub) => {
    if (!highlight.includes(sub.position)) return;

    dispatch(addSubstitute({playerOut: playerDetails, playerIn: sub}));

    // Exit swap mode and remove highlights
    setIsSwapMode(false);
    setHighlight([]);
    document.body.classList.remove('swap-active');
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
    <div key={index} className={positionClass}>
      <div onClick={(event) => handlePlayerJerseyClick(player, event)}>
        <div className="js-container">
          <img className="jersey" src={player.jersey} alt="player-jersey" />
        </div>
        <div className="plyr-detail">
          <div className="plyr-name">{player.name}</div>
          <div className="plyr-price">$ {player.price}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="st-ctn">
        <div className="sln-row1">
          <div>Pick Your Starting 11</div>
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
          <div className="squad save">
            <div className="sq-container">
              <div className="fwd-row">{startingForwards.map((fwd, index) => renderPlayer(fwd, index, "fwd"))}</div>
              <div className="mid-row">{startingMidfielders.map((mid, index) => renderPlayer(mid, index, "mid"))}</div>
              <div className="def-row">{startingDefenders.map((def, index) => renderPlayer(def, index, "def"))}</div>
              <div className="gk-row">{startingGk.map((gk, index) => renderPlayer(gk, index, "gk"))}</div>

              <div className="subs-ctn">
                {substitutes.map((sub, index) => (
                  <div key={index} className={`sub-ctn ${highlight.includes(sub.position) ? 'highlighted' : ''}`}>
                    <div onClick={() => handleSubstituteClick(sub)}>
                      {renderPlayer(sub, index, "sub")}
                    </div>
                  </div>
                ))}
              </div>
              <div className="subs-txt">Substitutes</div>
              <button onClick={handleSaveTeam} className="create-tm-btn save">Save Team</button>

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
            <button onClick={handlePlayerSwap} className="plyr-modal-btn">Swap</button>
            <button className="plyr-modal-btn" onClick={() => { setShowPlayerDetails(true); document.body.style.overflow = 'hidden'; }}>Player Details</button>
          </div>
        </>
      )}
    </>
  );
};

export default SaveTeam;
