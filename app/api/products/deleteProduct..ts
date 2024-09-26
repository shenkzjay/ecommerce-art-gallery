import { useMutation } from "@tanstack/react-query";

export const DeleteProduct = () => {
  return useMutation({
    mutationFn: async (id: number) =>
      await fetch(`http://localhost:8001/product/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  });
};
