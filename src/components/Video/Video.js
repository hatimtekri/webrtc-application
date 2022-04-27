import React, { useContext, useEffect, useState, useRef } from "react";
import VideoContext from "../../context/VideoContext";
import { Button, Input, Modal, notification, Tooltip, Avatar, Dropdown, Menu, message } from "antd";
import { OverlayTrigger, Row, Container, Col } from 'react-bootstrap'
import { database } from "firebase";
import Draggable from 'react-draggable';
import SoundTest from "../../assests/soundtest.mp3";
import { GiSpeaker } from "react-icons/gi";
import hangup from "../../assests/hangup.png";
import micoff from "../../assests/micoff.png";
import ChatIcon from "../../assests/ChatIcon.png";
import micon from "../../assests/micon.png";
import vidoff from "../../assests/vidoff.png";
import vidon from "../../assests/vidon.png";
import { BiMicrophone, BiFullscreen, BiExpand } from "react-icons/bi";
import savatar from "../../assests/savatar.png";
import tavatar from "../../assests/tavatar.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Video.css";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import Msg from "../../assests/msg.svg";
import { UserOutlined, MessageOutlined, InfoCircleOutlined, PhoneOutlined, } from "@ant-design/icons";
import { useMediaQuery } from 'react-responsive'
import { FcSpeaker } from "react-icons/fc";
import { GrFormClose } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

// const socket = io()
const { Search } = Input;
const Video = ({ id, yourid }) => {
  const [idToCall, setIdToCall] = useState("");

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  });
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })


  //   const isDesktopOrLaptop = useMediaQuery({
  //     query: '(min-width: 1000px)'
  // })

  //const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })


  const {
    call,
    callAccepted,
    isAudioOnly,
    myVideo,
    userVideo,
    stream,
    name,
    callEnded,
    leaveCall,
    msgRcv,
    chat,
    userName,
    myVdoStatus,
    updateVideo,
    myMicStatus,
    updateMic,
    isUserVideo,
    videoSources,
    audioSources,
    audioOutputs,
    currentAudioSource,
    currentVideoSources,
    currentAudioOutput,
    setaudiooutput,
    setvideosourceafter,
    setaudiosourceafter,
    meetingId,
    time,
    userType,
    teacherName,
    studentName,
    connectingStatus2,
    connectingStatus1,
    connectingStatus3,
    classType,
    error1,
    error1msg,
    hangUpButton,
    isUserAudioOnly,
    setisUserAudioOnly,
    connectingStatus4,
    otherItsId,
    otherUserType,
    InertLogAPi,
    getCurrentAudioSourceContraints

  } = useContext(VideoContext);


  const [isReverce, setIsReverce] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [fullScrean, setfullScrean] = useState(false);
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);
  const [mictest, setMictest] = useState("Start");
  const [unread, setunread] = useState("0");
  const TestAudio = useRef();
  const TestMic = useRef();
  const dummy = useRef();

  useEffect(() => {


    window.onbeforeunload = function (event) {
      console.log("clooooose");
      InertLogAPi(20);
      var message = 'Important: Please click on \'Leave class\' button to leave this page.';
      if (typeof event == 'undefined') {


        event = window.event;
      }
      if (event) {


        event.returnValue = message;
      }
      return message;
    };



    if (meetingId == null || meetingId == undefined) {
      window.location.replace('https://gurfatahfeez.elearningquran.com/');

    }

    // window.addEventListener("message", (event) => {
    //   const message = event.data.message;

    //   switch (message) {
    //     case 'unreadmessages':
    //       setunread(event.data.value);
    //       break;
    //   }

    // }, false);



    database().ref("video_meetings_status").child(meetingId).child(name).update({

      "status": "green",
      "time": Date.now()
    });

    database().ref("video_meetings").child(meetingId).child("users").child(userType).onDisconnect().remove();
    if (userType == "S") {
      database().ref("video_meetings").child(meetingId).child("users").child("T").child("signalData").onDisconnect().remove();


    }
    else if (userType == "T") {
      database().ref("video_meetings").child(meetingId).child("users").child("S").child("signalData").onDisconnect().remove();


    }








    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.keyCode == 77) {
        updateMic();
        console.log("mute key press")
      }

    });

    if (isAudioOnly == "no" && stream) {

      myVideo.current.srcObject = stream;

    }
    console.log("classroom page started");

  }, []);

  useEffect(() => {

    if (userVideo.current.srcObject != undefined) {
      if (userVideo.current.srcObject.getVideoTracks()[0].enabled == true) {
        setisUserAudioOnly(f => "no");
      }
      else {
        setisUserAudioOnly(f => "yes");
      }
    }


  }, [userVideo])



  useEffect(() => {
    if (dummy?.current) dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);


  useEffect(() => {
    let v1 = document.querySelector("#vid1");
    let v2 = document.querySelector("#vid2");
    if (isDesktopOrLaptop) {
      try {
        if (isUserVideo == true) {
          if (v1 != null) {
            v1.setSinkId(currentAudioOutput.deviceId).then(() => {
              console.log(`Success, video 2 output device attached: ${currentAudioOutput.deviceId}`);
            });
          }
          if (v2 != null) {
            v2.setSinkId(currentAudioOutput.deviceId).then(() => {
              console.log(`Success, video 2 output device attached: ${currentAudioOutput.deviceId}`);
            });
          }
        }
      }
      catch (e) {

      }


    }

  }, [isUserVideo]);

  useEffect(() => {
    let v1 = document.querySelector("#vid1");
    let v2 = document.querySelector("#vid2");
    let a1 = document.querySelector("#aud1");
    let a2 = document.querySelector("#aud4");

    if (isDesktopOrLaptop) {


      try {
        if (v1 != null) {
          v1.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, video 2 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }
        if (v2 != null) {
          v2.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, video 2 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }

        if (a1 != null) {
          a1.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, audio 1 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }
        if (a2 != null) {
          a2.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, audio 1 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }
      }
      catch (e) {

      }
    }

  }, [currentAudioOutput]);
  useEffect(() => {

    if (currentAudioSource != undefined || currentAudioSource != null) {

      if (window.stream) {
        window.stream.getAudioTracks().forEach(track => track.stop());
        window.stream = null;
        let audio = document.querySelector("#aud4");
        audio.controls = false;
        audio.autoplay = false;
        setMictest("Start");
        testmic();
      }


    }


  }, [currentAudioSource]);


  const Toast_Success = (text) => {
    toast.success('text', {
      position: "top-left",
      className: "toastPosition",
      bodyClassName: "toastBody",


      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const testmic = () => {

    if (window.stream) {
      setMictest("Start");
    } else {
      setMictest("Stop");
    }
    if (navigator.mediaDevices) {
      const constraints = window.constraints = {
        audio: getCurrentAudioSourceContraints(),
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

      let audio = document.querySelector("#aud4");
      if (isDesktopOrLaptop) {

        try {
          if (audio != null) {
            audio.setSinkId(currentAudioOutput.deviceId).then(() => {
              console.log(`mic1 Success, audio 1 output device attached: ${currentAudioOutput.deviceId}`);
            });
          }


        }
        catch (e) {

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
    alert("Microphone not found");
    setMictest("Start");
  }


  const testAudio = () => {




    let audio = document.querySelector("#aud1");

    audio.pause();
    audio.currentTime = 0;
    TestAudio?.current?.play();
    setTimeout(() => { TestAudio?.current?.pause(); }, 4000)

  }
  const showModal = (showVal) => {
    setIsModalVisible(showVal);
  };






  const handleSettingCancel = () => {
    setIsSettingModalVisible(false);
    if (window.stream) {
      window.stream.getAudioTracks().forEach(track => track.stop());
      window.stream = null;


      let audio = document.querySelector("#aud4");
      audio.controls = false;
      audio.autoplay = false;
      setMictest("Start");
    }


  };

  const showSettingModal = (showVal) => {

    setIsSettingModalVisible(showVal);

  };
  useEffect(() => {
    if (msgRcv.value && !isModalVisible) {
      notification.open({
        message: "",
        description: `${msgRcv.sender}: ${msgRcv.value}`,
        icon: <MessageOutlined style={{ color: "#108ee9" }} />,
      });
    }
  }, [msgRcv]);

  useEffect(() => {
    if (isSettingModalVisible) {


      let v1 = document.querySelector("#vid1");
      let v2 = document.querySelector("#vid2");
      let a1 = document.querySelector("#aud1");
      let a2 = document.querySelector("#aud4");

      if (isDesktopOrLaptop) {

        try {
          if (v1 != null) {
            v1.setSinkId(currentAudioOutput.deviceId).then(() => {
              console.log(`Success, video 2 output device attached: ${currentAudioOutput.deviceId}`);
            });
          }
          if (v2 != null) {
            v2.setSinkId(currentAudioOutput.deviceId).then(() => {
              console.log(`Success, video 2 output device attached: ${currentAudioOutput.deviceId}`);
            });
          }

          if (a1 != null) {
            a1.setSinkId(currentAudioOutput.deviceId).then(() => {
              console.log(`Success, audio 1 output device attached: ${currentAudioOutput.deviceId}`);
            });
          }
          if (a2 != null) {
            a2.setSinkId(currentAudioOutput.deviceId).then(() => {
              console.log(`Success, audio 1 output device attached: ${currentAudioOutput.deviceId}`);
            });
          }
        }
        catch (e) {

        }


      }

    }
  }, [isSettingModalVisible]);

  const cameramenu = (
    <Menu>
      {videoSources.map((val) => (<Menu.Item ><a onClick={(e) => { setvideosourceafter(val) }} >{val.label}</a></Menu.Item>))}

    </Menu>
  );

  const audiosourcemenu = (
    <Menu>
      {audioSources.map((val) => (<Menu.Item ><a onClick={(e) => { setaudiosourceafter(val) }} >{val.label}</a></Menu.Item>))}

    </Menu>
  );

  const audiooutputmenu = (
    <Menu>
      {audioOutputs?.map((val) => (<Menu.Item ><a onClick={(e) => { setaudiooutput(val.deviceId, val) }} >{val.label}</a></Menu.Item>))}

    </Menu>
  );




  return (

    <>



      {isDesktopOrLaptop ? (<>
        <>
          <div style={{ display: fullScrean ? "none" : "none" }} className="statusMaster" >


            <div className="status" >




              {error1 ? (<>

                <div className="ErrorMsg" >
                  &nbsp;&nbsp;  {error1msg}  &nbsp;&nbsp;
                </div>

              </>) : (<>

                {userType == 'T' && connectingStatus2 && connectingStatus4 &&
                  <>
                    <div className="userName">
                      &nbsp;&nbsp;Student has left the class.
                    </div>


                  </>
                }
                {userType == 'S' && connectingStatus2 && connectingStatus4 &&
                  <>
                    <div className="userName">
                      &nbsp;&nbsp;Muhaffiz has left the class.
                    </div>


                  </>
                }

                {userType == 'T' && connectingStatus2 && !connectingStatus4 &&
                  <>
                    <div className="userName">
                      &nbsp;&nbsp;{studentName} - {classType}
                    </div>


                  </>
                }
                {userType == 'S' && connectingStatus2 && !connectingStatus4 &&
                  <>
                    <div className="userName">
                      &nbsp;&nbsp;{teacherName} - {classType}
                    </div>


                  </>
                }
                {!connectingStatus1 && !connectingStatus2 && !connectingStatus3 &&
                  <div className="userName">
                    &nbsp;&nbsp;Please wait !! Connecting to  {userType == 'T' ? (
                      <>
                        {studentName}
                      </>
                    ) : (
                      <>
                        {teacherName}
                      </>
                    )}.
                    <div className="bouncing-loader">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                }

                {!connectingStatus2 && connectingStatus1 &&
                  <div className="userName">
                    &nbsp;&nbsp;Connected Successfully. Starting AV.

                  </div>
                }


                {connectingStatus3 && !connectingStatus2 &&
                  <div className="userName">
                    &nbsp;&nbsp;{userType == 'T' ? (
                      <>
                        {studentName}
                      </>
                    ) : (
                      <>
                        {teacherName}
                      </>
                    )} has not yet arrived.

                  </div>
                }


              </>)

              }

            </div>
          </div>
          <div className="page row lex-fill d-flex justify-content-center align-items-center">

            <div style={{ paddingRight: "0px" }} className={"partOne " + (fullScrean ? 'col-md-12' : 'col-md-9')} >
              <div className="pOpage">

                <div className=" row lex-fill d-flex justify-content-center align-items-center" >
                  <div className="col-md-12" style={{ position: "relative" }} >
                    <div className="userVideoFrame" style={{ height: fullScrean ? "93vh" : "93vh" }} >




                      <video
                        id="vid2"
                        playsInline
                        ref={userVideo}
                        autoPlay
                        className="video-pOpage"
                        style={{
                          opacity: `${isUserAudioOnly == "no" ? "1" : "0"}`,

                        }}
                      />


                    </div>

                    <div className="DeviceconrolsNew"  >

                      <div className="iconsDiv" >
                         {/* {true && (
                             <div
                            className="icons"
                            onClick={() => { showSettingModal(true) }}
                            tabIndex="0"
                          >
                            <BsThreeDotsVertical color="white" />
                          </div>   
                        )}  */}
                        <Modal
                          title="Chat"
                          footer={null}
                          visible={isModalVisible}
                          onOk={() => showModal(false)}
                          onCancel={() => showModal(false)}
                          style={{ maxHeight: "100px" }}
                          padding="6px"
                        >

                          <div>
                            <iframe src={`https://elearningquran.com/Chat/classroomauth/${name}/${userType}/${otherItsId}/${otherUserType}/${classType}`} height="300px" width="100%" />
                          </div>

                        </Modal>





                        <div
                          className="newicon"
                          onClick={() => {
                            updateMic();
                          }}
                          tabIndex="0"
                        >


                          {myMicStatus ? (<>
                            <img src={micon} height="40px" width="40px" title="Hang up" alt="Hang up" />

                          </>) : (<>
                            <img src={micoff} height="40px" width="40px" title="Hang up" alt="Hang up" />

                          </>)}
                        </div>






                        {hangUpButton ? (
                          <>
                            <div className="newicon" onClick={leaveCall} tabIndex="0">

                              <img src={hangup} height="40px" width="40px" title="Hang up" alt="Hang up" />

                            </div>

                          </>
                        ) : (
                          <>
                            <div className="bouncing-loader">
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>

                          </>
                        )}







                        {true && (
                          <div className="newicon" onClick={() => updateVideo()} tabIndex="0">
                            {myVdoStatus ? (
                              <img src={vidon} height="40px" width="40px" alt="video on icon" />
                            ) : (
                              <img src={vidoff} height="40px" width="40px" alt="video off icon" />
                            )}
                          </div>

                        )}







                      </div>


                    </div>


                    {
                      userType == "T" &&
                      <div className="timer1">
                        <span className="digits">

                          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                        </span>
                        <span className="digits">
                          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                        </span>

                      </div>
                    }
                    <div className="fullScreenDiv">
                      <button className="fullScreenButton" onClick={() => { setfullScrean(a => !a) }} >{fullScrean ? <MdFullscreenExit size="20px" /> : <MdFullscreen size="20px" />}</button>

                    </div>

                    <div className="otherUserName" >

                      {userType == 'T' &&
                        <>
                          <div className="userName">
                            &nbsp;&nbsp;{studentName} - {classType}
                          </div>


                        </>
                      }
                      {userType == 'S' &&
                        <>
                          <div className="userName">
                            &nbsp;&nbsp;{teacherName} - {classType}
                          </div>


                        </>
                      }


                    </div>
                  </div>

                </div>






              </div>
            </div>

            <div style={{ display: fullScrean ? "none" : "inline", paddingLeft: "6px" }} className="partTwo col-md-3">
              <div className="pTpage">
                <div className=" row lex-fill d-flex justify-content-center align-items-center" >
                  <div className="col-md-12" style={{ marginBottom: "5px" }} >
                    <div className="selfVideoFrame" >

                      <video
                        id="my-video"
                        playsInline
                        muted
                        ref={myVideo}
                        autoPlay
                        className="video-pTpage"
                        style={{
                          opacity: `${myVdoStatus ? "1" : "0"}`,
                          transform: "scaleX(-1)",

                        }}
                      />


                      {userType == 'T' ? (<>
                        <Avatar
                          style={{

                            position: "absolute",
                            opacity: `${isAudioOnly == "no" ? "-1" : "2"}`,
                          }}
                          src={tavatar}
                          size={98}
                          icon={!(userName || call.name) && <UserOutlined />}
                        >

                        </Avatar>


                      </>) : (<>

                        <Avatar
                          style={{

                            position: "absolute",
                            opacity: `${isAudioOnly == "no" ? "-1" : "2"}`,
                          }}
                          src={savatar}
                          size={98}
                          icon={!(userName || call.name) && <UserOutlined />}
                        >

                        </Avatar>


                      </>)

                      }




                    </div>
                  </div>
                  <div className="col-md-12" >

                    <iframe src={`https://elearningquran.com/Chat/classroomauth/${name}/${userType}/${otherItsId}/${otherUserType}/${classType}`} width="100%" height="69.5vh" style={{ borderRadius: "5px", height: "64.5vh", overflow: "hidden", width: "100%" }} />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </>

      </>) : (
        <>

          <div className="statusMaster" style={{ display: "none" }} >


            <div className="status" >




              {error1 ? (<>

                <div className="ErrorMsg" >
                  &nbsp;&nbsp;  {error1msg}  &nbsp;&nbsp;
                </div>

              </>) : (<>
                {userType == 'T' && connectingStatus2 && connectingStatus4 &&
                  <>
                    <div className="userName">
                      &nbsp;&nbsp;Student has left the class.
                    </div>


                  </>
                }
                {userType == 'S' && connectingStatus2 && connectingStatus4 &&
                  <>
                    <div className="userName">
                      &nbsp;&nbsp;Muhaffiz has left the class.
                    </div>


                  </>
                }

                {userType == 'T' && connectingStatus2 && !connectingStatus4 &&
                  <>
                    <div className="userName">
                      &nbsp;&nbsp;{studentName} - {classType}
                    </div>


                  </>
                }
                {userType == 'S' && connectingStatus2 && !connectingStatus4 &&
                  <>
                    <div className="userName">
                      &nbsp;&nbsp;{teacherName} - {classType}
                    </div>


                  </>
                }
                {!connectingStatus1 && !connectingStatus2 && !connectingStatus3 &&
                  <div className="userName">
                    &nbsp;&nbsp;Please wait !! Connecting to  {userType == 'T' ? (
                      <>
                        {studentName}
                      </>
                    ) : (
                      <>
                        {teacherName}
                      </>
                    )}.
                    <div className="bouncing-loader">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                }

                {!connectingStatus2 && connectingStatus1 &&
                  <div className="userName">
                    &nbsp;&nbsp;Connected Successfully. Starting AV.

                  </div>
                }


                {connectingStatus3 && !connectingStatus2 &&
                  <div className="userName">
                    &nbsp;&nbsp;{userType == 'T' ? (
                      <>
                        {studentName}
                      </>
                    ) : (
                      <>
                        {teacherName}
                      </>
                    )} has not yet arrived.

                  </div>
                }


              </>)

              }

            </div>
          </div>

          {
            userType == "T" &&
            <div className="timer">
              <span className="digits">
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
              </span>
              <span className="digits">
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
              </span>

            </div>
          }


          <>
            <div>

            </div>


            <div className="row page flex-fill d-flex justify-content-center align-items-center" style={{ width: "103vw" }} >



              <div>


                {true && (
                  <Draggable>
                    <div onDoubleClick={() => { setIsReverce(!isReverce) }} className={`${isReverce ? "card1" : "card2"}`} style={{ textAlign: "center" }} id="video2">



                      <div className="video-avatar-container1">


                        <video
                          id="vid1"
                          playsInline
                          ref={userVideo}
                          autoPlay
                          className="video-active1"
                          style={{
                            opacity: "1",
                          }}
                        />


                      </div>
                    </div>
                  </Draggable>
                )}

                {stream ? (

                  <Draggable>
                    <div onDoubleClick={() => { setIsReverce(!isReverce) }}
                      style={{ textAlign: "center" }}
                      className={`${isReverce ? "card2" : "card1"}`}
                      id={callAccepted && !callEnded ? "video1" : "video3"}
                    >


                      <div style={{ height: "2rem" }}>


                      </div>


                      <div className="video-avatar-container1">

                        <video
                          id="my-video"
                          playsInline
                          muted
                          ref={myVideo}
                          autoPlay
                          className="video-active1"
                          style={{
                            opacity: `${myVdoStatus ? "1" : "0"}`,
                            transform: "scaleX(-1)",

                          }}
                        />


                      </div>





                    </div>
                  </Draggable>
                ) : (


                  <>

                    <div className="bouncing-loader">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>

                  </>
                )}

              </div>



            </div>

          </>






          <div className="Deviceconrols" >




            <div className="iconsDiv" >
              {true && (
                <>


                  <div

                    onClick={() => {
                      setIsModalVisible(!isModalVisible);
                    }}
                    tabIndex="0"
                  >

                    <img src={ChatIcon} height="40px" width="40px" title="chat" alt="chat icon" />
                    {/* <img src={Msg} alt="chat icon" /> */}
                  </div>
                </>

              )}
              <Modal
                title="Chat"
                footer={null}
                visible={isModalVisible}
                onOk={() => showModal(false)}
                onCancel={() => showModal(false)}
                style={{ minHeight: "60vh", maxHeight: "80vh", backgroundColor: "#424549" }}
                padding="6px"
                color="#424549"
                bodyStyle={{ backgroundColor: "#424549", padding: "6px" }}
              >

                {/* <iframe src={`https://elearningquran.com/Chat/classroomauth/${name}/${userType}/30450320/S/${classType}`} height="100%" width="100%"/> */}
                <iframe src={`https://elearningquran.com/Chat/classroomauth/${name}/${userType}/${otherItsId}/${otherUserType}/${classType}`} style={{ height: "60vh" }} height="100%" width="100%" />

              </Modal>





              <div

                onClick={() => {
                  updateMic();
                }}
                tabIndex="0"
              >
                {/* <i
                className={`fa fa-microphone${myMicStatus ? "" : "-slash"}`}
                style={{ transform: "scaleX(-1)" }}
                aria-label={`${myMicStatus ? "mic on" : "mic off"}`}
                aria-hidden="true"
              ></i> */}
                {myMicStatus ? (<>
                  <img src={micon} height="40px" width="40px" title="Hang up" alt="Hang up" />

                </>) : (<>
                  <img src={micoff} height="40px" width="40px" title="Hang up" alt="Hang up" />

                </>)}

              </div>






              {hangUpButton ? (
                <>
                  <div onClick={leaveCall} tabIndex="0">

                    <img src={hangup} height="40px" width="40px" title="Hang up" alt="Hang up" />

                  </div>

                </>
              ) : (
                <>
                  <div className="bouncing-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                </>
              )}







              {true && (
                <div onClick={() => updateVideo()} tabIndex="0">
                  {myVdoStatus ? (
                    <img src={vidon} height="40px" width="40px" alt="video on icon" />
                  ) : (
                    <img src={vidoff} height="40px" width="40px" alt="video off icon" />
                  )}
                </div>

              )}
              {/* <div
                className="icons"
                onClick={() => { showSettingModal(true) }}
                tabIndex="0"
              >
                <BsThreeDotsVertical />
              </div> */}







            </div>


          </div>


        </>

      )}

         {/* <Modal
        visible={isSettingModalVisible}

        onCancel={handleSettingCancel}
        title={`Device Configuration`}
        footer={null}
        centered
        width="400px"
        closeIcon={<GrFormClose />}
      >

        <Container>
          <Row className="justify-content-md-center" >

            <Col lg={12}>
              <div>
                <audio id="aud1" src={SoundTest} loop ref={TestAudio} />

                <button style={{ width: "170px", textAlign: "start" }} className="btn btn-outline-secondary" onClick={testAudio} ><FcSpeaker /> Test Speaker</button>

              </div>
              <br />

              <div>
                <audio id="aud4" style={{ display: "none" }} src={SoundTest} loop ref={TestMic} />
                <button style={{ width: "170px", textAlign: "start" }} className="btn btn-outline-secondary" onClick={testmic} ><BiMicrophone /> Test Microphone</button>
              </div>
              <br />
              {isDesktopOrLaptop &&
                <>
                  <div>

                    <Dropdown overlay={audiooutputmenu} placement="bottomLeft" arrow>
                      <Button style={{ width: "90%" }}><div style={{ textAlign: "left", width: "100%", overflow: "hidden" }}><GiSpeaker /><div style={{ marginLeft: "6px", display: "inline-block" }}>{currentAudioOutput?.label}</div></div></Button>
                    </Dropdown>

                  </div>
                </>
              }

              <br />



              <div>

                {!isDesktopOrLaptop ? (<>



                  <Dropdown overlay={audiosourcemenu} placement="bottomLeft" arrow>
                    <Button style={{ width: "90%" }} ><div style={{ textAlign: "left", width: "100%", overflow: "hidden" }}><GiSpeaker /><div style={{ marginLeft: "6px", display: "inline-block" }}>{currentAudioSource?.label}</div></div></Button>
                  </Dropdown>

                </>) : (<>



                  <Dropdown overlay={audiosourcemenu} placement="bottomLeft" arrow>
                    <Button style={{ width: "90%" }}><div style={{ textAlign: "left", width: "100%", overflow: "hidden" }}><BiMicrophone /><div style={{ marginLeft: "6px", display: "inline-block" }}>{currentAudioSource?.label}</div></div></Button>
                  </Dropdown>


                </>)

                }


                <br />

              </div>
              <br />
              <div>
                {false && stream ? (<>

                  <div >
                    <Dropdown overlay={cameramenu} placement="bottomLeft" arrow>
                      <Button style={{ width: "90%" }}><div style={{ textAlign: "left", width: "100%", overflow: "hidden" }}><VscDeviceCameraVideo /><div style={{ marginLeft: "6px", display: "inline-block" }}>{currentVideoSources?.label}</div></div></Button>
                    </Dropdown>




                    <br />

                  </div>
                </>) : (<></>)}
              </div>


            </Col>
          </Row>
        </Container>


      </Modal>    */}

    </>
  );
};

export default Video;
