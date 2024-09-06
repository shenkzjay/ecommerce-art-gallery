"use client";

import React, { useEffect, useRef, useState } from "react";
import { getAuthors } from "../../actions/authorapicalls/getauthors";
import { getAllRoutes } from "../../actions/getAllRoutes";
import { SubmitHandler, useForm } from "react-hook-form";
import { createAuthor } from "@/app/actions/authorapicalls/createAuthors";
import { useQueryClient } from "@tanstack/react-query";

export interface authorTypes {
  _id: number;
  artist_name: string;
  email: string;
  phonenumber: string;
  bio: string;
  country: string;
  facebook: string;
  tiktok: string;
  twitter: string;
  instagram: string;
  profile_picture: string;
  artist_type: string;
  date_of_birth: Date;
}

interface SocialType {
  facebook: string;
  tiktok: string;
  twitter: string;
  instagram: string;
}

export interface authorDataTypes extends authorTypes {
  imageUrl: string;
}

export default function CreateAuthor() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [file, setFiles] = useState<File | null>(null);

  const [getAllAuthors, setAllAuthors] = useState<authorDataTypes[]>([]);
  const [currentAuthor, setCurrentAuthor] = useState<authorTypes>();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [socialId, setSocialId] = useState("");

  const createAuthorData = createAuthor();

  const { register, handleSubmit, setValue } = useForm<authorDataTypes>();

  const { data, isError, isLoading } = getAuthors();

  const queryClient = useQueryClient();

  console.log(data?.authors, "dats");

  //get all authors on page load
  useEffect(() => {
    if (data) {
      setAllAuthors(data?.authors);
    }
  }, [data]);

  //delete author function
  const handleDeleteAuthor = async (index: number) => {
    const id = getAllAuthors[index]._id;

    try {
      const deleteditem = await fetch(`http://localhost:8001/author/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await deleteditem.json();

      setAllAuthors((prevAuthors) => prevAuthors.filter((author) => author._id !== id));

      console.log(response);
    } catch (error) {
      console.error(`Error deleting author ${error}`);
    }
  };

  //create and update author
  const onSubmit: SubmitHandler<authorDataTypes> = async (data) => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      createAuthorData.mutate(formData, {
        onSuccess: async (formData) => {
          setAllAuthors((prev) => [...prev, formData?.authors]);
          queryClient.invalidateQueries({ queryKey: ["getAuthors"] });
        },

        onError: async (error) => {
          console.error("Error creating product:", error);
        },
      });
    }
  };

  return (
    <div className="">
      <div className="flex flex-row gap-20">
        <form
          className="flex flex-col md:w-1/3 gap-4"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          ref={formRef}
        >
          <legend>Create Author</legend>

          <input
            type="file"
            {...register("profile_picture")}
            className="border px-4 py-2 rounded-md"
            placeholder="profile_picture"
          />

          <input
            type="text"
            {...register("artist_name")}
            className="border px-4 py-2 rounded-md"
            placeholder="artist_name"
          />

          <input
            type="text"
            {...register("email")}
            className="border px-4 py-2 rounded-md"
            placeholder="email"
          />

          <input
            type="text"
            {...register("country")}
            className="border px-4 py-2 rounded-md"
            placeholder="nationality"
          />

          <input
            type="text"
            {...register("bio")}
            className="border px-4 py-2 rounded-md"
            placeholder="create bio"
          />

          <input
            type="text"
            {...register("phonenumber")}
            className="border px-4 py-2 rounded-md"
            placeholder="phonenumber"
          />

          <input
            type="text"
            {...register("artist_type")}
            className="border px-4 py-2 rounded-md"
            placeholder="artist_type"
          />

          <input
            type="date"
            {...register("date_of_birth")}
            className="border px-4 py-2 rounded-md"
            placeholder="date_of_birth"
          />

          <input
            type="text"
            {...register("facebook")}
            className="border px-4 py-2 rounded-md"
            placeholder="facebook url"
          />

          <input
            type="text"
            {...register("instagram")}
            className="border px-4 py-2 rounded-md"
            placeholder="instagram url"
          />

          <input
            type="text"
            {...register("twitter")}
            className="border px-4 py-2 rounded-md"
            placeholder="twitter url"
          />

          <input
            type="text"
            {...register("tiktok")}
            className="border px-4 py-2 rounded-md"
            placeholder="tiktok url"
          />

          <button type="submit" className="bg-orange-400 px-4 py-2">
            Create author
          </button>
        </form>
      </div>

      <section className="h-full">
        <h3>All authors</h3>

        <div className="overflow-x-scroll flex flex-col overflow-auto relative mr-12">
          <table className="w-full text-left border-collapse overflow-x-scroll ">
            <thead>
              <tr className=" text-sm">
                <th>Image</th>
                <th>Artistname</th>
                <th>Artist type</th>
                <th>Bio</th>
                <th>Date created</th>
                <th>Phone number</th>
                <th className="">Email</th>
                <th>Socials</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white p-0 w-full">
              {getAllAuthors && getAllAuthors.length > 0 ? (
                getAllAuthors.map((author, index) => (
                  <tr
                    key={author?._id}
                    className="even:bg-slate-100  text-sm border-b border-[#F0F2F5] w-full"
                  >
                    <td className="py-2">
                      <img
                        src={author?.imageUrl ? author?.imageUrl : ""}
                        width={100}
                        height={100}
                        alt=""
                        className="w-50 h-50 object-cover object-top"
                      />
                    </td>
                    <td className="py-2">{author?.artist_name}</td>
                    <td className="py-2">{author?.artist_type}</td>
                    <td className="py-2">{author?.bio}</td>
                    <td className="py-2">{new Date(author?.date_of_birth).toDateString()}</td>
                    <td className="py-2">{author?.phonenumber}</td>
                    <td className="text-wrap">{author?.email}</td>
                    <td className="flex flex-col py-2">
                      <span>{author?.facebook}</span>
                      <span>{author?.instagram}</span>
                      <span>{author?.tiktok}</span>
                      <span>{author?.twitter}</span>
                    </td>

                    <td>
                      <button className="px-4 py-2 bg-orange-400">edit</button>
                    </td>

                    <td>
                      <button
                        className="px-4 py-2 bg-red-400"
                        onClick={() => handleDeleteAuthor(index)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>no new friends</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
