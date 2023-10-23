import { getTransactionInfo } from "@/scripts";
import { useEffect } from "react";
import { Press_Start_2P } from "next/font/google";
import Navbar from "@/components/navbar";
import TxInfo from "@/components/transactionInfo";
const start = Press_Start_2P({ subsets: ["latin"], weight: "400" });

export default function TxHash({ transactionInfo, error }) {
  return (
    <>
      <div className={`${start.className} flex justify-center h-[110vh]`}>
        <Navbar />
        <TxInfo transactionInfo={transactionInfo} />
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { txHash } = context.query;
  let data = {};
  let error = false;
  try {
    data = await getTransactionInfo(txHash);
    if (!data) error = true;
  } catch (err) {
    error = true;
  }

  return {
    props: {
      transactionInfo: data,
      error,
    },
  };
};
