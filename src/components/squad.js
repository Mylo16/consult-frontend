import React, { useEffect, useState } from "react";
import Jersey from "./jersey";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlayerDetails from "./playerDetails";
import images from "../utils/images";
import { initializeSquad, removePlayer } from "../redux/playerSelectSlice";
import { handleFreeTransfers } from "../redux/transfersSlice";

function Squad({showPlayerList, showPlayerCategory, createTeam, button="Create Team" }) {
  const { FWD, MID, DEF, GK, budget, selectedPlayers } = useSelector((state) => state.squad);
  const [playerDetails, setPlayerDetails] = useState('');
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const dispatch = useDispatch();
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    if (budget < 0 || selectedPlayers.length !== 15) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [budget, selectedPlayers]);

  const handlePlayerJerseyClick = (player, event) => {
    event.stopPropagation();
    setPlayerDetails(player);
    setShowPlayerDetails(true);
    document.body.style.overflow = 'hidden';

  }

  const handleDetailsClose = () => {
    setShowPlayerDetails(!showPlayerDetails);
    document.body.style.overflow = 'auto';
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [showPlayerDetails]);

  const handleClickOutside = (event) => {
    if(showPlayerDetails && !event.target.closest('.pd-ctn')) {
      setShowPlayerDetails(false);
    }
  }

  const handleEmptyJerseyClick = (position) => {
    showPlayerList();
    showPlayerCategory(position);
  }

  const handleRemovePlayer = (player) => {
    dispatch(removePlayer({position: player.position, player}));
    setShowPlayerDetails(false);
    document.body.style.overflow = 'auto';
    if(button === "Make Transfer") {
      dispatch((handleFreeTransfers(player)));
    }
  }

  const handleCreateTeam = () => {
    dispatch(initializeSquad());
    createTeam();
  }

  return(
    <div className="sq-container">
      <div className="fwd-row">
        {FWD.map((forward, index) => (
          forward !== null ? (
            <div key={index} className="fwd">
            <div className="close-btn-ctn" onClick={() => handleRemovePlayer(forward)}><img className="close-btn" src={images.close} alt="close-button" /></div>
            <div onClick={(event) => handlePlayerJerseyClick(forward, event)} >
              <div className="js-container">
                <img className="jersey" src={forward.jersey} alt="player-jersey" />
              </div>
              <div className="plyr-detail">
                <div className="plyr-name">{forward.name}</div>
                <div className="plyr-price">$ {forward.price.toFixed(1)}</div>
              </div>
            </div>
            </div>
          ) :
          <div key={index} onClick={() => handleEmptyJerseyClick('FWD')} className="fwd">
            <div className="js-container">
              <Jersey />
            </div>
            <div className="plyr-detail">
              <div className="pos">FWD</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mid-row">
        {MID.map((midfielder, index) => (
          midfielder !== null ? (
            <div key={index} className="fwd">
            <div className="close-btn-ctn" onClick={() => handleRemovePlayer(midfielder)}><img className="close-btn" src={images.close} alt="close-button" /></div>
            <div onClick={(event) => handlePlayerJerseyClick(midfielder, event)}>
              <div className="js-container">
                <img className="jersey" src={midfielder.jersey} alt="player-jersey" />
              </div>
              <div className="plyr-detail">
                <div className="plyr-name">{midfielder.name}</div>
                <div className="plyr-price">$ {midfielder.price.toFixed(1)}</div>
              </div>
            </div>
            </div>
          ) :
          <div key={index} className="fwd">
            <div onClick={() => handleEmptyJerseyClick('MID')} className="js-container">
              <Jersey />
            </div>
            <div className="plyr-detail">
              <div className="pos">MID</div>
            </div>
          </div>
        ))}
      </div>
      <div className="def-row">
        {DEF.map((defender, index) => (
          defender !== null ? (
            <div key={index} className="def">
            <div className="close-btn-ctn" onClick={() => handleRemovePlayer(defender)}><img className="close-btn" src={images.close} alt="close-button" /></div>
            <div onClick={(event) => handlePlayerJerseyClick(defender, event)}>
              <div className="js-container">
                <img className="jersey" src={defender.jersey} alt="player-jersey" />
              </div>
              <div className="plyr-detail">
                <div className="plyr-name">{defender.name}</div>
                <div className="plyr-price">$ {defender.price.toFixed(1)}</div>
              </div>
            </div>
            </div>
          ) :
          <div key={index} className="def">
            <div onClick={() => handleEmptyJerseyClick('DEF')} className="js-container">
              <Jersey />
            </div>
            <div className="plyr-detail">
              <div className="pos">DEF</div>
            </div>
          </div>
        ))}
      </div>
        
      <div className="gk-row">
        {GK.map((goalkeeper, index) => (
          goalkeeper !== null ? (
            <div key={index} className="gk">
            <div className="close-btn-ctn" onClick={() => handleRemovePlayer(goalkeeper)}><img className="close-btn" src={images.close} alt="close-button" /></div>
            <div className="sl-plyr-ctn" onClick={(event) => handlePlayerJerseyClick(goalkeeper, event)} >
              <div className="js-container">
                <img className="jersey" src={goalkeeper.jersey} alt="player-jersey" />
              </div>
              <div className="plyr-detail">
                <div className="plyr-name">{goalkeeper.name}</div>
                <div className="plyr-price">$ {goalkeeper.price.toFixed(1)}</div>
              </div>
            </div>
            </div>
          ) :
          <div key={index} className="gk">
            <div onClick={() => handleEmptyJerseyClick('GK')} className="js-container">
              <Jersey />
            </div>
            <div className="plyr-detail">
              <div className="pos">GK</div>
            </div>
          </div>
        ))}
      </div>
      <button disabled={isDisable} onClick={handleCreateTeam} className={`create-tm-btn ${isDisable ? 'btn-disabled' : ''}`}>{button}</button>
      {showPlayerDetails && (
        <div className="pd-overlay"></div>
      )}
      <div className={`pd-ctn ${showPlayerDetails ? 'show':''}`}>
        <PlayerDetails removePlayer={handleRemovePlayer} selected={true} details={playerDetails} closeDetails={handleDetailsClose} />
      </div>
    </div>
  );
}

export default Squad;