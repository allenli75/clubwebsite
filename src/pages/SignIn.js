import React from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import Navbar from '../layout/Navbar';
import SignInForm from './SignInForm.js';

const SignIn = () => {
  return (
    <>
      <Navbar />
      <div className="signin">
        <div className="content">
          <div className="form">
            <SignInForm />
          </div>
        </div>
      </div>
    </>
  );
};

export { SignIn };