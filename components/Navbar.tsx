import React from "react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [blur, setBlur] = useState(true);

  setTimeout(() => {
    setBlur(false);
  }, 300);

  function handleMenuToggle() {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  }
  return (
    <nav className=" z-20 mx-auto w-full  border-gray-200 bg-opacity-95 bg-clip-padding backdrop-blur-lg backdrop-filter">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <img src="/logo.jpg" className="mr-3 h-8 rounded-md" alt="Logo" />
          <span className="self-center whitespace-nowrap text-base font-semibold text-white md:text-xl">
            CreativeStudio
          </span>
        </Link>
        <div className="flex md:order-2 ">
          <button
            onClick={() => {
              const recipient = "jugalmistry2712@gmail.com";
              const subject = "Subject Line";
              const body = "Hey there how can I help you?";
              const mailtoLink = `mailto:${encodeURIComponent(
                recipient
              )}?subject=${encodeURIComponent(
                subject
              )}&body=${encodeURIComponent(body)}`;
              window.location.href = mailtoLink;
            }}
            type="button"
            className="mr-3 rounded-lg bg-[#00ffa0] px-2 py-[2px] text-center text-sm font-medium text-black hover:bg-cyan-300 md:mr-0 md:px-4 md:py-2"
          >
            Email Me
          </button>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500  md:hidden"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen}
            onClick={handleMenuToggle}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          // className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          className={`${
            isMenuOpen ? "" : "hidden "
          }w-full items-center justify-between bg-opacity-95 bg-clip-padding text-center uppercase backdrop-blur-lg backdrop-filter md:order-1 md:flex md:w-auto md:normal-case`}
          id="navbar-cta"
        >
          <ul className="mt-4 flex flex-col rounded-lg  p-4 font-medium  md:mt-0 md:flex-row md:space-x-8  md:p-0 ">
            <li>
              <a
                href="#"
                className="block rounded  py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="block rounded border-gray-700 py-2 pl-3  pr-4 text-white hover:bg-gray-700 hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#showcase"
                className="block rounded border-gray-700 py-2 pl-3  pr-4 text-white hover:bg-gray-700 hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Showcase
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
