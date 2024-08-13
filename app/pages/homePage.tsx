"use client";

import { getAllRoutes } from "../actions/getAllRoutes";
import { useEffect, useState } from "react";
import { ProductTypes } from "../admin/create-product/page";

export const HomePage = () => {
  const { data, isError, isLoading } = getAllRoutes();

  const productData = data?.products as ProductTypes[];

  console.log(data, "hello");

  return (
    <div className="mx-auto w-[85vw]">
      <h3>Product list</h3>
      <div className="">
        <label className="sr-only border">Search for products</label>
        <input
          type="search"
          placeholder="Search for products"
          className=" px-4 py-2 w-1/2 bg-[#f6f6f6] rounded-xl my-6"
        />
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 h-full">
        {productData && productData.length > 0
          ? productData.map((product, index) => (
              <li key={product._id} className="bg-[#f4f4f4]  rounded-xl h-full">
                <div className="overflow-hidden">
                  <img
                    src={product.imageUrl ? product.imageUrl : ""}
                    width={100}
                    height={100}
                    alt=""
                    className="w-full h-64 object-contain object-top hover:scale-110"
                  />
                </div>
                <div className="p-2">
                  <p className="font-bold">{product.product_title}</p>
                  <p>{product.product_category.categoryName}</p>
                  <em>
                    <span>{product.product_author.artist_name}</span>
                  </em>
                </div>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};
