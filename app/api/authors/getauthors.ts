import { useQuery } from "@tanstack/react-query";

// export const getAuthors = async () => {
//   try {
//     const response = await fetch("http://localhost:8001/author", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "GET",
//       //   cache: "force-cache",
//     });

//     const allauthors = await response.json();

//     console.log(allauthors);

//     return allauthors;
//   } catch (error) {
//     console.error("error occured trying to fetch all authors " + error);
//   }
// };

export const getAuthors = () => {
  return useQuery({
    queryKey: ["getAuthors"],
    queryFn: async () => {
      return await fetch("http://localhost:8001/author", {
        method: "GET",
      }).then((res) => res.json());
    },
  });
};
