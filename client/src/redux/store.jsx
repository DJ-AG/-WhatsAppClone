import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import userSlice from "./features/userSlice";


// save only user in local storage
const saveUserOnlyFilter = createFilter("user", ["user"])


// persist config

const presistConfig = {
    key:"user",
    storage,
    whitelist:["user"],
    transforms:[saveUserOnlyFilter]

}


const rootReducer = combineReducers({
    user:userSlice
});

const persistedReducer = persistReducer(presistConfig,rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck:false
        }),
  devTools: true,
});


export const persistor = persistStore(store);