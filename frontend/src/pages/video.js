import axios from "axios";
import { useEffect, useState } from "react";
import { HeadProvider, Title, Meta } from 'react-head';

import Header from "../components/header";
import ReactPlayer from "react-player";

const Video = ({ user }) => {
    const [video, setVideo] = useState(null);
    const url = window.location.href.split('/');
    const id = url[url.length - 1];

    useEffect(() => {
        const getVideo = async () => {
            const response = await axios.get('https://yt-api.hcklikk.com/video/' + id);
            setVideo(response.data);
        };
        getVideo();
    }, []);

    return (
        <HeadProvider>
            <div className="video-page">
                <Header user={user} />
                <div className="video-content">
                    <div className="video-container">
                        <div className="video">
                            {video ? <ReactPlayer url={"https://yt-api.hcklikk.com/uploads/" + video.url} controls={true} width="100%" height="100%" /> : "Loading..."}
                        </div>
                        {video ?
                        <div className="video-info">
                            <h1 className="title">{video ? video.title : "Loading..."}</h1>
                            <h2 className="title">Uploaded by: <a href={"/profile/" + video.ownerId}>{video ? video.ownerName : "Loading..."}</a></h2>
                            <h2 className="title">Uploaded at: <span>{video ? new Date(video.createdAt).toDateString() : "Loading..."}</span></h2>
                            <h2 className="title">Description: <span>{video ? video.description : "Loading..."}</span></h2>
                        </div> : <></>}
                    </div>
                </div>
            </div>
        </HeadProvider>
    )
}

export default Video;