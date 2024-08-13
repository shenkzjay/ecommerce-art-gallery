import { useMutation } from "@tanstack/react-query";

export const createProduct = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await fetch("http://localhost:8001/product", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
    },
  });
};
