import React, { useState } from 'react'
import './RoleCard.css'

const RoleCard = ({role}) => {

  const [lines, setLines] = useState('simple-one-line');
  
  const measuredRef = (node) => {
    if (node !== null) {
      const height = node.getBoundingClientRect().height
      const lines = height <= 16 ? 'simple-one-line' : height <= 32 ? 'simple-two-line' : height <= 48 ? 'simple-three-line' : height <= 64 ? 'simple-four-line' : 'simple-five-line'
      setLines(lines);
    }
  };

  var { name, open, description, commitment, skills } = role;
  description = description.length > 0 ? description : 'No description provided.';

  return (
    <div>
      <div className="rolecard-content">
        <div className="rolecard-content-row1">
          <div className='rolecard-text'>
            <div className="rolecard-title" ref={measuredRef}>
              {name}
              {open ? <span className="rolecard-dot-green"></span> : <span className="rolecard-dot-red" />}
              <div className="rolecard-status">
                {open ? "Open" : "Closed"}
              </div>
            </div>
            <div className={lines + ' rolecard-description'}>{description.replace(/(<([^>]+)>)/gi, "").replace('&nbsp;', ' ')}</div>
            {commitment != null & commitment.length > 0 ? <div className="rolecard-commitment">
              <b>Time Commitment • </b> {commitment}
            </div> : "" }
            <div className="rolecard-skills">
              <b>Skills & Requirements</b>
              <div className="list">
                {Array.isArray(skills) ? 
                  skills.map((item) => 
                      <li>{item}</li>
                  ) : skills }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleCard;
