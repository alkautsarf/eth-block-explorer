import { getShortenAddress } from "@/utils/get-shorten-address";
import Link from "next/link";
import { useEffect } from "react";

export default function Blocks({ blocksInfo }) {
  useEffect(() => {
    console.log(blocksInfo);
  });
  return (
    <>
      <div className="flex flex-col border border-black">
        <div className="flex justify-start items-center p-5 border border-b-black border-b-2 gap-2">
          <h2>Latest Blocks</h2>
        </div>
        {blocksInfo.map((el, idx) => (
          <div
            key={el}
            className={
              idx !== blocksInfo.length - 1
                ? "border border-b-black border-b-2 h-[15%] flex items-center justify-between px-5 text-xs"
                : "border h-[15%] flex items-center justify-between px-5 text-xs"
            }
          >
            <div className="flex gap-3">
              <img
                src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/checkbox-on.svg"
                className="w-10 h-10"
              />
              <div className="flex flex-col gap-2">
                <Link href={`/block/${el.number}`}>
                  <h2 className="">{el.number}</h2>
                </Link>
                <h2 className=" text-[9px] text-gray-400">
                  {el.agoTimestamp} ago
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2>
                Fee Recipient&nbsp;{" "}
                <Link href={`/address/${el.miner}`}>
                  {getShortenAddress(el.miner)}
                </Link>
              </h2>
              <h2>
                <Link href={`/tx?block=${el.number}`}>{el.transactions && el.transactions.length} txns </Link>
                <span className="text-[9px] text-gray-400">in 12 secs</span>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
