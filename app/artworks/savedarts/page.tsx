"use client";

import { ProductTypes } from "@/features/admin/create-product/page";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/component/navbar";
import Link from "next/link";

export default function Pages() {
  const searchParams = useSearchParams();

  const getItems = searchParams.get("item");

  const parsedItem: ProductTypes[] = JSON.parse(getItems as string);

  return (
    <section className="w-[80vw] mx-auto">
      <div className="">
        <Navbar items={parsedItem} />
      </div>
      {parsedItem && parsedItem.length > 0
        ? parsedItem.map((savedItem, index) => (
            <div key={savedItem?._id} className="">
              <fieldset className="group border p-6 w-1/2 rounded-xl mb-10">
                <legend className="font-semibold">{savedItem?.product_title}</legend>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-12">
                    <div className="w-[100px] h-[100px]">
                      <img
                        src={savedItem?.imageUrl}
                        width={100}
                        height={100}
                        alt={savedItem?.product_title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <p>{savedItem?.product_about}</p>
                      <p>{savedItem?.product_author?.artist_name}</p>
                      <p>{savedItem?.product_price}</p>
                      <p>{savedItem?.product_category?.categoryName}</p>
                    </div>
                  </div>
                  <div className="group-hover:flex gap-2 hidden">
                    <button>remove</button>
                    <Link href={`/artworks/${savedItem._id}`}>purchase </Link>
                  </div>
                </div>
              </fieldset>
            </div>
          ))
        : ""}
    </section>
  );
}
