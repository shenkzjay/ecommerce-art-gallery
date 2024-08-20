"use client";

import { getAllRoutes } from "../actions/getAllRoutes";
import { useEffect, useState } from "react";
import { ProductTypes } from "../admin/create-product/page";
import Link from "next/link";

export const HomePage = () => {
  const { data, isError, isLoading } = getAllRoutes();

  if (!data) {
    console.log("no data");
  }

  const productData = data?.products as ProductTypes[];

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
      imageBg: "/126.jpg",
    },

    {
      id: 2,
      imageTitle: "Shebang 008",
      imageButtonText: "Click to reveal",
      imageAuthor: "Title of garbage",
      imageDesc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.`,
      imageBg: "/10.png",
    },

    {
      id: 3,
      imageTitle: "Shebang 008",
      imageButtonText: "Click to reveal",
      imageAuthor: "Title of garbage",
      imageDesc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. .`,
      imageBg: "/5.png",
    },

    {
      id: 4,
      imageTitle: "Shebang 008",
      imageButtonText: "Click to reveal",
      imageAuthor: "Title of garbage",
      imageDesc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. `,
      imageBg: "/126.jpg",
    },

    {
      id: 5,
      imageTitle: "Shebang 008",
      imageButtonText: "Click to reveal",
      imageAuthor: "Title of garbage",
      imageDesc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit`,
      imageBg: "/20.jpeg",
    },
  ];

  const handleToggleIMageButton = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mx-auto w-[85vw]">
      <nav className="flex flex-row items-center justify-between">
        <div>Loggo</div>

        <div className="my-10">
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
              <div className="absolute top-0 left-0 [background:linear-gradient(rgba(0,0,0,0.2),_rgba(0,0,0,0.9))] w-full h-full -z-10 rounded-xl"></div>
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

      <section className="mt-24">
        <h3 className="text-3xl ">Featured Artworks</h3>
        <span className="flex w-full h-[.05rem] bg-slate-200  mb-10 mt-2"></span>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 h-full">
          {productData && productData.length > 0
            ? productData.map((product, index) => (
                <li key={product._id} className="  h-full mb-6">
                  <Link href={`/artworks/${product._id}`} className="flex flex-col gap-2">
                    <div className="overflow-hidden w-full rounded-xl">
                      <img
                        src={product.imageUrl ? product.imageUrl : ""}
                        width={100}
                        height={100}
                        alt=""
                        className="w-full h-64 object-cover  hover:scale-110"
                      />
                    </div>
                    <div className="text-[14px]">
                      <p className="font-semibold">{product.product_title}</p>
                      <p className="text-slate-500">{product.product_category.categoryName}</p>

                      <p className="text-slate-500">{product.product_author.artist_name}</p>

                      <p className="mt-2 font-semibold">
                        {product.product_price ? `$${product.product_price}` : ""}
                      </p>
                    </div>
                  </Link>
                </li>
              ))
            : ""}
        </ul>
      </section>

      <section>
        <h3>Weekend Editorials</h3>
      </section>
    </div>
  );
};
