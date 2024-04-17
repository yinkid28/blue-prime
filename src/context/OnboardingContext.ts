import useLocalStorage from "@/hooks/useLocalStorage";
import { ErrorStatusEnum, OnboardingInitials } from "@/models/onboarding.model";
import constate from "constate";
import { useCallback, useEffect, useMemo, useReducer } from "react";

export const initialState: OnboardingInitials = {
  progress: 0,
  stage: 0,
  sidebar: "",
  loading: true,
  errorMessage: "",
  errorStatus: "error",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_PROGRESS":
      return {
        ...state,
        progress: action.payload,
      };
    case "SET_STAGE":
      return {
        ...state,
        stage: action.payload,
      };
    case "SET_SIDEBAR":
      return {
        ...state,
        sidebar: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorStatus: action.errorStatus,
        errorMessage: action.errorMessage,
      };
  }
};

const useOnboardingContext = () => {
  const [data, setData] = useLocalStorage("onb", initialState);
  const [state, dispatch] = useReducer(reducer, data);
  useEffect(() => {
    setData(state);
  }, [state, setData]);
  const { progress, stage, sidebar, loading, errorMessage, errorStatus } =
    state as OnboardingInitials;

  const setProgress = useCallback((progress: number) => {
    dispatch({
      type: "SET_PROGRESS",
      payload: progress,
    });
  }, []);
  const setStage = useCallback((stage: number) => {
    dispatch({
      type: "SET_STAGE",
      payload: stage,
    });
  }, []);
  const setLoading = useCallback(
    (loading: boolean) => {
      dispatch({
        type: "SET_LOADING",
        payload: loading,
      });
    },

    []
  );

  const setSidebar = useCallback((sidebar: string) => {
    dispatch({
      type: "SET_SIDEBAR",
      payload: sidebar,
    });
  }, []);
  const setApiErrorMessage = useCallback(
    (errorMessage: string | null, errorStatus: ErrorStatusEnum = "error") => {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        errorMessage,
        errorStatus,
      });
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      progress,
      stage,
      sidebar,
      loading,
      setProgress,
      setStage,
      setSidebar,
      setLoading,
      errorMessage,
      errorStatus,
      setApiErrorMessage,
    }),
    [
      progress,
      setProgress,
      stage,
      setStage,
      sidebar,
      setSidebar,
      setLoading,
      loading,
      errorMessage,
      errorStatus,
      setApiErrorMessage,
    ]
  );
};

export const [OnboardingProvider, useOnboarding] =
  constate(useOnboardingContext);
