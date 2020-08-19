import React, { useState } from 'react';
import Modal from '../../layout/Modal';
import { connect } from 'react-redux';
import { addEvent, updateEvent } from '../../actions/profile';
import { validURL, normalizeUrl } from '../../utils/normalizeUrl';
import DeleteModal from './DeleteModal';
import './Events.css';

const Events = ({ addEvent, updateEvent, events }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [title, setTitle] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [start, setStart] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [text, setText] = useState('');
  const [activeEvent, setActiveEvent] = useState(null);

  const saveEvent = (event: null) => {
    const eventInfo = {
      name: title,
      link: normalizeUrl(eventLink),
      event_start: start,
      event_end: eventTime,
      description: text,
    };
    if (!validURL(eventLink)) return alert('Please enter a valid URL');
    activeEvent
      ? updateEvent(event.id, eventInfo)
      : addEvent(eventInfo, events);
    setShowModal(false);
  };

  const editEvent = (event) => {
    setActiveEvent(true);
    setTitle(event.name);
    setEventLink(event.link);
    setStart(event.event_start);
    setEventTime(event.event_end);
    setText(event.description);
    setShowModal(true);
  };

  const openAddEvent = () => {
    setActiveEvent(false);
    setTitle('');
    setEventLink('');
    setStart('');
    setEventTime('');
    setText('');
    setShowModal(true);
  };

  const openDeleteModal = (event) => {
    setActiveEvent(event);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <h3>Events</h3>
      <p>
        Add events related to recruitment, meetings, and other public events!
      </p>
      <div className="formGroup">
        <div className="events-list">
          {events &&
            events.map((event) => (
              <>
                <div className="event">
                  <div className="event-content">
                    <div className="event-content-header">
                      <div className="event-title">{event.name}</div>
                      <div className="event-date">
                        {event.event_start} - {event.event_end}
                      </div>
                    </div>
                    <div className="event-content-text">
                      {event.description}
                    </div>
                  </div>
                  <div className="event-controls">
                    <i
                      className="fas fa-trash"
                      onClick={() => openDeleteModal(event)}
                    ></i>
                    <i
                      className="fas fa-edit"
                      onClick={() => editEvent(event)}
                    ></i>
                  </div>
                </div>
              </>
            ))}
        </div>
        <img className="add-event-button" src={require('../assets/linkImages/addEvent.png')} onClick={openAddEvent}/>
      </div>

      {/* Delete event modal */}
      <DeleteModal
        type="event"
        item={activeEvent}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
      />

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="add-resource">
          <div id="test-ev-center">
          <div className="formElement ">
            <p>Event Name</p>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter the title of your event"
              className="userInput modal-input"
              maxLength="30"
            />
          </div>
          <div className="formElement">
            <p>Event Link</p>
            <input
              type="text"
              onChange={(e) => setEventLink(e.target.value)}
              value={eventLink}
              placeholder="+ Add a link to your event (zoom, FB, zmurl, etc)"
              className="userInput modal-input"
            />
          </div>
          <div className="formElement">
            <p>Event Start</p>
            <div className="input-time">
              <input
                className="modal-input"
                type="date"
                onChange={(e) => setStart(e.target.value)}
                value={start}
              />
              <input
                className="modal-input"
                type="time"
                onChange={(e) => setEventTime(e.target.value)}
                value={eventTime}
              />
            </div>
          </div>
          <div className="formElement">
            <p>Event End</p>
            <div className="input-time">
              <input
                className="modal-input"
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              />
              <input
                className="modal-input"
                type="time"
                onChange={(e) => setEventEndTime(e.target.value)}
                value={eventEndTime}
              />
            </div>
          </div>
          <div className="formElement formElementDescription">
            <p id="modal-desc-title">Description</p>
            <textarea
              className="descriptionInput"
              id="modal-desc"
              value={text}
              placeholder="Enter a short description about what your event is about and what attendees can expect!"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div id="edit-ev-buttons">
            <button id="edit-ev-cancel" onClick={() => setShowModal(false)}> Cancel </button> 
            <button id="edit-ev-save" type="submit">{activeEvent ? 'Update' : 'Save'}</button>
          </div>
          </div>
        </div>
      </Modal> 
    </div>
  );
};

export default connect(null, { addEvent, updateEvent })(Events);
