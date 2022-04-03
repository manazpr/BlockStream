import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { Jazzicon } from '@ukstv/jazzicon-react';

export default function ChannelInfoInVIdeo({ video }) {
  console.log('ChannelInfoInVIdeo', video);
  return (
    <div>
      <div className="flex flex-row items-center mt-5 ">
        <div className="w-12">
          <Jazzicon address={video.author} size={12} />
        </div>

        <div className="flex flex-col ml-3">
          <p className="flex items-center mt-1 text-black text-md dark:text-white">
            {video.author.slice(0, 13)}...{' '}
            <BiCheck size="20px" className="ml-1 fill-gray" />
          </p>
          <p className="flex items-center text-sm text-textSubTitle "></p>
        </div>
      </div>
      <p className="mt-4 ml-16 text-sm text-black">{video.description}</p>
    </div>
  );
}
