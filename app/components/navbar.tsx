import Link from "next/link";
import { ProductTypes } from "../admin/create-product/page";

interface savedItemTypes {
  items: ProductTypes[];
}

export const Navbar = ({ items }: savedItemTypes) => {
  console.log({ items });

  return (
    <nav className="my-10">
      <div className="flex flex-row items-center justify-between">
        <Link href={"/"}>Loggo</Link>

        <div className="">
          <label className="sr-only border">Search for products</label>
          <input
            type="search"
            placeholder="Search for products"
            className=" px-4 py-2 w-96 bg-[#f6f6f6] rounded-full"
          />
        </div>

        <div>
          <ul className="flex flex-row gap-6">
            <li>
              <Link href={"/"}>Artworks</Link>
            </li>
            <li>
              <Link href={"/"}>Artists</Link>
            </li>
            <li>
              <Link href={"/"}>Buy</Link>
            </li>
            <li>
              <Link href={"/"}>Sell</Link>
            </li>
            <li>
              <button>Log in</button>
            </li>
            <li>
              <button>Sign up</button>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href={{ pathname: "artworks/savedarts", query: { item: JSON.stringify(items) } }}
          className="flex group flex-row items-center gap-2 border border-slate-500 hover:border-black px-2 py-1 rounded-full"
        >
          <p className="text-[14px] text-slate-500 group-hover:text-black">Saved</p>
          <div className="h-4 flex">
            <span className="bg-slate-500 group-hover:bg-black p-1  flex justify-center items-center rounded-full text-[10px] text-white">
              {items?.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};
