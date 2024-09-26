import { ProductDataTypes } from "@/app/admin/create-product/page";
import { useMutation } from "@tanstack/react-query";

// export const updateProduct = async (formData: FormData, selectedProduct_id: number) => {
//   try {
//     const updateProduct = await fetch(
//       `http://localhost:8001/product/update/${selectedProduct_id}`,
//       {
//         method: "PUT",
//         body: formData,
//       }
//     );

//     const response = await updateProduct.json();

//     console.log(response, "update");

//     if (!response) {
//       throw new Error("Field to update product from endpoint");
//     }

//     return response.product;
//   } catch (error) {
//     return console.log(`Error trying to update product details from endpoint ${error}`);
//   }
// };

export const updateProduct = () => {
  return useMutation({
    mutationFn: async ({
      formData,
      selectedProduct_id,
    }: {
      formData: FormData;
      selectedProduct_id: number;
    }) => {
      console.log("updating product with id" + selectedProduct_id);

      return fetch(`http://localhost:8001/product/update/${selectedProduct_id}`, {
        method: "PUT",
        body: formData,
      }).then((res) => res.json());
    },
  });
};
