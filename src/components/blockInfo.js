import Link from "next/link";

export const BlockInfo = ({ blockInfo, gasUsedPercent, gasTarget }) => {
  return (
    <div className="flex flex-col w-[75%] mt-[12%]">
      <div className="flex items-center">
        <img
          src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/checkbox-on.svg"
          className="w-10 h-10 mr-3"
        />
        <h2>
          Block{" "}
          <span className="text-xs text-gray-500">#{blockInfo.number}</span>
        </h2>
      </div>
      <div className="grid mt-5 py-8 px-6 gap-3 border-black border-2 text-xs">
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Block Height:</h2>
          <h2 className="col-span-10">{blockInfo.number}</h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Status:</h2>
          <h2 className="text-green-700 ">Finalized</h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Timestamp:</h2>
          <h2 className="col-span-10">{blockInfo.timestamp}</h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Transactions:</h2>
          <h2 className="col-span-10 text-[10px] text-gray-500">
            <span className=" text-xs text-black">
              <Link href={`/tx?block=${blockInfo.number}`}>{blockInfo.transactions?.length} transactions</Link>
            </span>{" "}
            in this block
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Fee Recipient:</h2>
          <h2 className="col-span-10 ">
            <Link href={`/address/${blockInfo.miner}`}>{blockInfo.miner} </Link>
            <span className="text-[10px] text-gray-500">in 12 secs</span>
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Hash:</h2>
          <h2 className="col-span-10 ">{blockInfo.hash}</h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Parent Hash:</h2>
          <h2 className="col-span-10 ">
            <Link href={`/block/${blockInfo.parentHash}`}>
              {blockInfo.parentHash}
            </Link>
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Nonce:</h2>
          <h2 className="col-span-10">{blockInfo.nonce}</h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Total Difficulty:</h2>
          <h2 className="col-span-10">{blockInfo.difficulty}</h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Gas Used:</h2>
          <h2 className="col-span-10">
            {blockInfo.gasUsed}{" "}
            <span className="text-gray-500">({gasUsedPercent})%</span>
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Gas Target:</h2>
          <h2 className="col-span-10 text-gray-500">{gasTarget}%</h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Gas Limit:</h2>
          <h2 className="col-span-10">{blockInfo.gasLimit}</h2>
        </div>
        <div className="grid grid-cols-12 gap-1 p-2">
          <h2 className="text-gray-500 col-span-2">Base Fee Per Gas:</h2>
          <h2 className="col-span-10">{blockInfo.baseFeePerGas}</h2>
        </div>
      </div>
      <h2 className=" text-[10px] text-gray-500 p-2">
        Blocks are batches of transactions linked via cryptographic hashes. Any
        tampering of a block would invalidate all following blocks as all
        subsequent hashes would change.
      </h2>
    </div>
  );
};
