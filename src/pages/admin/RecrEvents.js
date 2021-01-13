import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/profile';
import { NotificationManager } from 'react-notifications';
import { addEvent, updateEvent, deleteEvent } from '../../actions/profile';
import { validURL, normalizeUrl } from '../../utils/normalizeUrl';
import './RecrEvents.css';
import './Admin.css';
import RecrAccord from './RecrAccord';


const RecrEvents = ({events, addEvent, deleteEvent, updateEvent}) => {
    const [propEvents, setPropEvents] = useState(events);

    function addEv(e) {
        e.preventDefault();
        //const start = startDate.concat(' ' + startTime);
        //const end = endDate.concat(' ' + endTime);
        const emptyEvent = {
          name: "test3",
          link: "https://www.pokemon.com",
          event_start: "2020-08-28T23:27:00",
          event_end: "2020-08-28T23:28:00",
          description: "lmao"
        };
    
        //if (eventLink.length > 0 && !validURL(eventLink)) {
        //  NotificationManager.error('Please enter a valid URL', '', 1500);
        //  return;
        //}
        // call add event action
        console.log("PRESSED");
        addEvent(emptyEvent);
        setPropEvents(events);
    };

    function entryChange(
        id,
        title,
        eventLink,
        startDate,
        startTime,
        endDate,
        endTime,
        text
      ) {
        const start = startDate.concat(' ' + startTime);
        const end = endDate.concat(' ' + endTime);
    
        //update event action
        updateEvent(id, {
          name: title,
          link: eventLink,
          event_start: start,
          event_end: end,
          description: text,
        });
      }
    
    const RecrAccords = events.map((ev, i) => (
        <RecrAccord 
            data={ev}
            deleteEvent = {deleteEvent}
            entryChange = {entryChange}>
        </RecrAccord>

    ));
    
    
    return (
        <div id="recr-main">
            <h3>Recruitment Timeline</h3>
            <div className="admin-text">
                Add events related to recruitment!
            </div>
            <hr style={{width: "97.5%", marginLeft: "-0.25%"}}></hr>
            <div style={{minHeight:"52vh"}}>
                {console.log("EVENTS")}
                {console.log(events)}

                {RecrAccords}

            </div>

            
            <div id="recr-buttons">
                <button className="recr-button" id="recr-add" onClick={(e) => addEv(e)}>+ Add Event</button>
                <button className="recr-button" id="recr-cancel" onClick={() => console.log(events)}>Cancel</button>
                <button className="recr-button" id="recr-save">Save</button>
            </div>

        </div>
)
};

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
  });

//export default connect(mapStateToProps, { updateProfile })(RecrEvents);
export default connect(mapStateToProps, { addEvent, updateEvent, deleteEvent })(RecrEvents);