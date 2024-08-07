"use client";

import { useEffect, useState, useRef } from "react";
import { authorTypes } from "../create-author/page";
import { getAllRoutes } from "../actions/getAllRoutes";
import { CategoryProps } from "../create-category/page";

export interface ProductTypes {
  _id: number;
  product_title: string;
  product_about: string;
  product_image: string;
  product_date: Date;
  product_author: authorTypes;
  product_category: CategoryProps;
}

export default function CreateProduct() {
  const [allauthors, setAllAuthors] = useState<authorTypes[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryProps[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectAuthor, setSelectAuthor] = useState("");
  const [allProduct, setAllProduct] = useState<ProductTypes[]>([]);

  console.log("allproducts", allProduct);

  const handleGetAllAuthors = async () => {
    const allRoutes = await getAllRoutes();

    const authors = allRoutes.authors;

    const categories = allRoutes.categories;

    const products = allRoutes.products;

    console.log(authors, "authors");

    setAllAuthors(authors);
    setAllCategories(categories);
    setAllProduct(products);
  };

  useEffect(() => {
    handleGetAllAuthors();
  }, []);

  const handleCreateProduct = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const productData = {
        product_title: formData.get("product_title"),
        product_about: formData.get("product_about"),
        product_date: formData.get("product_date"),
        product_category: selectCategory,
        product_author: selectAuthor,
        product_image: JSON.stringify(fileUpload),
      };

      console.log(productData, "productData");

      const newProduct = await fetch("http://localhost:8001/product", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(productData),
      });

      const response = await newProduct.json();

      setAllProduct((prev) => [...prev, response.product]);

      console.log(response, "products");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileUpload(e.target.files[0]);
    }
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
  };

  const handleSelectAuthor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectAuthor(e.target.value);
  };

  console.log(selectAuthor, selectCategory);
  return (
    <div>
      CreateProduct
      <form className="flex flex-col md:w-1/3 gap-4" ref={formRef}>
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id="product_title"
          name="product_title"
          title="product_title"
          placeholder="product title"
        />
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id="product_about"
          name="product_about"
          title="product_about"
          placeholder="product about"
        />
        <input
          type="date"
          className="border px-4 py-2 rounded-md"
          id="product_date"
          name="product_date"
          title="product_date"
          placeholder="product date"
        />
        <select className="border px-4 py-2" onChange={(e) => handleSelectCategory(e)}>
          <option value="">Select Category</option>
          {allCategories && allCategories.length > 0
            ? allCategories.map((category, index) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))
            : ""}
        </select>

        <select className="border px-4 py-2" onChange={(e) => handleSelectAuthor(e)}>
          <option value="">Select author</option>
          {allauthors && allauthors.length > 0
            ? allauthors.map((author, index) => {
                return (
                  <option key={author._id} value={author?._id}>
                    {author?.artist_name}
                  </option>
                );
              })
            : ""}
        </select>
        <input
          type="file"
          className="border px-4 py-2 rounded-md"
          id="product_image"
          name="product_image"
          title="product_image"
          placeholder="product_image"
          onChange={(e) => handleImageUpload(e)}
        />
        <button className="bg-orange-400 px-4 py-2" onClick={(e) => handleCreateProduct(e)}>
          Create products
        </button>
      </form>
      <section>
        <h4>All products</h4>
        <ul className="grid gap-4">
          {allProduct && allProduct.length > 0
            ? allProduct.map((product, index) => (
                <li
                  key={product._id}
                  className="flex flex-col gap-4 border p-4 bg-[#f4f4f4] rounded-[20px]"
                >
                  <p className="text-lg font-semibold">{product.product_title}</p>
                  <p className="text-slate-400">{product?.product_author?.artist_name}</p>
                  <p>{product?.product_category?.categoryName}</p>
                </li>
              ))
            : ""}
        </ul>
      </section>
    </div>
  );
}
