"use client";

import getSingleProduct from "@/app/api/productapicall/getSingleProduct";
import { ProductTypes } from "@/features/admin/create-product/page";
import {
  getSingleAuthor,
  getSingleProductFromAuthor,
} from "@/app/api/authorapicalls/getSingleAuthor";
import { authorDataTypes } from "@/features/admin/create-author/page";
import Link from "next/link";

export interface ParamsType extends authorDataTypes {
  authorProducts: ProductTypes;
  authorProductsImage: [
    {
      singleProductImg: string;
      _doc: ProductTypes;
    }
  ];
}

export default function Page({ params }: { params: { id: string } }) {
  const { data, isError, isLoading } = getSingleProduct({ params });

  console.log(data, "singleProductData");

  const singleProductData = data as ProductTypes;

  const singleAuthorId = {
    id: singleProductData?.product_author?._id,
  };

  const {
    data: singleAuthorData,
    isError: singleAuthorErrorState,
    isLoading: singleAuthorLoadingState,
  } = getSingleProductFromAuthor({ singleAuthorId }) as {
    data: ParamsType | undefined;
    isError: boolean;
    isLoading: boolean;
  };

  // const singleAuthor = singleAuthorData as authorDataTypes;

  console.log(data, "params");
  console.log(singleAuthorData, "singlAuthor");

  //loading state
  if (isLoading) {
    return (
      <section className="mx-auto w-[80vw] mt-20">
        <div className="gap-12 flex flex-row">
          <div className="w-1/2 h-[40vw] bg-slate-200"></div>

          <div className="flex flex-col  w-1/2 gap-4">
            <h4 className="w-full h-8 bg-slate-200"></h4>
            <p className="w-full h-8 bg-slate-200"></p>
            <p className="w-1/2 h-8 bg-slate-200"></p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-[80vw]">
      <div className="flex flex-row justify-between py-4 mb-6">
        <h3>{singleProductData?.product_title}</h3>
        <p>Icons</p>
      </div>

      <section className="">
        <div className="gap-12 flex flex-row">
          <div className="w-1/2 bg-[#f7f7f7]">
            <img
              src={singleProductData?.imageUrl}
              alt=""
              width={400}
              height={100}
              className="object-contain   w-full h-[60vh]"
            />
            <div className="flex justify-center mt-4">
              <span>view in room →</span>
            </div>
          </div>

          <div className="flex flex-col w-1/2 gap-4">
            <h4 className="text-2xl font-bold capitalize">{singleProductData?.product_title}</h4>
            <p className="text-slate-500">{singleProductData?.product_author?.artist_name}</p>
            <p className="text-slate-500">{singleProductData?.product_about}</p>
            <div className="flex flex-row gap-6">
              <Link
                href={{
                  pathname: "/orders",
                  query: {
                    title: singleProductData?.product_title,
                    price: singleProductData?.product_price,
                  },
                }}
              >
                <button className="py-3 px-6 bg-black text-white font-semibold rounded-full hover:scale-105">{`Purchase at $${singleProductData?.product_price} `}</button>
              </Link>
              <button className="py-3 px-6 rounded-full outline outline-black font-semibold hover:scale-105">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 flex flex-col">
        <h3 className="text-3xl">About Artwork</h3>
        <span className="flex w-full h-[.08rem] bg-slate-200 my-2"></span>
        <p>{singleProductData?.product_about}</p>
        <p>{singleProductData?.product_category?.categoryName}</p>
      </section>

      <section className="mt-20 flex flex-col">
        <h3 className="text-3xl">About Author</h3>
        <span className="flex w-full h-[.08rem] bg-slate-200 my-2"></span>
        <Link href={`/artists/${singleAuthorData?._id}`}>
          <div>
            <img src={singleAuthorData?.imageUrl} width={100} height={100} alt="" />
          </div>
          <p>{singleProductData?.product_author?.artist_name}</p>
          <p>{`b.${new Date(singleProductData?.product_author?.date_of_birth).getFullYear()}`}</p>
          <p>{singleProductData?.product_author?.bio}</p>
        </Link>
      </section>

      <section className="mt-20">
        <h3 className="text-2xl">Author's collection</h3>
        <span className="flex w-full h-[.08rem] bg-slate-200 my-2"></span>
        <div className="flex gap-4">
          {singleAuthorData && singleAuthorData?.authorProductsImage?.length > 0
            ? singleAuthorData?.authorProductsImage?.map((author, index) => (
                <Link href={`/artworks/${author?._doc?._id}`} key={index}>
                  <div className="w-64 h-44 rounded-xl">
                    <img
                      src={author.singleProductImg}
                      width={100}
                      height={100}
                      alt=""
                      className="w-full h-full rounded-xl"
                    />
                  </div>
                  <p>{author?._doc?.product_title}</p>
                  {author?._doc?.product_price && <p>{`$${author?._doc?.product_price}`}</p>}
                </Link>
              ))
            : ""}
        </div>
      </section>
    </section>
  );
}
