import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/profile';
import { NotificationManager } from 'react-notifications';
import { addEvent, updateEvent, deleteEvent } from '../../actions/profile';
import { validURL, normalizeUrl } from '../../utils/normalizeUrl';
import './RecrEvents.css';
import './Admin.css';
import RecrAccord from './RecrAccord';


const RecrEvents = ({events, addEvent, deleteEvent, updateEvent, incNumEvents, cancelEdit}) => {
    var addSuccess = true;
    const addEv = async (e) => {
        e.preventDefault();
        //const start = startDate.concat(' ' + startTime);
        //const end = endDate.concat(' ' + endTime);
        const emptyEvent = {
          name: "[Event " + events.length + "]",
          link: "",
          event_start: "2000-01-01T00:00:00",
          event_end: "2000-01-01T00:00:00",
          description: ""
        };
    
        //if (eventLink.length > 0 && !validURL(eventLink)) {
        //  NotificationManager.error('Please enter a valid URL', '', 1500);
        //  return;
        //}
        // call add event action
        try {
            await addEvent(emptyEvent);
        } catch (err) {
            addSuccess = false;
            console.log(err);
        }
        if (addSuccess) {
          incNumEvents(1);
        }
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
    const count = [1,2]
    function saveAll() {
      for (const num in count) {
        refs.current.forEach(child => {
          if (child !== null){
            child.save();
          }
        })
      }
      cancelEdit();  
    }
    function delRef(index) {
      delete refs[index];
    }
    const refs = useRef([]);
    return (
        <div id="recr-main">
            <h3>Recruitment Timeline</h3>
            <div className="admin-text">
                Add events related to recruitment!
            </div>
            <hr style={{width: "97.5%", marginLeft: "-0.25%"}}></hr>
            <div style={{minHeight:"52vh"}}>
                {events.map((ev, i) => (
                    <RecrAccord 
                        data={ev}
                        deleteEvent = {deleteEvent}
                        entryChange = {entryChange}
                        key = {i}
                        delRef = {delRef}
                        ref = {ins => refs.current[i] = ins}
                        incNumEvents = {incNumEvents}>
                    </RecrAccord>
                ))}
            </div>        
            <div id="recr-buttons">
                <button className="recr-button" id="recr-add" onClick={(e) => addEv(e)}>+ Add Event</button>
                <button className="recr-button" id="recr-cancel" onClick={cancelEdit}>Cancel</button>
                <button className="recr-button" id="recr-save" onClick={saveAll}>Save</button>
            </div>
        </div>
)};

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
    events: state.profile.events
  });

export default connect(mapStateToProps, { addEvent, updateEvent, deleteEvent })(RecrEvents);