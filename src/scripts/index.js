import { Alchemy, Network, Utils } from "alchemy-sdk";
import { timeAgo } from "@/utils/time";
import { ethers } from "ethers";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
export const alchemy = new Alchemy(settings);

const provider = new ethers.AlchemyProvider(
  "mainnet",
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  );
  

export async function getBlockNumber() {
  try {
    return await alchemy.core.getBlockNumber();
  } catch (e) {
    console.log(e);
  }
}

export async function getGasPrice() {
    const gasPrice = await alchemy.core.getGasPrice();
    const gas = ethers.formatUnits(ethers.getNumber(gasPrice._hex))
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

export const getBlockInfo = async (query) => {
    let blockHashOrBlockTag = query;
    if (!/0x/.test(query)) blockHashOrBlockTag = Number(query);
  
    const blockInfo = await alchemy.core.getBlock(blockHashOrBlockTag);
    return {
      ...blockInfo,
      baseFeePerGas: blockInfo.baseFeePerGas?.toString() || 0,
      gasLimit: blockInfo.gasLimit?.toString() || 0,
      gasUsed: blockInfo.gasUsed?.toString() || 0,
      _difficulty: blockInfo._difficulty?.toString() || 0,
    };
};

export const getBlockTransactions = async (query) => {
  let blockHashOrBlockTag = query;
  if (!/0x/.test(query)) blockHashOrBlockTag = Number(query);

  const blockInfo = await alchemy.core.getBlockWithTransactions(
    blockHashOrBlockTag
  );
  return {
    transactions: blockInfo.transactions || [],
  };
};

export const getTransactionInfo = async (query) => {
  const transactionReceipt_ = alchemy.core.getTransactionReceipt(query);
  const transaction_ = alchemy.core.getTransaction(query);

  const [transactionReceipt, transaction] = await Promise.all([
    transactionReceipt_,
    transaction_,
  ]);

  if (!transactionReceipt || !transaction) return null;

  return {
    to: transaction.to,
    from: transaction.from,
    gasPrice: transaction.gasPrice?.toString() || 0,
    gasLimit: transaction.gasLimit?.toString() || 0,
    maxFeePerGas: transaction.maxFeePerGas?.toString() || 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas?.toString() || 0,
    value: transaction.value.toString(),
    hash: transaction.hash,
    blockNumber: transaction.blockNumber,
    nonce: transaction.nonce,
    data: transaction.data,
    gasUsed: transactionReceipt.gasUsed.toString(),
    status: transactionReceipt.status,
    confirmations: transactionReceipt.confirmations.toString(),
    transactionIndex: transactionReceipt.transactionIndex,
  };
};

export const getHashType = async (query) => {
  try {
    const transaction = await alchemy.core.getTransaction(query);
    const block = await alchemy.core.getBlock(query);

    if (transaction) return "transaction";
    if (block) return "block";
  } catch (err) {}

  return null;
};
