import React, { useContext, useEffect, useRef, useState } from 'react'
import "./LandingPage.css";
import { useParams, useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import VideoContext from "../../context/VideoContext";
import MAZLogo from "../../assests/MAZLogo.png";
import joinclassLogo from "../../assests/joinclassLogo.png";
import Frame from "../../assests/Frame.png";
import devicetest from "../../assests/devicetest.png";
import Wave from 'wave-visualizer';
import VideoOff from "../../assests/video-off.svg";
import { database } from "firebase";
import VideoIcon from "../../assests/video.svg";
import GurfahTahfeezLogo from "../../assests/GurfahTahfeezLogo.png";
import SoundTest from "../../assests/soundtest.mp3";
import IdleTimer from 'react-idle-timer'
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { GiSpeaker } from "react-icons/gi";
import { BiMicrophone } from "react-icons/bi";
import { useMediaQuery } from 'react-responsive'
import { FcSpeaker } from "react-icons/fc";
import { GrFormClose } from "react-icons/gr";

import { Avatar, Dropdown, Modal, Menu, Button } from "antd";
import {
    UserOutlined,

} from "@ant-design/icons";

import { Row, Col, Container } from 'react-bootstrap'
import { MdSettingsSystemDaydream } from 'react-icons/md';
//import { useScreenshot } from 'use-react-screenshot'



const LandingPage = () => {

    const { yourid, id } = useParams()

    // const isDesktopOrLaptop = useMediaQuery({
    //     query: '(min-device-width: 1224px)'
    // });

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })

    const isTabletOrMobile = useMediaQuery({ query: '(max-device-width: 1224px)' })





    let [wave] = useState(new Wave());
    let [wave1] = useState(new Wave());

    // const sreenshotRef = useRef(null)
    // const [image, takeScreenShot] = useScreenshot();
    // const getImage = () => takeScreenShot(sreenshotRef.current);


    const [idToCall, setIdToCall] = useState("");
    const [loading, setLoading] = useState(false);
    const [mictest, setMictest] = useState("Start");
    const [isTestModalVisible, setIsTestModalVisible] = useState(false);
    const Audio = useRef();
    const TestAudio = useRef();
    const history = useHistory();
    const TestMic = useRef();
    const idleTimerRef = useRef(null);




    const {

        callAccepted,
        setMeetingId,
        setName,
        isAudioOnly,
        myVideo,
        stream,
        myVideoTest,
        streamA,
        name,
        callEnded,
        myVdoStatus,
        updateVideo,
        myMicStatus,
        updateMic,
        videoSources,
        audioSources,
        audioOutputs,
        currentAudioSource,
        currentVideoSources,
        currentAudioOutput,
        setvideosource,
        setaudiosource,
        setaudiooutput,
        meetingId,
        joinClassNew,
        streamChecked,
        classType,
        userType,
        setStream,
        getCurrentVideoSourceContraints,
        getCurrentAudioSourceContraints,
        currentVersion
    } = useContext(VideoContext);


    useEffect(() => {
        //setName(yourid);
        //  setIdToCall(id);
        // setMeetingId(id);
        // setLoading(true);

        let id1 = localStorage.getItem("id1");
        let id2 = localStorage.getItem("id2");

        if (id1 != undefined && id2 != undefined) {
            setName(id1);

            setMeetingId(id2);
        }
        else {
            window.location.replace('https://elearningquran.com/');
        }


        // if (meetingId == null || meetingId == "" || meetingId == undefined) {

        // }
        if (isAudioOnly == "no" && stream) {
            myVideo.current.srcObject = stream;
        }

        if (stream) {

            if (navigator.mediaDevices) {
                const constraints = window.constraints = {
                    audio: getCurrentAudioSourceContraints(),
                    video: false
                }
                navigator.mediaDevices.getUserMedia(constraints).then((currentStream) => {

                    console.log("wave updated");

                    wave.fromStream(currentStream, "canvasoutput", {

                        colors: ["#6f7a6c", "#6f7a6c", "black"]
                    });
                })
            }


        }
    }, []);

    useEffect(() => {
        if (stream) {
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
        }

    }, [currentAudioSource, stream]);

    useEffect(() => {
        if (name != "") {
            database().ref("video_meetings_status").child(meetingId).child(name).once("value", snapshot => {

                if (snapshot.val() == null) {
                    database().ref("video_meetings_status").child(meetingId).child(name).set({

                        status: "yellow",
                        time: Date.now()
                    });
                }
                else {
                    database().ref("video_meetings_status").child(meetingId).child(name).update({

                        "status": "yellow",
                        "time": Date.now()
                    });
                }
            })

            database().ref("video_meetings_status").child(meetingId).child(name).onDisconnect().update({

                "status": "red",
                "time": Date.now()
            });






        }

    }, [name])

    useEffect(() => {
        if (isTestModalVisible) {


            // wave.fromStream(stream, "canvasoutput", {

            //             colors: ["#e8d7cd","#e8d7cd", "black"]
            //         });

            if (isAudioOnly == "no") {
                setaudiosource(currentAudioSource);

            }

            let a1 = document.querySelector("#aud1");
            let a4 = document.querySelector("#aud4");
            let a5 = document.querySelector("#aud5");

            if (isDesktopOrLaptop) {


                try {
                    if (a1 != null) {
                        a1.setSinkId(currentAudioOutput.deviceId).then(() => {

                        });
                    }
                    if (a4 != null) {
                        a4.setSinkId(currentAudioOutput.deviceId).then(() => {

                        });
                    }
                    if (a5 != null) {
                        a5.setSinkId(currentAudioOutput.deviceId).then(() => {

                        });
                    }
                }
                catch (e) {

                }



            }
        }
    }, [isTestModalVisible]);




    const showTestModal = (showVal) => {
        // if (isAudioOnly == "no" && stream) {
        //     setvideosource(currentVideoSources);
        // }
        setIsTestModalVisible(showVal);

    };
    const testAudio = () => {
        let audio = document.querySelector("#aud4");

        audio.pause();
        audio.currentTime = 0;
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
    const handleTestCancel = () => {
        setIsTestModalVisible(false);
        if (window.stream) {
            window.stream.getAudioTracks().forEach(track => track.stop());
            window.stream = null;


            let audio = document.querySelector("#aud4");
            audio.controls = false;
            audio.autoplay = false;
            setMictest("Start");
        }
        // if (navigator.mediaDevices) {
        //     const constraints = window.constraints = {
        //         audio: getCurrentAudioSourceContraints(),
        //         video: getCurrentVideoSourceContraints()
        //     }
        //     navigator.mediaDevices.getUserMedia(constraints).then((currentStream) => {


        //        myVideo.current.srcObject = currentStream;
        //     })
        // }
    };

    useEffect(() => {
        if (currentAudioOutput != undefined || currentAudioOutput != null) {
            let a1 = document.querySelector("#aud1");
            let a4 = document.querySelector("#aud4");
            let a5 = document.querySelector("#aud5");


            if (isDesktopOrLaptop) {
                try {
                    if (a1 != null) {
                        a1.setSinkId(currentAudioOutput.deviceId).then(() => {
                            //console.log(`Success, audio 1 output device attached: ${currentAudioOutput.deviceId}`);
                        });
                    }
                    if (a4 != null) {
                        a4.setSinkId(currentAudioOutput.deviceId).then(() => {
                            // console.log(`Success, audio 4 output device attached: ${currentAudioOutput.deviceId}`);
                        });
                    }
                    if (a5 != null) {
                        a5.setSinkId(currentAudioOutput.deviceId).then(() => {
                            // console.log(`Success, audio 4 output device attached: ${currentAudioOutput.deviceId}`);
                        });
                    }
                }
                catch (e) {

                }


            }

        }
    }, [currentAudioOutput]);


    const joint = (id) => {
        if (currentVersion == "Test") {
            history.push("/mtalkdemotest/classroom");

        }
        else {
            history.push("/classroom");

        }
        if (userType == "T") {

            setTimeout(function () {
                joinClassNew(id);
            }, 2000)

        }
        else {
            joinClassNew(id);

        }

    }

    const override = css`
    position: fixed;
    width: 100%;
    height: 100%;
        
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
`;




    const cameramenu = (
        <Menu>
            {videoSources.map((val) => (<Menu.Item ><a onClick={(e) => { setvideosource(val) }} >{val.label}</a></Menu.Item>))}

        </Menu>
    );

    const audiosourcemenu = (
        <Menu>
            {audioSources.map((val) => (<Menu.Item ><a onClick={(e) => { setaudiosource(val) }} >{val.label}</a></Menu.Item>))}

        </Menu>
    );

    const audiooutputmenu = (
        <Menu>
            {audioOutputs?.map((val) => (<Menu.Item ><a onClick={(e) => { setaudiooutput(val.deviceId, val) }} >{val.label}</a></Menu.Item>))}

        </Menu>
    );

    const onIdle = () => {
        window.location.replace('https://elearningquran.com/');

    }

    return (
        <>
            <IdleTimer
                ref={idleTimerRef}
                timeout={14400 * 1000}
                onIdle={onIdle}
            ></IdleTimer>
            <div className="body" >
                <ScaleLoader color="#ff0000" loading={loading} css={override} size={150} />
                <div className="container-fluid d-flex h-100 flex-column p-0  ">
                    <div className="header" >
                        <div className="headerlogo" >
                            <img src={MAZLogo} height="85px" width="88px" />

                        </div>
                    </div>

                    <div className="row flex-fill d-flex justify-content-center align-items-center " >



                        <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center    " style={{ alignItems: "flex-end" }}  >
                            <audio id="aud1" src={SoundTest} loop ref={TestAudio} />



                            {isDesktopOrLaptop &&
                                <div className="firstPart " >

                                    <div className="card p-0 banner" >
                                        <div className="classtype" >
                                            {classType}
                                        </div>
                                        <div className="gurfahlogo" >
                                            <img src={GurfahTahfeezLogo} height="45px" width="100px" ></img>


                                        </div>
                                        {/* <div className="audiofrequency" >
                                        <div className="micTestnew" >
                                            <canvas id="canvasoutput" ></canvas>
                                        </div>
                                    </div> */}
                                        {stream &&
                                            <div className="mic_position" >
                                                <div
                                                    className={`iconsnewmic ${myMicStatus ? "" : "red"}`}
                                                    onClick={() => {
                                                        updateMic();
                                                    }}
                                                    tabIndex="0"
                                                >
                                                    <i
                                                        className={`fa fa-microphone${myMicStatus ? "" : "-slash"}`}



                                                    ></i>
                                                </div>

                                            </div>
                                        }
                                        {stream &&
                                            <div className="joinclass_position " >
                                                <div className="iconsnew" style={{ "backgroundColor": "#6e796c" }} onClick={() => { joint(idToCall) }} tabIndex="0">

                                                    <img src={joinclassLogo} height="60px" width="60px" alt="Join Class" />

                                                </div>
                                            </div>
                                        }
                                        {true && stream &&
                                            <div className="camera_position" >

                                                <div className={`iconsnew  ${myVdoStatus ? "" : "red"}`} onClick={() => updateVideo()} tabIndex="0">
                                                    {myVdoStatus ? (
                                                        <img src={VideoIcon} alt="video on icon" />
                                                    ) : (
                                                        <img src={VideoOff} alt="video off icon" />
                                                    )}
                                                </div>

                                            </div>
                                        }
                                        {!stream && streamChecked &&
                                            <div className="Errorposition" >
                                                &nbsp;&nbsp;  No Audio Device Found  &nbsp;&nbsp;
                                            </div>
                                        }



                                        {/* <div className="testdevice_position" >
                                    <div className="iconsnew" onClick={() => { showTestModal(true) }} >
                                        <img src={devicetest}  ></img>

                                    </div>
                                </div> */}

                                        <video
                                            playsInline
                                            muted
                                            autoPlay
                                            ref={myVideo}
                                        />

                                    </div>
                                    <button className="joinButton mt-2 " onClick={() => { showTestModal(true) }} >


                                        Device Configuration

                                    </button>
                                </div>
                            }
                            {isTabletOrMobile &&
                                <>
                                    <div className="firstPartMobile  " >







                                        <div className="card p-0 banner" >
                                            <div className="classtype" >{classType}</div>

                                            {stream &&
                                                <div className="mic_position" >
                                                    <div
                                                        className={`iconsnewmic ${myMicStatus ? "" : "red"}`}
                                                        onClick={() => {
                                                            updateMic();
                                                        }}
                                                        tabIndex="0"
                                                    >
                                                        <i
                                                            className={`fa fa-microphone${myMicStatus ? "" : "-slash"}`}



                                                        ></i>
                                                    </div>

                                                </div>
                                            }
                                            <div className="gurfahlogo" >
                                                <img src={GurfahTahfeezLogo} height="40px" width="85px" ></img>
                                            </div>
                                            <div className="audiofrequency" >
                                                <div className="micTestnew" >
                                                    <canvas id="canvasoutputnew" ></canvas>
                                                </div>
                                            </div>

                                            {stream &&
                                                <>
                                                    <div className="joinclass_position" >
                                                        <div className="iconsnew" style={{ "backgroundColor": "#6e796c" }} onClick={() => { joint(idToCall) }} tabIndex="0">

                                                            <img src={joinclassLogo} height="60px" width="60px" alt="Join Class" />

                                                        </div>
                                                    </div>
                                                    <div className="camera_position" >

                                                        <div className={`iconsnew  ${myVdoStatus ? "" : "red"}`} onClick={() => updateVideo()} tabIndex="0">
                                                            {myVdoStatus ? (
                                                                <img src={VideoIcon} alt="video on icon" />
                                                            ) : (
                                                                <img src={VideoOff} alt="video off icon" />
                                                            )}
                                                        </div>

                                                    </div>
                                                </>
                                            }
                                            {!stream && streamChecked &&
                                                <div className="Errorposition" >
                                                    &nbsp;&nbsp;  No Audio Device Found  &nbsp;&nbsp;
                                                </div>
                                            }

                                            {/* <div className="testdevice_position" >
                                        <div className="iconsnew" onClick={() => { showTestModal(true) }} >
                                            <img src={devicetest}  ></img>

                                        </div>
                                    </div> */}

                                            <video
                                                playsInline
                                                muted
                                                autoPlay
                                                ref={myVideo}
                                            />
                                        </div>

                                        {/* <button className="joinButton mobileConfig mt-2 " onClick={() => { showTestModal(true) }} >


                                    Device Configuration

                                </button> */}
                                    </div>
                                    <button className="joinButton mobileConfig mt-2 " onClick={() => { showTestModal(true) }} >


                                        Device Configuration

                                    </button>
                                </>

                            }


                            {isDesktopOrLaptop &&
                                <div className=" secoundPart  "  >


                                    {/* <div className="semi justify-content-center" >
                               
                            </div> */}
                                    <div className="rectangle " >

                                        <img src={Frame} height="470px" width="300px" />



                                    </div>

                                </div>
                            }

                        </div>

                    </div>

                </div>

                <Modal
                    visible={isTestModalVisible}

                    onCancel={handleTestCancel}
                    title={`Device Configuration`}
                    footer={null}
                    centered
                    width="800px"
                    closeIcon={<GrFormClose />}
                    style={{ borderRadius: "25px" }}

                    bodyStyle={{ borderRadius: "25px" }}

                >


                    <Container  >
                        {/* <button onClick={getImage} >SS</button> */}
                        
                        <Row  className="justify-content-md-center" >
                            <Col lg={6}>
                                {streamA ? (

                                    <div className="card">
                                        <div className="card-body">
                                            <div
                                                style={{ textAlign: "center" }}

                                                id={callAccepted && !callEnded ? "video1" : "video3"}
                                            >






                                                <div className="video-avatar-container">
                                                    <video
                                                        playsInline
                                                        muted
                                                        ref={myVideoTest}
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
                            <Col lg={6}>
                                <div>
                                    <div>
                                        <button style={{ width: "170px", textAlign: "start" }} className="btn btn-outline-secondary" onClick={testAudio} ><FcSpeaker /> Test Speaker</button>
                                    </div>
                                    <br />
                                    <div>
                                        <audio id="aud4" style={{ display: "none" }} src={SoundTest} loop ref={TestMic} />
                                        <button style={{ width: "170px", textAlign: "start" }} className="btn btn-outline-secondary" onClick={testmic} ><BiMicrophone /> Test Microphone</button>
                                    </div>
                                    <br />
                                    {isDesktopOrLaptop &&
                                        <Dropdown overlay={audiooutputmenu} placement="bottomLeft" arrow>
                                            <Button style={{ width: "90%" }}><div style={{ textAlign: "left", width: "100%", overflow: "hidden" }}><GiSpeaker /><div style={{ marginLeft: "6px", display: "inline-block" }}>{currentAudioOutput?.label}</div></div></Button>
                                        </Dropdown>
                                    }

                                    <br />

                                </div>
                                <br />
                                <div>
                                    {/* <button className="btn btn-outline-secondary" onClick={testmic} ><BsMicFill /> Test Mic - {mictest}</button> */}
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
                                    {true && stream ? (<>

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


                </Modal>


            </div>
        </>
    )
}

export default LandingPage
