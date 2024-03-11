import { useLocation, useParams } from "react-router-dom";
import { useFetch } from "../hook/useFetch";

import { useDispatch, useSelector } from "react-redux";
import { addCart, changecountCart } from "../redux/future/restaranSlise";
import InfoUrl from "./InfoUrl";
import { useState } from "react";
import { useEffect } from "react";
//firebase
import { set, ref, onValue, remove, update, push } from "firebase/database";
import { db } from "../firebase/firebase_config";
import { current } from "@reduxjs/toolkit";
// flay

function Menyu() {
  const give = useSelector((store) => store.cart);
  const [foyz, setFoyz] = useState();
  const [stol_number, setStol_number] = useState();
  const [ofitsant, setOfitsant] = useState();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState([]);
  const card = useSelector((store) => store.cart);
  let cart = card && card.cart;

  let res_id = useLocation();
  res_id = res_id.pathname.slice(6, 7);
  let tab_id = useLocation();
  tab_id = tab_id.pathname.slice(8, 9);
  let id = useParams();

  const { data, isPending } = useFetch(
    `https://v1mobile.tursino.com/api/customer/restaurant/menu/${res_id}/${tab_id}/${id.id}`
  );
  if (isPending) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-black backdrop-blur-sm">
        <span className="loading loading-spinner text-warning"></span>
      </div>
    );
  }

  const addToCart = (
    product_id,
    img,
    old_price,
    price,
    skitka,
    name,
    size,
    foyz,
    stol_number,
    ofitsant
  ) => {
    let cart = {
      is_to_home: 0,
      ofitsant: ofitsant,
      stol_number: stol_number,
      size: size,
      foyz: foyz,
      ofitsiant: 1,
      oshpaz: 1,
      kassir: 1,
      stol_id: tab_id,
      tasdiqlash: 1,
      name: name,
      skitka: skitka,
      img: img,
      price: price,
      narx: price,
      old_price: old_price,
      id: product_id,
      count: 1,
    };
    dispatch(addCart({ product: cart }));
  };

  const hendelClick = (id, img, old_price, price, skitka, name, size, e) => {
    addToCart(
      id,
      img,
      old_price,
      price,
      skitka,
      name,
      size,
      foyz,
      stol_number,
      ofitsant
    );
    if (id == Number(e.target.dataset.id)) {
      let parent = e.target.parentNode.parentNode;

      let img = parent.querySelector("img");
      let fly_img = img.cloneNode();
      fly_img.classList.add("flying-img");
      parent.appendChild(fly_img);
      setTimeout(() => {
        parent.removeChild(fly_img);
      }, 1000);
    }
  };

  return (
    <div>
      <div className="max-w-7xl  mt-28 max-2xl:mx-4 mx-auto">
        <InfoUrl
          setFoyz={setFoyz}
          setStol_number={setStol_number}
          res_id={res_id}
          tab_id={tab_id}
          setOfitsant={setOfitsant}
        />
        {give.givePermission === "1" ? (
          ""
        ) : (
          <h1 className="text-center text-red-400 mb-2">
            Sizga ruxsat berilmagan!
          </h1>
        )}
        <div className="grid grid-cols-4  mb-9 gap-5  max-lg:grid-cols-3 max-md:grid-cols-2  ">
          {data &&
            data.map((product) => {
              const { id, img, old_price, price, skitka, name, size } = product;

              return (
                <div
                  className=" border max-md:mx-auto shadow-lg max-md:w-full  overflow-hidden flex flex-col justify-between relative rounded-lg max-w-[250px]"
                  key={id}
                >
                  <div className="w-[190px] mx-auto max-[340px]:h-[120px]  mt-4 max-md:mt-0 max-sm:h-[150px] max-md:w-full h-[190px] rounded-lg overflow-hidden">
                    <img
                      className="w-[190px]  mx-auto max-[340px]:h-[120px]  mt-4 max-md:mt-0 max-sm:h-[150px] max-md:w-full h-[190px] rounded-lg overflow-hidden object-cover"
                      src={img}
                      alt=""
                    />
                  </div>
                  {skitka > 0 && (
                    <div className="bg-red-500 z-10 w-[200px] absolute top-5 -left-14 text-center text-white -rotate-[40deg]">
                      <h1>{skitka} %</h1>
                    </div>
                  )}
                  <div className="mx-4 flex flex-col max-sm:text-sm gap-2 text-xl">
                    <h1 className=" font-bold">{name}</h1>
                    {old_price >= 1 && (
                      <h1 className="text-red-400 text-sm line-through">
                        {old_price} UZS
                      </h1>
                    )}
                    <h1>{price} UZS</h1>
                  </div>

                  <div className="bg-slate-300 py-[6px] font-bold max-[400px]:text-xs rounded-3xl text-lg my-2 mx-2">
                    <button
                      data-id={id}
                      className=" w-full"
                      onClick={(e) =>
                        hendelClick(
                          id,
                          img,
                          old_price,
                          price,
                          skitka,
                          name,
                          size,
                          e
                        )
                      }
                    >
                      {" "}
                      Olish
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <button className=" absolute bottom-0 right-6  "></button>
    </div>
  );
}

export default Menyu;
