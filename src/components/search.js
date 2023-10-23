import { getHashType } from "@/scripts";
import { ethers } from "ethers";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const queryInput = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.target);
      const query = data.get("query");

      if (ethers.isAddress(query))
        return router.push(`/address/${query}`);

      if (ethers.isHexString(query, 32)) {
        const type = await getHashType(query);

        if (type === "transaction") return router.push(`/tx/${query}`);
        if (type === "block") return router.push(`/block/${query}`);
      }

      if (!query.startsWith("0x") && Number(query))
        return router.push(`/block/${query}`);
    } catch (err) {}

    router.push("/error");
  };
  return (

        <form
          className="absolute justify-center w-[50%]  z-1 top-[16rem] text-xs border-2 border-black"
          onSubmit={queryInput}
        >
          <span className="flex gap-2">
            <input
              autoComplete="off"
              name="query"
              placeholder="Search by Address / Txn Hash / Block / Token "
              className="pl-1 md:pl-3 py-2 outline-0 w-full focus:outline-2 outline-slate-100 text-slate-600 placeholder:text-slate-600"
            />
            <button className="flex items-center " type="submit">
              <img
                src="https://cdn.jsdelivr.net/npm/pixelarticons@latest/svg/search.svg"
                className="w-10 h-10"
              />
            </button>
          </span>
        </form>


  );
}
