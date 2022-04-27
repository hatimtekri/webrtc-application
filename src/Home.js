import React, { useContext, useEffect, useRef, useState } from 'react'
import VideoContext from "../src/context/VideoContext";
import Video from "./components/Video/Video";
import VideoState from "./context/VideoState";
import {useParams } from "react-router-dom";
import Options from "./components/options/Options";
import Footer from "./components/Footer/Footer";

const Home = () => {
  useEffect(() => {
    if (!navigator.onLine) alert("Connect to internet!");
  }, [navigator]);

 
  //const { yourid,id } = useParams()

  const {
    
    name,
    
    meetingId,
    
} = useContext(VideoContext);

useEffect(()=>
{
  if (meetingId == null || meetingId == "" || meetingId == undefined) {
    
    window.location.replace('https://gurfatahfeez.elearningquran.com/');
}
},[])

  return (
    // <VideoState>
      <div className="App container-fluid d-flex h-100 flex-column p-0" style={{ height: "100%", width: "100%" }}>
       {/* <h1 style={{ textAlign: "center",color:"#F0D05D" }} >ELQ CLASS</h1> */}
        {/* <Video id={id} yourid={yourid} />  */}

         <Video id={meetingId} yourid={name} /> 
        {/*<Options />
         <Footer /> */}
      </div>
    // </VideoState>
  );
};

export default Home;
