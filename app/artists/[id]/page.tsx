"use client";

import { getSingleAuthor } from "@/app/api/authors/getSingleAuthor";
import { ParamsType } from "@/app/artworks/[id]/page";
import Link from "next/link";

export default function Artist({ params }: { params: { id: string } }) {
  const { data, isError, isLoading } = getSingleAuthor({ params }) as {
    data: ParamsType;
    isError: boolean;
    isLoading: boolean;
  };

  console.log(data, "data");

  return (
    <section className="mx-auto w-[80vw]">
      <div className="flex flex-row gap-20">
        <div className="w-80 h-96">
          <img
            src={data?.imageUrl}
            width={100}
            height={100}
            alt=""
            className="w-full h-full rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-3xl">{data?.artist_name}</p>
          <p className="text-2xl w-2/3">{data?.bio}</p>
          <p className="text-2xl text-slate-500">{`b.${new Date(
            data?.date_of_birth
          ).getFullYear()}`}</p>
          <div className="flex flex-row gap-6">
            <a href={data?.twitter} target="_blank" className="underline text-blue-500">
              Twitter
            </a>

            <a href={data?.tiktok} target="_blank" className="underline text-brown-500">
              tiktok
            </a>
            <a href={data?.instagram} target="_blank" className="underline text-pink-500">
              instagram
            </a>
          </div>
        </div>
      </div>

      <figure className="mt-20">
        <figcaption className="text-3xl my-6">Artist collection</figcaption>
        <span className="flex w-full h-[.05rem] bg-slate-200  mb-10 mt-2"></span>

        <div className="grid grid-flow-col gap-10">
          {data && data?.authorProductsImage.length > 0
            ? data?.authorProductsImage.map((author, index) => (
                <Link
                  href={`/artworks/${author._doc._id}`}
                  key={index}
                  className="rounded-xl grid grid-cols-subgrid"
                >
                  <span className="w-64 h-44">
                    <img
                      src={author?.singleProductImg}
                      width={100}
                      height={100}
                      alt=""
                      className="rounded-xl w-full h-full"
                    />
                  </span>

                  <div className="mt-4">
                    <p>{author?._doc.product_title}</p>
                    <p>{author?._doc.product_about}</p>
                    <p>{author?._doc.product_price}</p>
                  </div>
                </Link>
              ))
            : ""}
        </div>
      </figure>
    </section>
  );
}
