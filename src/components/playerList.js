import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import playersData from '../dummyData/players.json';
import { fakeBaseQuery } from "@reduxjs/toolkit/query";
import images from "../utils/images";

const PlayerList = ({ showSquad }) => {
  const [players] = useState(playersData.players);
  const [positionCriteria, setPositionCriteria] = useState('All');
  const [teamCriteria, setTeamCriteria] = useState('All');
  const [priceCriteria, setPriceCriteria] = useState(12); // New price filter state
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [showPositions, setShowPositions] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [showPrices, setShowPrices] = useState(false);
  const [pointActive, setPointActive] = useState(false);
  const [priceActive, setPriceActive] = useState(true);

  const positions = ['FWD', 'MID', 'DEF', 'GK'];
  const teams = ['aduana', 'kotoko', 'samartex', 'bechem', 'lions', 'medeama', 'nsoatreman', 'berekum', 'hearts', 'heartsOfLions'];
  const priceRanges = [4.0 , 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0];

  const filterPlayers = (position, team, price) => {
    let filtered = players.filter((player) => 
      (position === 'All' || player.position === position) &&
      (team === 'All' || player.team === team) &&
      (player.price <= price)
    );
    setFilteredPlayers(filtered);
  };

  const handlePositionFilter = (position) => {
    setPositionCriteria(position);
    filterPlayers(position, teamCriteria, priceCriteria);
    setShowPositions(false);
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
    const percentage = ((priceCriteria - 4) / 8) * 100; // 20 is the max price
    return {
      background: `linear-gradient(to right, #01d371 ${percentage}%, white ${percentage}%)`
    };
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
                <li key={position} onClick={() => handlePositionFilter(position)}>{position}</li>
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
                <li key={team} onClick={() => handleTeamFilter(team)}>{team}</li>
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
          filteredPlayers.map((player) => (
            <div className="tb-row" key={player.id}>
              <div className="tb-plyr-name">
                <div className="plyr-availability"><img src={player.availaility === '100%' ? images.info:images.warning}/></div>
                <div>{player.name}</div>
              </div>
              <div className="tb-plyr-price">₡ {player.price.toFixed(1)}m</div>
              <div className="tb-plyr-points">{player.points}</div>
            </div>
          ))
        ) : (
          <div className="no-list">No list of players for this sort</div>
        )}
      </div>

    </div>
  );
};

export default PlayerList;
