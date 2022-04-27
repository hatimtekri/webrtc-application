import React, { useState, useContext, useEffect, useRef } from "react";
import { Button,  Modal,  Avatar} from "antd";
import { Dropdown, Modal as BModal, Row, Col, Container } from 'react-bootstrap'
import Phone from "../../assests/phone.gif";
import Teams from "../../assests/teams.mp3";
import SoundTest from "../../assests/soundtest.mp3";



import * as classes from "./Options.module.css";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoContext from "../../context/VideoContext";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { GiSpeaker } from "react-icons/gi";
import { BiMicrophone } from "react-icons/bi";

import { FcSpeaker } from "react-icons/fc";
import { BsMicFill } from "react-icons/bs";
import { RiComputerLine } from "react-icons/ri";
import { useMediaQuery } from 'react-responsive'
import Hang from "../../assests/hang.svg";

import {
  UserOutlined,
 
  PhoneOutlined,
} from "@ant-design/icons";


const Options = () => {
  const [idToCall, setIdToCall] = useState("");
  const [audioSources1, setAudioSources1] = useState([{ id: 1 }, { id: 2 }]);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mictest, setMictest] = useState("Start");
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const Audio = useRef();
  const TestAudio = useRef();
  
  const TestMic = useRef();
  const {
    call,
    callAccepted,
    isCalling,
    myVideo,
    CallConnected,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    answercall_1,
    otherUser,
    setOtherUser,
    leaveCall1,
    setM1Method,
    me1,
    setcustomId,
    setYourNumber,
    customId,
    audioSources,
    videoSources,
    currentAudioSource,
    currentVideoSources,
    currentAudioOutput,
    audioOutputs,
    setvideosource,
    setaudiosource,
    setaudiooutput,
    isAudioOnly,
    myVdoStatus,
    streamA,
    joined
  } = useContext(VideoContext);

  useEffect(() => {
    if (isModalVisible) {
      let a2 = document.querySelector("#aud2");
      if (isDesktopOrLaptop) {
        if (a2 != null) {
          a2.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, audio 2 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }
        Audio?.current?.play();
      } else Audio?.current?.pause();

    }
  }, [isModalVisible]);


  useEffect(() => {
    if (isTestModalVisible) {
      let a1 = document.querySelector("#aud1");
      let a4 = document.querySelector("#aud4");
      let a5 = document.querySelector("#aud5");
      
      if (isDesktopOrLaptop) {


        if (a1 != null) {
          a1.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, audio 1 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }
        if (a4 != null) {
          a4.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, audio 4 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }
        if (a5 != null) {
          a5.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, audio 4 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }
      }
    }
  }, [isTestModalVisible]);



  const onStop = () => {
    console.log("stop");
  }
  const showModal = (showVal) => {
    setIsModalVisible(showVal);
  };

  const showTestModal = (showVal) => {
    if (isAudioOnly == "no" && stream) {
      setvideosource(currentVideoSources);
    }
    setIsTestModalVisible(showVal);

  };
  const testAudio = () => {
    TestAudio?.current?.play();
    setTimeout(() => { TestAudio?.current?.pause(); }, 4000)

  }

  const testmic = () => {

    if (window.stream) {
      setMictest("Start");
    } else {
      setMictest("Stop");
    }
    if (navigator.mediaDevices) {
      const constraints = window.constraints = {
        audio: true,
        video: false
      }
      navigator.mediaDevices.getUserMedia(constraints).then(handleMicSuccess).catch(handleMicError)
    }

  }

  const handleMicSuccess = (stream) => {
    if (window.stream) {
      window.stream.getAudioTracks().forEach(track => track.stop());
      window.stream = null;
    } else {
      //const audio = document.createElement('audio');
      let audio = document.querySelector("#aud4");
      if (isDesktopOrLaptop) {


        if (audio != null) {
          audio.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`mic1 Success, audio 1 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }
      }
      audio.controls = true;
      audio.autoplay = true;
      window.stream = stream;
      audio.srcObject = stream;



      stream.oninactive = function () {
        audio.controls = false;
        audio.autoplay = false;

        console.log('Stream ended');
      };
    }
  }

  const handleMicError = (e) => {
    console.log("ruin", e.message);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  const handleTestCancel = () => {
    setIsTestModalVisible(false);
    //window.stream.getAudioTracks().forEach(track => track.stop());
    window.stream = null;
    let audio = document.querySelector("#aud4");
    audio.controls = false;
    audio.autoplay = false;
    setMictest("Start");
  };
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      setIsModalVisible(true);
      setOtherUser(call.from);
    } else setIsModalVisible(false);
  }, [call.isReceivingCall]);


  useEffect(() => {
    if (currentAudioOutput != undefined || currentAudioOutput != null) {
      let a1 = document.querySelector("#aud1");
      let a4 = document.querySelector("#aud4");
      let a5 = document.querySelector("#aud5");
      
      // let v = document.querySelector("video");
      //console.log(a instanceof HTMLMediaElement)
      if (isDesktopOrLaptop) {

        if (a1 != null) {
          a1.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, audio 1 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }
        if (a4 != null) {
          a4.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, audio 4 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }
        if (a5 != null) {
          a5.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, audio 4 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }
      }

    }
  }, [currentAudioOutput]);

  return (
    <div className={classes.options}>
      <div style={{ marginBottom: "0.5rem" }}>


        {callAccepted && !callEnded ? (<>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                <GiSpeaker /> {currentAudioOutput.label}
              </Dropdown.Toggle>
            </Dropdown>


          </div>
          <div>

            <Dropdown>
              <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                <BiMicrophone /> {currentAudioSource.label}
              </Dropdown.Toggle>
            </Dropdown>

          </div>
          <div>
            {isAudioOnly == "no" && stream ? (<>
              <Dropdown>
                <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                  <VscDeviceCameraVideo /> {currentVideoSources?.label}
                </Dropdown.Toggle>
              </Dropdown>
            </>) : (<></>)}
          </div>
        </>) :
          (<>
           
            <audio id="aud1" src={SoundTest} loop ref={TestAudio} />
         
             <audio id="aud4" src={SoundTest} loop ref={TestMic} />
             {!joined &&
            <Row>
              <Col lg={8} md={8} >

                <div>
                {/* <Input
                    placeholder="Enter your Name"
                    size="large"
                    className={classes.inputgroup}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    suffix={
                      <Tooltip title="Enter your Name">
                        <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                      </Tooltip>
                    }
                  /> */}

                  {/* <Input
                    placeholder="Enter your number (without country code)"
                    size="large"
                    className={classes.inputgroup}
                    value={customId}
                    onChange={(e) => setcustomId(e.target.value)}
                    style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    suffix={
                      <Tooltip title="Enter your ITS number">
                        <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                      </Tooltip>
                    }
                  />
                  <Button

                    onClick={setYourNumber}
                    className="btn btn-outline-info"
                    type="primary"
                    tabIndex="0"
                  >

                    Set Your Number
                  </Button> */}
                </div>
                {/* <button className="btn btn-light ebtn rounded-pill" onClick={() => { showTestModal(true) }} ><RiComputerLine /> Test</button> */}

              </Col>
              <Col lg={4} md={4} >
                {/* <button className="btn btn-light ebtn rounded-pill" onClick={() => { showTestModal(true) }} ><RiComputerLine /> Test</button> */}

              </Col>
            </Row>
        }
            <br />



          </>)

        }



      </div>
      
     




      {call.isReceivingCall && !callAccepted && (
        <>
          <audio id="aud2" src={Teams} loop ref={Audio} />
          <Modal
            title="Incoming Call"
            visible={isModalVisible}
            onOk={() => showModal(false)}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>
                {call.name} is calling you:{" "}
                <img
                  src={Phone}
                  alt="phone ringing"
                  className={classes.phone}
                  style={{ display: "inline-block" }}
                />
              </h1>
            </div>
            <div className={classes.btnDiv}>
              <Button
                variant="contained"
                className={classes.answer}
                color="#29bb89"
                icon={<PhoneOutlined />}
                onClick={() => {
                  answercall_1();
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Answer
              </Button>
              <Button
                variant="contained"
                className={classes.decline}
                icon={<PhoneOutlined />}
                onClick={() => {
                  setIsModalVisible(false);
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Decline
              </Button>
            </div>
          </Modal>
        </>
      )}

      {/* {isCalling === "yes" && !callAccepted ? (
        <>
          <audio src={Teams2} loop ref={Audio} />
          <Modal
            title="Outgoing Call"
            visible={isModalVisible}
            onOk={() => showModal(false)}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>
               calling to {call.name} :{" "}
                <img
                  src={Phone}
                  alt="phone ringing"
                  className={classes.phone}
                  style={{ display: "inline-block" }}
                />
              </h1>
            </div>
            
          </Modal>
        </>
      ):(<></>)}  */}


      {/* <Modal
        title="Device Testing"
        visible={isTestModalVisible}
        onOk={() => showTestModal(false)}
        onCancel={handleTestCancel}
        footer={null}
      >
        <Container>
          <Row>
            <Col lg={4}>
              {streamA ? (
                <div
                  style={{ textAlign: "center" }}
                  className="card"
                  id={callAccepted && !callEnded ? "video1" : "video3"}
                >






                  <div className="video-avatar-container">
                    <video
                      playsInline
                      muted
                      ref={myVideo}
                      autoPlay
                      className="video-active"
                      style={{
                        opacity: `${myVdoStatus ? "1" : "0"}`,
                        transform: "scaleX(-1)",
                      }}
                    />

                    <Avatar
                      style={{
                        backgroundColor: "#116",
                        position: "absolute",
                        opacity: `${myVdoStatus ? "-1" : "2"}`,
                      }}
                      size={98}
                      icon={!name && <UserOutlined />}
                    >
                      {name}
                    </Avatar>
                  </div>











                </div>
              ) : (
                <>

                  <div className="bouncing-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                </>
              )}


            </Col>
            <Col lg={8}>
            <div>
            <button onClick={testAudio} >Test Audio</button>
            <Dropdown>
              <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                <GiSpeaker /> {currentAudioOutput.label}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {audioOutputs.map((val) => (<Dropdown.Item onSelect={() => { setaudiooutput(val.deviceId, val) }}>{val.label}</Dropdown.Item>))}

              </Dropdown.Menu>
            </Dropdown>


            <br />

          </div>

          <div>
            <button onClick={testmic} >Test Mic</button>
            <Dropdown>
              <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                <BiMicrophone /> {currentAudioSource.label}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {audioSources.map((val) => (<Dropdown.Item onSelect={(e) => { setaudiosource(val) }}>{val.label}</Dropdown.Item>))}

              </Dropdown.Menu>
            </Dropdown>


            <br />

          </div>
          <div>
            {isAudioOnly == "no" && stream ? (<>

              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                    <VscDeviceCameraVideo /> {currentVideoSources?.label}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {videoSources.map((val) => (<Dropdown.Item onSelect={(e) => { setvideosource(val) }}>{val.label}</Dropdown.Item>))}
                  </Dropdown.Menu>
                </Dropdown>



                <br />

              </div>
            </>) : (<></>)}
          </div>
        

            </Col>
          </Row>
        </Container>
        <div>

          <div>

          </div>



         </div>

      </Modal> */}


      <BModal
        show={isTestModalVisible}
        onHide={handleTestCancel}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <BModal.Header closeButton>
          <BModal.Title id="contained-modal-title-vcenter">
            Device Testing
          </BModal.Title>
        </BModal.Header>
        <BModal.Body>

          <Container>
            <Row className="justify-content-md-center" >
              <Col lg={5}>
                {streamA ? (

                  <div class="card">
                    <div class="card-body">
                      <div
                        style={{ textAlign: "center" }}

                        id={callAccepted && !callEnded ? "video1" : "video3"}
                      >






                        <div className="video-avatar-container">
                          <video
                            playsInline
                            muted
                            ref={myVideo}
                            autoPlay
                            className="video-active"
                            style={{
                              opacity: `${myVdoStatus ? "1" : "0"}`,
                              transform: "scaleX(-1)",
                            }}
                          />

                          <Avatar
                            style={{
                              backgroundColor: "#116",
                              position: "absolute",
                              opacity: `${myVdoStatus ? "-1" : "2"}`,
                            }}
                            size={98}
                            icon={!name && <UserOutlined />}
                          >
                            {name}
                          </Avatar>
                        </div>











                      </div>
                    </div>
                  </div>

                ) : (
                  <>

                    <div className="bouncing-loader">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>

                  </>
                )}


              </Col>
              <Col lg={7}>
                <div>
                  <button className="btn btn-outline-secondary" onClick={testAudio} ><FcSpeaker /> Test Audio</button>
                  {isDesktopOrLaptop &&
                    <Dropdown>
                      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                        <GiSpeaker /> {currentAudioOutput.label}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {audioOutputs.map((val) => (<Dropdown.Item onSelect={() => { setaudiooutput(val.deviceId, val) }}>{val.label}</Dropdown.Item>))}

                      </Dropdown.Menu>
                    </Dropdown>
                  }

                  <br />

                </div>

                <div>
                  <button className="btn btn-outline-secondary" onClick={testmic} ><BsMicFill /> Test Mic - {mictest}</button>
                  {!isDesktopOrLaptop ? (<>
                    <Dropdown>
                      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                        <GiSpeaker /> {currentAudioSource.label}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {audioSources.map((val) => (<Dropdown.Item onSelect={(e) => { setaudiosource(val) }}>{val.label}</Dropdown.Item>))}

                      </Dropdown.Menu>
                    </Dropdown>

                  </>) : (<>

                    <Dropdown>
                      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                        <BiMicrophone /> {currentAudioSource.label}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {audioSources.map((val) => (<Dropdown.Item onSelect={(e) => { setaudiosource(val) }}>{val.label}</Dropdown.Item>))}

                      </Dropdown.Menu>
                    </Dropdown>


                  </>)

                  }


                  <br />

                </div>
                <div>
                  {isAudioOnly == "no" && stream ? (<>

                    <div>
                      <Dropdown>
                        <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                          <VscDeviceCameraVideo /> {currentVideoSources?.label}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {videoSources.map((val) => (<Dropdown.Item onSelect={(e) => { setvideosource(val) }}>{val.label}</Dropdown.Item>))}
                        </Dropdown.Menu>
                      </Dropdown>



                      <br />

                    </div>
                  </>) : (<></>)}
                </div>


              </Col>
            </Row>
          </Container>
        </BModal.Body>

      </BModal>



    </div>
  );
};

export default Options;
