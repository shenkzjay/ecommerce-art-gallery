import { ProductDataTypes } from "@/app/admin/create-product/page";
import { useMutation } from "@tanstack/react-query";

export const createProduct = () => {
  return useMutation({
    mutationFn: async (productData: ProductDataTypes) => {
      console.log(productData, "productData");

      return await fetch("http://localhost:8001/product", {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
  });
};
