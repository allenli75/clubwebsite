import React from 'react';
import Moment from 'react-moment';
import RecruitmentEvent from './RecruitmentEvent'
import { justTimeFormat, simplestRangeFormat, START_DATETIME, END_DATETIME } from '../../utils/formatTimeAndDate';

function RecruitmentTL({ data }) {
    const orderedEvents = data.events.sort((a,b) => (a.event_start > b.event_start) ? 1 : ((b.event_start > a.event_start) ? -1 : 0))
    var numEvents = orderedEvents.length;
    const lineHeight = numEvents * 8.3;
    var today = new Date();
    today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(today);
    return orderedEvents.map((event, i) => (
        <div>
        <div id="recr-box">
            {console.log(event.event_start)}
            <div id="name-time-box">
                <text className="event-title">{event.name} </text>
                <div style={{display: "flex"}}>
                    <Moment className="event-time"
                    interval={0}
                    date={event.event_start}
                    format={justTimeFormat(event.event_start, event.event_end, START_DATETIME)}/>
                    <text className="event-time" style={{marginLeft:"-0.5vw"}}>-</text>
                </div>
                <Moment className="event-time"
                interval={0}
                date={event.event_end}
                format={justTimeFormat(event.event_start, event.event_end, END_DATETIME)}/>
            </div>
            <div className="date-circle" id={(true) ? "filled": "unfilled"}>1/21</div>
            <div className="desc-box">
                {event.description} 
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
        <div id="recr-box">
            {console.log(event.event_start)}
            <div id="name-time-box">
                <text className="event-title">{event.name} </text>
                <div style={{display: "flex"}}>
                    <Moment className="event-time"
                    interval={0}
                    date={event.event_start}
                    format={justTimeFormat(event.event_start, event.event_end, START_DATETIME)}/>
                    <text className="event-time" style={{marginLeft:"-0.5vw"}}>-</text>
                </div>
                <Moment className="event-time"
                interval={0}
                date={event.event_end}
                format={justTimeFormat(event.event_start, event.event_end, END_DATETIME)}/>
            </div>
            <div className="date-circle" id={(true) ? "filled": "unfilled"}>1/21</div>
            <div className="desc-box">
                {event.description} 
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
        </div>

    ));
}
export default RecruitmentTL;