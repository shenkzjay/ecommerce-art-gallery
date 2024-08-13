import { useQuery } from "@tanstack/react-query";

export const getAllRoutes = () => {
  return useQuery({
    queryKey: ["getallroutes"],
    queryFn: () =>
      fetch("http://localhost:8001/getall", {
        method: "GET",
      }).then((res) => res.json()),
  });
};
