import React, { useState, useEffect } from 'react'
import Modal from '../../layout/Modal';
const ResComp = (props) => {

  const [title, setTitle] = useState("")
  const [link, setLink] = useState(props.name)
  const [propsName, setPropsName] = useState(props.name)
  const [propsLink, setPropsLink] = useState(props.link)
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);

    function singleSave() {
      setShowEditModal(false)
      props.entryChange(props.number - 1, title, link)
      setPropsName(title)
    }

    function singleDelete() {
      props.removeRes(props.number - 1)
      setShowDelModal(false)
    }

    function changeName(event) {
      setTitle(event.target.value)
    }

    function changeLink(event) {
      setLink(event.target.value)
    }

    if (propsName !== props.name) {
      setPropsName(props.name)
    }

    if (propsLink !== props.link) {
      setPropsLink(props.link)
    }

    useEffect(() => {
      setTitle(propsName)
      setLink(propsLink)
    }, [propsName, propsLink])

    return(
        <div className="res-flex">
          <div className="title-buttons-flex">
          <div className="res-num">Resource #{props.data.id + 1}</div>
            <div className="buttons-flex">
              <img onClick={() => setShowDelModal(true)} src={require('../assets/linkImages/removeLink.png')}/>
              <img onClick={() => setShowEditModal(true)} src={require('../assets/linkImages/editLink.png')}/>
            </div>
          </div>
          <div className="event-link-flex">
            <div>{propsName}</div>
            <a href={propsLink} target="_blank">
                <img id="link" src={require('../assets/linkImages/resLink.png')}/>
            </a>
          </div>

          {/*EDIT RESOURCE MODAL*/}
          <Modal showModal={showEditModal} setShowModal={setShowEditModal}>
            <div className="res-modal">
              <h3 id="res-bold">Edit Resource</h3>
              <p id="res-desc">Update the information for this resource!</p>
              <div className="gray-modal">
                <div className="input-holder">
                  <div className='input-title'>Resource Title</div>
                  <input value={title} placeholder="Type resource name" className="userInput" type="text" onChange={changeName}></input>
                  <div className='input-title'>URL Link</div>
                  <input value={link} placeholder="+ Add a link (google drive, google form, youtube, etc)" className="userInput" type="text" onChange={changeLink}></input>
                </div>
              </div>
            <div id="buttons-flex">
              {/*(title !== propsName || link !== propsLink) ? <p>You have unsaved changes!!</p>: null */}
              <button id="cancel-button" onClick={() => setShowEditModal(false)}> Cancel </button>
              <button id="save-button" onClick={singleSave}>Save</button>
            </div>
            </div>
          </Modal>

          {/*DELETE RESOURCE MODAL*/}
          <Modal showModal={showDelModal} setShowModal={setShowDelModal}>
            <div id="del-modal">
              <p id="del-text">Are you sure you want to delete this?</p>
              <div id="del-buttons-flex">
                <button id="del-cancel" onClick={() => setShowDelModal(false)}>Cancel</button>
                <button id="del-del" onClick={singleDelete}>Delete</button>
              </div>
            </div>
          </Modal>
        </div>
    )
}
export default ResComp