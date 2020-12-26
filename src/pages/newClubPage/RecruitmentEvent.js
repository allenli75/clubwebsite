import React from "react";
import "./RecruitmentEvent.css"
function RecruitmentEvent(props){
    return(
      
        <div id="recr-box">
            <div id="name-time-box">
                <text className="event-title">{props.title} </text>
                <text className="event-time">{props.start} - </text>
                <text className="event-time">{props.end}</text>
            </div>
            <div className="date-circle" id={(props.passed == true) ? "filled": "unfilled"}>{props.date}</div>
            <div className="desc-box">
                {props.desc} 
                <div className = "recr-button-row">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.pokemon.com/us/"
                    >
                       {<img
                            className="res-img"
                            src={require('./recrEventLinks/gcal.PNG')}
                            alt="resource"
                       />}
                    </a>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.pokemon.com/us/"
                    >
                       {<img
                            className="res-img"
                            src={require('./recrEventLinks/recrFB.PNG')}
                            alt="resource"
                       />}
                    </a>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.pokemon.com/us/"
                    >
                       {<img
                            className="res-img"
                            src={require('./recrEventLinks/recrZM.PNG')}
                            alt="resource"
                       />}
                    </a>
                </div>
            </div>
            
        </div>
    )
}
export default RecruitmentEvent;

