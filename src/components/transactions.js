import {
  getShortenAddress,
  getShortenAddressEnd,
} from "@/utils/get-shorten-address";
import Link from "next/link";
import { useEffect } from "react";

export default function Transactions({ latestTransactions }) {
  useEffect(() => {
    console.log(latestTransactions);
  }, []);
  return (
    <>
      <div className="border border-black flex flex-col">
        <div className="flex justify-start items-center p-5 border border-b-black border-b-2 gap-2">
          <h2>Latest Transactions</h2>
        </div>
        {latestTransactions.map((el, idx) => (
          <div
            className={
              idx !== latestTransactions.length - 1
                ? "border border-b-black border-b-2 h-[15%] flex items-center justify-between px-5 text-xs"
                : "border  h-[15%] flex items-center justify-between px-5 text-xs"
            }
          >
            <div className="flex gap-3">
              <img
                src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/sync.svg"
                className="w-10 h-10"
              />
              <div className="flex flex-col gap-2">
                <h2>
                  <Link href={`/tx/${el.transactionHash}`}>{getShortenAddressEnd(el.transactionHash)}</Link>
                </h2>
                <h2 className=" text-[9px] text-gray-400">
                  {el.agoTimestamp} ago
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2>
                From{" "}
                <Link href={`/address/${el.from}`}>
                  {getShortenAddress(el.from)}
                </Link>
              </h2>
              <h2>
                To{" "}
                <Link href={`/address/${el.to}`}>
                  {getShortenAddress(el.to)}
                </Link>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
