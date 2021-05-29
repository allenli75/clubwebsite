import React, { useState, useEffect } from 'react';
import './admin/Admin.css';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

const Role = ({ role, onChange, index }) => {
  var [expand, setExpand] = useState(false);
  
  var [title, setTitle] = useState(role.name);
  var [description, setDescription] = useState(role.description);
  var [commitment, setCommitment] = useState(role.commitment);
  var [skills, setSkills] = useState(role.skills);

  var updatedRole = {
    name: title,
    description: description,
    commitment: commitment,
    skills: skills,
  }

  return (
    <div className="role-row">
      <div className="role-row-header" onClick={() => setExpand(!expand)}>
          <b>{role.name}</b>
          {expand ? <ExpandLess /> : <ExpandMoreIcon />}
      </div>
      {expand ? 
        <div className="role-row-content">
          <div> Role Title <text style={{color: "red"}}>*</text></div>
          <input
            className="userInput"
            value={title}
            onChange={(e) => setTitle(e.target.value) & onChange(updatedRole, index)}
          />
          
          <div> Application Deadline <text style={{color: "red"}}>*</text> </div>
          
          <div> Description <text style={{color: "red"}}>*</text> </div>
          <input
            className="userInput"
            value={description}
            onChange={(e) => setDescription(e.target.value) & onChange(updatedRole, index)}
          />

          <div> Time Commitment <text style={{color: "red"}}>*</text> </div>
          <input
            className="userInput"
            value={commitment}
            onChange={(e) => setCommitment(e.target.value) & onChange(updatedRole, index)}
          />

          <div> Skills and Requirements <text style={{color: "red"}}>*</text> </div>
          <input
            className="userInput"
            value={skills}
            onChange={(e) => setSkills(e.target.value) & onChange(updatedRole, index)}
          />

        </div> 
        : 
        null
      }
    </div>
  );
};

export default Role;