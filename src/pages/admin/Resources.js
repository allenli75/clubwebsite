import React, { useState, useEffect } from 'react';
import Modal from '../../layout/Modal';
import ResComp from './ResComp';
import { connect } from 'react-redux';
import {
  addResource,
  updateResource,
  deleteResource,
} from '../../actions/profile';
import './Resources.css';
import { validURL, normalizeUrl } from '../../utils/normalizeUrl';

const Resources = ({
  resources: resourceState,
  addResource,
  updateResource,
  deleteResource,
}) => {
  /*Holds all existing resources*/
  const [resources, setResources] = useState(resourceState);
  console.log(resources)


  /*Determines if add resource shown*/
  const [showModal, setShowModal] = useState(false);

  /*Holds input values in add modal*/
  const [newName, setNewName] = useState('');
  const [newLink, setNewLink] = useState('');

  /*Passed down to resComp to allow editing of resources array above*/
  function entryChange(id, name, link) {
    let tempArr = [...resources];
    const tempObj = {
      id: id,
      name: name,
      link: link,
    };
    tempArr[id] = tempObj;
    //update resource action
    updateResource(id, {name: name, link: link})
    setResources(tempArr);
  }

  function changeTitle(event) {
    setNewName(event.target.value);
  }

  function changeLink(event) {
    setNewLink(event.target.value);
  }

  /*Adds resource to array, count++, resets title and link state values */
  function addRes() {
    const emptyRes = {
      name: newName,
      link: normalizeUrl(newLink),
    };
    if (!validURL(newLink)) return alert('Please enter a valid URL');
    setResources([...resources, emptyRes]);
    // call add resource action
    addResource(emptyRes);
    setNewName('');
    setNewLink('');
    setShowModal(false);
  }

  function cancelAdd() {
    setShowModal(false);
    setNewName('');
    setNewLink('');
  }

  /*Passed down to resComp to allow it to remove resource from state array, count--*/
  function removeRes(id) {
    deleteResource(id)
    const testResList = resources.filter((res) => res.id !== id);
    const newResList = [...testResList];
    setResources(newResList);
  }

  useEffect(() => {
    setResources(resourceState)
  }, [resourceState])

  /*Create all resource components based on content saved in array*/
  const resComps = resources.map((res, i) => (
    <ResComp
      key={i}
      num={i}
      data={res}
      entryChange={entryChange}
      removeRes={removeRes}
    />
  ));

  return (
    <div>
      <h3>Resources</h3>
      <div className="admin-text">
        Link important resources for prospective or current members!
      </div>
      <div className="gray-back">
        {resComps}
        <img
          className="add-button"
          alt="add resource"
          src={require('../assets/linkImages/addLink.png')}
          onClick={() => setShowModal(true)}
        />
      </div>

      {/*ADD RESOURCE MODAL*/}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="res-modal">
          <h3 id="res-bold">Add New Resource</h3>
          <p id="res-desc">
            Link additional resources for prospective or current members!
          </p>
          <div className="gray-modal">
            <div className="input-holder">
              <div className="input-title">Resource Title</div>
              <input
                value={newName}
                placeholder="Type resource name"
                className="resourcesInput"
                type="text"
                onChange={changeTitle}
              ></input>
              <div className="input-title">URL Link</div>
              <input
                value={newLink}
                placeholder="+ Add a link (google drive, google form, youtube, etc)"
                className="resourcesInput"
                type="text"
                onChange={changeLink}
              ></input>
            </div>
          </div>
          <div id="buttons-flex">
            <button id="cancel-button" onClick={cancelAdd}>
              {' '}
              Cancel{' '}
            </button>
            <button id="save-button" onClick={addRes}>
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default connect(null, { addResource, updateResource, deleteResource })(
  Resources
);
