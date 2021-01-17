import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
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
 
const RecrAccord = forwardRef((props, ref) => {
 
    const [name, setName] = useState(props.data.name);
    const [eventLink, setEventLink] = useState(props.data.link);
    const [startDate, setStartDate] = useState(props.data.event_start.substring(0, 10));
    const [startTime, setStartTime] = useState(props.data.event_start.substring(11, 16));
    const [endDate, setEndDate] = useState(props.data.event_end.substring(0, 10));
    const [endTime, setEndTime] = useState(props.data.event_end.substring(11, 16));
    const [text, setText] = useState(props.data.description);
    const [virtLink, setVirtLink] = useState(props.data.virtual_link);
    const [invOnly, setInvOnly] = useState(props.data.invite_only);
    
    const defaultStart = (startDate != "2000-01-01")
    const defaultEnd = (endDate != "2000-01-01")
    useImperativeHandle(
        ref,
        () => ({
            save() {
                singleSave();
            }
        }),
    )
    function singleDelete() {
        props.deleteRecrEvent(props.data.id);  
        props.incNumEvents(-1);
    }

    function duplicateEvent() {
        props.dupEvent(props.data);
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
        props.entryChange(
            props.data.id,
            name,
            normalizeUrl(eventLink),
            startDate,
            startTime,
            endDate,
            endTime,
            text,
            invOnly,
            normalizeUrl(virtLink)
            
          );    
    }
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
                                        value={defaultStart ? startDate: null}
                                        required
                                    >
                                    </input>
                                    <input 
                                        type="time"
                                        className="recr-input"
                                        id="recr-date-input"
                                        onChange={(e) => setStartTime(e.target.value)}
                                        value={defaultStart ? startTime: null}
                                        required
                                    >
                                    </input>
 
                                    {/*BACKEND FOR THIS?*/}
                                    <input
                                        type="text"
                                        className="recr-input"
                                        id="recr-date-input"
                                        value={"PST"}
                                        readOnly
                                    
                                    >
                                    
                                    </input>
                                </div>
 
                                End 
                                <div className="recr-date-row">
                                    <input
                                        type="date"
                                        className="recr-input"
                                        id="recr-date-input"
                                        onChange={(e) => setEndDate(e.target.value)}
                                        value={defaultEnd ? endDate : null}
                                        required
                                    >
                                    </input>
                                    <input 
                                        type="time"
                                        className="recr-input"
                                        id="recr-date-input"
                                        onChange={(e) => setEndTime(e.target.value)}
                                        value={defaultEnd ? endTime : null}
                                        required
                                    >
                                    </input>
                                    <input
                                        type="text"
                                        className="recr-input"
                                        id="recr-date-input"
                                        value={"PST"}
                                        readOnly
                                    
                                    >
                                    </input>
                                </div>
                                Link(s)
                                <div>
                                    <input
                                        type="text"
                                        className="recr-input"
                                        id="recr-link-sel"
                                        value={"Facebook Event Link"}
                                        readOnly
                                    
                                    >
                                    </input>
                                    {/*<select
                                        className="recr-input"
                                        id="recr-link-sel"
                                        onChange={(e) => set}
                                    >
                                        <option selected disabled hidden>Select link type</option>
                                        <option>Zoom</option>
                                        <option>FB Event</option>
                                    </select>*/}
                                    <input
                                        type="text"
                                        className="recr-input"
                                        id="recr-link"
                                        value = {eventLink}
                                        onChange = {(e) => setEventLink(e.target.value)}
                                    >
                                    </input>
                                    {/*<button className="link-del" id="link-remove">x</button>*/}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="recr-input"
                                        id="recr-link-sel"
                                        value={"Zoom Meeting Link"}
                                        readOnly
                                    
                                    >
                                    </input>
                                    <input
                                        type="text"
                                        className="recr-input"
                                        id="recr-link"
                                        value= {virtLink}
                                        onChange = {(e) => setVirtLink(e.target.value)}
                                    >
                                    </input>
                                </div>
                                {/*<button className="link-del">+ Add another link</button>*/}
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
                                {console.log("INVITED?")}
                                {console.log(invOnly)}
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <input
                                    type="checkbox"
                                    value="invite"
                                    onChange={(e) => setInvOnly(e.target.checked)}
                                   
                                    checked = {invOnly}
                                >
                                </input>
                                <p id="inv-only">
                                    Invite Only Event
                                </p>
                                
                                
                            </div>
                            <div id="recr-forge-holder">
                                    <button className="recr-forge" onClick={duplicateEvent}>
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
})
 
 
 
 
export default RecrAccord;