import { useState, useEffect } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import QRCode from "react-qr-code";
import {
  changecountCart,
  is_to_home,
  cartNull,
  givePermission,
} from "../redux/future/restaranSlise";
import BoottomDrawer from "./BootomDrawer";
//firebase
import { set, ref, get, onValue } from "firebase/database";
import { db } from "../firebase/firebase_config";
// post
import { useFetch } from "../hook/useFetch";
import DattaInfo from "./DattaInfo";

function Footer() {
  let rest_id = useLocation();
  rest_id = rest_id.pathname.slice(6, 7);
  let stol_id = useLocation();
  stol_id = stol_id.pathname.slice(8, 9);
  const card = useSelector((store) => store.cart);
  let cart = card && card.cart;

  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [formIds, setFormId] = useState(0);
  const [countModal, setCountModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [weterid, setWeterid] = useState("");
  const [ofitsant, setOfitsant] = useState();
  const [give, setGive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [customers_number, setcustomers_number] = useState();
  const [tablFire, setTableFrie] = useState();
  const [loaded, setLoaded] = useState(false);
  const [datta, setDatta] = useState();
  const [btnTrue, setBtnTure] = useState(false);
  const [render, setRender] = useState(false);
  let chekId = localStorage.getItem("chekId");

  let oshpaz = 1;
  let kassir = 1;
  let ofitsiant = 1;
  let tasdiqlash = 1;
  let setItem = [];
  let selectedItems = JSON.parse(localStorage.getItem("cart"));

  let tabl_id = useLocation();
  tabl_id = tabl_id.pathname.slice(8, 9);
  const [token, setToken] = useState("");

  const Plus = (id) => {
    let type = "pls";
    dispatch(changecountCart({ id, type }));
  };

  const Minus = (id) => {
    let type = "min";
    dispatch(changecountCart({ id, type }));
    if (cart.length == 0) {
      setModal(false);
    } else {
    }
  };

  const subMit = (e) => {
    e.preventDefault();
    cookingChange();
  };

  const formId = (id) => {
    setFormId(id);
    setCountModal(true);
  };

  const hendelSubmit = (e) => {
    e.preventDefault();
    let id = formIds;
    let type = "inp";
    setCountModal(false);
    dispatch(changecountCart({ id, type, value }));
  };

  let newDate = new Date();
  let year = `${newDate.getFullYear()}`;
  let month = newDate.getMonth();
  if (month < 9) {
    month = `0${month + 1}`;
  } else {
    month = `${month + 1}`;
  }
  let day = newDate.getDate();
  if (day <= 9) {
    day = `0${day}`;
  } else {
    day = `${day}`;
  }
  let hours = newDate.getHours();
  if (hours <= 9) {
    hours = `0${hours}`;
  } else {
    hours = `${hours}`;
  }
  let min = newDate.getMinutes();
  if (min <= 9) {
    min = `0${min}`;
  } else {
    min = `${min}`;
  }
  let sek = newDate.getSeconds();
  if (sek <= 9) {
    sek = `0${sek}`;
  } else {
    sek = `${sek}`;
  }
  let milsek = newDate.getMilliseconds();

  let fullDate = `${year.slice(2)}${month}${day}${hours}${min}${sek}${milsek}`;
  let created_at = `${year}-${month}-${day} ${hours}:${min}:${sek}`;
  let cutnomer = customers_number === undefined ? "0" : customers_number;
  selectedItems &&
    selectedItems.map((prev) => {
      setItem.push({
        ...prev,
        customers_number: cutnomer,

        stol_id: stol_id,
        tasdiqlash: tasdiqlash,
        oshpaz: oshpaz,
        kassir: kassir,
        ofitsiant: ofitsiant,
        product_name: prev.name,
        product_price: prev.price,
        product_number: prev.count,
        customers_id: "0",
        admin_id: rest_id,
        product_id: prev.id,
        chek_id: chekId,
        ofitsant_id: weterid,
        created_at: created_at,
      });
    });
  const newItems = setItem.map((prev) => {
    const {
      narx,
      img,
      name,
      id,
      count,
      price,
      skitka,
      old_price,
      ofitsant,
      ...rest
    } = prev;
    return rest;
  });

  let firebase = localStorage.getItem("firebase");
  // post firebase

  if (localStorage.getItem("chekId") === null) {
    localStorage.setItem("chekId", fullDate);
  }
  const writeToDatabase = () => {
    set(ref(db, `/restaurents/${rest_id}/customer/${chekId}`), {
      chekId: chekId,
      customerId: "0",
      customerName: "",
      dateTime: chekId,
      givePermission: "0",
      phoneId: "0",
      tableId: tabl_id,
      tableNumber: `${datta && datta.number}`,
      tablePlace: `${datta && datta.name}`,
      timeAcceptance: "",
      waiterId: "0",
      waiterPercent: "0",
    });
  };
  const { data, getPostedData } = useFetch(
    `https://v1mobile.tursino.com/api/customer/restaurant/menu/${rest_id}/0/${tabl_id}`,
    "POST"
  );

  useEffect(() => {
    const dataRef = ref(db, `restaurents/${rest_id}`);
    const hasLoaded = localStorage.getItem("hasLoaded");
    onValue(dataRef, (snapshot) => {
      const newData = snapshot.val();

      if (newData.customer != null) {
        Object.values(newData.customer).map((prev) => {
          if (prev.chekId == chekId) {
            localStorage.setItem("firebase", prev.chekId);
            setWeterid(prev.waiterId);
            setOfitsant(prev.waiterPercent);
            setTableFrie(prev.tableId);
            dispatch(givePermission(prev.givePermission));
            if (prev.weterid != "0") {
              let tok = newData.waiter.tokens.findIndex(
                (i) => Number(i.id) == Number(weterid)
              );
              setToken(newData.waiter.tokens[tok].device_token);
            }
          } else {
            localStorage.removeItem("firebase");
            localStorage.removeItem("token");
          }
        });
      } else {
        localStorage.removeItem("firebase");
        localStorage.removeItem("token");
      }
      if (newData.customer == null) {
        if (hasLoaded === "true") {
          window.location.reload();
          localStorage.setItem("hasLoaded", "flase");
        }
      }
      if (newData.customer) {
        if (newData.customer[`${chekId}`] === undefined) {
          if (hasLoaded === "true") {
            window.location.reload();
            localStorage.setItem("chekId", fullDate);
            localStorage.setItem("hasLoaded", "flase");
          }
        }
      }

      if (firebase) {
        if (newData.customer[`${firebase}`].tableId != tabl_id) {
          setTableFrie(newData.customer[`${firebase}`].tableId);
          setShowModal(true);
        }
      }
    });
    if (
      card.givePermission != "0" &&
      tablFire === tabl_id &&
      give &&
      cart.length > 0 &&
      btnTrue != false
    ) {
      cookingPostFirebase();
      setGive(false);
    }

    if (
      data != null &&
      data == "Purchase added" &&
      loaded != false &&
      cart.length > 0
    ) {
      set(ref(db, `/restaurents/${rest_id}/cook/items/${tabl_id}`), {
        checkId: chekId,
        date: fullDate,
        id: Number(tabl_id),
        isPrinting: "[]",
        showCooks: "[]",
        tableNumber: Number(datta && datta.number),
        tablePlace: `${datta && datta.name}`,
        token: token == null ? "" : token,
        whoSent: "customer",
      });
      localStorage.removeItem("cart");
      dispatch(cartNull([]));
      setLoaded(false);
      setBtnTure(false);
    }
  }, [
    chekId,
    setWeterid,
    loaded,
    firebase,
    token,
    setToken,
    weterid,
    give,
    tabl_id,
    data,
  ]);
  // cooking post
  const cookingPostFirebase = () => {
    getPostedData(newItems);
    setLoaded(true);
  };
  // cooking database
  const cookingChange = () => {
    if (chekId != firebase) {
      writeToDatabase();
      localStorage.setItem("hasLoaded", "true");
      setBtnTure(true);
      setRender(true);
      setGive(true);
    } else {
      if (card.givePermission != "0") {
        cookingPostFirebase();
      }
    }
  };

  const hendelPrasent = (id, is_to_home) => {
    let type = is_to_home;
    dispatch(changecountCart({ id, type }));
  };
  const colseModal = (e) => {
    if (
      e.target.className ===
      "fixed opacity-50 z-[70] bg-black h-full  top-0 left-0 w-full"
    )
      setCountModal(false);
    if (e.key === "Escape") setCountModal(false);
  };
  const hendelClick = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div
      onClick={colseModal}
      onKeyDown={colseModal}
      className=" fixed z-20 right-9 bottom-5 max-w-7xl mx-auto"
    >
      <DattaInfo setDatta={setDatta} rest_id={rest_id} tabl_id={tabl_id} />
      <div className="">
        {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto px-4 fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-md ">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Ogoxlantirish</h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      Boshqa stolda buyurtmangiz bor kasir yopgani yoq xali
                      shuni tolovini qiling!
                    </p>
                  </div>
                  {/* footer */}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <Link to={`/menu/${rest_id}/${tablFire}`}>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => hendelClick()}
                      >
                        Stolga otish
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
      </div>
      <div className="">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="w-[60px] h-[60px] sticky  flex z-30 justify-center items-center bg-yellow-400 rounded-2xl "
        >
          <MdShoppingBasket className="text-[35px]" />
          <div className="badge absolute badge-secondary top-7 left-7 badge-sm">
            {card.total_product}
          </div>
        </button>
      </div>
      <BoottomDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {card && card.cart.length > 0 ? (
          <form className="" onSubmit={subMit}>
            <div className="form-control   mt-5 mx-10">
              <div className="label">
                <span className="label-text opacity-50">
                  Mijozlar sonini kiriting
                </span>
              </div>
              <input
                type="number"
                onChange={(e) => {
                  setcustomers_number(e.target.value);
                }}
                required
                placeholder="Mijozlar soni"
                className="input input-bordered w-full"
              />
            </div>

            {cart &&
              cart.map((item) => {
                let {
                  id,
                  img,
                  old_price,
                  price,
                  skitka,
                  foyz,
                  is_to_home,
                  name,
                  count,
                } = item;

                return (
                  <div
                    className=" flex flex-col items-end mx-10 max-md:px-3  shadow-xl rounded-2xl mt-3 px-5 py-5 max-w-[600px] bottom-0 "
                    key={id}
                  >
                    <div className="flex w-full justify-between">
                      <div className="w-[200px] max-[386px]:h-[120px] max-[353px]:h-[100px] max-[353px]:w-[100px] max-[386px]:w-[120px] max-md:w-[150px] max-md:h-[150px] rounded-2xl overflow-hidden h-[200px]">
                        <img
                          className="w-full overflow-hidden h-full"
                          src={img}
                          alt=""
                        />
                      </div>
                      <div className="mx-4 flex flex-col justify-end max-[425px]:text-sm gap-4 text-xl">
                        <h1 className=" font-bold">{name}</h1>
                        {old_price >= 1 && (
                          <h1 className="text-red-400 text-sm line-through">
                            {old_price} UZS
                          </h1>
                        )}
                        <h1>{price} UZS</h1>
                      </div>
                    </div>
                    <div className="border px-4 py-3 rounded-2xl bg-gray-300 mt-4 justify-between flex w-full shadow-2xl">
                      <button
                        className="px-10 max-[400px]:px-5 max-[320px]:px-3 "
                        onClick={() => Minus(id)}
                      >
                        -
                      </button>
                      <h1 onClick={() => formId(id)} className=" mx-4 px-6">
                        {count}
                      </h1>
                      <button
                        className="px-10 max-[400px]:px-5 max-[320px]:px-3 "
                        onClick={() => Plus(id)}
                      >
                        +
                      </button>
                    </div>
                    <div className="w-full mt-4">
                      <div className="form-control">
                        <label className="cursor-pointer label">
                          <span className="label-text">Olib ketish</span>
                          <input
                            onClick={() => hendelPrasent(id, is_to_home)}
                            type="checkbox"
                            className="checkbox checkbox-warning"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            {countModal && (
              <div className="w-full ">
                <div className="fixed opacity-50 z-[70] bg-black h-full  top-0 left-0 w-full"></div>
                <div className="fixed bg-white rounded-2xl px-5 py-5 max-[390px]:left-[4%] max-[465px]:left-[10%]    top-[50%] left-[20%] z-[70] ">
                  <form
                    className="flex gap-4"
                    onSubmit={(e) => hendelSubmit(e)}
                  >
                    <input
                      className="input input-bordered  w-full "
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                      type="text "
                      required
                    />
                    <button className="btn  ">OK</button>
                  </form>
                </div>
              </div>
            )}
            <div className="mb-6">
              <div className="flex flex-col gap-3 items-end mx-10 max-md:px-3  shadow-xl rounded-2xl mt-3 px-5 py-5 max-w-[600px] bottom-0">
                <div className="flex w-full justify-between">
                  <h1>Maxsulot narxi</h1>
                  <h1>{card.all_price} UZS</h1>
                </div>
              </div>
              <div className="mx-6 mt-7">
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                      Ofitsant sizga hali ruxsat bergani yoq
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn">Yopish</button>
                      </form>
                    </div>
                  </div>
                </dialog>
                <button
                  // onClick={cookingChange}
                  className="btn btn-success w-full"
                >
                  Buyurtma berish
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="mx-auto">
            <div className=" pt-10">
              <h1 className="text-center mb-5 font-bold text-xl">
                Kassir uchun QR code
              </h1>
              <QRCode
                value={`https://v1web.tursino.com/menu/${rest_id}/${tabl_id}`}
                size="230"
              />
            </div>
          </div>
        )}
      </BoottomDrawer>
      {btnTrue && (
        <>
          <div className="justify-center z-[60] items-center flex overflow-x-hidden overflow-y-auto px-4 fixed inset-0  outline-none focus:outline-none">
            <div className="relative  w-auto my-6 mx-auto max-w-md ">
              {/*content*/}
              <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Sorov!</h3>
                </div>
                {/*body*/}
                <div className="relative pt-4 px-3 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Sizning sorovingiz ofitsantga yuborildi. Ofitsant
                    tasdiqlashini kuting
                  </p>
                </div>
                <div className="mx-auto pb-4">
                  <ClockLoader color="#00f345" />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed  w-full inset-0 z-[50] bg-black"></div>
        </>
      )}
    </div>
  );
}

export default Footer;
