import { useMutation } from "@tanstack/react-query";
import { SignupTypes } from "@/types/types";

export const SignUpUser = () => {
  return useMutation({
    mutationFn: async (data: SignupTypes) => {
      console.log(data, "reactquery");
      return await fetch("http://localhost:8001/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
    },
  });
};
