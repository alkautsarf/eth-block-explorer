import { Alchemy, Network, Utils } from "alchemy-sdk";
import { timeAgo } from "@/utils/time";
import { ethers } from "ethers";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const provider = new ethers.AlchemyProvider(
  "mainnet",
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
);

const alchemy = new Alchemy(settings);

export async function getBlockNumber() {
  try {
    return await alchemy.core.getBlockNumber();
  } catch (e) {
    console.log(e);
  }
}

export async function getGasPrice() {
    const gasPrice = await alchemy.core.getGasPrice();
    const gas = ethers.formatUnits(ethers.getNumber(gasPrice._hex) )
    return Math.ceil(gas * 1000000000)
}

export const getMarketCap = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/ethereum"
    );
    const marketCap = await response.json();
    return marketCap.market_data.market_cap.usd;
  } catch (err) {
    return 0;
  }
};

export const getETHPrice = async () => {
  const contractAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"; // Chainlink oracle address
  const abi = [
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]; // Chainlink oracle ABI
  const priceFeed = new ethers.Contract(contractAddress, abi, provider);

  const { answer } = await priceFeed.latestRoundData();

  const priceInUSD = ethers.formatEther(
    (ethers.toNumber(answer) * 1e10).toLocaleString("fullwide", {
      useGrouping: false,
    })
  );

  return Number(priceInUSD).toFixed(2);
};

export const getLatestBlocks = async (maxBlocks = 8) => {
  const latestBlock = await alchemy.core.getBlockNumber();
  const blockPromises = [];
  for (let i = 0; i < maxBlocks; i++) {
    blockPromises.push(alchemy.core.getBlock(latestBlock - i));
  }

  const latestBlocksRaw = await Promise.all(blockPromises);

  return latestBlocksRaw.map(({ miner, number, timestamp, transactions }) => ({
    miner,
    number,
    timestamp,
    transactions,
    agoTimestamp: timeAgo(timestamp),
  }));
};

export const getLatestTransactions = async (maxTxns = 8) => {
  const latestBlock = await alchemy.core.getBlockNumber();
  const { transactions, timestamp } = await alchemy.core.getBlock(latestBlock);
  const transactionsPromises = [];
  for (let i = 0; i < maxTxns; i++) {
    transactionsPromises.push(
      alchemy.core.getTransactionReceipt(transactions[i])
    );
  }

  const latestTransactions = await Promise.all(transactionsPromises);

  return latestTransactions.map(
    ({ blockNumber, from, to, transactionHash }) => ({
      blockNumber,
      to,
      from,
      transactionHash,
      agoTimestamp: timeAgo(timestamp),
    })
  );
};
