import { useMutation } from "@tanstack/react-query";

export const SavedArts = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await fetch("", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
    },
  });
};
