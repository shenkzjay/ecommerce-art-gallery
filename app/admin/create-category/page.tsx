"use client";

import React, { useEffect, useRef, useState } from "react";

export interface CategoryProps {
  _id: number;
  categoryName: string;
}

export default function CreateCategory() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [allCategories, setAllCategories] = useState<CategoryProps[]>([]);

  const handleCreateCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);

        const category = {
          categoryName: formData.get("category"),
        };

        if (!category) {
          return;
        }

        const newCategory = await fetch("http://localhost:8001/category", {
          headers: {
            "Content-Type": "application/json",
          },

          method: "POST",
          body: JSON.stringify(category),
        });

        const response = await newCategory.json();

        setAllCategories((prevCategory) => [...prevCategory, response.newCategory]);

        console.log(response, "category");
      }
    } catch (error) {
      console.log("error posting category " + error);
    }
  };

  const getAllCategories = async () => {
    try {
      const allCategories = await fetch("http://localhost:8001/category", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const response = await allCategories.json();
      console.log(response, "allcats");

      setAllCategories(response);
    } catch (error) {
      console.log("error fetching data from client " + error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      CreateProduct
      <form className="flex flex-col w-1/3 gap-4" ref={formRef}>
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id="category"
          name="category"
          title="category"
          placeholder="category"
        />

        <button className="bg-orange-400 px-4 py-2" onClick={(e) => handleCreateCategory(e)}>
          Create category
        </button>
      </form>
      <section>
        <h4>All categories</h4>
        {allCategories && allCategories.length > 0 ? (
          <ul>
            {allCategories.map((category, index) => (
              <li key={index}>{category.categoryName}</li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}
