import { LoginPropTypes } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const SignInUser = () => {
  return useMutation({
    mutationFn: async (data: LoginPropTypes) => {
      console.log(data, "signin");
      return await fetch("http://localhost:8001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }).then((res) => res.json());
    },
  });
};
