import { useQuery } from "@tanstack/react-query";

export const getAllRoutes = () => {
  return useQuery({
    queryKey: ["getallroutes"],
    queryFn: async () =>
      await fetch("http://localhost:8001/getall", {
        method: "GET",
      }).then((res) => res.json()),
  });
};
