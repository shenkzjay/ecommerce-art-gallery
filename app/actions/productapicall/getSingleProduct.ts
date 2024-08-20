import { ProductTypes } from "@/app/admin/create-product/page";
import { useQuery } from "@tanstack/react-query";

export async function generateStaticparams() {
  const products: ProductTypes[] = await fetch(`http://localhost:8001/product/`, {
    method: "GET",
  }).then((res) => res.json());

  return products.map((product) => ({
    id: product._id,
  }));
}

export default function getSingleProduct({ params }: { params: { id: string } }) {
  const { id } = params;
  return useQuery({
    queryKey: ["fetchSingleProduct", params?.id],
    queryFn: async () => {
      return await fetch(`http://localhost:8001/product/${id}`, {
        method: "GET",
      }).then((res) => res.json());
    },
  });
}
