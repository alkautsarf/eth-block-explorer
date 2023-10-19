export default function InfoBox() {
  return (
    <div className="w-[85%] h-[175px] grid grid-cols-2 justify-center absolute border border-black bg-white top-64">
      <div className="flex border border-black">
        <div className="flex items-center p-3 gap-3">
          <img
            src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/expand.svg"
            className="w-10 h-10"
          />
          <h2 className="text-sm">Ether Price: </h2>
        </div>
        <div className="flex flex-grow justify-center items-center">
          <h2>$1,552.25(-1.76%)</h2>
        </div>
      </div>
      <div className="flex border border-black">
        <div className="flex items-center p-3 gap-3">
          <img
            src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/sync.svg"
            className="w-10 h-10"
          />
          <h2 className="text-sm">Transactions: </h2>
        </div>
        <div className="flex flex-grow justify-center items-center">
          <h2>2,129.04 M</h2>
        </div>
      </div>
      <div className="flex border border-black">
        <div className="flex items-center p-3 gap-3">
          <img
            src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/coin.svg"
            className="w-10 h-10"
          />
          <h2 className="text-sm">Market Cap: </h2>
        </div>
        <div className="flex flex-grow justify-center items-center">
          <h2>$186,679,715,089.00</h2>
        </div>
      </div>
      <div className="flex border border-black">
        <div className="flex items-center p-3 gap-3">
          <img
            src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/bullseye-arrow.svg"
            className="w-10 h-10"
          />
          <h2 className="text-sm">Last Finalized Block: </h2>
        </div>
        <div className="flex flex-grow justify-center items-center">
          <h2>18384365</h2>
        </div>
      </div>
    </div>
  );
}
