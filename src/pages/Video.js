import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import VideoComponent from '../components/VideoComponent';
import Video from '../components/Video';
import getContract from '../utils/getContract';
import { Link } from 'react-router-dom';
export default function VideoPage() {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const getUrlVars = () => {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  };

  const getBlockChainData = async () => {
    let contract = await getContract();
    let videoId = getUrlVars()['id'];
    console.log(String(videoId));
    let video = await contract.videos(videoId);
    console.log(video);
    let videosCount = await contract.videoCount();
    console.log(String(videosCount));
    let videos = [];
    for (var i = videosCount; i >= 1; i--) {
      let video = await contract.videos(i);
      videos.push(video);
    }

    setRelatedVideos(videos);
    setVideo(video);
  };

  useEffect(() => {
    getBlockChainData();
  }, []);

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col flex-1">
        <Header />
        {video && (
          <div className="flex flex-col justify-between m-10 lg:flex-row">
            <div className="lg:w-4/6 w-6/6">
              <VideoComponent video={video} />
            </div>
            <div className="w-2/6">
              <h4 className="mb-3 ml-5 font-bold text-black text-md dark:text-white">
                Related Videos
              </h4>
              {relatedVideos.map((video) => (
                <Link
                  onClick={() => {
                    setVideo(video);
                  }}
                  to={`/video?id=${video.id}`}
                >
                  <Video video={video} horizontal={true} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
