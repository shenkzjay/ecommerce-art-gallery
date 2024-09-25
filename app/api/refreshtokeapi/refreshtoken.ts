import { useQuery } from "@tanstack/react-query";

export const refreshToken = () => {
  return useQuery({
    queryKey: ["refreshtoken"],
    queryFn: async () => {
      return await fetch("http://localhost:8001/refreshtoken", {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json());
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
