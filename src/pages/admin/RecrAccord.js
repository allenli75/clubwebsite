import React, {useState, useEffect} from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import "./RecrAccord.css";
import '../EventAccord.css';
import { normalizeUrl, validURL } from '../../utils/normalizeUrl';
import { NotificationManager } from 'react-notifications';



const RecrAccord = ({data, deleteEvent, entryChange}) => {

    const [name, setName] = useState('');
    const [eventLink, setEventLink] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [text, setText] = useState('');

    const [propsName, setPropsName] = useState(data.name);
    const [propsEventLink, setPropsEventLink] = useState(data.link);
    const [propsStart, setPropsStart] = useState(data.event_start);
    const [propsEnd, setPropsEnd] = useState(data.event_end);
    const [propsText, setPropsText] = useState(data.description);

    function singleDelete() {
        deleteEvent(data.id);  
        console.log("passed");
      }
    
    function singleSave() {
        if (eventLink.length > 0 && !validURL(eventLink)) {
            NotificationManager.error('Please enter a valid URL', '', 1500);
            return;
          }
        const start = Date.parse(startDate + ' ' + startTime);
        const end = Date.parse(endDate + ' ' + endTime);
        if (end < start) {
            NotificationManager.error('Event end must come before start', '', 3000);
            return;
        }
        console.log(name);
        entryChange(
            data.id,
            name,
            normalizeUrl(eventLink),
            startDate,
            startTime,
            endDate,
            endTime,
            text
          );
        setPropsName(name);
        setPropsEventLink(normalizeUrl(eventLink));
        setPropsStart(startDate.concat(' ' + startTime));
        setPropsEnd(endDate.concat(' ' + endTime));
        setPropsText(text);

    }
    useEffect(() => {
        setName(propsName);
        setEventLink(propsEventLink);
        setStartDate(propsStart.substring(0, 10));
        setStartTime(propsStart.substring(11, 16));
        setEndDate(propsEnd.substring(0, 10));
        setEndTime(propsEnd.substring(11, 16));
        setText(propsText);
    }, [propsName, propsEventLink, propsStart, propsEnd, propsText]);

    return (
        <div id="recr-wrap">
            <Accordion className="accordion" allowZeroExpanded>
                <AccordionItem>
                    <AccordionItemButton>
                        <div className="event-container">
                            <div className="event-flex-left"> {name}</div>
                            <div className="event-flex-right"></div>
                        </div>
                        <div id="recr-unfold" className="accordion__button-club"></div>
                    </AccordionItemButton>
                    <AccordionItemPanel>
                        <hr style={{width: "103%", marginLeft: "-2.5%"}}></hr>
                        <div style={{display: "flex", flexDirection:"row"}}>
                            {/*LEFT SIDE INPUTS*/}
                            <div style={{width: "50%"}}>
                                Name of event *
                                <div>
                                    <input
                                        type="text"
                                        className="recr-input"
                                        id="recr-name-input"
                                        placeholder="Event name"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    >
                                    </input>
                                </div>
                                Start *
                                <div className="recr-date-row">
                                    <input
                                        type="date"
                                        className="recr-input"
                                        id="recr-date-input"
                                        onChange={(e) => setStartDate(e.target.value)}
                                        value={startDate}
                                        required
                                    >
                                    </input>
                                    <input 
                                        type="time"
                                        className="recr-input"
                                        id="recr-date-input"
                                        onChange={(e) => setStartTime(e.target.value)}
                                        value={startTime}
                                        required
                                    >
                                    </input>

                                    {/*BACKEND FOR THIS?*/}
                                    <select
                                        className="recr-input"
                                        id="recr-date-input"
                                    >
                                        <option selected disabled hidden>Time zone</option>
                                        <option>PST</option>
                                        <option>EST</option>
                                        <option>GMT</option>
                                    </select>
                                </div>

                                End 
                                <div className="recr-date-row">
                                    <input
                                        type="date"
                                        className="recr-input"
                                        id="recr-date-input"
                                        onChange={(e) => setEndDate(e.target.value)}
                                        value={endDate}
                                        required
                                    >
                                    </input>
                                    <input 
                                        type="time"
                                        className="recr-input"
                                        id="recr-date-input"
                                        onChange={(e) => setEndTime(e.target.value)}
                                        value={endTime}
                                        required
                                    >
                                    </input>
                                    <select
                                        className="recr-input"
                                        id="recr-date-input"
                                    >
                                        <option selected disabled hidden>Time zone</option>
                                        <option>PST</option>
                                        <option>EST</option>
                                        <option>GMT</option>
                                    </select>
                                </div>
                                Link(s)
                                <div>
                                    <select
                                        className="recr-input"
                                        id="recr-link-sel"
                                    >
                                        <option selected disabled hidden>Select link type</option>
                                        <option>Zoom</option>
                                        <option>GCal</option>
                                        <option>FB Event</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="recr-input"
                                        id="recr-link"
                                    >
                                    </input>
                                    <button className="link-del" id="link-remove">x</button>
                                </div>
                                <button className="link-del">+ Add another link</button>
                            </div>
                            {/*RIGHT SIDE INPUTS*/}
                            <div id="recr-right-inp">
                                Description *
                                <div>
                                    <textarea
                                        type="text"
                                        className="recr-input"
                                        id="recr-desc-input"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        maxLength={150}
                                    >
                                    </textarea>
                                </div>
                                <div id="recr-char">
                                    {150 - text.length} characters remaining 
                                </div>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <input
                                    type="checkbox"
                                >
                                </input>
                                <p id="inv-only">
                                    Invite Only Event
                                </p>
                                
                                
                            </div>
                            <div id="recr-forge-holder">
                                    <button className="recr-forge" onClick={singleSave}>
                                        <img className="recr-img" src={require('../assets/recrDup.PNG')}></img>     
                                    </button>
                                    <button className="recr-forge" onClick={singleDelete}>
                                        <img className="recr-img" src={require('../assets/recrOop.PNG')}></img>     
                                    </button>
                                </div>
                            </div>
                        </div>
                    </AccordionItemPanel>
                    
                </AccordionItem>
            </Accordion>
            
        </div>
    );
}




export default RecrAccord;