import React from "react";

import './InfoBar.css';
import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';


const InfoBar = (props) =>(
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onLineIcon" src={onlineIcon} />
            <h3 className="fontProperty">Inside {props.room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close image" /></a>
        </div>
    </div>
);

export default InfoBar;