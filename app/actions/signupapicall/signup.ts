import { useMutation } from "@tanstack/react-query";
import { use } from "react";

export const SignUpUser = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await fetch("", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
    },
  });
};
