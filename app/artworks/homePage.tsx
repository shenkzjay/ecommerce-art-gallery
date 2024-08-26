"use client";

import { getAllRoutes } from "../actions/getAllRoutes";
import { useEffect, useState } from "react";
import { ProductTypes } from "../admin/create-product/page";
import { authorDataTypes } from "../admin/create-author/page";
import Link from "next/link";

export const HomePage = () => {
  const { data, isError, isLoading } = getAllRoutes();

  if (!data) {
    console.log("no data");
  }

  const productData = data?.products as ProductTypes[];
  const authurData = data?.authors as authorDataTypes[];

  const [isImageButtonClicked, setIsImageButtonClicked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  console.log(data, "hello");

  const imageWrapper = [
    {
      id: 1,
      imageTitle: "Shebang 008",
      imageButtonText: "Click to reveal",
      imageAuthor: "Title of garbage",
      imageDesc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. `,
      imageBg: "/images/art1.webp",
    },

    {
      id: 2,
      imageTitle: "Shebang 008",
      imageButtonText: "Click to reveal",
      imageAuthor: "Title of garbage",
      imageDesc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.`,
      imageBg: "/images/art2.webp",
    },

    {
      id: 3,
      imageTitle: "Shebang 008",
      imageButtonText: "Click to reveal",
      imageAuthor: "Title of garbage",
      imageDesc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. .`,
      imageBg: "/images/art3.webp",
    },

    {
      id: 4,
      imageTitle: "Shebang 008",
      imageButtonText: "Click to reveal",
      imageAuthor: "Title of garbage",
      imageDesc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. `,
      imageBg: "/images/art4.jpeg",
    },

    {
      id: 5,
      imageTitle: "Shebang 008",
      imageButtonText: "Click to reveal",
      imageAuthor: "Title of garbage",
      imageDesc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit`,
      imageBg: "/images/art5.webp",
    },
  ];

  const handleToggleIMageButton = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mx-auto w-[85vw]">
      <nav className="my-10">
        <div className="flex flex-row items-center justify-between">
          <div>Loggo</div>

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
            href={"/"}
            className="flex flex-row gap-2 border border-black px-4 py-2 rounded-full"
          >
            <p>Cart</p>
            <span className="bg-orange-600 p-1 rounded-full text-[10px] text-white">123</span>
          </Link>
        </div>
      </nav>

      <section className="flex flex-row overflow-scroll  gap-2">
        {imageWrapper &&
          imageWrapper.map((image, index) => (
            <article
              key={image.id}
              style={{
                backgroundImage: `url(${image.imageBg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "50% 0%",
              }}
              className={`${
                currentIndex === index
                  ? "w-full  flex flex-col [transition:width_.3s_ease-in-out] rounded-xl "
                  : " w-[400px] h-[70vh] border flex flex-col [transition:width_.3s_ease-in-out]  overflow-hidden"
              } rounded-xl relative z-10`}
            >
              <div className="absolute top-0 left-0 [background:linear-gradient(rgba(0,0,0,0.08),_rgba(0,0,0,0.5))] w-full h-full -z-10 rounded-xl"></div>
              <h3 className="contents flex-1 ">
                <button
                  className="flex flex-col justify-between h-full w-full"
                  onMouseOver={() => handleToggleIMageButton(index)}
                >
                  {/* <span>{image.imageTitle}</span>
                  <span className={`${currentIndex === index ? "hidden" : "flex"}`}>
                    {image.imageButtonText}
                  </span> */}
                </button>
              </h3>
              <div
                className={`${currentIndex === index ? "flex flex-col" : "hidden"} p-6 text-white`}
              >
                <h4 className="text-2xl font-semibold ">{image.imageAuthor}</h4>
                <p className="">{image.imageDesc}</p>
              </div>
            </article>
          ))}
      </section>

      {/* <section className="flex flex-row border">
        {imageWrapper.map((product, index) => (
          <button
            onMouseOver={() => handleToggleIMageButton(index)}
            key={index}
            className={`${
              currentIndex === index
                ? "hover:w-[400px] [transition:width_1s_ease-in-out]"
                : "h-96 border real w-[120px] [transition:width_1s_ease-in-out]"
            }`}
          >
            hello
          </button>
        ))}
      </section> */}

      <section className="mt-32">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-3xl ">Featured Artworks</h3>
          <Link href={"/"}>See more →</Link>
        </div>
        <span className="flex w-full h-[.05rem] bg-slate-200  mb-10 mt-2"></span>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 h-full">
          {productData && productData.length > 0
            ? productData.slice(0, 8).map((product, index) => (
                <li key={product._id} className="  h-full mb-6">
                  <Link href={`/artworks/${product._id}`} className="flex flex-col gap-2">
                    <div className="overflow-hidden w-full rounded-xl">
                      <img
                        src={product?.imageUrl ? product?.imageUrl : ""}
                        width={100}
                        height={100}
                        alt=""
                        className="w-full h-64 object-cover  hover:scale-110"
                      />
                    </div>
                    <div className="text-[14px]">
                      <p className="font-semibold">{product?.product_title}</p>
                      <p className="text-slate-500">{product?.product_category?.categoryName}</p>

                      <p className="text-slate-500">{product?.product_author?.artist_name}</p>

                      <p className="mt-2 font-semibold">
                        {product?.product_price ? `$${product?.product_price}` : ""}
                      </p>
                    </div>
                  </Link>
                </li>
              ))
            : ""}
        </ul>
      </section>

      <span className="flex justify-center mt-6">
        <a className="py-2 px-6 rounded-full border cursor-pointer">See all artworks →</a>
      </span>

      <section className="mt-32">
        <h3 className="text-3xl">Editorial pick</h3>
        <span className="flex w-full h-[.05rem] bg-slate-200 mb-10 mt-2"></span>
        <div
          data-cards-count="5"
          className="grid grid-cols-[1fr_.64fr_.36fr_.64fr] grid-rows-[repeat(2,_1fr)] h-[65vh] w-full border gap-4"
        >
          <div className="grid col-start-1 row-start-1 row-span-2  bg-red-500 rounded-xl bg-no-repeat overflow-hidden relative ">
            <div
              className="hover:[transform:scale3d(1.1,1.1,1)] [transition:transform_.5s_ease-in-out] flex items-end relative"
              style={{
                backgroundImage: "url(/images/art7.webp)",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              <div className="absolute top-0 left-0 [background:linear-gradient(rgba(0,0,0,0.08),_rgba(0,0,0,0.5))] w-full h-full rounded-xl"></div>
              <div className="text-white p-6 flex flex-col gap-1 relative">
                <p className="text-white">Art series</p>
                <p className=" font-semibold">10 most expensive artwork ever</p>
                <p className="text-sm">by Sial Sharmal</p>
                <p className="text-sm">16th Aug, 2024</p>
              </div>
            </div>
          </div>
          <div className="grid col-start-2 row-start-1  bg-orange-400  rounded-xl overflow-hidden">
            <div
              className="hover:[transform:scale3d(1.1,1.1,1)] [transition:transform_.5s_ease-in-out] flex items-end relative"
              style={{
                backgroundImage: "url(/images/art8.webp)",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              <div className="absolute top-0 left-0 [background:linear-gradient(rgba(0,0,0,0.08),_rgba(0,0,0,0.5))] w-full h-full rounded-xl"></div>
              <div className="text-white p-6 flex flex-col gap-1 relative">
                <p className="text-white">Art series</p>
                <p className=" font-semibold">How to collect art works</p>
                <p className="text-sm">by Augustine Bseila</p>
                <p className="text-sm">11th Aug, 2024</p>
              </div>
            </div>
          </div>
          <div className="grid col-start-3 col-end-6 row-start-1 bg-purple-400 rounded-xl overflow-hidden">
            <div
              className="hover:[transform:scale3d(1.1,1.1,1)] [transition:transform_.5s_ease-in-out] flex items-end relative"
              style={{
                backgroundImage: "url(/images/art9.webp)",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              <div className="absolute top-0 left-0 [background:linear-gradient(rgba(0,0,0,0.08),_rgba(0,0,0,0.5))] w-full h-full rounded-xl"></div>
              <div className="text-white p-6 flex flex-col gap-1 relative">
                <p className="text-white">Art series</p>
                <p className=" font-semibold">Art and commerce</p>
                <p className="text-sm">by Turmonu Khakal</p>
                <p className="text-sm">16th Aug, 2024</p>
              </div>
            </div>
          </div>
          <div className="grid col-start-2 col-span-2 bg-black rounded-xl overflow-hidden">
            <div
              className="hover:[transform:scale3d(1.1,1.1,1)] [transition:transform_.5s_ease-in-out] flex items-end relative"
              style={{
                backgroundImage: "url(/images/art10.webp)",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              <div className="absolute top-0 left-0 [background:linear-gradient(rgba(0,0,0,0.08),_rgba(0,0,0,0.5))] w-full h-full rounded-xl"></div>
              <div className="text-white p-6 flex flex-col gap-1 relative">
                <p className="text-white">Art series</p>
                <p className=" font-semibold">Discover priceless artworks</p>
                <p className="text-sm">by Reider Westen</p>
                <p className="text-sm">16th Aug, 2024</p>
              </div>
            </div>
          </div>
          <div className="grid row-start-2 col-start-4 col-end-6   bg-no-repeat rounded-xl overflow-hidden">
            <div
              className="hover:[transform:scale3d(1.1,1.1,1)] [transition:transform_.5s_ease-in-out] flex items-end relative"
              style={{
                backgroundImage: "url(/images/art12.webp)",
                backgroundSize: "cover",
                backgroundPosition: "left center",
              }}
            >
              <div className="absolute top-0 left-0 [background:linear-gradient(rgba(0,0,0,0.08),_rgba(0,0,0,0.5))] w-full h-full rounded-xl"></div>
              <div className="text-white p-6 flex flex-col gap-1 relative">
                <p className="text-white">Art series</p>
                <p className=" font-semibold">The Abstract and fiery</p>
                <p className="text-sm">by Ben Chieve</p>
                <p className="text-sm">23th Aug, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-32 flex justify-center">
        <span>Title of life</span>
      </section>

      <section className="my-32">
        <h3 className="text-3xl">Trending Artists</h3>ç
        <div className="grid grid-flow-col overflow-scroll gap-4  ">
          {authurData && authurData.length > 0
            ? authurData?.map((author, index) => (
                <Link
                  href={`/artists/${author._id}`}
                  className="grid grid-cols-subgrid rounded-xl"
                  key={author._id}
                >
                  <div className="w-64 h-44 rounded-xl">
                    <img
                      src={author?.imageUrl}
                      width={100}
                      height={100}
                      alt=""
                      className="h-full w-full object-cover rounded-xl bg-slate-100"
                    />
                  </div>

                  <div className="mt-4">
                    <div>
                      <h4>{author?.artist_name}</h4>
                      <p className="text-slate-500 text-sm">{`b.${new Date(
                        author?.date_of_birth
                      ).getFullYear()}`}</p>
                    </div>
                    <div></div>
                  </div>
                </Link>
              ))
            : ""}
        </div>
      </section>
    </div>
  );
};
