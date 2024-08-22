import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IApi } from "@/models/api.model";
import {
  ApiDiscoveryInititals,
  IMockApi,
  IMockapiProduct,
} from "@/models/apidiscovery.model";
import constate from "constate";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

/* THINKING AND IDEATION 💡🎯
  
*/

export const initialState: ApiDiscoveryInititals = {
  api: null,
  bookmarkedAPIs: [],
  libraryView: "saved",
  apiProduct: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_API":
      return {
        ...state,
        api: action.payload,
      };
    case "SET_APIPRODUCT":
      return {
        ...state,
        apiProduct: action.payload,
      };

    case "SET_BOOKMARKED":
      // const exist = state.bookmarkedAPIs.find(
      //   (item: IApi) => item.id === action.payload.id
      // );
      // let payload;
      // if (exist) {
      //   payload = state.bookmarkedAPIs.filter(
      //     (item: IApi) => item.id !== action.payload.id
      //   );
      // } else {
      //   payload = [...state.bookmarkedAPIs, action.payload];
      // }
      return {
        ...state,
        bookmarkedAPIs: action.payload,
      };

    case "SET_LIBRARYVIEW":
      return {
        ...state,
        libraryView: action.payload,
      };
  }
};

const useApiContext = () => {
  const [data, setData] = useLocalStorage("api", initialState);
  const [state, dispatch] = useReducer(reducer, data);
  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { api, bookmarkedAPIs, libraryView, apiProduct } =
    state as ApiDiscoveryInititals;

  const setApi = useCallback((api: IApi) => {
    dispatch({
      type: "SET_API",
      payload: api,
    });
  }, []);
  const setApiProduct = useCallback((api: IMockapiProduct) => {
    dispatch({
      type: "SET_APIPRODUCT",
      payload: api,
    });
  }, []);

  const setBookMarked = useCallback((api: IMockApi[]) => {
    dispatch({
      type: "SET_BOOKMARKED",
      payload: api,
    });
  }, []);

  const setLibraryView = useCallback((libraryView: string) => {
    dispatch({
      type: "SET_LIBRARYVIEW",
      payload: libraryView,
    });
  }, []);

  return useMemo(
    () => ({
      api,
      apiProduct,
      setApiProduct,
      setApi,
      bookmarkedAPIs,
      setBookMarked,
      libraryView,
      setLibraryView,
    }),
    [
      api,
      setApi,
      setBookMarked,
      bookmarkedAPIs,
      libraryView,
      setLibraryView,
      apiProduct,
      setApiProduct,
    ]
  );
};

export const [OnApiProvider, useApi] = constate(useApiContext);
