import Blocks from "@/components/blocks";
import InfoBox from "@/components/infoBox";
import Navbar from "@/components/navbar";
import Transactions from "@/components/transactions";
import { Press_Start_2P } from "next/font/google";
const start = Press_Start_2P({ subsets: ["latin"], weight: "400" });
export default function Home() {
  return (
    <div className={`${start.className} flex justify-center h-[175vh]`}>
      <Navbar />
      <InfoBox />
      <div className="w-[85%] h-[100vh] grid grid-cols-2 justify-center absolute border border-black bg-white top-96 mt-[5%]">
      <Blocks />
      <Transactions/>
      </div>
    </div>
  );
}
