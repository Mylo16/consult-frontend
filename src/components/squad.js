import React from "react";
import Jersey from "./jersey";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Squad() {
  const dispatch = useDispatch();
  const { forwards, midfielders, defenders, goalkeepers } = useSelector((state) => state.players);

  const handlePlayerJerseyClick = () => {

  }

  const handleEmptyJerseyClick = (position) => {
    
  }

  return(
    <div className="sq-container">
      <div className="fwd-row">
        {forwards.map((forward, index) => (
          forward.length > 0 ? (
            <div onClick={() => handlePlayerJerseyClick} className="fwd">
              <div className="js-container">
                <img className="jersey" src={forward.img} alt="player-jersey" />
              </div>
              <div className="plyr-detail">
                <div className="plyr-name">{forward.name}</div>
                <div className="plyr-price">$ {forward.price}</div>
              </div>
            </div>
          ) :
          <div onClick={() => handleEmptyJerseyClick('forward')} className="fwd">
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
        {midfielders.map((midfielder, index) => (
          midfielder.length > 0 ? (
            <div onClick={() => handlePlayerJerseyClick} className="fwd">
              <div className="js-container">
                <img className="jersey" src={midfielder.img} alt="player-jersey" />
              </div>
              <div className="plyr-detail">
                <div className="plyr-name">{midfielder.name}</div>
                <div className="plyr-price">$ {midfielder.price}</div>
              </div>
            </div>
          ) :
          <div className="fwd">
            <div onClick={() => handleEmptyJerseyClick('midfielder')} className="js-container">
              <Jersey />
            </div>
            <div className="plyr-detail">
              <div className="pos">MID</div>
            </div>
          </div>
        ))}
      </div>
      <div className="def-row">
        {defenders.map((defender, index) => (
          defender.length > 0 ? (
            <div onClick={() => handlePlayerJerseyClick} className="def">
              <div className="js-container">
                <img className="jersey" src={defender.img} alt="player-jersey" />
              </div>
              <div className="plyr-detail">
                <div className="plyr-name">{defender.name}</div>
                <div className="plyr-price">$ {defender.price}</div>
              </div>
            </div>
          ) :
          <div className="def">
            <div onClick={() => handleEmptyJerseyClick('defender')} className="js-container">
              <Jersey />
            </div>
            <div className="plyr-detail">
              <div className="pos">DEF</div>
            </div>
          </div>
        ))}
      </div>
        
      <div className="gk-row">
        {goalkeepers.map((goalkeeper, index) => (
          goalkeeper.length > 0 ? (
            <div onClick={() => handlePlayerJerseyClick} className="gk">
              <div className="js-container">
                <img className="jersey" src={goalkeeper.img} alt="player-jersey" />
              </div>
              <div className="plyr-detail">
                <div className="plyr-name">{goalkeeper.name}</div>
                <div className="plyr-price">$ {goalkeeper.price}</div>
              </div>
            </div>
          ) :
          <div className="gk">
            <div onClick={() => handleEmptyJerseyClick('gk')} className="js-container">
              <Jersey />
            </div>
            <div className="plyr-detail">
              <div className="pos">GK</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Squad;