import React, { useState, useEffect } from 'react';
import { updateProfile, addRole } from '../../redux/actions/profile';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Role from './Role.js'
import './admin/Admin.css';

var Roles = ({ profile, roles, cancelEdit }) => {
  const [rolesList, setRolesList] = useState(roles);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function addRo() {
    const emptyRole = {
      name: "Role",
      open: true,
      description: "",
      commitment: "",
      skills: [],
    };

    rolesList.push(emptyRole);
    setRolesList(rolesList);

    forceUpdate();
  }

  function updateRole(role, i) {
    rolesList[i] = role;
    setRolesList(rolesList);
  }

  const save = async () => {
    const newProfile = {
      ...profile,
      roles: roles,
    };

    console.log("newProfile")
    console.log(newProfile)

    try {
      await updateProfile(newProfile);
      NotificationManager.success(
        'Changes to Roles saved successfully!',
        '',
        1500
      );
      cancelEdit();
    } catch (err) {
      console.log(err);
      NotificationManager.error(
        'Changes to Roles did not save successfully!',
        '',
        1500
      );
    }

    console.log("profile")
    console.log(profile);
  };

  return (
    <div className="roles-modal">
      <h3>Roles and Responsibilities</h3>
      <div className="admin-text">
        Answer student submitted and suggested questions, or add your own!
      </div>

      {rolesList.map((role, i) => <Role role={role} onChange={updateRole} index={i} />)}

      <button id="add-responsibility-button" onClick={addRo}>
        {' '} + Add Role {' '}
      </button>
      <button id="save-button" onClick={save}>
        {' '} Save{' '}
      </button>
      <button id="cancel-button" onClick={() => cancelEdit()}>
        {' '} Cancel {' '}
      </button>
    </div>
  );
  
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { updateProfile, addRole })(Roles);
