import Link from 'next/link'
export default function Navbar() {
  return (
    <div className="absolute top-20">
      <h1 className="text-6xl relative p-5">
        <Link href={"/"}>
        <span className="glitch" data-text="blockscanner" href="/">
          blockscanner
        </span>
        </Link>
        <span className="text-lg">
           {" "}powered by AlchemySDK
        </span>
      </h1>
    </div>
  );
}
