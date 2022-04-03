import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HeroHome() {
  let navigate = useNavigate();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Connected', accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]);
      navigate('/app');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="relative flex flex-col items-center justify-center h-screen bg-black">
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="pb-12 text-center md:pb-16">
              <h1
                className="mb-4 text-5xl font-extrabold tracking-tighter text-white md:text-6xl leading-tighter"
                data-aos="zoom-y-out"
              >
                BlockStream{' '}
              </h1>
              <div className="max-w-3xl mx-auto">
                <p
                  className="mb-8 text-xl text-gray-400"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  BlockStream is a decentralized, censorship resistant video
                  sharing platform.
                </p>
                <button
                  className="items-center p-3 font-medium bg-white rounded-full shadow-lg "
                  onClick={() => {
                    connectWallet();
                  }}
                >
                  <span className="">Connect Wallet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroHome;
