import useLocalStorage from "@/hooks/useLocalStorage";
import { ApiDiscoveryInititals, IMockApi } from "@/models/apidiscovery.model";
import constate from "constate";
import { useEffect, useMemo, useReducer } from "react";

export const initialState: ApiDiscoveryInititals = {
  api: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_API":
      return {
        ...state,
        api: action.payload,
      };
    // case "SET_STAGE":
    //   return {
    //     ...state,
    //     stage: action.payload,
    //   };
  }
};

const useApiContext = () => {
  const [data, setData] = useLocalStorage("api", initialState);
  const [state, dispatch] = useReducer(reducer, data);
  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { api } = state as ApiDiscoveryInititals;

  const setApi = (api: IMockApi) => {
    dispatch({
      type: "SET_API",
      payload: api,
    });
  };
  const setStage = (stage: number) => {
    dispatch({
      type: "SET_STAGE",
      payload: stage,
    });
  };
  return useMemo(
    () => ({
      api,
      setApi,
    }),
    [api, setApi]
  );
};

export const [OnApiProvider, useApi] = constate(useApiContext);
