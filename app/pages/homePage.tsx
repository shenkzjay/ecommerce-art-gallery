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
    <div>
      <h3>Product list</h3>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {isProductDetails && isProductDetails.length > 0
          ? isProductDetails.map((product, index) => (
              <li key={product._id} className="bg-[#f4f4f4] p-6">
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
