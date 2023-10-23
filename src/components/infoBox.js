import { getBlockNumber, getGasPrice } from "@/scripts";
import { useEffect, useState } from "react";

export default function InfoBox({blockNumber, marketCap, ethPrice, gasPrice}) {
  return (
    <div id="infoBox" className="w-[85%] h-[175px] grid grid-cols-2 justify-center absolute border border-black bg-white top-[22rem]">
      <div id="section" className="flex border border-black">
        <div className="flex items-center p-3 gap-3">
          <img
            src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/expand.svg"
            className="w-10 h-10"
          />
          <h2 className="text-sm">Ether Price: </h2>
        </div>
        <div className="flex flex-grow justify-center items-center">
          <h2>${ethPrice?.toLocaleString()}</h2>
        </div>
      </div>
      <div id="section" className="flex border border-black">
        <div className="flex items-center p-3 gap-3">
          <img
            src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/speed-fast.svg"
            className="w-10 h-10"
          />
          <h2 className="text-sm">Gas Price: </h2>
        </div>
        <div className="flex flex-grow justify-center items-center ml-[16%]">
          <h2>{gasPrice} gwei</h2>
        </div>
      </div>
      <div id="section" className="flex border border-black">
        <div className="flex items-center p-3 gap-3">
          <img
            src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/coin.svg"
            className="w-10 h-10"
          />
          <h2 className="text-sm">Market Cap: </h2>
        </div>
        <div className="flex flex-grow justify-center items-center ml-[17%]">
          <h2>${marketCap?.toLocaleString()}</h2>
        </div>
      </div>
      <div id="section" className="flex border border-black">
        <div className="flex items-center p-3 gap-3">
          <img
            src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/bullseye-arrow.svg"
            className="w-10 h-10"
          />
          <h2 className="text-sm">Recently Mined Block: </h2>
        </div>
        <div className="flex flex-grow justify-center items-center">
          <h2>{blockNumber}</h2>
        </div>
      </div>
    </div>
  );
}
