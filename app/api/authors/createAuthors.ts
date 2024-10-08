import { useMutation } from "@tanstack/react-query";

export const createAuthor = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await fetch("http://localhost:8001/author", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
    },
  });
};
