"use client";

import React, { useEffect, useRef, useState } from "react";
import { getAuthors } from "../actions/getauthors";
import { getAllRoutes } from "../actions/getAllRoutes";

export interface authorTypes {
  _id: number;
  artist_name: string;
  email: string;
  phonenumber: string;
  bio: string;
  social_media_links: string;
  profile_picture: string;
  artist_type: string;
  date_of_birth: Date;
}

export default function CreateAuthor() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [file, setFiles] = useState<File | null>(null);

  const [getAllAuthors, setAllAuthors] = useState<authorTypes[]>([]);
  const [currentAuthor, setCurrentAuthor] = useState<authorTypes>();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [inputChange, setInputChange] = useState<authorTypes>({
    _id: currentAuthor?._id as number,
    bio: currentAuthor?.bio as string,
    artist_name: currentAuthor?.artist_name as string,
    email: "",
    phonenumber: currentAuthor?.phonenumber as string,
    artist_type: currentAuthor?.artist_type as string,
    social_media_links: currentAuthor?.social_media_links as string,
    date_of_birth: currentAuthor?.date_of_birth as Date,
    profile_picture: currentAuthor?.profile_picture as string,
  });

  // console.log(inputChange, "inputchange");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const authorData = {
        artist_name: formData.get("artistname"),
        profile_picture: file?.name,
        email: formData.get("email"),
        phonenumber: formData.get("phonenumber"),
        bio: formData.get("bio"),
        social_medial_links: formData.get("social_media_links"),
        artist_type: formData.get("artist_type"),
        date_of_birth: formData.get("date_of_birth"),
      };

      const response = await fetch("http://localhost:8001/author", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(authorData),
      });

      const data = await response.json();

      // handleGetAllAuthors();

      setAllAuthors((prevAuthors) => [...prevAuthors, data.newAuthor]);

      console.log(data, "authordata");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files[0]);
    }
  };

  const handleGetAllAuthors = async () => {
    const allauthors = await getAuthors();

    setAllAuthors(allauthors);

    console.log(allauthors, "getting all authors");
  };

  useEffect(() => {
    handleGetAllAuthors();
  }, []);

  const handleUpdateAuthor = (index: number) => {
    console.log(index, "index");

    if (dialogRef.current) {
      dialogRef.current.showModal();
      const author = getAllAuthors[index];
      setCurrentAuthor(author);
      setCurrentIndex(index);
    }
  };

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

  const handleCloseDialog = () => {
    dialogRef.current?.close();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputChange({
      ...inputChange,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitUpdates = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(inputChange, "input");
    console.log(currentIndex);

    if (currentIndex !== null) {
      const id = getAllAuthors[currentIndex]._id;

      const response = await fetch(`http://localhost:8001/author/update/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(inputChange),
      });

      const data = await response.json();

      setAllAuthors((prev) => {
        const updatedAuthors = [...prev];
        updatedAuthors[currentIndex] = { ...updatedAuthors[currentIndex], ...data };
        return updatedAuthors;
      });

      dialogRef.current?.close();

      console.log(data, "data");
      console.log(currentAuthor, "currentAuthor");
    }
  };

  return (
    <div>
      <dialog ref={dialogRef}>
        <h1>H2</h1>
        <p>{currentAuthor?.artist_name}</p>

        <form className="flex flex-col  gap-4">
          <legend>Create Author</legend>
          <input
            type="file"
            className="border px-4 py-2 rounded-md"
            id="profile_picture"
            name="profile_picture"
            title="profile_picture"
            defaultValue={currentAuthor?.profile_picture}
            onChange={(e) => handleFileChange(e)}
          />
          <input
            type="text"
            className="border px-4 py-2 rounded-md"
            id="artistname"
            name="artist_name"
            title="artistname"
            placeholder="Artist name"
            defaultValue={currentAuthor?.artist_name}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            className="border px-4 py-2 rounded-md"
            id="email"
            name="email"
            title="email"
            placeholder="email"
            defaultValue={currentAuthor?.email}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            className="border px-4 py-2 rounded-md"
            id="bio"
            name="bio"
            title="bio"
            placeholder="create bio"
            defaultValue={currentAuthor?.bio}
            onChange={(e) => handleInputChange(e)}
          />

          <input
            type="text"
            className="border px-4 py-2 rounded-md"
            id="phonenumber"
            name="phonenumber"
            title="phonenumber"
            placeholder="phonenumber"
            defaultValue={currentAuthor?.phonenumber}
            onChange={(e) => handleInputChange(e)}
          />

          <input
            type="text"
            className="border px-4 py-2 rounded-md"
            id="platform"
            name="platform"
            title="platform"
            placeholder="platform"
            defaultValue={currentAuthor?.social_media_links}
            onChange={(e) => handleInputChange(e)}
          />

          <input
            type="text"
            className="border px-4 py-2 rounded-md"
            id="url"
            name="url"
            title="url"
            placeholder="url"
            defaultValue={currentAuthor?.social_media_links}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            className="border px-4 py-2 rounded-md"
            id="artist_type"
            name="artist_type"
            title="artist_type"
            placeholder="artist_type"
            defaultValue={currentAuthor?.artist_type}
            onChange={(e) => handleInputChange(e)}
          />

          <input
            type="date"
            className="border px-4 py-2 rounded-md"
            id="date_of_birth"
            name="date_of_birth"
            title="date_of_birth"
            placeholder="date_of_birth"
            defaultValue={
              currentAuthor?.date_of_birth
                ? new Date(currentAuthor?.date_of_birth).toISOString().split("T")[0]
                : ""
            }
          />

          <button onClick={(e) => handleSubmitUpdates(e)} className="bg-orange-400 px-4 py-2">
            update author
          </button>
        </form>
        <button onClick={handleCloseDialog}>Close</button>
      </dialog>
      <form className="flex flex-col md:w-1/3 gap-4" ref={formRef} encType="multipart/form-data">
        <legend>Create Author</legend>
        <input
          type="file"
          className="border px-4 py-2 rounded-md"
          id="profile_picture"
          name="profile_picture"
          title="profile_picture"
          onChange={(e) => handleFileChange(e)}
        />
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id="artistname"
          name="artistname"
          title="artistname"
          placeholder="Artist name"
        />
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id="email"
          name="email"
          title="email"
          placeholder="email"
        />
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id="bio"
          name="bio"
          title="bio"
          placeholder="create bio"
        />

        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id="phonenumber"
          name="phonenumber"
          title="phonenumber"
          placeholder="phonenumber"
        />

        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id="platform"
          name="platform"
          title="platform"
          placeholder="platform"
        />

        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id="url"
          name="url"
          title="url"
          placeholder="url"
        />
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id="artist_type"
          name="artist_type"
          title="artist_type"
          placeholder="artist_type"
        />

        <input
          type="date"
          className="border px-4 py-2 rounded-md"
          id="date_of_birth"
          name="date_of_birth"
          title="date_of_birth"
          placeholder="date_of_birth"
        />

        <button onClick={(e) => handleSubmit(e)} className="bg-orange-400 px-4 py-2">
          Create author
        </button>
      </form>

      <section>
        <h3>All authors</h3>

        <ul>
          {getAllAuthors && getAllAuthors.length > 0
            ? getAllAuthors.map((author, index) => (
                <li key={author._id} className="bg-slate-50 p-4 flex justify-between">
                  <div>
                    <p>{author._id}</p>
                    <p>{author.artist_name}</p>
                    <p>{author.artist_type}</p>
                    <p>{author.bio}</p>
                    <p>{new Date(author.date_of_birth).toDateString()}</p>
                    <p>{author.phonenumber}</p>
                    <p>{author.email}</p>
                    <span>{author.social_media_links}</span>

                    <p>{author.phonenumber}</p>
                  </div>

                  <div className="flex flex-row gap-6">
                    <button
                      className="px-4 py-2 bg-orange-400"
                      onClick={() => handleUpdateAuthor(index)}
                    >
                      edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-400"
                      onClick={() => handleDeleteAuthor(index)}
                    >
                      delete
                    </button>
                  </div>
                </li>
              ))
            : ""}
        </ul>
      </section>
    </div>
  );
}
