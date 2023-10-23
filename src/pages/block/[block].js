import { BlockInfo } from "@/components/blockInfo";
import Navbar from "@/components/navbar";
import { getBlockInfo } from "@/scripts";
import { Press_Start_2P } from "next/font/google";
import { useEffect } from "react";
const start = Press_Start_2P({ subsets: ["latin"], weight: "400" });

export default function Block({blockInfo, error}) {
  const gasUsedPercent = ((blockInfo.gasUsed / blockInfo.gasLimit) * 100).toFixed(2);
  let gasTarget = (100 - (blockInfo.gasUsed / 15000000) * 100).toFixed(2);
  gasTarget = gasTarget <= 0 ? 100 : -gasTarget;
  return (
    <>
      <div className={`${start.className} flex justify-center h-[110vh]`}>
        <Navbar />
        <BlockInfo blockInfo={blockInfo} gasUsedPercent={gasUsedPercent} gasTarget={gasTarget}/>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { block } = context.query;
  let blockInfo = {};
  let error = null;

  try {
    blockInfo = await getBlockInfo(block);
  } catch (err) {
    error = err.body || err.message || err;
  }

  return {
    props: {
      blockInfo,
      error,
    },
  };
};
