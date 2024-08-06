"use client";

import { useRef } from "react";

export default function Home() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const data = {
        fullname: formData.get("fullname"),
        address: formData.get("address"),
        email: formData.get("email"),
        phonenumber: formData.get("phonenumber"),
        country: formData.get("country"),
      };

      console.log(data, "formdata");

      const response = await fetch("http://localhost:8001/user", {
        headers: {
          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify(data),
      });

      const users = await response.json();

      console.log(users, "users");
    }
  };
  return (
    <main className="">
      <form ref={formRef} className="flex flex-col gap-4 md:w-1/3">
        <input
          type="text"
          id="fullname"
          title="fullname"
          name="fullname"
          className="border px-4 py-2"
        />
        <input type="text" id="email" title="email" name="email" className="border px-4 py-2" />
        <input
          type="text"
          id="address"
          title="address"
          name="address"
          className="border px-4 py-2"
        />
        <input
          type="text"
          id="country"
          title="country"
          name="country"
          className="border px-4 py-2"
        />
        <input
          type="text"
          id="phonenumber"
          title="phonenumber"
          name="phonenumber"
          className="border px-4 py-2"
        />
        <button onClick={(e) => handleSubmit(e)} className="bg-orange-400  px-4 py-2">
          Submit
        </button>
      </form>
    </main>
  );
}
