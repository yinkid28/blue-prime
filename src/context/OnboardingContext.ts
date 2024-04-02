import useLocalStorage from "@/hooks/useLocalStorage";
import { OnboardingInitials } from "@/models/onboarding.model";
import constate from "constate";
import { useEffect, useMemo, useReducer } from "react";

export const initialState: OnboardingInitials = {
  progress: 0,
  stage: 0,
  sidebar: "",
  loading: true,
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
  }
};

const useOnboardingContext = () => {
  const [data, setData] = useLocalStorage("onb", initialState);
  const [state, dispatch] = useReducer(reducer, data);
  useEffect(() => {
    setData(state);
  }, [state, setData]);
  const { progress, stage, sidebar, loading } = state as OnboardingInitials;

  const setProgress = (progress: number) => {
    dispatch({
      type: "SET_PROGRESS",
      payload: progress,
    });
  };
  const setStage = (stage: number) => {
    dispatch({
      type: "SET_STAGE",
      payload: stage,
    });
  };
  const setLoading = (loading: boolean) => {
    dispatch({
      type: "SET_LOADING",
      payload: loading,
    });
  };
  const setSidebar = (sidebar: string) => {
    dispatch({
      type: "SET_SIDEBAR",
      payload: sidebar,
    });
  };
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
    ]
  );
};

export const [OnboardingProvider, useOnboarding] =
  constate(useOnboardingContext);
