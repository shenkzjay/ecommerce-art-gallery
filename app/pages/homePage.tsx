"use client";

import { getAllRoutes } from "../admin/actions/getAllRoutes";
import { useEffect, useState } from "react";
import { ProductTypes } from "../admin/create-product/page";

export const HomePage = () => {
  const [isProductDetails, setIsProductDetails] = useState<ProductTypes[]>([]);

  console.log(isProductDetails, "pro");

  const getAllProductDetails = async () => {
    const alldetails = await getAllRoutes();

    if (!alldetails) {
      return console.log("no product found");
    }

    const product = alldetails.products;

    setIsProductDetails(product);
  };

  useEffect(() => {
    getAllProductDetails();
  }, []);

  //   getAllProductDetails();
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
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {isProductDetails && isProductDetails.length > 0
          ? isProductDetails.map((product, index) => (
              <li key={product._id} className="bg-[#f4f4f4] p-6 rounded-xl">
                <img src={product.imageUrl} width={100} height={100} alt="" />
                <p className="font-bold">{product.product_title}</p>
                <p>{product.product_category.categoryName}</p>

                <em>
                  <span>{product.product_author.artist_name}</span>
                </em>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};
