"use client";

import { useEffect, useState } from "react";
import { getAuthors } from "@/app/admin/actions/getauthors";
import { authorTypes } from "../create-author/page";

export default function CreateProduct() {
  const [allauthors, setAllAuthors] = useState<authorTypes[]>([]);

  const handleGetAllAuthors = async () => {
    const authors = await getAuthors();

    setAllAuthors(authors);
  };

  useEffect(() => {
    handleGetAllAuthors();
  }, []);

  return (
    <div>
      CreateProduct
      <form className="flex flex-col md:w-1/3 gap-4">
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id=""
          name=""
          title=""
          placeholder="product title"
        />
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id=""
          name=""
          title=""
          placeholder="product about"
        />
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id=""
          name=""
          title=""
          placeholder="product date created"
        />
        <select className="border px-4 py-2">
          <option value="">Select Category</option>
          <option></option>
        </select>

        <select className="border px-4 py-2">
          <option value="">Select author</option>
          {allauthors && allauthors.length > 0
            ? allauthors.map((author, index) => {
                return <option key={author._id}>{author?.artist_name}</option>;
              })
            : ""}
        </select>
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id=""
          name=""
          title=""
          placeholder=""
        />
        <button className="bg-orange-400 px-4 py-2">Create products</button>
      </form>
    </div>
  );
}
