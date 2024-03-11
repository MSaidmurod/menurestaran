import { configureStore } from "@reduxjs/toolkit";
import restaranSlise from "../future/restaranSlise";

export  const store = configureStore({
    reducer: {
        cart: restaranSlise
    }
})