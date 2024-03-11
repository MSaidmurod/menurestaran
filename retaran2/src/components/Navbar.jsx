import { useFetch } from "../hook/useFetch";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { IoQrCode } from "react-icons/io5";
import Drawer from "./Drawer";
import Catigoriya from "./Catigoriya";
import BootomDrawer from "./BootomDrawer";
import QRCode from "react-qr-code";
import useSWR from "swr";

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  let rest_id = useLocation();
  rest_id = rest_id.pathname.slice(6, 7);
  let tabl_id = useLocation();
  tabl_id = tabl_id.pathname.slice(8, 9);

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
  const { data } = useFetch(
    `https://v1mobile.tursino.com/api/customer/restaurant/menu/categore/${rest_id}/${tabl_id}`
  );
  // const { dataa, error } = useSWR("/api/user", fetch);

  // if (error) return <div>failed to load</div>;
  // if (!dataa) return <div>loading...</div>;

  return (
    <div
      className={
        scroll
          ? "bg-yellow-400 z-30 w-full mx-auto fixed"
          : "bg-yellow-400 fixed mx-auto w-full z-30"
      }
    >
      <div className="max-w-7xl mx-auto max-2xl:mx-4">
        <div className="flex py-2  items-center justify-between">
          <div>
            <h1 className="text-2xl select-none">Menu</h1>
          </div>
          <div className="flex items-center gap-7">
            <button className="" onClick={() => setIsOpen(true)}>
              <FiMenu className="text-2xl" />
            </button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <div className="mx-auto flex flex-col gap-10">
                <div className="card max-w-96 bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-center mx-auto">
                      1 - table orders
                    </h2>
                    <h1 className="font-medium">Product number: 1</h1>
                    <div className="font-medium">
                      Percent:{" "}
                      <span className="text-red-500">4 % (600 UZS)</span>
                    </div>
                    <h1 className="font-medium">
                      Price without percentage: 30000 UZS
                    </h1>
                    <h1 className="font-medium">Total Cost: 30600 UZS</h1>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-2xl shadow-xl border max-w-96">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>count</th>
                        <th>price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        <th></th>
                        <td className="font-bold ">Lavash</td>
                        <td className="text-red-600 font-bold ">1</td>
                        <td className="font-bold ">30000 UZS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
        <div className="flex max-[399px]:gap-2 gap-4 mb-2">
          {data && (
            <Catigoriya data={data} rest_id={rest_id} tabl_id={tabl_id} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
