import ContractAbi from '../artifacts/contracts/BlockStream.sol/BlockStream.json';
import { ethers } from 'ethers';

export default function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(
    '0x62b4Cd5Bf6B4F6e5A156A316dDc8446B0BAe894d',
    ContractAbi.abi,
    signer
  );
  console.log(contract);
  return contract;
}
