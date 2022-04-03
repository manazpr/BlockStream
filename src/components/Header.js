import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Jazzicon } from '@ukstv/jazzicon-react';
export const Header = ({ search }) => {
  let address = localStorage.getItem('walletAddress');
  return (
    <header className="flex items-center justify-between w-full h-20 p-4 border-b border-borderWhiteGray dark:border-borderGray">
      <div className="w-1/3 ">
        <Link to="/app">
          <h1
            className="mb-4 text-5xl font-extrabold tracking-tighter text-white md:text-3xl leading-tighter"
            data-aos="zoom-y-out"
          >
            BlockStream{' '}
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-center w-1/3 ">
        <input
          type="text"
          onChange={(e) => search(e.target.value)}
          placeholder="Search"
          className="text-gray-200 border-1 dark:bg-backgroundBlack focus:outline-none"
        />
      </div>

      <div className="flex justify-end w-1/3 ">
        <Link to="/upload">
          <AiOutlinePlusCircle
            size="30px"
            className="mr-2 cursor-pointer fill-whiteIcons dark:fill-white"
          />
        </Link>
        <div className=" w-[30px] h-[30px] ml-8">
          <Jazzicon address={address} />
        </div>
      </div>
    </header>
  );
};
