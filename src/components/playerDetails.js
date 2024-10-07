import { useDispatch } from "react-redux";
import teams from "../dummyData/teams";
import images from "../utils/images";
import { removePlayer } from "../redux/playerSelectSlice";

const PlayerDetails = ({ selected, details, closeDetails, removePlayer }) => {
  const dispatch = useDispatch;

  return(
    <>
        <div className="close-bar-ctn" onClick={() => closeDetails()}><div className="close-bar"></div></div>
        <div className="pd-row1">
          <div className="pd-img-ctn"><img className="pd-img" src={details.image} alt="player-image"/></div>
          <div className="pd-col2-ctn">
            <div className="pd-col2-po">{details.position}</div>
            <div className="pd-col2-name">{details.full_name}</div>
            <div className="pd-col2-tm-ctn">
              <img className="tm-logo2" src={images.kotoko} alt="team logo"/>
              <div>Asante Kotoko SC</div>
            </div>
          </div>
        </div>
        {selected && (
          <div className="rm-plyr">
            <div onClick={() => removePlayer(details)} className="rm-btn-ctn"><img className="rm-btn" src={images.close} alt="close-button" /></div>
            <div>Remove Player</div>
          </div>
        )}
        {details.availaility !=='100%' &&
          <div className={
            details.availaility === '50%' ? "warn2":
            details.availaility === '75%' ? "warn1":
            "warn3"
          }>
            {details.availaility} chance of playing
          </div>
        }
        <div className="pd-row2">
          <div className="pd-row2-col">
            <div>Total pts</div>
            <div>0</div>
          </div>
          <div className="pd-row2-col">
            <div>Price</div>
            <div>₡ {details.price}m</div>
          </div>
          <div className="pd-row2-col">
            <div>Form</div>
            <div>7.3</div>
          </div>
          <div className="pd-row2-col col3">
            <div>Selected</div>
            <div>33%</div>
          </div>
        </div>
        <div className="pd-fixtures-ctn">
          <div className="pd-fix-title">Fixtures</div>
          <div className="pd-fix-ctn">
            {teams.map((team, index) => (
              team.short !== details.team && (
                <div className="pd-fix" key={index}>
                  <div>GW{index + 1}</div>
                  <div><img className="pd-fix-logo" src={team.logo} alt="team logo" /></div>
                  <div>{team.short}</div>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="pd-row3">
          <div className="pd-ms-ctn">
            <div className="summary-title">GW1 Summary</div>
            <div className="pd-mr">
              <div className="pd-mr-home">
                <div className="mr-tm-name">Asante Kotoko</div>
                <img className="tm-logo2" src={images.kotoko}/>
              </div>
              <div className="pd-mr-summary">
                <div>Sept 9</div>
                <div>19:00</div>
              </div>
              <div className="pd-mr-away">
                <img className="tm-logo2" src={images.bechem}/>
                <div className="mr-tm-name">Bechem United</div>
              </div>
            </div>
            <div className="pd-ms">
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Minutes Played</div>
                <div className="pd-ms-value">90</div>
                <div className="pd-ms-pt">2pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Goals</div>
                <div className="pd-ms-value">2</div>
                <div className="pd-ms-pt">10pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Assists</div>
                <div className="pd-ms-value">0</div>
                <div className="pd-ms-pt">0pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Cards</div>
                <div className="pd-ms-value">1</div>
                <div className="pd-ms-pt">-1pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Bonus</div>
                <div className="pd-ms-value">-</div>
                <div className="pd-ms-pt">3pts</div>
              </div>
            </div>
          </div>
          <div className="pd-ms-ctn">
            <div className="summary-title">Current Season Summary</div>
            <div className="pd-ms">
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Minutes Played</div>
                <div className="pd-ms-value">90</div>
                <div className="pd-ms-pt">2pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Goals</div>
                <div className="pd-ms-value">2</div>
                <div className="pd-ms-pt">10pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Assists</div>
                <div className="pd-ms-value">0</div>
                <div className="pd-ms-pt">0pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Cards</div>
                <div className="pd-ms-value">1</div>
                <div className="pd-ms-pt">-1pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Bonus</div>
                <div className="pd-ms-value">-</div>
                <div className="pd-ms-pt">3pts</div>
              </div>
            </div>
          </div>
          <div className="pd-ms-ctn">
            <div className="summary-title">Last Season Summary</div>
            <div className="pd-ms">
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Minutes Played</div>
                <div className="pd-ms-value">90</div>
                <div className="pd-ms-pt">2pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Goals</div>
                <div className="pd-ms-value">2</div>
                <div className="pd-ms-pt">10pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Assists</div>
                <div className="pd-ms-value">0</div>
                <div className="pd-ms-pt">0pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Cards</div>
                <div className="pd-ms-value">1</div>
                <div className="pd-ms-pt">-1pts</div>
              </div>
              <div className="pd-ms-row">
                <div className="pd-ms-stat">Bonus</div>
                <div className="pd-ms-value">-</div>
                <div className="pd-ms-pt">3pts</div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default PlayerDetails;