import React from "react";
import images from "../utils/images";
import groupedMatches from "../utils/teams";

const Fixtures = () => {
  return(
    <div className="fix-container">
      <div className="fix-row1">
        Fixtures
      </div>
      <div className="fix-row2">
        <div className="arrow-left">
          <img src={images.arrowLeft} alt="arrow-left" />
        </div>
        <p>Gameweek 1:</p>
        <div className="arrow-right">
          <img src={images.arrowRight} alt="arrow-right" />
        </div>
      </div>
      <div className="fix-row3">
        <div className="row3-txt">All times are in GMT</div>
          <div>
            {Object.keys(groupedMatches).map((date) => (
              <div key={date}>
                <p className="fix-date">{date}</p>
                <div className="fixtures">
                  {groupedMatches[date].map((fixture, index) => (
                    <div key={index} className="fixture">
                      <div className="fix-home">
                        <p className="team-name">{fixture.home}</p>
                        <img className="team-logo" src={fixture.home_logo} alt="home_logo" />
                      </div>
                      <div>{fixture.kickoff}</div>
                      <div className="fix-away">
                        <img className="team-logo" src={fixture.away_logo} alt="home_logo" />
                        <p className="team-name">{fixture.away}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Fixtures;