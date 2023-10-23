import { getBlockTransactions } from "@/scripts";
import {
  getShortenAddress,
  getShortenAddressEnd,
} from "@/utils/get-shorten-address";
import Link from "next/link";
import { useEffect, useReducer } from "react";
import { Press_Start_2P } from "next/font/google";
import Navbar from "@/components/navbar";
import { ethers } from "ethers";
const start = Press_Start_2P({ subsets: ["latin"], weight: "400" });

const PAGE_SIZE = 25;

export default function Tx({ block, transactions = [] }) {
  transactions = JSON.parse(transactions);

  const [{ page, currentPage, totalPages }, dispatch] = useReducer(
    (state, payload) => ({ ...state, ...payload }),
    { page: [], currentPage: 0, totalPages: 0 }
  );

  // pagination previous
  const onPrevious = () => {
    const newPage = currentPage - 1;

    if (newPage < 0) return;

    const page = transactions.slice(
      newPage * PAGE_SIZE,
      newPage * PAGE_SIZE + PAGE_SIZE
    );

    dispatch({
      page,
      currentPage: newPage,
    });
  };

  // pagination next
  const onNext = () => {
    const newPage = currentPage + 1;

    if (newPage > totalPages) return;

    const page = transactions.slice(
      newPage * PAGE_SIZE,
      newPage * PAGE_SIZE + PAGE_SIZE
    );

    dispatch({
      page,
      currentPage: newPage,
    });
  };

  useEffect(() => {
    console.log(transactions);
    if (transactions.length) {
      const totalPages = Math.floor(transactions.length / PAGE_SIZE);
      const page = transactions.slice(
        currentPage,
        (currentPage + 1) * PAGE_SIZE
      );

      dispatch({
        totalPages,
        page,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={`${start.className} flex justify-center h-[200vh]`}>
        <Navbar />
        <div className="flex flex-col w-[80%] mt-[15%]">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <img
                src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/sync.svg"
                className="w-10 h-10 mr-3"
              />
              <h2 className="text-bold">Transactions</h2>
            </div>
            <div className="text-xs p-5">
              <h2>For Block {block}</h2>
            </div>
          </div>
          <div className="mt-10 text-xs">
            <div className="flex justify-between items-center">
              <p className="px-6 py-3">
                A total of {transactions.length} transactions found
              </p>
              <div className="inline-block overflow-hidden">
                <button onClick={onPrevious} className="p-2 py-1">
                  &lt;
                </button>
                <span className=" p-2 py-1 h-[10px] cursor-default">
                  {currentPage + 1} of {totalPages + 1}
                </span>
                <button onClick={onNext} className="p-2 py-1">
                  &gt;
                </button>
              </div>
            </div>
            <table className="w-full items-center mt-5">
              <thead>
                <tr>
                  <th class="px-6 align-middle py-3 text-left">
                    Transaction Hash
                  </th>
                  <th class="px-6 align-middle py-3 text-left">Block</th>
                  <th class="px-6 align-middle py-3 text-left">From</th>
                  <th class="px-6 align-middle py-3 text-left">To</th>
                </tr>
              </thead>
              <tbody>
                {page.map((transaction) => (
                  <tr className="border-b" key={transaction.hash}>
                    <td class="border-t-0 px-6 align-middle whitespace-nowrap p-4 text-left ">
                      <Link href={`/tx/${transaction.hash}`}>{getShortenAddressEnd(transaction.hash, 15)}</Link>
                    </td>
                    <td class="border-t-0 px-6 align-middle whitespace-nowrap p-4">
                      <Link
                        href={`/block/${parseInt(transaction.blockNumber)}`}
                      >
                        {parseInt(transaction.blockNumber)}
                      </Link>
                    </td>
                    <td class="border-t-0 px-6 align-center whitespace-nowrap p-4">
                      <Link href={`/address/${transaction.from}`}>
                        {getShortenAddress(transaction.from, 8)}
                      </Link>
                    </td>
                    <td class="border-t-0 px-6 align-middle whitespace-nowrap p-4">
                      <Link href={`/address/${transaction.to}`}>
                        {getShortenAddress(transaction.to, 8)}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-5 overflow-hidden">
              <button onClick={onPrevious} className="p-2 py-1">
                &lt;
              </button>
              <span className=" p-2 py-1 h-[10px] cursor-default">
                {currentPage + 1} of {totalPages + 1}
              </span>
              <button onClick={onNext} className="p-2 py-1">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { block } = context.query;

  const { transactions } = await getBlockTransactions(block);
  return {
    props: {
      block,

      transactions: JSON.stringify(transactions),
    },
  };
};
