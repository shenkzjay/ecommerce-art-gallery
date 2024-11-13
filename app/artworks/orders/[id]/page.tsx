"use client";

import { ProductTypes } from "@/app/admin/create-product/page";
import getSingleProduct from "@/app/api/products/getSingleProduct";
import { useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function ProductOrder() {
  const searchParams = usePathname();

  const searh = searchParams.split("/").splice(3, 3).join("");

  const params = {
    id: searh,
  };

  const { data } = getSingleProduct({ params });

  const singleProduct = data as ProductTypes;

  const getPrice = singleProduct?.product_price;
  const getTitle = singleProduct?.product_title;

  const [paymentTabActive, setPaymentTabActive] = useState(true);
  const [reviewTabActive, setreviewTabActive] = useState(true);

  const onLoadRef = useRef<HTMLInputElement | null>(null);
  const paymentRef = useRef<HTMLInputElement | null>(null);
  const reviewRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (onLoadRef.current) {
      onLoadRef.current.checked = true;
    }
  }, []);

  const handleSubmitShippingAdress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPaymentTabActive(false);

    if (paymentRef.current) {
      paymentRef.current.checked = true;
    }
  };

  const handleSubmitPaymentInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setreviewTabActive(false);

    if (reviewRef.current) {
      reviewRef.current.checked = true;
    }
  };

  console.log({ data });

  console.log({ searh });
  return (
    <section className="w-[80vw] mx-auto">
      <div className="mt-10 ">
        <div className="flex flex-row justify-between tab-pills">
          <input type="radio" name="orders" id="shipping" ref={onLoadRef} />
          <label htmlFor="shipping" className="w-1/3 border-b-2  ">
            Shipping{" "}
          </label>

          <input
            type="radio"
            name="orders"
            id="payment"
            ref={paymentRef}
            disabled={paymentTabActive}
          />
          <label
            htmlFor="payment"
            className={`w-1/3 ${paymentTabActive ? "text-slate-400" : "text-black"}`}
          >
            Payment
          </label>

          <input
            type="radio"
            name="orders"
            id="review"
            ref={reviewRef}
            disabled={reviewTabActive}
          />
          <label
            htmlFor="review"
            className={`w-1/3 ${reviewTabActive ? "text-slate-400" : "text-black"}`}
          >
            Review
          </label>

          <div className="absolute top-10  mx-auto w-[80vw] tab-content">
            <section className={` absolute top-[4rem] z-[-1] bg-white flex flex-row`}>
              <form className="flex justify-between w-full gap-24">
                {/* <legend>Order</legend> */}
                <fieldset className=" flex flex-col gap-6 w-full">
                  <div className="w-full">
                    <label htmlFor="fullname" className="text-slate-500">
                      Full name
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="border py-3 px-4 rounded-xl w-full"
                    ></input>
                  </div>
                  <div className="w-full">
                    <label htmlFor="address" className="text-slate-500">
                      Address line 1
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="border py-3 px-4 rounded-xl w-full"
                    ></input>
                  </div>

                  <div className="w-full">
                    <label htmlFor="address" className="text-slate-500">
                      Address line 2 (optional)
                    </label>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      className="border py-3 px-4 rounded-xl w-full"
                    ></input>
                  </div>

                  <div className="w-full">
                    <label htmlFor="country" className="text-slate-500">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className="border py-3 px-4 rounded-xl w-full"
                    ></input>
                  </div>

                  <div className="w-full">
                    <label htmlFor="city" className="text-slate-500">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="border py-3 px-4 rounded-xl w-full"
                    ></input>
                  </div>

                  <div className="flex flex-row gap-4">
                    <div className="w-full">
                      <label htmlFor="city" className="text-slate-500">
                        State,LGA or regon
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="border py-3 px-4 rounded-xl w-full"
                      ></input>
                    </div>

                    <div className="w-full">
                      <label htmlFor="postalcode" className="text-slate-500">
                        Postal code
                      </label>
                      <input
                        type="text"
                        id="postalcode"
                        name="postalcode"
                        className="border py-3 px-4 rounded-xl w-full"
                      ></input>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleSubmitShippingAdress(e)}
                    type="submit"
                    className="py-3 px-6 rounded-full  text-white bg-black font-semibold hover:scale-105"
                  >
                    Continue
                  </button>
                </fieldset>

                <div className=" flex justify-center w-full">
                  <div className="flex flex-col w-fit gap-4">
                    <p className="text-3xl font-semibold">{getTitle}</p>
                    {/* <p>{getDescription}</p> */}
                    <p className="font-semibold">${getPrice}</p>
                    {getPrice && (
                      <p className="font-semibold">
                        Vat 7.5% {`(${(Number(getPrice) * 0.075).toFixed(2)})`}
                      </p>
                    )}
                    <span className="py-4 font-semibold text-xl border-y border-black">
                      Total {`$${(Number(getPrice) + Number(getPrice) * 0.075).toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </form>
            </section>
            <section className={`absolute z-[-2] top-[4rem] bg-white w-full  `}>
              <form className="flex flex-row w-full gap-32 justify-between">
                <fieldset className=" flex flex-col gap-6 w-full">
                  <div className="w-full">
                    <label htmlFor="fullname" className="text-slate-500">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="border py-3 px-4 rounded-xl w-full"
                    ></input>
                  </div>

                  <div className="flex flex-row gap-4">
                    <div className="w-full">
                      <label htmlFor="city" className="text-slate-500">
                        Expiry date
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="border py-3 px-4 rounded-xl w-full"
                      ></input>
                    </div>

                    <div className="w-full">
                      <label htmlFor="postalcode" className="text-slate-500">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="postalcode"
                        name="postalcode"
                        className="border py-3 px-4 rounded-xl w-full"
                      ></input>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleSubmitPaymentInfo(e)}
                    type="submit"
                    className="py-3 px-6 rounded-full  text-white bg-black font-semibold hover:scale-105"
                  >
                    Continue
                  </button>
                </fieldset>

                <div className=" flex justify-center w-full">
                  <div className="flex flex-col w-fit gap-4">
                    <p className="text-3xl font-semibold">{getTitle}</p>
                    {/* <p>{getDescription}</p> */}
                    <p className="font-semibold">${getPrice}</p>
                    {getPrice && (
                      <p className="font-semibold">
                        Vat 7.5% {`(${(Number(getPrice) * 0.075).toFixed(2)})`}
                      </p>
                    )}
                    <span className="py-4 font-semibold text-xl border-y border-black">
                      Total {`$${(Number(getPrice) + Number(getPrice) * 0.075).toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </form>
            </section>
            <section className={`absolute z-[-3] top-[3rem] bg-white w-full space-y-10 `}>
              <fieldset className="border w-1/2 p-6 rounded-xl flex flex-col gap-3">
                <legend className="text-slate-400">Art piece</legend>
                <p className="">{getTitle}</p>
                <p className="">
                  {" "}
                  Total {`$${(Number(getPrice) + Number(getPrice) * 0.075).toFixed(2)}`}
                </p>
                <p className=" italic">Vat inclusive</p>
              </fieldset>

              <fieldset className="border w-1/2 p-6 rounded-xl flex flex-col gap-3">
                <legend className="text-slate-400">Shipping Address</legend>
                <p className="">13th Jarumi Street, Airport Road</p>
                <p className="">Olajide seun</p>
                <p className="">900102</p>
              </fieldset>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
