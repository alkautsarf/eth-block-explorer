import { AddressInfo } from "@/components/addressInfo";
import Navbar from "@/components/navbar";
import { alchemy } from "@/scripts";
import { Press_Start_2P } from "next/font/google";
import { useEffect } from "react";
const start = Press_Start_2P({ subsets: ["latin"], weight: "400" });

export default function Block({ wallet, transactions, balance, error }) {
    useEffect(() => {
        console.log(wallet)
        console.log(transactions)
        console.log(balance)
        console.log(error)
    }, [])
  return (
    <>
      <div className={`${start.className} flex justify-center h-[200vh]`}>
        <Navbar />
        <AddressInfo wallet={wallet} transactions={transactions} balance={balance} />
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
    const { wallet } = context.query;
    let transactions = [];
    let balance = 0;
    let error = false;
  
    try {
      const toTransactionsPromise = alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toAddress: wallet,
        category: ["external"],
      });
      const fromTransactionsPromise = alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: wallet,
        category: ["external"],
      });
      const balancePromise = alchemy.core.getBalance(wallet);
      const [toTransactions, fromTransactions, balance_] = await Promise.all([
        toTransactionsPromise,
        fromTransactionsPromise,
        balancePromise,
      ]);
  
      transactions = [...toTransactions.transfers, ...fromTransactions.transfers];
      balance = balance_;
    } catch (err) {
      error = true;
    }
  
    return {
      props: {
        error,
        wallet,
        transactions:
          transactions.sort(
            (a, b) => parseInt(b.blockNum) - parseInt(a.blockNum)
          ) || [],
        balance: balance?.toString() || 0,
      },
    };
  };
