
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, useHistory } from "react-router-dom";
import VideoContext from "../../context/VideoContext";

const Authentication = () => {


    const { yourid, id } = useParams()
    const history = useHistory();
    useEffect(() => {
        setName(yourid);
        // setIdToCall(id);
        setMeetingId(id);

        localStorage.setItem("id1", yourid);
        localStorage.setItem("id2", id);




    }, []);




    const {
        setName,
        meetingId,
        setMeetingId,
        currentVersion

    } = useContext(VideoContext);

    useEffect(() => {




        if (meetingId != null && meetingId != undefined && meetingId != "") {


            if (currentVersion == "Test") {
                history.push("/mtalkdemotest/");

            }
            else {
                history.push("/");

            }
        }

    }, [meetingId]);

    return (
        <div>
            {meetingId}
        </div>
    )
}

export default Authentication
