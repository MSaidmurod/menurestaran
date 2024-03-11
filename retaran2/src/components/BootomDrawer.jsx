// icon
import { GoX } from "react-icons/go";
// react
import { useState, useEffect } from "react";
import { useFetch } from "../hook/useFetch";

export default function Drawer({ children, isOpen, setIsOpen }) {
  const [scroll, setScroll] = useState(false);

  const scrollHeader = () => {
    if (window.scrollY >= 2) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.addEventListener("scroll", scrollHeader);
    };
  });
  return (
    <main
      className={
        " fixed   top-0 mx-auto z-50 left-0 overflow-hidden  bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-y-0  "
          : " transition-all delay-500 opacity-0 translate-y-full  ")
      }
    >
      <section
        className={
          " max-w-[600px]  rounded-t-2xl overflow-hidden ml-[30%] max-[906px]:ml-[25%] max-[810px]:ml-[16%] max-[697px]:ml-[10%] max-[520px]:ml-0 max-[540px]:ml-2 max-[600px]:ml-4 max-[620px]:ml-[7%] bottom-0 absolute bg-white h-[450px] shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-y-0  mx-auto" : " translate-y-full mx-auto")
        }
      >
        <article className="relative mt-3 w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-[400px]">
          <div
            className={
              scroll
                ? "flex fixed w-full justify-between px-4 "
                : "flex fixed w-full bg-white justify-between px-4 "
            }
          >
            <header className="p-4 font-bold text-lg"></header>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <GoX className="text-2xl" />
            </button>
          </div>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
