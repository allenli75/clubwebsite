import React, { useState, useEffect } from 'react'
import Modal from '../../layout/Modal';
const ResComp = (props) => {

  const [title, setTitle] = useState("")
  const [link, setLink] = useState(props.name)
  const [propsName, setPropsName] = useState(props.name)
  const [propsLink, setPropsLink] = useState(props.link)
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);

    function singleSave() {
      setShowFormModal(false)
      console.log(props.number)
      props.entryChange(props.number - 1, title, link)
      setPropsName(title)
    }

    function singleDelete() {
      props.removeRes(props.number - 1)
      console.log("CURRENT")
      console.log(props.name)
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
              <img onClick={singleDelete} src={require('../assets/linkImages/removeLink.png')}/>
              <img onClick={() => setShowFormModal(true)} src={require('../assets/linkImages/editLink.png')}/>
            </div>
          </div>
          <div className="event-link-flex">
            <div>{propsName}</div>
            <a href={propsLink} target="_blank">
                <img id="link" src={require('../assets/linkImages/resLink.png')}/>
            </a>
          </div>
          
            <Modal showModal={showFormModal} setShowModal={setShowFormModal}>
              <div className="res-modal">
                <h3 id="res-bold">Resources</h3>
                <p id="res-desc">Link important resources for propspective or current members!</p>
                <div className="gray-modal">
                  <div className="input-holder">
                    <div className='input-title'>Resource Title</div>
                    <input value={title} placeholder="Type resource name" className="userInput" type="text" onChange={changeName}></input>
                    <div className='input-title'>URL Link</div>
                    <input value={link} placeholder="+ Add a link (google drive, google form, youtube, etc)" className="userInput" type="text" onChange={changeLink}></input>
                  </div>
                </div>
              <div id="buttons-flex">
                {(title !== propsName || link !== propsLink) ? <p>You have unsaved changes!!</p>: null}
                <button id="cancel-button" onClick={() => setShowFormModal(false)}> Cancel </button>
                <button id="save-button" onClick={singleSave}>Save</button>
              </div>
            </div>
            </Modal>
        </div>
    )
}
export default ResComp