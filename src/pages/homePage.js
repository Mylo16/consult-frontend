import React from "react";
import '../css/homePage.css';
import images from "../utils/images";
import Partners from "../components/partners";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  
  return(
    <>
      <header>
        <video autoPlay loop muted className="background-video">
          <source src={images.bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="header-wrap">
          <div className="hm-title">Let's Game 😎</div>
        </div>
      </header>
      <section className="home-mid-section">
        <div className="home-card">
          <div className="card-title">Register to play </div>
          <div className="card-detail">Sign up to create a GPL play account- and win amazing prizes!</div>
          <button className="cta-btn">Sign-up</button>
        </div>
        <div className="home-card">
          <div className="player-card-container">
            <div className="player-card c1">
              <div className="pp-container">
                <img className="pp" src={images.passport1} alt="player-passport" />
              </div>
              <div>
                <div className="p-name">O. Evans</div>
                <div className="p-club">Samartex</div>
              </div>
            </div>
            <div className="player-card c2">
              <div className="pp-container ppc2">
                <img className="pp pp2" src={images.passport2} alt="player-passport" />
              </div>
              <div className="p-name n2">Asare</div>
              <div className="p-club">Kotoko</div>
            </div>
            <div className="player-card c3">
              <div className="pp-container">
                <img className="pp" src={images.passport3} alt="player-passport" />
              </div>
              <div className="p-name">B. Apiiga</div>
              <div className="p-club">Accra Lions</div>
            </div>
          </div>
          <div className="card-detail">
            <div className="card-title">Fantasy Football</div>
            <div>Use your ₡100M to buy 15 players to start the season</div>
            <button onClick={() => navigate('/')} className="cta-btn">Create team</button>
          </div>
        </div>
        
        <div className="home-card">
          <div className="prediction-pic-container">
            <img className="score-pic" src={images.score} alt="prediction" />
          </div>
          <div className="card-detail">
            <div className="card-title">GPL Prediction</div>
            <div>Predict GPL match results and get amazing prizes! 🎉</div>
            <button className="cta-btn">Start prediction</button>
          </div>
          
        </div>
      </section>
      <Partners />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default HomePage;