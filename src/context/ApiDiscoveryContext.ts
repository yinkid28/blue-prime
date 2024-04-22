import useLocalStorage from "@/hooks/useLocalStorage";
import { ApiDiscoveryInititals, IMockApi } from "@/models/apidiscovery.model";
import constate from "constate";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

export const initialState: ApiDiscoveryInititals = {
  api: null,
  bookmarkedAPIs: [],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_API":
      return {
        ...state,
        api: action.payload,
      };

    case "SET_BOOKMARKED":
      return {
        ...state,
        bookmarkedAPIs: action.payload,
      };
  }
};

const useApiContext = () => {
  const [data, setData] = useLocalStorage("api", initialState);
  const [state, dispatch] = useReducer(reducer, data);
  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { api, bookmarkedAPIs } = state as ApiDiscoveryInititals;

  const setApi = useCallback((api: IMockApi) => {
    dispatch({
      type: "SET_API",
      payload: api,
    });
  }, []);

  const setBookMarked = useCallback((api: IMockApi[]) => {
    dispatch({
      type: "SET_BOOKMARKED",
      payload: api,
    });
  }, []);

  return useMemo(
    () => ({
      api,
      setApi,
      bookmarkedAPIs,
      setBookMarked,
    }),
    [api, setApi, setBookMarked, bookmarkedAPIs]
  );
};

export const [OnApiProvider, useApi] = constate(useApiContext);
