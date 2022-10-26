import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/AuthSlice';
import { postReducer } from './slices/PostSlice';
import { userReducer } from './slices/UserSlice';
import { chatReducer } from './slices/ChatSlice';
import { videosReducer } from './slices/VideosSlice';
import { musicReducer } from "./slices/MusicSlice"
import { useDispatch } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  authReducer: authReducer,
  postReducer: postReducer,
  userReducer: userReducer,
  chatReducer: chatReducer,
  videosReducer: videosReducer,
  musicReducer: musicReducer,
  // все новые редюсеры надо добавлять сюда
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch