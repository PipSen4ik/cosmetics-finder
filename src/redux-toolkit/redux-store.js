import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";

import findBrandSlice from "./findbrand/findbrand-slice";

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: false,
});

const store = configureStore({
    reducer: {
        findBrandReducer: findBrandSlice,
    },
    middleware
})

export default store;