import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Demo from "./components/demo/Demo";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import gurfaLoader from "./assests/gurfaLoader.gif";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer/Footer";
import LandingPageMain from "./LandingPage";
import LandingPage from "./components/LandingPage/LandingPage";
import Authentication from "./components/Authentication/Authentication"
import VideoState from "./context/VideoState";
import { useClearCache } from 'react-clear-cache';



const App = () => {

  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  const [isLoading, setIsLoading] = useState(true)

 

  let ss="mtalkdemotest/";
  //let ss = "";

  

  useEffect(() => {

    //window.screen.orientation.lock('landscape-primary');

    // window.addEventListener('beforeunload', function(event) {
    //   this.alert("jkjjkjkljlkj");
    //   console.log('I am the 1st one.');
    // });
    // window.addEventListener('unload', function(event) {
    //   this.alert("jkjjkjkljlkj");

    //   console.log('I am the 3rd one.');
    // });


    setTimeout(() => {
      setIsLoading(false);
      
    }, 2650);

    if (!isLatestVersion) {
      console.log("cache delete");
      emptyCacheStorage();
    }
    else {
      console.log("same cache");
    }
  }, [isLatestVersion])



  return isLoading ? <>
    <img src={gurfaLoader} style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", height: "480px", width: "480px" }} ></img>
  </> : <>

    <VideoState>
      <Router>
        <Switch>
          {/* <Route path="/mtalkforadmin/:yourid/:id">
          <Home />
        </Route>   */}

          {/* <Route path="/mtalkdemotest/home">
          <Demo />
        </Route>  */}

          <Route exact path={`/${ss}classroom`}>
            <Home />
          </Route>
          <Route exact path={`/${ss}`}>
             <LandingPage /> 
            
          </Route>
          <Route exact path={`/${ss}auth/:yourid/:id`}>
            <Authentication />
          </Route>


        </Switch>
        {/* <Footer /> */}
      </Router>
    </VideoState>
  </>

};

export default App;
