import React, {useEffect} from 'react'
import LandingPage from "./components/LandingPage/LandingPage";
import VideoState from "./context/VideoState";

const LandingPageMain = () => {
    useEffect(() => {
        if (!navigator.onLine) alert("Connect to internet!");
      }, [navigator]);
   
    return (
        <VideoState>
         <LandingPage />
        </VideoState>
    )
}

export default LandingPageMain
