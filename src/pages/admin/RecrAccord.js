import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import "./RecrAccord.css";
import '../EventAccord.css';

function RecrAccord({data}) {
    return (
        <div id="recr-wrap">
            <Accordion className="accordion" allowZeroExpanded>
                <AccordionItem>
                    <AccordionItemButton>
                        <div className="event-container">
                            <div className="event-flex-left"> Event Name</div>
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
                                    >
                                    </input>
                                </div>
                                Start *
                                <div className="recr-date-row">
                                    <input
                                        type="date"
                                        className="recr-input"
                                        id="recr-date-input"
                                    >
                                    </input>
                                    <input 
                                        type="time"
                                        className="recr-input"
                                        id="recr-date-input"
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

                                End 
                                <div className="recr-date-row">
                                    <input
                                        type="date"
                                        className="recr-input"
                                        id="recr-date-input"
                                    >
                                    </input>
                                    <input 
                                        type="time"
                                        className="recr-input"
                                        id="recr-date-input"
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
                            <div style={{marginLeft:"2vw", width: "50%"}}>
                                Description *
                                <div>
                                    <textarea
                                        type="text"
                                        className="recr-input"
                                        id="recr-desc-input"
                                    >
                                    </textarea>
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