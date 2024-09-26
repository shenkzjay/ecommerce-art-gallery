import { useQuery } from "@tanstack/react-query";

export const getSingleAuthor = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return useQuery({
    queryKey: ["fetchSingleAuthor", params?.id],
    queryFn: async () => {
      return await fetch(`http://localhost:8001/author/${id}`, {
        method: "GET",
      }).then((res) => res.json());
    },
  });
};

export const getSingleProductFromAuthor = ({
  singleAuthorId,
}: {
  singleAuthorId: { id: number };
}) => {
  const { id } = singleAuthorId;

  console.log(id, "singu");

  return useQuery({
    queryKey: ["fetchSingleAuthor", singleAuthorId?.id],
    queryFn: async () => {
      return await fetch(`http://localhost:8001/author/${id}`, {
        method: "GET",
      }).then((res) => res.json());
    },
  });
};
