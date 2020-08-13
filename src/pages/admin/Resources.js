import React, { useState, useEffect } from 'react';
import Modal from '../../layout/Modal';
import ResComp from './ResComp';

const Resources = () => {

  const [resources, setResources] = useState([])
  const [resCount, setResCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newLink, setNewLink] = useState("")


  function entryChange(id, name, link) {
    let tempArr = [...resources]
    const tempObj = {
      id: id,
      name: name,
      link: link
    }
    tempArr[id] = tempObj
    setResources(tempArr)
    console.log(resources)
  }

  function changeTitle(event) {
    setNewTitle(event.target.value)
  }

  function changeLink(event) {
    setNewLink(event.target.value)
  }
  function addRes() {
    const emptyRes = {
      id: resCount,
      name: newTitle,
      link: newLink
    }
    setResources([...resources, emptyRes])
    setResCount(prevCount => prevCount + 1)
    setNewTitle("")
    setNewLink("")
    setShowModal(false)
  }

  function removeRes(id) {
    const newResLeft = resources.filter((res) => res.id < id)
    const newResRight = resources.filter((res) => res.id > id)
    const renumberedRight = newResRight.map(function test(res) {
      return({
        id: (res.id - 1),
        name: res.name,
        link: res.link
      })
    })
    const newResList = [...newResLeft, ...renumberedRight]
    setResCount(prevCount => prevCount - 1)
    setResources(newResList)
  }

  const resComps = resources.map((res) =>
    <ResComp data={res} name={res.name} link={res.link} number={res.id + 1} entryChange={entryChange} removeRes={removeRes}/>
  )
  
  return (
    <div>
      <h3>Resources</h3>
      <div className="admin-text">
        Link important resources for prospective or current members!
      </div>
      <div className="gray-back">
        {resComps}
        <img className="add-button" src={require('../assets/linkImages/addLink.png')} onClick={() => setShowModal(true)}/>
      </div>

        {/*ADD RESOURCE MODAL*/}
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div className="res-modal">
            <h3 id="res-bold">Add New Resource</h3>
            <p id="res-desc">Link additional resources for propspective or current members!</p>
            <div className="gray-modal">
              <div className="input-holder">
                <div className='input-title'>Resource Title</div>
                <input value={newTitle} placeholder="Type resource name" className="userInput" type="text" onChange={changeTitle}></input>
                <div className='input-title'>URL Link</div>
                <input value={newLink} placeholder="+ Add a link (google drive, google form, youtube, etc)" className="userInput" type="text" onChange={changeLink}></input>
              </div>
            </div>
            <div id="buttons-flex">
              <button id="cancel-button" onClick={() => setShowModal(false)}> Cancel </button>
              <button id="save-button" onClick={addRes}>Save</button>
            </div>
          </div>
        </Modal>
    </div>
  );
};

export default Resources;
