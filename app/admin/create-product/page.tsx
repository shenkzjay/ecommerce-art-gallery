"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { useEffect, useState, useRef } from "react";
import { authorTypes } from "../create-author/page";
import { getAllRoutes } from "../../actions/getAllRoutes";
import { CategoryProps } from "../create-category/page";
import { DeleteProduct } from "../../actions/productapicall/deleteProduct.";
import { createProduct } from "../../actions/productapicall/createProduct";
import { updateProduct } from "../../actions/productapicall/updateProduct";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

export interface ProductTypes {
  _id: number;
  product_title: string;
  product_about: string;
  product_image: string;
  product_date: string;
  product_author: authorTypes;
  product_category: CategoryProps;
  imageUrl: string;
}

export interface ProductDataTypes {
  product_title: string;
  product_about: string;
  product_image: string;
  product_date: string;
  product_author: authorTypes;
  product_category: CategoryProps;
}

export default function CreateProduct() {
  const [allauthors, setAllAuthors] = useState<authorTypes[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryProps[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [fileUpload, setFileUpload] = useState<string | Blob>("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectAuthor, setSelectAuthor] = useState("");
  const [allProduct, setAllProduct] = useState<ProductTypes[]>([]);
  const deleteButtonRef = useRef<HTMLDialogElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes | null>(null);

  const { register, handleSubmit, setValue } = useForm<ProductTypes>();

  const { data, isError, isLoading } = getAllRoutes();

  const createnewProduct = createProduct();

  const deleteProduct = DeleteProduct();

  const updateProducts = updateProduct();

  const queryClient = useQueryClient();

  const authors = data?.authors;

  const categories = data?.categories;

  const products = data?.products;

  console.log(allauthors);

  useEffect(() => {
    if (data) {
      setAllAuthors(authors);
      setAllProduct(products);
      setAllCategories(categories);
    }
  });

  console.log(allauthors, "allauthors");

  //create product and update form values
  // const handleCreateProduct = async (e: React.MouseEvent) => {
  //   e.preventDefault();

  //   if (formRef.current) {
  //     const formData = new FormData(formRef.current);

  //     formData.append("product_category", selectCategory);
  //     formData.append("product_author", selectAuthor);

  //     if (selectedProduct && currentIndex !== null) {
  //       const selectedProduct_id = allProduct[currentIndex]._id;
  //       updateProducts.mutate(
  //         { formData, selectedProduct_id },
  //         {
  //           onSuccess: () => {
  //             setSelectedProduct(null);
  //           },
  //         }
  //       );
  //     } else {
  //       createnewProduct.mutate(formData, {
  //         onSuccess: async (data) => {
  //           setAllProduct((prev) => [...prev, data.product]);
  //           queryClient.invalidateQueries({ queryKey: ["getallroutes"] });

  //           formRef.current?.reset();
  //         },
  //         onError: async (error) => {
  //           console.error("Error creating product:", error);
  //         },
  //       });
  //     }
  //   }
  // };

  //set selected category from dropdown
  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
  };

  //set selected author from dropdown
  const handleSelectAuthor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectAuthor(e.target.value);
  };

  //open delete modal
  const handleOpenDeleteProductModal = (index: number) => {
    const product = allProduct[index];
    setSelectedProduct(product);
    setCurrentIndex(index);

    if (deleteButtonRef.current) {
      deleteButtonRef?.current?.showModal();
    }
  };

  //delete product
  const handleDeleteProduct = async () => {
    if (currentIndex !== null) {
      const id = allProduct[currentIndex]._id;

      deleteProduct.mutate(id, {
        onSuccess: () => {
          setAllProduct((prevProducts) => prevProducts.filter((product) => product._id !== id));

          queryClient.invalidateQueries({ queryKey: ["getallroutes"] });
        },
      });

      handleCloseModal();
    }
  };

  //close delete modal
  const handleCloseModal = () => {
    if (deleteButtonRef.current) {
      deleteButtonRef.current.close();
      setSelectedProduct(null);
    }
  };

  const handleUpdateProduct = (product: ProductTypes, index: number) => {
    setSelectedProduct(product);
    setCurrentIndex(index);

    const formattedDate = product.product_date
      ? new Date(product.product_date).toISOString().split("T")[0]
      : "";

    setValue("product_title", product?.product_title);
    setValue("product_about", product?.product_about);
    setValue("product_date", formattedDate);
    setValue("product_image", product?.product_image);
  };

  const onSubmit: SubmitHandler<ProductTypes> = (data) => {
    console.log(data, "data");

    // formData.append("product_image", data.product_image[0]);
    // formData.append("product_title", data.product_title);
    // formData.append("product_about", data.product_about);
    // formData.append("product_author", JSON.stringify(data.product_author));
    // formData.append("product_date", JSON.stringify(data.product_date));
    // formData.append("product_category", JSON.stringify(data.product_category));

    // if (data.product_image && data.product_image.length > 0) {
    //   formData.append("product_image", data.product_image[0]);
    // }

    // if (data.product_title) {
    //   formData.append("product_title", data.product_title);
    // }

    // if (data.product_about) {
    //   formData.append("product_about", data.product_about);
    // }

    // if (data.product_author) {
    //   formData.append("product_author", JSON.stringify(data.product_author));
    // }

    // if (data.product_date) {
    //   formData.append("product_date", data.product_date);
    // }

    // if (data.product_category) {
    //   formData.append("product_category", JSON.stringify(data.product_category));
    // }

    const productData = {
      product_title: data?.product_title,
      product_author: data?.product_author,
      product_category: data?.product_category,
      product_date: data?.product_date,
      product_about: data?.product_about,
      product_image: data?.product_image[0],
    };

    if (selectedProduct && currentIndex !== null) {
      const selectedProduct_id = allProduct[currentIndex]._id;
      updateProducts.mutate(
        { productData, selectedProduct_id },
        {
          onSuccess: () => {
            setSelectedProduct(null);
          },
        }
      );
    } else {
      createnewProduct.mutate(productData, {
        onSuccess: async (productData) => {
          setAllProduct((prev) => [...prev, productData.product]);
          queryClient.invalidateQueries({ queryKey: ["getallroutes"] });
        },
        onError: async (error) => {
          console.error("Error creating product:", error);
        },
      });
    }
  };

  return (
    <div>
      CreateProduct
      <form
        className="flex flex-col md:w-1/3 gap-4"
        // ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <input
          {...register("product_title", { required: true })}
          className="border px-4 py-2 rounded-md"
          placeholder="product title"
        />
        <input
          {...register("product_about", { required: true })}
          placeholder="product about"
          className="border px-4 py-2 rounded-md"
        />
        <input type="date" {...register("product_date")} className="border px-4 py-2 rounded-md" />

        <select {...register("product_category")} className="border px-4 py-2 rounded-md">
          <option value="">Select Category</option>
          {allCategories && allCategories.length > 0
            ? allCategories.map((category, index) => (
                <option key={category?._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))
            : ""}
        </select>

        <select {...register("product_author")} className="border px-4 py-2 rounded-md">
          <option value="">Select author</option>
          {allauthors && allauthors.length > 0
            ? allauthors.map((author, index) => (
                <option key={author?._id} value={author?._id}>
                  {author?.artist_name}
                </option>
              ))
            : ""}
        </select>

        <input
          type="file"
          {...register("product_image")}
          className="border px-4 py-2 rounded-md"
          name="product_image"
        />

        <button
          type="submit"
          className={`${selectedProduct ? "bg-blue-400" : "bg-orange-400"} px-4 py-2`}
        >
          {selectedProduct ? "Update Product" : "Create Product"}
        </button>

        {selectedProduct && (
          <button className="px-4 py-2 bg-red-400" onClick={() => setSelectedProduct(null)}>
            Cancel
          </button>
        )}
      </form>
      <section>
        <h4>All products</h4>
        <ul className="grid gap-4">
          {allProduct && allProduct.length > 0
            ? allProduct.map((product, index) => (
                <li
                  key={product?._id}
                  className="flex flex-row justify-between gap-4 border p-4 bg-[#f4f4f4] rounded-[20px]"
                >
                  <div>
                    <div className="w-24 h-24">
                      <img
                        src={product?.imageUrl ? product?.imageUrl : ""}
                        width={100}
                        height={100}
                        alt=""
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <p className="text-lg font-semibold">{product?.product_title}</p>
                    <p className="text-slate-400">{product?.product_author?.artist_name}</p>
                    <p>{product?.product_category?.categoryName}</p>
                  </div>
                  <div className="flex flex-row gap-6">
                    <button
                      className="py-2 px-6 bg-green-400 active:scale-[.9]"
                      onClick={() => handleUpdateProduct(product, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="py-2 px-4 bg-orange-400 active:scale-[.9]"
                      onClick={() => handleOpenDeleteProductModal(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            : ""}
        </ul>
      </section>
      <dialog ref={deleteButtonRef} className=" gap-4 p-6">
        <div className="flex flex-col gap-4">
          <div>
            <p>
              Do you want to delete <i>{selectedProduct?.product_title}</i>
            </p>
          </div>
          <div className="flex gap-6">
            <button onClick={handleDeleteProduct} className="px-6 py-2 bg-blue-400">
              Yes
            </button>
            <button onClick={handleCloseModal} className="px-6 py-2 bg-red-400">
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
