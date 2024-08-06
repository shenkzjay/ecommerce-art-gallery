import Link from "next/link";

export const SideNav = () => {
  return (
    <nav>
      <ul className="ml-10 flex flex-col gap-4 mt-12 text-black">
        <li>
          <Link href={"/admin"}>Home</Link>
        </li>
        <li>
          <Link href={"/admin/create-product"}>Products</Link>
        </li>
        <li>
          <Link href={"/admin/create-category"}>Category</Link>
        </li>
        <li>
          <Link href={"/admin/create-author"}>Author</Link>
        </li>
      </ul>
    </nav>
  );
};
