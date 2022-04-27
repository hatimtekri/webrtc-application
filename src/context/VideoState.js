import React, { useState, useEffect, useRef } from "react";
import VideoContext from "./VideoContext";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import axios from 'axios';
import MultiStreamsMixer from 'multistreamsmixer';
import RecordRTC from "recordrtc";
import { saveAs } from 'file-saver';
import { useMediaQuery } from 'react-responsive'
import teacherarrived from "../assests/teacherarrived.mp3";
import { database } from "firebase";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//const URL = "https://fathomless-tundra-67025.herokuapp.com/";
const SERVER_URL = "http://localhost:5000/";
const URL2 = "https://gurfatbackend.elearningquran.com/";


//export const socket = io(URL2);


const VideoState = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [joined, setJoined] = useState(false);
  const [isUserVideo, setIsUserVideo] = useState(false);
  const [isUser2Video, setIsUser2Video] = useState(false);
  const [isAudioOnly, setisAudioOnly] = useState("no");
  const [isUserAudioOnly, setisUserAudioOnly] = useState("no");
  const [streamChecked, setStreamChecked] = useState(false);
  const [classType, setClassType] = useState("");
  const [userType, setUserType] = useState("");
  const [otherUserType, setotherUserType] = useState("");
  const [otherItsId, setotherItsId] = useState("");
  const [selfItsId, setSelfItsId] = useState("");
  const [mushafUrl, setMushafUrl] = useState("");
  const [studentName, setStudentName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [browserName, setBrowserName] = useState("");
  const [deviceDetails, setDeviceDetails] = useState("");
  const [chunks, setchunks] = useState([]);
  const [isLanded, setIsLanded] = useState(false);
  const [connectingStatus1, setConnectingStatus1] = useState(false);
  const [connectingStatus2, setConnectingStatus2] = useState(false);
  const [connectingStatus3, setConnectingStatus3] = useState(false);
  const [connectingStatus4, setConnectingStatus4] = useState(false);
  const [error1, seterror1] = useState(false);
  const [error1msg, seterror1msg] = useState("");
  const [hangUpButton, setHangUpButton] = useState(true);
  const [joinClassButton, setJoinClassButton] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [isCalling, setisCalling] = useState("no");
  const [callEnded, setCallEnded] = useState(false);
  const [iceState, setICEState] = useState("");
  const [stream, setStream] = useState();
  const [streamA, setStreamA] = useState();
  const [chat, setChat] = useState([]);
  const [name, setName] = useState("");
  const [customId, setcustomId] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [me1, setMe1] = useState("");
  const [userName, setUserName] = useState("");
  const [currentVersion, setCurrentVersion] = useState("Test");
  //const [currentVersion, setCurrentVersion] = useState("Live");

  const [otherUser, setOtherUser] = useState("");
  const [myVdoStatus, setMyVdoStatus] = useState(true);
  const [myVdoStatus1, setMyVdoStatus1] = useState(true);
  const [userVdoStatus, setUserVdoStatus] = useState();
  const [myMicStatus, setMyMicStatus] = useState(true);
  const [userMicStatus, setUserMicStatus] = useState();
  const [audioSources, setAudioSources] = useState([]);
  const [audioOutputs, setAudioOutputs] = useState([]);
  const [videoSources, setVideoSources] = useState([]);
  const [currentAudioSource, setcurrentAudioSource] = useState({});
  const [audioTrack, setaudioTrack] = useState(0);
  const [currentAudioOutput, setcurrentAudioOutput] = useState({});
  const [currentVideoSources, setcurrentVideoSources] = useState({});
  const [msgRcv, setMsgRcv] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [branchId, setBranchId] = useState("");

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  });


  const myVideo = useRef();
  const myVideoTest = useRef();
  const my1Video1 = useRef();
  const userVideo = useRef();
  const user2Video = useRef();
  const CallConnected = useRef();
  const connectionRef = useRef();
  const recording = useRef();
  const recording1 = useRef();
  const connection2Ref = useRef();
  const TeacherArrivedAudio = useRef();

  const timeRef = useRef(time);



  useEffect(() => {







    fetchDeviceDetails();





    let isvideo = false;
    let isaudio = true;

    //  {
    //    width: { min: 1024, ideal: 1280, max: 1920 },
    //    height: { min: 576, ideal: 720, max: 1080 }
    //  }

    // {
    //   width: { min: 480, ideal: 480, max: 480 },
    //   height: { min: 360, ideal: 360, max: 360 },
    //   frameRate: { ideal: 10, max: 10 }
    // }

    setisAudioOnly(p => "no");




    navigator.mediaDevices
      .getUserMedia({
        video: true, audio: true
      })
      .then((currentStream) => {
        setStream(currentStream);
        setStreamA(currentStream);
        myVideo.current.srcObject = currentStream;
        setStreamChecked(true);



        navigator.mediaDevices.enumerateDevices()
          .then(gotDevices).catch((e) => { });


      }).catch(function (err) {

        setisAudioOnly(p => "yes");
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((currentStream) => {
            setStream(currentStream);
            setStreamA(currentStream);
            setStreamChecked(true);



            navigator.mediaDevices.enumerateDevices()
              .then(gotDevices).catch((e) => { });


          }).catch(function (err) {
            setStreamChecked(true);
          });
      });

    navigator.mediaDevices.ondevicechange = function (event) {
      navigator.mediaDevices.enumerateDevices()
        .then(gotDevices).catch((e) => { });
    }



  }, []);

  const fetchDeviceDetails = () => {
    try {
      axios.get("https://api.ipify.org/?format=json")
        .then(function (response) {



          // var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

          // Firefox 1.0+
          var isFirefox = typeof InstallTrigger !== 'undefined';

          // Safari 3.0+ "[object HTMLElementConstructor]" 
          var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

          // Internet Explorer 6-11
          var isIE = /*@cc_on!@*/false || !!document.documentMode;

          // Edge 20+
          var isEdge = !isIE && !!window.StyleMedia;

          // Chrome 1 - 79
          var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

          // Edge (based on chromium) detection
          var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);


          if (isChrome) {
            setBrowserName("Chrome");
          }
          else if (isSafari) {
            setBrowserName("Safari");
          }
          else if (isEdge) {
            setBrowserName("Edge");
          }
          else if (isEdgeChromium) {
            setBrowserName("Edge Chromium");
          }
          else if (isFirefox) {
            setBrowserName("Firefox");
          }



          setDeviceDetails(navigator.userAgent);

          setIpAddress(response.data.ip);

        })
        .catch(function (error) {
          console.log("inside Ip error");
          console.log(error);
        });


    }
    catch (e) {


    }
  }


  useEffect(() => {



    const fetchdata = () => {
      const api = "https://www.elearningquran.com/api/GetMeetingDetails.aspx";
      try {
        axios.get(api, {
          params: {
            meeting_id: meetingId,
            UserEjid: name,
          }
        })
          .then(function (response) {
            // console.log("inside response");
            const data = response.data.data[0];
            setClassType(data.Class_Type)
            //setClassType("NIKH");
            setUserType(data.UserType);
            setSelfItsId(name);
            setMushafUrl(data.mushaf_url);
            setStudentName(data.s_name);
            setTeacherName(data.t_name);
            setBranchId(data.Branch_ID);
            //console.log(response.data.data[0]);
            //InertLogAPi(2);
            InertLogAPi_withRemarks(2, `BranchId:- ${data.Branch_ID}`);

            if (data.UserType == "T") {
              setotherItsId(data.Student_ITS);
              setotherUserType("S");
            }
            else if (data.UserType == "S") {
              setotherItsId(data.Teacher_ITS);
              setotherUserType("T");
            }


            if (isAudioOnly == "no") {
              if (stream) {
                InertLogAPi(3);
                InertLogAPi(4);
              }
            }
            else if (isAudioOnly == "yes") {
              if (stream) {
                InertLogAPi(3);
              }
            }

            setIsLanded(true);

          })
          .catch(function (error) {
            console.log("inside error");
            console.log(error);
          });


      }
      catch (e) {
        console.log("data2 " + e.message);

      }



    }
    fetchdata();
  }, [name]);



  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);


  useEffect(() => {

    timeRef.current = time;

  }, [time])

  useEffect(() => {
    if (name != undefined) {


      if (isAudioOnly == "no") {
        if (stream) {
          InertLogAPi(3);
          InertLogAPi(4);
        }
      }
      else if (isAudioOnly == "yes") {
        if (stream) {
          InertLogAPi(3);
        }
      }
    }
    if (stream) {
      try {
        stream.getAudioTracks()[0].enabled = myMicStatus;
        stream.getVideoTracks()[0].enabled = myVdoStatus;

      }
      catch (e) {

      }

    }

  }, [stream])

  useEffect(() => {

    if (isFailed == true) {
      // answercall_1();
      InertLogAPi_WithTimer(24, time);
    }

  }, [isFailed])
  useEffect(() => {

    let a9 = document.querySelector("#aud9");


    if (isDesktopOrLaptop) {




      try {
        if (a9 != null) {
          a9.setSinkId(currentAudioOutput.deviceId).then(() => {
            console.log(`Success, audio 1 output device attached: ${currentAudioOutput.deviceId}`);
          });
        }

      }
      catch (e) {

      }
    }

  }, [currentAudioOutput]);

  const InertLogAPi = async (logId) => {
    let today = new Date()
    const dt = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const api = "https://www.elearningquran.com/API/gurfat_Meeting_logs_insert.aspx";



    const params = {
      meeting_id: meetingId,
      UserEjid: name,
      Log_ID: logId,
      edate_g: dt,
      IP: ipAddress,
      Device_info: deviceDetails,
      Browser_info: browserName,

    };

    if (name != "adminfors" && name != "adminfort") {
      const res = await axios(api, { params: params });
    }



    // try {
    //   axios.get(api, {
    //     params: params
    //   })
    //     .then(function (response) {
    //       console.log("inside Log response -" + JSON.stringify(response));


    //     })
    //     .catch(function (error) {
    //       console.log("inside Log error");
    //       console.log(error);
    //     });


    // }
    // catch (e) {


    // }

  }

  const InertLogAPi_WithTimer = async (logId, time) => {
    let today = new Date()
    const dt = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const api = "https://www.elearningquran.com/API/gurfat_Meeting_logs_insert.aspx";
    // console.log("Timer - "+time);




    if (time != undefined) {

      time = time * 0.001;

      console.log("Timer1 - " + time);

      const params = {
        meeting_id: meetingId,
        UserEjid: name,
        Log_ID: logId,
        edate_g: dt,
        IP: ipAddress,
        Device_info: deviceDetails,
        Browser_info: browserName,
        duration: parseInt(time),

      };

      if (name != "adminfors" && name != "adminfort") {
        const res = await axios(api, { params: params });


      }


    }
    else {
      console.log("Timer2 - " + time);

      const params = {
        meeting_id: meetingId,
        UserEjid: name,
        Log_ID: logId,
        edate_g: dt,
        IP: ipAddress,
        Device_info: deviceDetails,
        Browser_info: browserName,


      };

      if (name != "adminfors" && name != "adminfort") {
        const res = await axios(api, { params: params });


      }

    }







    // try {
    //   axios.get(api, {
    //     params: params
    //   })
    //     .then(function (response) {
    //       console.log("inside Log response -" + JSON.stringify(response));


    //     })
    //     .catch(function (error) {
    //       console.log("inside Log error");
    //       console.log(error);
    //     });


    // }
    // catch (e) {


    // }

  }
  const InertLogAPi_withRemarks = async (logId, remarks) => {
    let today = new Date()
    const dt = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const api = "https://www.elearningquran.com/API/gurfat_Meeting_logs_insert.aspx";



    const params = {
      meeting_id: meetingId,
      UserEjid: name,
      Log_ID: logId,
      edate_g: dt,
      IP: ipAddress,
      Device_info: deviceDetails,
      Browser_info: browserName,
      remarks: remarks,

    };

    if (name != "adminfors" && name != "adminfort") {
      const res = await axios(api, { params: params });
    }



    // try {
    //   axios.get(api, {
    //     params: params
    //   })
    //     .then(function (response) {
    //       console.log("inside Log response -" + JSON.stringify(response));


    //     })
    //     .catch(function (error) {
    //       console.log("inside Log error");
    //       console.log(error);
    //     });


    // }
    // catch (e) {


    // }

  }
  const InertLogAPi_WithTimer_WithRemarks = async (logId, time, remarks) => {
    let today = new Date()
    const dt = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const api = "https://www.elearningquran.com/API/gurfat_Meeting_logs_insert.aspx";
    // console.log("Timer - "+time);




    if (time != undefined) {

      time = time * 0.001;

      console.log("Timer1 - " + time);

      const params = {
        meeting_id: meetingId,
        UserEjid: name,
        Log_ID: logId,
        edate_g: dt,
        IP: ipAddress,
        Device_info: deviceDetails,
        Browser_info: browserName,
        duration: parseInt(time),
        remarks: remarks,
      };

      if (name != "adminfors" && name != "adminfort") {
        const res = await axios(api, { params: params });


      }


    }
    else {
      console.log("Timer2 - " + time);

      const params = {
        meeting_id: meetingId,
        UserEjid: name,
        Log_ID: logId,
        edate_g: dt,
        IP: ipAddress,
        Device_info: deviceDetails,
        Browser_info: browserName,


      };

      if (name != "adminfors" && name != "adminfort") {
        const res = await axios(api, { params: params });


      }

    }







    // try {
    //   axios.get(api, {
    //     params: params
    //   })
    //     .then(function (response) {
    //       console.log("inside Log response -" + JSON.stringify(response));


    //     })
    //     .catch(function (error) {
    //       console.log("inside Log error");
    //       console.log(error);
    //     });


    // }
    // catch (e) {


    // }

  }

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };


  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const Toast_Success = (text) => {
    toast.success(text, {
      position: "top-left",
      className: "toastPosition",
      bodyClassName: "toastBody",
      transition: Slide,

      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const Toast_Info = (text) => {
    toast.info(text, {
      position: "top-left",
      className: "toastPosition",
      bodyClassName: "toastBody",
      transition: Slide,

      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const Toast_Normal = (text) => {
    toast.info(text, {
      position: "top-left",
      className: "toastPosition",
      bodyClassName: "toastBody",
      transition: Slide,

      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const Toast_Warn = (text) => {
    toast.warn(text, {
      position: "top-left",
      className: "toastPosition",
      bodyClassName: "toastBody",
      transition: Slide,

      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }


  const joinClassNew = async (id) => {
    toast.dismiss();
    Toast_Normal("Configuring Gurfa for you...");

    InertLogAPi(7);


    database().ref("video_meetings").child(meetingId).child("users").off();
    database().ref("video_meetings").child(meetingId).off();
    database().ref("video_meetings").off();

    if (userType == "T") {
      await database().ref("video_meetings").child(meetingId).child("users").on("child_removed", snapshot => {
        if (snapshot.key == userType) {

          database().ref("video_meetings").child(meetingId).child("users").child("S").once("value", snapshot1 => {
            if (snapshot1.val() == null) {


              setConnectingStatus4(true);

              if (hangUpButton == true) {
                if (userType == "T") {

                  Toast_Warn("Student has left the class");
                }
                else if (userType == "S") {

                  Toast_Warn("Muhaffiz has left the class");

                }


                Firebase_leaveCall();

              }


            }

          })
        }

      })
    }
    else if (userType == "S") {
      await database().ref("video_meetings").child(meetingId).child("users").on("child_removed", snapshot => {
        if (snapshot.key == userType) {

          database().ref("video_meetings").child(meetingId).child("users").child("T").once("value", snapshot1 => {
            if (snapshot1.val() == null) {


              setConnectingStatus4(true);

              if (hangUpButton == true) {
                if (userType == "T") {

                  Toast_Warn("Student has left the class");
                }
                else if (userType == "S") {

                  Toast_Warn("Muhaffiz has left the class");

                }

                Firebase_leaveCall();

              }


            }

          })
        }

      })
    }

    await database().ref("video_meetings").child(meetingId).child("users").once("value", snapshot => {
      console.log("line 2 ");

      snapshot.forEach(snap => {
        console.log("line 3");


        if (userType == "S") {
          if (snap.key == "T") {


            firebase_calluser();


          }
          else if (snap.key == "S") {
            firebase_listenForOtherUser();

          }

        }
        else if (userType == "T") {
          if (snap.key == "S") {


            firebase_calluser();




          }
          else if (snap.key == "T") {
            firebase_listenForOtherUser();

          }

        }

      })

      if (snapshot.val() == null) {
        console.log("Snap inside null");
        database().ref("video_meetings").child(meetingId).child("users").child(userType).set({

          itsId: name
        });

        firebase_listenForOtherUser();



      }
    })




  }


  const firebase_calluser_1 = async () => {

    if (userType == "S") {
      await database().ref("video_meetings").child(meetingId).child("users").child("T").once("value", snapshot => {


        if (snapshot.val().isAudioOnly == "no") {

          database().ref("video_meetings").child(meetingId).child("users").child(userType).set({
            isAudioOnly,
            itsId: name,
          });
          database().ref("video_meetings").child(meetingId).child("users").child("T").remove();

          firebase_listenForOtherUser();




        }
      })
    }
    else if (userType == "T") {
      await database().ref("video_meetings").child(meetingId).child("users").child("S").once("value", snapshot => {


        if (snapshot.val().isAudioOnly == "no") {
          database().ref("video_meetings").child(meetingId).child("users").child(userType).set({
            isAudioOnly,
            itsId: name,
          });
          database().ref("video_meetings").child(meetingId).child("users").child("S").remove();

          firebase_listenForOtherUser();





        }
      })
    }


  }



  const firebase_calluser = async () => {

    await database().ref("video_meetings").child(meetingId).child("users").child(userType).on("child_removed", snapshot => {

      // console.log("child removed : "+ JSON.stringify(snapshot.key));


      if (snapshot.key == "signalData") {


        setConnectingStatus4(true);

        if (hangUpButton == true) {
          if (userType == "T") {

            Toast_Warn("Student has left the class");
          }
          else if (userType == "S") {

            Toast_Warn("Muhaffiz has left the class");

          }
          Firebase_leaveCall();

        }
        // database().ref("video_meetings").child(meetingId).child("users").child(userType).update({ 'isAudioOnly': isAudioOnly});


        // firebase_listenForOtherUser();



      }
    })


    const iceVariable_Rawzat = [{
      urls: ["stun:bn-turn1.xirsys.com"]
    }, {
      username: "9-NWwoBTnMjClayUgDR4B_UkzSFyv2QCwohYGEXtWL7D4jtjxq1G8twnHw-utc3-AAAAAGHln1FndXJmYXRhaGZlZXo=",
      credential: "29e2c698-77b6-11ec-85d0-0242ac140004",
      urls: [
        "turn:bn-turn1.xirsys.com:80?transport=udp",
        "turn:bn-turn1.xirsys.com:3478?transport=udp",
        "turn:bn-turn1.xirsys.com:80?transport=tcp",
        "turn:bn-turn1.xirsys.com:3478?transport=tcp",
        "turns:bn-turn1.xirsys.com:443?transport=tcp",
        "turns:bn-turn1.xirsys.com:5349?transport=tcp"
      ]
    }];

    const iceVariable_GurfaTahfeez = [{
      urls: ["stun:bn-turn1.xirsys.com"]
    }, {
      username: "he7qNxWD2G9Oijy0azWvKWwSpOLvnd7a_vI0fz7kgSo4OijJHOOzEivKPl2ZL7XXAAAAAGEwWopndXJmYXRhaGZlZXo=",
      credential: "c2b05bba-0baa-11ec-b8f2-0242ac140004",
      urls: [
        "turn:bn-turn1.xirsys.com:80?transport=udp",
        "turn:bn-turn1.xirsys.com:3478?transport=udp",
        "turn:bn-turn1.xirsys.com:80?transport=tcp",
        "turn:bn-turn1.xirsys.com:3478?transport=tcp",
        "turns:bn-turn1.xirsys.com:443?transport=tcp",
        "turns:bn-turn1.xirsys.com:5349?transport=tcp"
      ]
    }];


    const peer = new Peer({
      initiator: true, trickle: false, stream, offerOptions: { offerToReceiveAudio: true, offerToReceiveVideo: true }, config: {
        iceServers: getXirsysKeys_2(branchId),
      }
    });

    peer.on("signal", (data) => {
      console.log("Call Peer Signal")
      database().ref("video_meetings").child(meetingId).child("users").child(userType).set({
        signalData: data,
        itsId: name,
      });

    });
    //toast.dismiss();
    // Toast_Normal("Connecting...");



    if (userType == "S") {
      await database().ref("video_meetings").child(meetingId).child("users").child("T").on('child_added', snap => {

        console.log(snap.key + " " + JSON.stringify(snap.val()));


        if (snap.key == "signalData") {
          // notify.pause();
          // notify.currentTime = 0;
          // notify.play();

          TeacherArrivedAudio?.current?.play();
          setTimeout(() => { TeacherArrivedAudio?.current?.pause(); }, 6000)

          console.log("inside signal data");
          peer.on('connect', () => {


            InertLogAPi(8);
            toast.dismiss();
            Toast_Success("Connected successfully");
            handleReset();
            handleStart();
          });


          peer.signal(snap.val());
          peer.on("stream", (currentStream) => {
            console.log("inside stream");
            userVideo.current.srcObject = currentStream;
            setIsUserVideo(true);

            if (classType == "NIKH") {
              Recording_2(currentStream, stream);
            }
            else {
              Recording_1(currentStream, stream);
            }
            peer.replaceTrack(stream.getVideoTracks()[0], stream.getVideoTracks()[0], stream);
            //peer.addStream(stream)
            database().ref("video_meetings").child(meetingId).child("users").child("T").off();

          });
        }


      });
      setConnectingStatus2(true);
      setConnectingStatus4(false);

      connectionRef.current = peer;

      connectionRef.current.on("error", (err) => {


        InertLogAPi_withRemarks(24, err.code);




      });
    }
    else if (userType == "T") {
      await database().ref("video_meetings").child(meetingId).child("users").child("S").on('child_added', snap => {

        console.log(snap.key + " " + JSON.stringify(snap.val()));

        if (snap.key == "signalData") {
          console.log("inside signal data");

          peer.on('connect', () => {
            toast.dismiss();
            Toast_Success("Connected successfully");
            InertLogAPi(8);
            handleReset();
            handleStart();
          });


          peer.signal(snap.val());
          peer.on("stream", (currentStream) => {
            console.log("inside stream");
            userVideo.current.srcObject = currentStream;
            setIsUserVideo(true);

            if (classType == "NIKH") {
              Recording_2(currentStream, stream);
            }
            else {
              Recording_1(currentStream, stream);
            }
            peer.replaceTrack(stream.getVideoTracks()[0], stream.getVideoTracks()[0], stream);

            database().ref("video_meetings").child(meetingId).child("users").child("S").off();


          });
        }



      });
      setConnectingStatus2(true);
      setConnectingStatus4(false);

      connectionRef.current = peer;

      connectionRef.current.on("error", (err) => {


        InertLogAPi_withRemarks(24, err.code);




      });
    }


  }

  const firebase_answer = async (signal) => {



    await database().ref("video_meetings").child(meetingId).child("users").child(userType).on("child_removed", snapshot => {

      // console.log("child removed : "+ JSON.stringify(snapshot.key));


      if (snapshot.key == "signalData") {



        setConnectingStatus4(true);

        if (hangUpButton == true) {
          if (userType == "T") {

            Toast_Warn("Student has left the class");
          }
          else if (userType == "S") {

            Toast_Warn("Muhaffiz has left the class");

          }

          Firebase_leaveCall();

        }
        // database().ref("video_meetings").child(meetingId).child("users").child(userType).update({ 'isAudioOnly': isAudioOnly});


        // firebase_listenForOtherUser();



      }
    })

    const iceVariable_Rawzat = [{
      urls: ["stun:bn-turn1.xirsys.com"]
    }, {
      username: "9-NWwoBTnMjClayUgDR4B_UkzSFyv2QCwohYGEXtWL7D4jtjxq1G8twnHw-utc3-AAAAAGHln1FndXJmYXRhaGZlZXo=",
      credential: "29e2c698-77b6-11ec-85d0-0242ac140004",
      urls: [
        "turn:bn-turn1.xirsys.com:80?transport=udp",
        "turn:bn-turn1.xirsys.com:3478?transport=udp",
        "turn:bn-turn1.xirsys.com:80?transport=tcp",
        "turn:bn-turn1.xirsys.com:3478?transport=tcp",
        "turns:bn-turn1.xirsys.com:443?transport=tcp",
        "turns:bn-turn1.xirsys.com:5349?transport=tcp"
      ]
    }];

    const iceVariable_GurfaTahfeez = [{
      urls: ["stun:bn-turn1.xirsys.com"]
    }, {
      username: "he7qNxWD2G9Oijy0azWvKWwSpOLvnd7a_vI0fz7kgSo4OijJHOOzEivKPl2ZL7XXAAAAAGEwWopndXJmYXRhaGZlZXo=",
      credential: "c2b05bba-0baa-11ec-b8f2-0242ac140004",
      urls: [
        "turn:bn-turn1.xirsys.com:80?transport=udp",
        "turn:bn-turn1.xirsys.com:3478?transport=udp",
        "turn:bn-turn1.xirsys.com:80?transport=tcp",
        "turn:bn-turn1.xirsys.com:3478?transport=tcp",
        "turns:bn-turn1.xirsys.com:443?transport=tcp",
        "turns:bn-turn1.xirsys.com:5349?transport=tcp"
      ]
    }];


    // console.log("answer");
    const peer = new Peer({
      initiator: false, trickle: false, stream, offerOptions: { offerToReceiveAudio: true, offerToReceiveVideo: true }, config: {
        iceServers: getXirsysKeys_2(branchId),
      }
    });

    peer.signal(signal);

    peer.on('connect', () => {
      toast.dismiss();
      Toast_Success("Connected successfully");

      InertLogAPi(8);
      handleReset();
      handleStart();
    });

    peer.on("signal", (data) => {
      console.log("Answer Peer signal ")
      database().ref("video_meetings").child(meetingId).child("users").child(userType).set({
        signalData: data,
        itsId: name,
      });


    });


    peer.on("stream", (currentStream) => {
      // console.log("inside stream");


      userVideo.current.srcObject = currentStream;

      setIsUserVideo(true);
      setConnectingStatus2(true);
      setConnectingStatus4(false);


      if (classType == "NIKH") {
        Recording_2(currentStream, stream);
      }
      else {
        Recording_1(currentStream, stream);
      }


      database().ref("video_meetings").child(meetingId).child("users").off();
      peer.replaceTrack(stream.getVideoTracks()[0], stream.getVideoTracks()[0], stream);

    });





    connectionRef.current = peer;


    connectionRef.current.on("error", (err) => {


      InertLogAPi_withRemarks(24, err.code);




    });



  }

  const firebase_listenForOtherUser = async () => {

    setJoined(true);


    setConnectingStatus3(true);
    //toast.dismiss();
    if (userType == "S") {
      Toast_Info(teacherName + " has not yet arrived");

    }
    else if (userType == "T") {
      Toast_Info("Student has not yet arrived");


    }


    if (userType == "S") {
      await database().ref("video_meetings").child(meetingId).child("users").on("child_added", snap => {
        //console.log("listen to t " + snap.key)
        if (snap.key == "T") {
          if (snap.val().signalData) {
            // notify.pause();
            // notify.currentTime = 0;
            // notify.play();
            // toast.dismiss();
            // Toast_Normal("Connecting...");
            TeacherArrivedAudio?.current?.play();
            setTimeout(() => { TeacherArrivedAudio?.current?.pause(); }, 6000)



            // setTimeout(() => { notify.pause(); }, 6000);
            firebase_answer(snap.val().signalData);


          }

        }




      });
    }
    else if (userType == "T") {
      await database().ref("video_meetings").child(meetingId).child("users").on("child_added", snap => {
        //console.log("listen to s " + snap.key)
        if (snap.key == "S") {
          if (snap.val().signalData) {
            //toast.dismiss();
            // Toast_Normal("Connecting...");

            firebase_answer(snap.val().signalData);

          }

        }




      });
    }
  }

  const gotDevices = (deviceInfos) => {




    let a = deviceInfos.filter(device => device.kind === 'audiooutput');
    let b = deviceInfos.filter(device => device.kind === 'audioinput');
    let c = deviceInfos.filter(device => device.kind === 'videoinput');

    setAudioSources(b);
    setVideoSources(c);
    setAudioOutputs(a);

    

    //console.log("Audio Source" + JSON.stringify(b[0]));





    setaudiosource(b[0]);



    // setcurrentAudioSource(b[0]);

    // setcurrentVideoSources(c[0]);



    // setcurrentAudioOutput(a[0]);



    let b1 = deviceInfos.filter(device => device.kind === 'audioinput' && device.deviceId === localStorage.getItem("audioSource"));


    if (b1.length == 0) {

      localStorage.setItem("audioSource", b[0].deviceId);

      setcurrentAudioSource(b[0]);



    }
    else {

      localStorage.setItem("audioSource", b1[0].deviceId);

      setcurrentAudioSource(b1[0]);

    }

    let c1 = deviceInfos.filter(device => device.kind === 'videoinput' && device.deviceId === localStorage.getItem("videoSource"));



    if (c1.length == 0) {

      localStorage.setItem("videoSource", c[0].deviceId);

      setcurrentVideoSources(c[0]);




    }
    else {


      localStorage.setItem("videoSource", c1[0].deviceId);

      setcurrentVideoSources(c1[0]);

    }


    
    let a1 = deviceInfos.filter(device => device.kind === 'audiooutput' && device.deviceId === localStorage.getItem("audioOutput"));
    //console.log("A Outputs" + JSON.stringify(a));
   
    if (a1.length == 0) {

      setcurrentAudioOutput(a[0]);
      localStorage.setItem("audioOutput", a[0].deviceId);



    }
    else {

      setcurrentAudioOutput(a1[0]);
      localStorage.setItem("audioOutput", a1[0].deviceId);

    }





    // localStorage.setItem("audioSource", b[0].groupId);
    // localStorage.setItem("videoSource", c[0].groupId);

    // localStorage.setItem("audioOutput", a[0].groupId);








  };

  const getXirsysKeys = (branchId) => {
    if (branchId == 1) // Elearning_Surat
    {

      const Channel_GurfaTahfeez = [{
        username: "he7qNxWD2G9Oijy0azWvKWwSpOLvnd7a_vI0fz7kgSo4OijJHOOzEivKPl2ZL7XXAAAAAGEwWopndXJmYXRhaGZlZXo=",
        credential: "c2b05bba-0baa-11ec-b8f2-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com",

        ]
      }];

      return Channel_GurfaTahfeez;
    }
    else if (branchId == 10) // Tahfeez_Surat
    {
      const Channel_TahfeezSurat = [{
        username: "9ejVTwkM6MX3q-1q8VNTotkBshK0k-SJ3OYbkvw6R28z2572fh5dHhqRpMoEjQ6CAAAAAGHta-RndXJmYXRhaGZlZXo=",
        credential: "36f8ac1c-7c5c-11ec-be28-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com",
        ]
      }];

      return Channel_TahfeezSurat;

    }
    else if (branchId == 25) //Elearning_Surat_Talim al Quran
    {
      const Channel_ElearningSuratTalimalQuran = [{
        username: "GeziVwEIUFVBhS61dYBQ41DyWJzEql-Ns5sb6cda_5c-ilpFC6Mw1ZqZXtv8N9O_AAAAAGHtaytndXJmYXRhaGZlZXo=",
        credential: "c91a7504-7c5b-11ec-9dad-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com",
        ]
      }];

      return Channel_ElearningSuratTalimalQuran;
    }
    else if (branchId == 236) //Tahfeez_Marol
    {
      const Channel_TahfeezMarol = [{
        username: "F-5bz0ASqKJCpnCyNCWHjbiaylDsGEp82loOk3HSLfC6b3mo4oFfkgu0Y2eiomeFAAAAAGHta5BndXJmYXRhaGZlZXo=",
        credential: "0537078c-7c5c-11ec-a6e6-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com",
        ]
      }];

      return Channel_TahfeezMarol;
    }
    else if (branchId == 213) {
      const Channel_ElearningNairobi = [{
        username: "0vwMVOgbCWy29DzOGT6f7jAte1P9gjw37ulHdRkkmLiC_wPqG8qKfw7j4uYO-gMVAAAAAGHuWkVndXJmYXRhaGZlZXo=",
        credential: "4cc7df0c-7cea-11ec-a2d3-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com",
        ]
      }];

      return Channel_ElearningNairobi;

    }
    else if (branchId == 20) {
      const Channel_DQRN = [{
        username: "0ywf1U-aVdiCtWPgeyzZajd8slfVkHIMKWW-qChCXZYwWn_m0uzJjrHuA0c1etJ8AAAAAGHuruFndXJmYXRhaGZlZXo=",
        credential: "bb0b2794-7d1c-11ec-8303-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com",
        ]
      }];

      return Channel_DQRN;

    }

  }
  const getXirsysKeys_2 = (branchId) => {
    if (branchId == 1) // Elearning_Surat
    {

      const Channel_GurfaTahfeez = [{
        urls: ["stun:bn-turn1.xirsys.com"]
      }, {
        username: "he7qNxWD2G9Oijy0azWvKWwSpOLvnd7a_vI0fz7kgSo4OijJHOOzEivKPl2ZL7XXAAAAAGEwWopndXJmYXRhaGZlZXo=",
        credential: "c2b05bba-0baa-11ec-b8f2-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com:80?transport=udp",
          "turn:bn-turn1.xirsys.com:3478?transport=udp",
          "turn:bn-turn1.xirsys.com:80?transport=tcp",
          "turn:bn-turn1.xirsys.com:3478?transport=tcp",
          "turns:bn-turn1.xirsys.com:443?transport=tcp",
          "turns:bn-turn1.xirsys.com:5349?transport=tcp"

        ]
      }];

      return Channel_GurfaTahfeez;
    }
    else if (branchId == 10) // Tahfeez_Surat
    {
      const Channel_TahfeezSurat = [{
        urls: ["stun:bn-turn1.xirsys.com"]
      }, {
        username: "9ejVTwkM6MX3q-1q8VNTotkBshK0k-SJ3OYbkvw6R28z2572fh5dHhqRpMoEjQ6CAAAAAGHta-RndXJmYXRhaGZlZXo=",
        credential: "36f8ac1c-7c5c-11ec-be28-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com:80?transport=udp",
          "turn:bn-turn1.xirsys.com:3478?transport=udp",
          "turn:bn-turn1.xirsys.com:80?transport=tcp",
          "turn:bn-turn1.xirsys.com:3478?transport=tcp",
          "turns:bn-turn1.xirsys.com:443?transport=tcp",
          "turns:bn-turn1.xirsys.com:5349?transport=tcp"
        ]
      }];

      return Channel_TahfeezSurat;

    }
    else if (branchId == 25) //Elearning_Surat_Talim al Quran
    {
      const Channel_ElearningSuratTalimalQuran = [{
        urls: ["stun:bn-turn1.xirsys.com"]
      }, {
        username: "GeziVwEIUFVBhS61dYBQ41DyWJzEql-Ns5sb6cda_5c-ilpFC6Mw1ZqZXtv8N9O_AAAAAGHtaytndXJmYXRhaGZlZXo=",
        credential: "c91a7504-7c5b-11ec-9dad-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com:80?transport=udp",
          "turn:bn-turn1.xirsys.com:3478?transport=udp",
          "turn:bn-turn1.xirsys.com:80?transport=tcp",
          "turn:bn-turn1.xirsys.com:3478?transport=tcp",
          "turns:bn-turn1.xirsys.com:443?transport=tcp",
          "turns:bn-turn1.xirsys.com:5349?transport=tcp"
        ]
      }];

      return Channel_ElearningSuratTalimalQuran;
    }
    else if (branchId == 236) //Tahfeez_Marol
    {
      const Channel_TahfeezMarol = [{
        urls: ["stun:bn-turn1.xirsys.com"]
      }, {
        username: "F-5bz0ASqKJCpnCyNCWHjbiaylDsGEp82loOk3HSLfC6b3mo4oFfkgu0Y2eiomeFAAAAAGHta5BndXJmYXRhaGZlZXo=",
        credential: "0537078c-7c5c-11ec-a6e6-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com:80?transport=udp",
          "turn:bn-turn1.xirsys.com:3478?transport=udp",
          "turn:bn-turn1.xirsys.com:80?transport=tcp",
          "turn:bn-turn1.xirsys.com:3478?transport=tcp",
          "turns:bn-turn1.xirsys.com:443?transport=tcp",
          "turns:bn-turn1.xirsys.com:5349?transport=tcp"
        ]
      }];

      return Channel_TahfeezMarol;
    }
    else if (branchId == 213) // Elearning_Nairobi
    {
      const Channel_ElearningNairobi = [{
        urls: ["stun:bn-turn1.xirsys.com"]
      }, {
        username: "0vwMVOgbCWy29DzOGT6f7jAte1P9gjw37ulHdRkkmLiC_wPqG8qKfw7j4uYO-gMVAAAAAGHuWkVndXJmYXRhaGZlZXo=",
        credential: "4cc7df0c-7cea-11ec-a2d3-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com:80?transport=udp",
          "turn:bn-turn1.xirsys.com:3478?transport=udp",
          "turn:bn-turn1.xirsys.com:80?transport=tcp",
          "turn:bn-turn1.xirsys.com:3478?transport=tcp",
          "turns:bn-turn1.xirsys.com:443?transport=tcp",
          "turns:bn-turn1.xirsys.com:5349?transport=tcp"
        ]
      }];

      return Channel_ElearningNairobi;

    }
    else if (branchId == 20) // Dirasat Quraniyah
    {
      const Channel_DQRN = [{
        urls: ["stun:bn-turn1.xirsys.com"]
      }, {
        username: "0ywf1U-aVdiCtWPgeyzZajd8slfVkHIMKWW-qChCXZYwWn_m0uzJjrHuA0c1etJ8AAAAAGHuruFndXJmYXRhaGZlZXo=",
        credential: "bb0b2794-7d1c-11ec-8303-0242ac140004",
        urls: [
          "turn:bn-turn1.xirsys.com:80?transport=udp",
          "turn:bn-turn1.xirsys.com:3478?transport=udp",
          "turn:bn-turn1.xirsys.com:80?transport=tcp",
          "turn:bn-turn1.xirsys.com:3478?transport=tcp",
          "turns:bn-turn1.xirsys.com:443?transport=tcp",
          "turns:bn-turn1.xirsys.com:5349?transport=tcp"
        ]
      }];

      return Channel_DQRN;

    }

  }

  const setaudiosource = (val) => {

    localStorage.setItem("audioSource", val.deviceId);

    InertLogAPi(5);
    //var constraints = { deviceId: { exact: val.deviceId } };
    // var constraints1 = {
    //   width: { min: 480, ideal: 480, max: 480 },
    //   height: { min: 360, ideal: 360, max: 360 }, frameRate: { ideal: 10, max: 10 }, deviceId: currentVideoSources.deviceId ? { exact: currentVideoSources.deviceId } : undefined
    // }
    var constraints1 = {
      deviceId: currentVideoSources.deviceId ? { exact: currentVideoSources.deviceId } : undefined
    }
    var constraints2 = { deviceId: val.deviceId ? { exact: val.deviceId } : undefined }
    if (isAudioOnly == "no") {
      navigator.mediaDevices.getUserMedia({ video: constraints1, audio: constraints2 }).then((currentStream) => {
        setStream(currentStream);
        setStreamA(currentStream);
        try {
          myVideo.current.srcObject = currentStream;

        }
        catch (e) {

        }
        try {
          myVideoTest.current.srcObject = currentStream;

        }
        catch (e) {

        }
      }
      );
    }
    else {
      navigator.mediaDevices.getUserMedia({ video: false, audio: constraints2 }).then((currentStream) => {
        setStream(currentStream);
        setStreamA(currentStream);

        //myVideo.current.srcObject = currentStream;
      }
      );
    }



    setcurrentAudioSource(val);

  }

  const setaudiooutput = (sinkId, val) => {
    localStorage.setItem("audioOutput", val.deviceId);

    setcurrentAudioOutput(val);



  }
  const setvideosource = (val) => {
    localStorage.setItem("videoSource", val.deviceId);

    InertLogAPi(6);
    // console.log("Device id - "+val.deviceId);
    var constraints = { deviceId: { exact: val.deviceId } };
    // var constraints1 = {
    //   width: { min: 480, ideal: 480, max: 480 },
    //   height: { min: 360, ideal: 360, max: 360 }, frameRate: { ideal: 10, max: 10 }, deviceId: val.deviceId ? { exact: val.deviceId } : undefined
    // }
    var constraints1 = {
      deviceId: val.deviceId ? { exact: val.deviceId } : undefined
    }
    var constraints2 = { deviceId: currentAudioSource.deviceId ? { exact: currentAudioSource.deviceId } : undefined }
    navigator.mediaDevices.getUserMedia({ video: constraints1, audio: constraints2 }).then((currentStream) => {
      if (JSON.stringify(currentVideoSources) !== JSON.stringify(val)) {

        setStreamA(currentStream);
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
        try {
          myVideoTest.current.srcObject = currentStream;

        }
        catch (e) {

        }

        setcurrentVideoSources(val);

      }

    }
    );

  }


  const setaudiosourceafter = (val) => {
    //var constraints = { deviceId: { exact: val.deviceId } };
    console.log("change audio 1");

    // var constraints1 = {
    //   width: { min: 480, ideal: 480, max: 480 },
    //   height: { min: 360, ideal: 360, max: 360 }, frameRate: { ideal: 10, max: 10 }, deviceId: currentVideoSources.deviceId ? { exact: currentVideoSources.deviceId } : undefined
    // }
    var constraints1 = {
      deviceId: currentVideoSources.deviceId ? { exact: currentVideoSources.deviceId } : undefined
    }
    var constraints2 = { deviceId: val.deviceId ? { exact: val.deviceId } : undefined }
    if (isAudioOnly == "no") {


      navigator.mediaDevices.getUserMedia({ video: constraints1, audio: constraints2 }).then((currentStream) => {

        console.log("change audio 2");
        if (JSON.stringify(currentAudioSource) !== JSON.stringify(val)) {
          console.log("change");
          try {

            connectionRef.current.replaceTrack(stream.getAudioTracks()[0], currentStream.getAudioTracks()[0], stream);
            //connectionRef.current.replaceTrack(myVideo.current.srcObject.getVideoTracks()[0], currentStream.getVideoTracks()[0], stream);
            //connectionRef.current.removeStream(stream)
            //connectionRef.current.addStream(currentStream)
            // stream.getTracks().map(track => {
            //   connectionRef.current.removeTrack(track, stream);
            // })
            // currentStream.getTracks().map(track => {
            //   connectionRef.current.addTrack(track, currentStream);
            // })

            //connectionRef.current.replaceTrack(stream.getAudioTracks()[0], currentStream.getAudioTracks()[0], stream);


            console.log("change-2");
            //myVideo.current.srcObject = currentStream;
            //setStream(currentStream);





          }
          catch (e) {

          }
          setcurrentAudioSource(val);

        }

      }
      );
    }
    else {
      console.log("change audio 3");

      navigator.mediaDevices.getUserMedia({ video: false, audio: constraints2 }).then((currentStream) => {

        if (JSON.stringify(currentAudioSource) !== JSON.stringify(val)) {

          try {

            connectionRef.current.replaceTrack(stream.getAudioTracks()[0], currentStream.getAudioTracks()[0], stream);
            //connectionRef.current.removeStream(stream)
            //connectionRef.current.addStream(currentStream)

            //setStream(currentStream);
          }
          catch (e) {

          }
          setcurrentAudioSource(val);

        }

      }
      ).catch((e) => {
        setcurrentAudioSource(val);
      });
    }




  }



  const setvideosourceafter = (val) => {
    // console.log("Device id - "+val.deviceId);
    var constraints = { deviceId: { exact: val.deviceId } };
    // var constraints1 = {
    //   width: { min: 480, ideal: 480, max: 480 },
    //   height: { min: 360, ideal: 360, max: 360 }, frameRate: { ideal: 10, max: 10 }, deviceId: val.deviceId ? { exact: val.deviceId } : undefined
    // }
    var constraints1 = {
      deviceId: val.deviceId ? { exact: val.deviceId } : undefined
    }
    var constraints2 = { deviceId: currentAudioSource.deviceId ? { exact: currentAudioSource.deviceId } : undefined }
    navigator.mediaDevices.getUserMedia({ video: constraints1, audio: constraints2 }).then((currentStream) => {
      if (JSON.stringify(currentVideoSources) !== JSON.stringify(val)) {
        try {
          connectionRef.current.replaceTrack(stream.getTracks().find(t => t.kind == connectionRef.current.track.kind), currentStream.getAudioTracks()[0], stream);

          // connectionRef.current.removeTrack(myVideo.current.srcObject.getVideoTracks()[0], stream)
          //connectionRef.current.replaceTrack(myVideo.current.srcObject.getVideoTracks()[0], currentStream.getVideoTracks()[0], stream);



          myVideo.current.srcObject = currentStream;
          setStream(currentStream);
          setStreamA(currentStream);



        }
        catch (e) {
          //alert(JSON.stringify(e));
          if (connectionRef.current == undefined) {
            myVideo.current.srcObject = currentStream;
            setStream(currentStream);
            setStreamA(currentStream);
          }
          else {
            connectionRef.current.addTrack(currentStream.getVideoTracks()[0], currentStream);

          }

        }
        setcurrentVideoSources(val);

      }

    }
    );
  }


  const getCurrentAudioSourceContraints = () => {
    var constraints2 = { deviceId: currentAudioSource.deviceId ? { exact: currentAudioSource.deviceId } : undefined }
    return constraints2;

  }

  const getCurrentVideoSourceContraints = () => {
    // var constraints1 = {
    //   width: { min: 480, ideal: 480, max: 480 },
    //   height: { min: 360, ideal: 360, max: 360 }, frameRate: { ideal: 10, max: 10 }, deviceId: currentVideoSources.deviceId ? { exact: currentVideoSources.deviceId } : undefined
    // }
    var constraints1 = {
      deviceId: currentVideoSources.deviceId ? { exact: currentVideoSources.deviceId } : undefined
    }
    return constraints1;

  }





  const Recording_1 = (stream1, stream2) => {
    if (userType == "T") {
      if (recording.current == undefined) {





        const streammixer = new MultiStreamsMixer([stream1, stream2]);
        let recorder = RecordRTC(streammixer.getMixedStream(), {
          type: 'audio',
          mimeType: 'audio/wav',


        });
        recording.current = recorder;
        recording.current.startRecording();






      }
      else if (recording.current != undefined) {
        recording.current.stopRecording(function () {
          let blob = recording.current.getBlob();
          // var url = URL.createObjectURL(blob);
          // recorder.getDataURL((dataURL) => {

          //   console.log("URL - "+ dataURL);

          //   window.open(dataURL);
          // });

          saveAs(blob, meetingId + ".mp4");


          //invokeSaveAsDialog(blob);
        });
        recording.current.destroy();
        const streammixer = new MultiStreamsMixer([stream1, stream2]);
        let recorder = RecordRTC(streammixer.getMixedStream(), {
          type: 'audio',
          mimeType: 'audio/wav',




        });
        recording.current = recorder;
        recording.current.startRecording();

      }
    }
  }

  const Recording_2 = (stream1, stream2) => {
    if (userType == "T") {
      if (recording.current == undefined) {
        // const streammixer = new MultiStreamsMixer([stream1, stream2]);
        let recorder = RecordRTC(stream1, {
          type: 'video',
          mimeType: 'video/mp4',


        });
        let recorder1 = RecordRTC(stream2, {
          type: 'video',
          mimeType: 'video/mp4',

        });

        recording1.current = recorder1;
        recording1.current.startRecording();
        recording.current = recorder;
        recording.current.startRecording();
      }
      else if (recording.current != undefined) {
        recording.current.stopRecording(function () {
          let blob = recording.current.getBlob();
          // var url = URL.createObjectURL(blob);
          // recorder.getDataURL((dataURL) => {

          //   console.log("URL - "+ dataURL);

          //   window.open(dataURL);
          // });

          saveAs(blob, meetingId + "-T.mp4");


          //invokeSaveAsDialog(blob);
        });
        recording.current.destroy();
        let recorder = RecordRTC(stream1, {
          type: 'video',
          mimeType: 'video/mp4',

        });

        recording.current = recorder;
        recording.current.startRecording();


        if (recording1.current != undefined) {
          recording1.current.stopRecording(function () {
            let blob = recording1.current.getBlob();
            // var url = URL.createObjectURL(blob);
            // recorder.getDataURL((dataURL) => {

            //   console.log("URL - "+ dataURL);

            //   window.open(dataURL);
            // });

            saveAs(blob, meetingId + "-s.mp4");


            //invokeSaveAsDialog(blob);
          });
          recording1.current.destroy();
          let recorder1 = RecordRTC(stream2, {
            type: 'video',
            mimeType: 'video/mp4',

          });
          recording1.current = recorder1;
          recording1.current.startRecording();
        }


      }
    }
  }





  const updateVideo = () => {
    // console.log("to -" + otherUser);
    setMyVdoStatus((currentStatus) => {

      if (currentStatus == true) {
        setisAudioOnly(p => "yes");
      }
      else {
        setisAudioOnly(p => "no");
      }
      try
      {
        stream.getVideoTracks()[0].enabled = !currentStatus;
        return !currentStatus;
      }
      catch(e)
      {

      }
      
    });

  };

  const downloadBlob = (blob, name) => {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );

    // Remove link from body
    document.body.removeChild(link);
  }

  const updateMic = () => {
    //console.log("mics - " + JSON.stringify(stream.getAudioTracks()[0].getSettings()));
    // console.log("to -" + otherUser);
    setMyMicStatus((currentStatus) => {
      // socket.emit("updateMyMedia", {
      //   type: "mic",
      //   currentMediaStatus: !currentStatus,
      //   to:otherUser,
      // });

      stream.getAudioTracks()[0].enabled = !currentStatus;


      return !currentStatus;
    });
  };


  const Firebase_leaveCall = () => {
    window.onbeforeunload = null;
    database().ref("video_meetings").child(meetingId).child("users").child(userType).remove();


    setCallEnded(true);
    setHangUpButton(false);
    InertLogAPi_WithTimer(32, timeRef.current);
    console.log("Remove " + timeRef.current);
    if (userType == "T") {

      if (classType == "NIKH") {
        if (recording.current != undefined) {
          recording.current.stopRecording(function () {
            let blob = recording.current.getBlob();

            saveAs(blob, meetingId + "-s.mp4");



          });
        }

        if (recording1.current != undefined) {
          recording1.current.stopRecording(function () {
            let blob = recording1.current.getBlob();

            saveAs(blob, meetingId + "-t.mp4");



          });
        }
      }
      else {
        if (recording.current != undefined) {
          recording.current.stopRecording(function () {
            let blob = recording.current.getBlob();

            saveAs(blob, meetingId + ".mp4");



          });
        }
      }


    }
    setTimeout(function () {

      if (connectionRef.current != undefined) {
        connectionRef.current.destroy();

      }




      // window.location.reload();

      if (currentVersion == "Test") {
        window.location.replace('https://www.mahadalzahra.org/mtalkdemotest/auth/' + name + '/' + meetingId);


      }
      else {
        window.location.replace('https://gurfatahfeez.elearningquran.com/auth/' + name + '/' + meetingId);


      }

    }, 1000);

  };

  const leaveCall = () => {
    window.onbeforeunload = null;
    setHangUpButton(false);

    database().ref("video_meetings").child(meetingId).child("users").child(userType).remove();
    if (userType == "S") {
      database().ref("video_meetings").child(meetingId).child("users").child("T").remove();

    }
    else if (userType == "T") {
      database().ref("video_meetings").child(meetingId).child("users").child("S").remove();


    }

    setCallEnded(true);
    InertLogAPi_WithTimer(10, time);
    console.log("Left " + time);
    if (userType == "T") {

      if (classType == "NIKH") {
        if (recording.current != undefined) {
          recording.current.stopRecording(function () {
            let blob = recording.current.getBlob();
            // recording.current.save("1234.mp3");
            // let blob2 = new Blob(chunks, {
            //   'type': 'audio/mp3'
            // });


            // var url = URL.createObjectURL(blob2);
            // const downloadEl = document.createElement('a');
            // downloadEl.style = 'display: block';
            // downloadEl.innerHTML = 'download';
            // downloadEl.download = 'audio.mp3';
            // downloadEl.href = url;
            // document.body.appendChild(downloadEl);
            // downloadEl.click();
            // document.body.removeChild(downloadEl);
            // recording.current.getDataURL((dataURL) => {

            //    // console.log("URL - "+ dataURL);

            //    const link = document.createElement("a");
            //    link.href = dataURL;
            //    link.download = meetingId + ".mp3";
            //    document.body.appendChild(link);
            //    link.click();
            //    document.body.removeChild(link);
            //   });
            //  downloadBlob(blob, meetingId + ".mp3")
            saveAs(blob, meetingId + "-s.mp4");


            // invokeSaveAsDialog(blob,meetingId + ".mp3");
          });
        }

        if (recording1.current != undefined) {
          recording1.current.stopRecording(function () {
            let blob = recording1.current.getBlob();
            // recording.current.save("1234.mp3");
            // let blob2 = new Blob(chunks, {
            //   'type': 'audio/mp3'
            // });


            // var url = URL.createObjectURL(blob2);
            // const downloadEl = document.createElement('a');
            // downloadEl.style = 'display: block';
            // downloadEl.innerHTML = 'download';
            // downloadEl.download = 'audio.mp3';
            // downloadEl.href = url;
            // document.body.appendChild(downloadEl);
            // downloadEl.click();
            // document.body.removeChild(downloadEl);
            // recording.current.getDataURL((dataURL) => {

            //    // console.log("URL - "+ dataURL);

            //    const link = document.createElement("a");
            //    link.href = dataURL;
            //    link.download = meetingId + ".mp3";
            //    document.body.appendChild(link);
            //    link.click();
            //    document.body.removeChild(link);
            //   });
            //  downloadBlob(blob, meetingId + ".mp3")
            saveAs(blob, meetingId + "-t.mp4");


            // invokeSaveAsDialog(blob,meetingId + ".mp3");
          });
        }
      }
      else {
        if (recording.current != undefined) {
          recording.current.stopRecording(function () {
            let blob = recording.current.getBlob();
            saveAs(blob, meetingId + ".mp4");



          });
        }
      }


    }
    setTimeout(function () {

      if (connectionRef.current != undefined) {
        connectionRef.current.destroy();

      }



      // window.location.reload();
      if (currentVersion == "Test") {
        window.location.replace('https://www.mahadalzahra.org/mtalkdemotest/auth/' + name + '/' + meetingId);


      }
      else {
        window.location.replace('https://gurfatahfeez.elearningquran.com/auth/' + name + '/' + meetingId);


      }
    }, 1000);

  };


  return (
    <VideoContext.Provider
      value={{
        call,
        callAccepted,
        isAudioOnly,
        isCalling,
        myVideo,
        myVideoTest,
        my1Video1,
        userVideo,
        stream,
        setStream,
        streamA,
        name,
        setName,
        callEnded,
        me,
        leaveCall,
        msgRcv,
        chat,
        setChat,
        setMsgRcv,
        setOtherUser,
        userName,
        myVdoStatus,
        setMyVdoStatus,
        myVdoStatus1,
        setMyVdoStatus1,
        userVdoStatus,
        setUserVdoStatus,
        updateVideo,
        myMicStatus,
        userMicStatus,
        updateMic,
        me1,
        customId,
        setcustomId,
        videoSources,
        audioSources,
        audioOutputs,
        currentAudioSource,
        currentVideoSources,
        currentAudioOutput,
        setvideosource,
        setaudiosource,
        setaudiooutput,
        isAudioOnly,
        isUserVideo,
        CallConnected,
        setvideosourceafter,
        setaudiosourceafter,
        setMeetingId,
        meetingId,
        joined,
        joinClassNew,
        iceState,
        streamChecked,
        time,
        user2Video,
        classType,
        userType,
        mushafUrl,
        teacherName,
        studentName,
        connectingStatus2,
        connectingStatus1,
        connectingStatus3,
        connectingStatus4,
        setConnectingStatus4,
        setIsUserVideo,
        error1msg,
        error1,
        InertLogAPi,
        hangUpButton,
        isLanded,
        isUserAudioOnly,
        setisUserAudioOnly,
        otherItsId,
        otherUserType,
        getCurrentVideoSourceContraints,
        getCurrentAudioSourceContraints,
        currentVersion

      }}
    >
      <audio id="aud9" src={teacherarrived} loop ref={TeacherArrivedAudio} />
      <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover

      />
      {children}
    </VideoContext.Provider>
  );
};

export default VideoState;
