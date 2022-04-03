import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import ContractAbi from '../artifacts/contracts/BlockStream.sol/BlockStream.json';
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';
import { BiCloud, BiMusic, BiPlus } from 'react-icons/bi';
import toast from 'react-hot-toast';
import getContract from '../utils/getContract';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'; // for ES6 modules

export default function Upload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [video, setVideo] = useState('');
  const [isAudio, setIsAudio] = useState(false);

  const client = create('https://ipfs.infura.io:5001/api/v0');
  const thumbnailRef = useRef();
  const videoRef = useRef();

  const handleSubmit = async () => {
    if (
      title === '' ||
      description === '' ||
      category === '' ||
      location === '' ||
      thumbnail === '' ||
      video === ''
    ) {
      toast.error('Please fill all the fields', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }
    uploadThumbnail(thumbnail);
  };

  const uploadThumbnail = async (thumbnail) => {
    toast('Uploading thumbnail...', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

    console.log('uploading thumbnail');
    try {
      const added = await client.add(thumbnail);
      uploadVideo(added.path);
      toast.success('Thumbnail uploaded successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  const uploadVideo = async (thumbnail) => {
    console.log('uploading video');
    toast('Uploading video...', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

    try {
      const added = await client.add(video);
      console.log({
        uploadVIdeo: added.path,
        thumbnail: thumbnail,
      });
      saveVideo(added.path, thumbnail);
      toast.success('Video uploaded successfully', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  const saveVideo = async (video, thumbnail) => {
    let data = {
      title,
      description,
      category,
      location,
      thumbnail,
      video,
    };
    console.log('Saving video', data);
    let contract = await getContract();
    let UploadedDate = String(new Date());

    console.log('UploadedDate', UploadedDate);

    // Show successfully alert

    await contract.uploadVideo(
      video,
      title,
      description,
      location,
      category,
      thumbnail,
      isAudio,
      UploadedDate
    );
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex flex-col flex-1">
        <Header />

        <div className="flex justify-end mt-5 mr-10">
          <div className="flex items-center">
            <button
              className="bg-transparent  dark:text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6"
              onClick={() => {
                goBack();
              }}
            >
              Discard
            </button>
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="flex flex-row items-center justify-between px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
            >
              <BiCloud />
              <p className="ml-2">Upload</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col m-10 mt-5 lg:flex-row">
          <div className="flex flex-col lg:w-3/4 ">
            <label className="text-gray-600 dark:text-[#9CA3AF]  text-sm">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a title that describes your video"
              className="w-[90%] dark:text-white  dark:placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:border-[#444752] focus:outline-none"
            />
            <label className="text-gray-600 dark:text-[#9CA3AF] mt-10 text-sm">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell viewers about your video"
              className="w-[90%] dark:text-white  dark:placeholder:text-gray-600 rounded-md mt-2  h-32 p-2 border border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:border-[#444752] focus:outline-none"
            />

            <div className="flex flex-row mt-10 w-[90%]  justify-between">
              <div className="flex flex-col w-2/5 ">
                <label className="text-gray-600 dark:text-[#9CA3AF]  text-sm">
                  Location
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Mumbai - India"
                  className="rounded-md dark:text-white mt-2 dark:placeholder:text-gray-600  h-12 p-2 border border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5 ">
                <label className="text-gray-600 dark:text-[#9CA3AF]  text-sm">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className=" rounded-md dark:text-white mt-2  h-12 p-2 dark:border-gray-600 border border-borderWhiteGray bg-white dark:bg-backgroundBlack dark:text-[#9CA3AF] focus:outline-none"
                >
                  <option>Gaming</option>
                  <option>Music</option>
                  <option>Sports</option>
                  <option>News</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Science & Technology</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <label className="text-gray-600 dark:text-[#9CA3AF]  mt-10 text-sm">
              Thumbnail
            </label>

            <div
              onClick={() => {
                thumbnailRef.current.click();
              }}
              className="flex items-center justify-center w-64 p-2 mt-2 border-2 border-dashed rounded-md dark:border-gray-600 border-borderWhiteGray h-36"
            >
              {thumbnail ? (
                <img
                  onClick={() => {
                    thumbnailRef.current.click();
                  }}
                  src={URL.createObjectURL(thumbnail)}
                  alt="thumbnail"
                  className="h-full rounded-md"
                />
              ) : (
                <BiPlus size={40} color="gray" />
              )}
            </div>

            <input
              type="file"
              className="hidden"
              ref={thumbnailRef}
              onChange={(e) => {
                setThumbnail(e.target.files[0]);
              }}
            />
          </div>

          <div
            onClick={() => {
              videoRef.current.click();
            }}
            className={
              video
                ? ' w-96   rounded-md  h-64 items-center justify-center flex'
                : 'border-2 dark:border-gray-600  w-96 border-dashed border-borderWhiteGray rounded-md mt-8   h-64 items-center justify-center flex'
            }
          >
            {video ? (
              <>
                {isAudio ? (
                  <audio
                    src={URL.createObjectURL(video)}
                    controls
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    controls
                    src={URL.createObjectURL(video)}
                    className="h-full rounded-md"
                  />
                )}
              </>
            ) : (
              <p className="dark:text-[#9CA3AF]">
                Upload {isAudio ? 'Audio' : 'Video'}
              </p>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          ref={videoRef}
          accept={isAudio ? 'audio/*' : 'video/*'}
          onChange={(e) => {
            setVideo(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
}
