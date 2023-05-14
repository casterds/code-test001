import React, {useState} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import ToucanClient from 'toucan-sdk';
import { BigNumber, ContractReceipt, ethers } from 'ethers';
import { PoolSymbol } from 'toucan-sdk/dist/types';
import Link from 'next/link';

interface QueryParams extends ParsedUrlQuery{
    id: string,
    name: string;
    symbol: PoolSymbol;
    image: string,
    tokenAddress: string,
    createdAt: string,
    creationTx: string,
    score: string,
    projectVintageCreatorId: string,                
    startTime: string,
    endTime: string,
    projectVintageId: string,
    isCCPcompliant: string,
    isCorsiaCompliant: string,
    vintageName: string,
    totalVintageQuantity: string,
    tx: string,
    owner: string
   }
  
const CarbonCreditDetail: React.FC = () => {
  const [contractReceipt, setcontractReceipt] = useState<ContractReceipt>()
  const [amount, setAmount] = useState<string>("")

  const router = useRouter();
  const query = router.query as QueryParams
  const {
    name,
    symbol,
    image,
    tokenAddress,
    createdAt,
    creationTx,
    score,
    projectVintageCreatorId,                
    startTime,
    endTime,
    projectVintageId,
    isCCPcompliant,
    isCorsiaCompliant,
    vintageName,
    totalVintageQuantity,
    tx,
    owner
  } = query
  
  const redeemAuto = async (selectedToken: PoolSymbol, amount: string) => {
    try {
      if (!amount) {
      alert("Amount field required")
    }
    const ethereum: any = window.ethereum;
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log("signer", signer);
      const sdk = new ToucanClient("alfajores");
      sdk.setProvider(provider);
      sdk.setSigner(signer);
      const amountBN = BigNumber.from(amount);
      const contractReceipt = await sdk.redeemAuto(
        selectedToken,
        ethers.utils.parseEther(amount)
      );
      console.log(contractReceipt);
      setcontractReceipt(contractReceipt);
      setAmount("")
    } else {
      // `window.ethereum` is not available, so the user may not have a web3-enabled browser
      console.error(
        "Please install MetaMask or another web3-enabled browser extension"
      );
    }
  } catch (error) {
    console.error(error);
  }
  };


  const autoOffsetUsingPoolToken = async (selectedToken: PoolSymbol, amount: string) => {
    try {
      if (!amount) {
      alert("Amount field required")
    }
    const ethereum: any = window.ethereum;
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log("signer", signer);
      const sdk = new ToucanClient("alfajores");
      sdk.setProvider(provider);
      sdk.setSigner(signer);
      const amountBN = BigNumber.from(amount);
      const contractReceipt = await sdk.redeemAuto2(
        selectedToken,
        ethers.utils.parseEther(amount)
      );
      console.log(contractReceipt);
      // setcontractReceipt(contractReceipt);
      setAmount("")
    } else {
      // `window.ethereum` is not available, so the user may not have a web3-enabled browser
      console.error(
        "Please install MetaMask or another web3-enabled browser extension"
      );
    }
  } catch (error) {
    console.error(error);
  }
  };



  const handleAmount = (e: React.FormEvent<HTMLInputElement>) => {
    setAmount(e.currentTarget.value)
  }
  const formattedDate = (timestamp : number) => {
    const date = new Date(timestamp);
    const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const readableDate = date.toLocaleString(undefined, options);
    return readableDate
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="bg-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            {name}
          </h1>
          <p className="text-center text-gray-600 mt-2">
            { symbol}
          </p>
          <p className="text-center text-gray-600 mt-2">
            { `Score: ${score}`}
          </p>
          <p className="text-center text-gray-600 mt-2">
            <Link className='text-blue-500' href={`https://explorer.celo.org/alfajores/tx/${creationTx}`}>
                          Creation Hash
            </Link>
          </p>
           <p className="text-center text-gray-600 mt-2 ">
            { `Created At: ${formattedDate(parseInt(createdAt))}`}
          </p>
        </div>
      </h1>
      <div className="container mx-auto px-4 py-8 ">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white rounded shadow-md p-6">
            <Image
              src={image}
              alt={name}
              width={200}
              height={200}
              className="w-full mb-4 rounded"
            />
            <div className='p-2 text-lg'>
              <h1 className='text-2xl font-bold'>Project Vintage</h1>
              <p className="text-gray-700 mt-2">{vintageName}</p>
               <p className="text-gray-800 mt-2">
               <strong>Id:</strong>  {projectVintageCreatorId}
              </p>
              <p className='mt-2'><strong>StartTime:</strong>  {formattedDate(parseInt(startTime))}</p>
              <p className='mt-2'><strong>EndTime:</strong> {formattedDate(parseInt(endTime))}</p>
              <p className="text-gray-800 mt-2">
               <strong>isCCPcompliant:</strong>  {isCCPcompliant}
              </p>
               <p className="text-gray-800 mt-2">
               <strong>isCorsiaCompliant:</strong> {isCorsiaCompliant}
              </p>
              <p className="text-gray-800 mt-2">
               <strong>totalVintageQuantity:</strong> {totalVintageQuantity}
              </p>
              <span className="text-gray-800 mr-2 mt-2">
                <Link className='text-blue-500' href={`https://explorer.celo.org/alfajores/address/${projectVintageCreatorId}`}>
                  Vintage Creator Id
                </Link>    
              </span>

              <span className="text-gray-800 m-2">
                <Link className='text-green-500' href={`https://explorer.celo.org/alfajores/address/${owner}`}>
                  owner
                </Link>    
              </span>
              <span className="text-gray-800 mt-2">
                <Link className='text-blue-500' href={`https://explorer.celo.org/alfajores/tx/${tx}`}>
                  Transaction Hash
                </Link>
              </span>
              <input className='block border p-2 mt-2' type="text" placeholder='Enter amount' value={amount} onChange={handleAmount} />
              <button
                className=" block bg-yellow-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={() => autoOffsetUsingPoolToken(symbol, amount)}
              >
                Redeem
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditDetail;