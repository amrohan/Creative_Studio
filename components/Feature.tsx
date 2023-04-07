import React from "react";
import { useState, useEffect } from "react";

export default function Feature() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/airtable");
      const data = await res.json();
      setServices(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1
        className="text-center text-xl font-semibold text-[#AEC6CF] md:text-4xl"
        id="services"
      >
        Our Services
      </h1>
      <section className="flex w-full items-center ">
        <div className="relative mx-auto w-full max-w-7xl items-center px-5 py-12 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 gap-7 py-12 md:grid-cols-2 lg:grid-cols-4">
            {services.map((item, index) => (
              <figure key={index}>
                <img
                  className="w-full bg-gray-200 "
                  src={item.img}
                  alt={item.title}
                  width="1310"
                  height="873"
                />

                <p className="mt-5 text-lg font-medium leading-6 text-white">
                  {item.title}
                </p>
                <p className="mt-3 text-base text-gray-400">
                  {item.description}
                </p>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
