import React, { useState } from 'react';
import './LandingForm.css';
import axios from 'axios';
import formbear from './assets/formbear.svg';

const LandingForm = () => {
  const [currStep, setStep] = useState(1);
  const [clubName, setClubName] = useState('');
  const [clubEmail, setClubEmail] = useState('');
  const [pocName, setPOCName] = useState('');
  const [pocEmail, setPOCEmail] = useState('');

  const submitValue = (e) => {
    const formDetails = {
      'org-name': clubName,
      'org-email': clubEmail,
      'poc-name': pocName,
      'poc-email': pocEmail,
    };

    axios({
      method: 'POST',
      url: 'https://sc-backend-v0.herokuapp.com/api/future-sign-up',
      data: formDetails,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(function (response) {
        //handle success
        setStep(currStep + 1);
      })
      .catch(function (error) {
        //handle error
        alert(error.response.data.reason);
      });
  };

  return (
    <div className="inputs">
      <StepOne
        currStep={currStep}
        setStep={setStep}
        setClubName={setClubName}
        setClubEmail={setClubEmail}
        setPOCName={setPOCName}
        setPOCEmail={setPOCEmail}
        submitValue={submitValue}
      />
      <StepTwo currStep={currStep} />
    </div>
  );
};

const StepOne = (props) => {
  if (props.currStep !== 1) {
    return null;
  }
  // let conForm = props.conInvalid
  // let conError = props.conError
  return (
    <div className="formGroup">
      <div className="formHeader">
        <div className="imgContainer">
          <img src={formbear} className="bears" alt="bears" />
        </div>
        <h2>Can't wait? Sign up now for early access!</h2>
      </div>
      <p>Organization name</p>
      <input
        className="userInput"
        type="text"
        placeholder="<insert club name>"
        onChange={(e) => props.setClubName(e.target.value)}
      />
      <p>Organization email</p>
      <input
        className="userInput"
        type="text"
        placeholder="ex. organizationname@gmail.com"
        onChange={(e) => props.setClubEmail(e.target.value)}
      />
      <p>Point of contact name</p>
      <input
        className="userInput"
        type="text"
        placeholder="Your name - as a representative of the organization"
        onChange={(e) => props.setPOCName(e.target.value)}
      />
      <p>Point of contact email</p>
      <input
        className="userInput"
        type="text"
        placeholder="Your email"
        onChange={(e) => props.setPOCEmail(e.target.value)}
      />
      <div className="buttonWrapper">
        <button className="submitButton" onClick={props.submitValue}>
          Submit
        </button>
      </div>
    </div>
  );
};

const StepTwo = (props) => {
  if (props.currStep !== 2) {
    return null;
  }
  return (
    <div className="formGroup">
      <div className="complete">
        <div className="imgContainer">
          <img src={formbear} className="bears" alt="bears" />
        </div>
        <div className="messageText">
          <h3>Thanks for signing up!</h3>
          <h3>
            You will be the first to be notified when we launch.
            <span role="img" aria-label="smiley">
              &#x1F60A;
            </span>
          </h3>
          <a href="/#">Back to top ↑</a>
        </div>
      </div>
    </div>
  );
};

export default LandingForm;