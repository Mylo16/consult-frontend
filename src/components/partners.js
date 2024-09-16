import React from "react";
import images from "../utils/images";

const Partners = () => {
  return(
    <div className="partners">
      <div>Lead Partners</div>
      <div className="partner-row">
        <div className="partner-col">
          <img className="partner" src={images.startimes}/>
          <div>Official Partner</div>
        </div>
        <div className="partner-col">
          <img className="partner" src={images.mtn}/>
          <div>Official Partner</div>
        </div>
      </div>
      <div className="partner-row">
        <div className="partner-col">
          <img className="partner" src={images.nasco}/>
          <div>Official Partner</div>
        </div>
        <div className="partner-col">
          <img className="partner" src={images.flora}/>
          <div>Official Partner</div>
        </div>
      </div>
      <div className="partner-row">
        <div className="partner-col">
          <img className="partner" src={images.kgl}/>
          <div>Official Partner</div>
        </div>
        <div className="partner-col">
          <img className="partner" src={images.uber}/>
          <div>Official Partner</div>
        </div>
      </div>
      <div className="partner-row">
        <div className="partner-col">
          <img className="partner" src={images.goil}/>
          <div>Official Partner</div>
        </div>
        <div className="partner-col">
          <img className="partner" src={images.malt}/>
          <div>Official Partner</div>
        </div>
      </div>
    </div>
  );
}

export default Partners;