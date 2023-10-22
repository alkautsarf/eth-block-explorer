import Blocks from "@/components/blocks";
import Footer from "@/components/footer";
import InfoBox from "@/components/infoBox";
import Navbar from "@/components/navbar";
import Transactions from "@/components/transactions";
import { getBlockNumber, getETHPrice, getGasPrice, getLatestBlocks, getLatestTransactions, getMarketCap } from "@/scripts";
import { Press_Start_2P } from "next/font/google";
import { useEffect } from "react";
const start = Press_Start_2P({ subsets: ["latin"], weight: "400" });
export default function Home({blockNumber, marketCap, ethPrice, blocksInfo, latestTransactions, gasPrice}) {
  return (
    <div id="main" className={`${start.className} flex justify-center h-[165vh]`}>
      <Navbar />
      <InfoBox blockNumber={blockNumber} marketCap={marketCap} ethPrice={ethPrice} gasPrice={gasPrice}/>
      <div className="w-[85%] h-[100vh] grid grid-cols-2 justify-center absolute border border-black bg-white top-96 mt-[5%]">
      <Blocks blocksInfo={blocksInfo} />
      <Transactions latestTransactions={latestTransactions}/>
      </div>
      <Footer/>
    </div>
  );
}

export const getServerSideProps = async () => {
    let blockNumber = 0
    let marketCap = 0
    let ethPrice = 0
    let blocksInfo = [];
    let latestTransactions = [];
    let gasPrice = 0

    try {
      blockNumber = await getBlockNumber()
      marketCap = await getMarketCap()
      ethPrice = await getETHPrice()
      blocksInfo = await getLatestBlocks()
      latestTransactions = await getLatestTransactions()
      gasPrice = await getGasPrice()
    } catch (e) {
      console.log(e);
    }

    return {
      props: {
        blockNumber,
        marketCap,
        ethPrice,
        blocksInfo,
        latestTransactions,
        gasPrice
      }
    }
}