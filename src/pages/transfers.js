import { useDispatch, useSelector } from "react-redux";
import Fixtures from "../components/fixtures";
import Footer from "../components/footer";
import Header from "../components/header";
import Partners from "../components/partners";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import images from "../utils/images";
import { squadReset } from "../redux/playerSelectSlice";
import Squad from "../components/squad";
import PlayerList from "../components/playerList";
import SaveTeam from "../components/saveTeam";
import '../css/transfers.css';

export default function Transfers () {
  const location = useLocation();
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [playerCategory, setShowPlayerCategory] = useState('');
  const dispatch = useDispatch();
  const { budget, startingForwards } = useSelector((state) => state.squad);
  const { transfersLeft } = useSelector((state) => state.transfer);
  const [showTeam, setShowTeam] = useState(false);

  const handleShowPlayerListClicked = () => {
    setShowPlayerCategory('All');
    setShowPlayerList(!showPlayerList);
  }

  const handleShowPlayerCategory = (category) => {
   setShowPlayerCategory(category);
  }

  const handleSaveTeamClose = () => {
    setShowTeam(!showTeam);
  }

  const handleCreateTeam = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setShowTeam(true);
  }
  return(
    <>
      <Header />
      <section className="pick-sq-container">
        <div className={`pick-sq ${showPlayerList || showTeam ? 'slide-out' : ''}`}>
          <div className="pick-sq-txt transfers-header">Make Transfers</div>
          <div className="transfer-row3">
            <div>Free Transfers: {transfersLeft}</div>
            <div className={`cost-value ${budget < 0 ? 'neg-value' : ''}`}>Cost: {budget.toFixed(1) * 4}pts</div>
            <div onClick={handleShowPlayerListClicked} className="plyr-list">
              <Link>Player List</Link>
              <span>&#8594;</span>
            </div>
          </div>
          <div className="transfer-deadline">Transfer Deadline: 22nd October, 2024</div>
          
          <div className="pick-squad-div2">
            <div className="pitch-sponsors">
              <img className="sponsor1" src={images.pitchSponsor} alt="pitch-sponsor"/>
              <img className="sponsor1" src={images.pitchSponsor} alt="pitch-sponsor"/>
            </div>
            <div className="pitch-container">
              <img className="pitch" src={images.pitch} alt="pitch" />
            </div>
            <div className="squad">
              <Squad
                showPlayerList={handleShowPlayerListClicked}
                showPlayerCategory={handleShowPlayerCategory}
                createTeam={handleCreateTeam}
                button="Make Transfer"
              />
            </div>
          </div>
        </div>
        <div className={`player-list-container ${showPlayerList ? 'slide-in' : ''}`}>
          {showPlayerList && <PlayerList squadCategory={playerCategory} showSquad={handleShowPlayerListClicked} makeTransfer={true} />}
        </div>
        <div className={`save-tm-ctn ${showTeam ? 'slide-in' : ''}`}>
          {showTeam && <SaveTeam showTeam={handleSaveTeamClose} />}
        </div>
      </section>
      <Fixtures />
      <Partners />
      <Footer />
    </>
  );
}