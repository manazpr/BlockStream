import React from 'react';
import VideoPlayer from './VideoPlayer';
import ChannelInfoInVideo from './ChannelInfoInVideo';
import Video from './Video';
export default function VIdeoComponent({ video }) {
  console.log('Main VIdeo', video.title);
  return (
    <div>
      <VideoPlayer hash={video.hash} />
      <div className="flex flex-row justify-between py-4 border-b-2 border-borderWhiteGray dark:border-borderGray">
        <div>
          <h3 className="text-2xl dark:text-white">{video.title}</h3>
          <p className="mt-1 text-gray-500">
            {video.category} • {video.date}
          </p>
        </div>
        <button> Tip to creator</button>
      </div>
      <ChannelInfoInVideo video={video} />
    </div>
  );
}
