import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import playersData from '../dummyData/players';
import images from "../utils/images";
import teams from '../dummyData/teams';
import PlayerDetails from "./playerDetails";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer } from "../redux/playerSelectSlice";

const PlayerList = ({ squadCategory, showSquad }) => {
  const [players] = useState(playersData);
  const [positionCriteria, setPositionCriteria] = useState(squadCategory || 'All');
  const [teamCriteria, setTeamCriteria] = useState('All');
  const [priceCriteria, setPriceCriteria] = useState(12); // New price filter state
  const [filteredPlayers, setFilteredPlayers] = useState(
    players.filter((player) => squadCategory === 'All' || player.position === squadCategory)
  );
  const [showPositions, setShowPositions] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [showPrices, setShowPrices] = useState(false);
  const [pointActive, setPointActive] = useState(false);
  const [priceActive, setPriceActive] = useState(true);
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [playerDetails, setPlayerDetails] = useState('');
  const squad = useSelector((state) => state.squad);
  const dispatch = useDispatch();

  const positions = ['FWD', 'MID', 'DEF', 'GK'];

  const handlePlayerSelection = (player) => {
    const isPlayerAlreadySelected = squad.selectedPlayers.find(p => p.id === player.id);
    if (isPlayerAlreadySelected) {
      alert(`${player.name} is already selected!`);
      return;
    }

    const positionLimit = {
      FWD: 3,
      MID: 5,
      DEF: 5,
      GK: 2
    };
  
    const { position } = player;
    const currentPlayers = squad[position].filter(p => p !== null);
  
    if (currentPlayers.length < positionLimit[position]) {
      dispatch(addPlayer({ position, player }));
    } else {
      alert(`Maximum ${positionLimit[position]} players are allowed in the ${position} position`);
    }
  }

  const handleClickOutside = (event) => {
    if(showPlayerDetails && !event.target.closest('.pd-ctn')) {
      setShowPlayerDetails(false);
    }
  }

  const handlePlayerInfoClick = (player, event) => {
    event.stopPropagation();
    setPlayerDetails(player);
    setShowPlayerDetails(true);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [showPlayerDetails]);

  const filterPlayers = (position, team, price) => {
    let filtered = players.filter((player) => 
      (position === 'All' || player.position === position) &&
      (team === 'All' || player.team === team) &&
      (player.price <= price)
    );
    setFilteredPlayers(filtered);
  };

  useEffect(() => {
    setPositionCriteria(squadCategory);
    filterPlayers(squadCategory, teamCriteria, priceCriteria);
  }, [squadCategory, teamCriteria, priceCriteria]);

  const handlePositionFilter = (position) => {
    filterPlayers(position, teamCriteria, priceCriteria);
    setShowPositions(false);
    setPositionCriteria(position);
  };

  const handleTeamFilter = (team) => {
    setTeamCriteria(team);
    filterPlayers(positionCriteria, team, priceCriteria);
    setShowTeams(false);
  };

  const handlePriceFilter = (event) => {
    const price = parseFloat(event.target.value, 10); // Get the value from slider
    setPriceCriteria(price);
    filterPlayers(positionCriteria, teamCriteria, price);
    setShowPrices(false);

    const slider = event.target;
    const percentage = ((price - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--value', `${percentage}%`);
  };

  const handleSort = (criteria) => {
    const sortedPlayers = [...filteredPlayers].sort((a, b) => b[criteria] - a[criteria]);
    setFilteredPlayers(sortedPlayers);
  };

  useEffect(() => {
    if(pointActive) {
      handleSort('points');
    } else {
      handleSort('price');
    }
  }, [positionCriteria, teamCriteria, priceCriteria]);

  const getSliderStyle = () => {
    const percentage = ((priceCriteria - 4) / 8) * 100;
    return {
      background: `linear-gradient(to right, #01d371 ${percentage}%, white ${percentage}%)`
    };
  };

  const handleDetailsClose = () => {
    setShowPlayerDetails(!showPlayerDetails);
  }

  const isPlayerSelected = (player) => {
    return squad.selectedPlayers.some(fwd => fwd.id === player.id)
  };

  return (
    <div className="sln-container">
      <div className="sln-row1">
        <div>Player Section</div>
        <div onClick={showSquad}>
          <span>&#8592;</span>
          <Link>Back</Link>
        </div>
      </div>
      <div className="sln-row2">
        <div onClick={() => { setShowPositions(!showPositions); setShowTeams(false); setShowPrices(false); }} className="sort-ctn">
          <div className={`dropdown-ctn ${showPositions ? 'open' : ''}`}>
            <div>Position</div>
          </div>
          <div>{positionCriteria}</div>
        </div>
        {showPositions && (
          <>
            <ul className="po-filter-list-ctn">
              <div className="po-filter-list">
              {positions.map((position) => (
                <li className={`${positionCriteria === position ? 'active-filter':''}`} key={position} onClick={() => handlePositionFilter(position)}>{position}</li>
              ))}
              </div>
            <button onClick={() => handlePositionFilter('All')}>Reset</button>
            </ul>
          </>
        )}

        <div onClick={() => { setShowTeams(!showTeams); setShowPositions(false); setShowPrices(false); }} className="sort-ctn">
          <div className={`dropdown-ctn ${showTeams ? 'open' : ''}`}>
            <div>Team</div>
          </div>
          <div>{teamCriteria}</div>
        </div>
        {showTeams && (
          <>
            <ul className="tm-filter-list-ctn">
              <div className="tm-filter-list">
              {teams.map((team) => (
                <div className="pl-tm">
                  <img className="pl-tm-logo" src={team.logo}/>
                  <li key={team.id} onClick={() => handleTeamFilter(team.short)}>{team.team_name}</li>
                </div>
              ))}
              </div>
            <button onClick={() => handleTeamFilter('All')}>Reset</button>
            </ul>
          </>
        )}

        <div onClick={() => { setShowPrices(!showPrices); setShowTeams(false); setShowPositions(false); }} className="sort-ctn">
          <div className={`dropdown-ctn ${showPrices ? 'open' : ''}`}>
            <div>Price</div>
          </div>
          <div>{priceCriteria === 12 ? '₡ 12m' : `₡ ${priceCriteria}m`}</div>
        </div>
        {showPrices && (
          <>
          <div className="pr-filter-ctn">
            <div className="pr-filter">
            <input 
            type="range" 
            min="4" 
            max="12" 
            step="0.5"
            style={getSliderStyle()} 
            list="price-view"
            value={priceCriteria}
            onChange={handlePriceFilter} 
            />
            <datalist id="price-view">
              {[...Array(9)].map((_, i) => (
                <option key={i} value={4 + i}>{4 + i}</option>
              ))}
            </datalist>
            </div>
          </div>
          </>
        )}
      </div>
      
      <div className="sln-row3">
        <div className="plyr-hd">Players</div>
        <div className="ad-sorts">
          <div onClick={() => {handleSort('price'); setPriceActive(true); setPointActive(false);}} className={`ad-sort-ctn ${ priceActive ? 'active-sort' : '' }`}>
            <div>Price</div>
          </div>
          <div onClick={() => {handleSort('points'); setPointActive(true); setPriceActive(false);}} className={`ad-sort-ctn2 ${ pointActive ? 'active-sort' : '' }`}>
            <div>Total pts</div>
          </div>
        </div>
      </div>

      <div className="plyr-tb">
        {filteredPlayers.length !== 0 ? (
          filteredPlayers.map((player) => {
            const isSelected = isPlayerSelected(player);

            return (
            <div className={`tb-row ${isSelected ? 'muted' : ''}`} key={player.id}>
              <div className="tb-plyr-name">
                <div className="plyr-availability" onClick={(event) => handlePlayerInfoClick(player, event)}><img src={player.availaility === '100%' ? images.info:images.warning}/></div>
                <div onClick={() => {handlePlayerSelection(player); showSquad();}} className="plyr-details-ctn">
                  <div><img className="pl-plyr-jersey" src={player.jersey} alt="player-jersey" /></div>
                  <div className="plyr-details-txt">
                    <div>{player.name}</div>
                    <div className="muted-txt">{player.team}</div>
                  </div>
                </div>
              </div>
              <div className="tb-plyr-price">
                <div>₡ {player.price.toFixed(1)}m</div>
                <div className="muted-txt">{player.position}</div>
              </div>
              <div className="tb-plyr-points">{player.points}</div>
              <div className="inactive-player"></div>
            </div>
            )
          })
        ) : (
          <div className="no-list">No list of players for this sort</div>
        )}
      </div>
      <div className={`pd-ctn ${showPlayerDetails ? 'show':''}`}>
        <PlayerDetails details={playerDetails} closeDetails={handleDetailsClose} />
      </div>
    </div>
  );
};

export default PlayerList;
