import { createSlice } from "@reduxjs/toolkit";
import { info } from "autoprefixer";

const defaultState = {
  cart: [],
  all_price: null,
  prasent_price: null,
  prasent: 0,
  prs: 0,
  ofit_pracent: 0,
  total_product: 0,
  givePermission: 0,
  token: null,
};

const getLocalStorage = () => {
  return defaultState || JSON.parse(localStorage.getItem("cart"));
};
const cartSlise = createSlice({
  name: "product",
  initialState: getLocalStorage,
  reducers: {
    addCart: (state, { payload }) => {
      const { product } = payload;
      const {
        id,
        img,
        old_price,
        price,
        skitka,
        name,
        size,
        foyz,
        stol_number,
        ofitsant,
        is_to_home,
      } = product;
      let positionThisProductInCart =
        state.cart && state.cart.find((i) => i.id == id);
      if (positionThisProductInCart) {
        positionThisProductInCart.count += 1;
        positionThisProductInCart.narx =
          positionThisProductInCart.count * positionThisProductInCart.price;
      } else {
        state.cart &&
          state.cart.push({
            name: name,
            skitka: skitka,
            img: img,
            narx: price,
            price: price,
            old_price: old_price,
            id: id,
            count: 1,
            size: size,
            foyz: foyz,
            stol_number: stol_number,
            ofitsant: ofitsant,
            is_to_home: is_to_home,
          });
        state.prs = Number(state.cart[0].foyz);
        state.ofit_pracent = Number(state.cart[0].ofitsant);
      }

      cartSlise.caseReducers.calculation(state);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    changecountCart: (state, { payload }) => {
      const { id, type, value } = payload;

      let positionItemInCart = state.cart.findIndex((i) => i.id == id);
      if (positionItemInCart >= 0) {
        let info = state.cart[positionItemInCart];
        switch (type) {
          case "pls":
            info.count += 1;
            info.narx = info.price * info.count;
            break;
          case "inp":
            info.count = Number(value);
            info.narx = info.price * info.count;
            break;
          case 0:
            info.is_to_home = 1;
            break;
          case 1:
            info.is_to_home = 0;
            break;

          default:
            let changecount = info.count - 1;
            if (changecount > 0) {
              info.count = changecount;
              info.narx = info.price * info.count;
              info.count.toFixed(2);
            } else {
              state.cart.splice(positionItemInCart, 1);
            }
            break;
        }
      }

      cartSlise.caseReducers.calculation(state);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    givePermission: (state, { payload }) => {
      state.givePermission = payload;
    },
    getToken: (state, { payload }) => {
      state.token = payload;
    },

    calculation: (state) => {
      let total_price = 0;
      let total = 0;
      state.prasent = Number(state.prs) + Number(state.ofit_pracent);
      let num = state.cart && state.cart.length;
      for (let i = 0; i < num; i++) {
        total_price = total_price + state.cart[i].narx;
        total = total + state.cart[i].count;
      }
      state.all_price = total_price;
      let prs = (state.all_price * state.prasent) / 100;
      state.prasent_price = state.all_price + prs;

      state.total_product = total;
    },
    cartNull: (state, { payload }) => {
      state.cart = payload;
      state.total_product = 0;
    },
  },
});

export const {
  addCart,
  changecountCart,
  is_to_home,
  givePermission,
  cartNull,
  getToken,
} = cartSlise.actions;
export default cartSlise.reducer;
