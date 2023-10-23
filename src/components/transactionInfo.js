import { ethers } from "ethers";
import Link from "next/link";
import { useEffect } from "react";

export default function TxInfo({ transactionInfo }) {
  const valueInETH = ethers.formatEther(transactionInfo.value.toString());
  const transactionFeeWei = (
    transactionInfo.gasPrice * transactionInfo.gasUsed
  ).toString();
  const transactionFeeETH = ethers.formatEther(transactionFeeWei);
  const gasPriceInGwei = ethers.formatUnits(transactionInfo.gasPrice, "gwei");
  const gasPriceInETH = ethers.formatUnits(transactionInfo.gasPrice);
  const maxFeePerGasGwei = ethers.formatUnits(
    transactionInfo.maxFeePerGas,
    "gwei"
  );
  const maxPriorityFeePerGasGwei = ethers.formatUnits(
    transactionInfo.maxPriorityFeePerGas,
    "gwei"
  );

  return (
    <div className="flex flex-col w-[75%] mt-[12%]">
      <div className="flex items-center">
        <img
          src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/sync.svg"
          className="w-10 h-10 mr-3"
        />
        <h2>Tx Details</h2>
      </div>
      <div className="grid mt-5 py-8 px-6 gap-3 border-black border-2 text-xs">
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Transaction Hash:</h2>
          <h2 className="col-span-10">{transactionInfo.hash}</h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Status:</h2>
          {transactionInfo.status == 1 ? (
            <h2 className="text-green-700 ">Success</h2>
          ) : (
            <h2 className="text-red-500 ">Failed</h2>
          )}
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Block:</h2>
          <Link href={`/block/${transactionInfo.blockNumber}`}>
            <h2 className="col-span-10">{transactionInfo.blockNumber}</h2>
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Confirmation:</h2>
          <h2 className="col-span-10 ">
            <span className="border border-black py-[5px] px-2 ">
              {transactionInfo.confirmations}&nbsp; Block Confirmations
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">From:</h2>
          <Link href={`/address/${transactionInfo.from}`}>
            <h2 className="col-span-10 ">{transactionInfo.from}</h2>
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">To:</h2>
          <Link href={`/address/${transactionInfo.to}`}>
            <h2 className="col-span-10 ">{transactionInfo.to}</h2>
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Value:</h2>
          <h2 className="col-span-10 ">{valueInETH} ETH</h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Tx Fee:</h2>
          <h2 className="col-span-10">{transactionFeeETH} ETH</h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Gas Price:</h2>
          <h2 className="col-span-10">
            {gasPriceInGwei} Gwei{" "}
            <span className="text-gray-400">({gasPriceInETH} ETH)</span>
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Gas Limit & Usage by Tx:</h2>
          <h2 className="col-span-10">
            <span className="inline-flex gap-2">
              <span className="md:pr-3 md:border-r-2">
                {transactionInfo.gasLimit}
              </span>
              <span className="">{transactionInfo.gasUsed}</span>
              <span>
                (
                {(
                  (transactionInfo.gasUsed / transactionInfo.gasLimit) *
                  100
                ).toFixed(2)}
                %)
              </span>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Gas Fees:</h2>
          <h2 className="col-span-10 ">
            <span className="inline-flex gap-2">
              <span className="md:pr-3 md:border-r-2">
                Max: {maxFeePerGasGwei} Gwei
              </span>
              <span>Max Priority: {maxPriorityFeePerGasGwei} Gwei</span>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Other Attributes:</h2>
          <h2 className="col-span-10">
            <span className="inline-flex gap-2">
              <span className="border border-black py-[2px] px-2">
                Nonce: {transactionInfo.nonce}
              </span>
              <span className="border border-black py-[2px] px-2">
                Position In Block: {transactionInfo.transactionIndex}
              </span>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Input Data:</h2>
          <h2 className="col-span-10">
            <textarea
              value={transactionInfo.data}
              readOnly
              rows="4"
              className="w-full border p-2 focus:outline-0"
            ></textarea>
          </h2>
        </div>
      </div>
      <h2 className=" text-[10px] text-gray-500 p-2">
        A transaction is a cryptographically signed instruction that changes the
        blockchain state. Block explorers track the details of all transactions
        in the network.
      </h2>
    </div>
  );
}
