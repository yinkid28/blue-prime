import { OnboardingInitials } from "@/models/onboarding.model";
import constate from "constate";
import { useMemo, useReducer } from "react";

export const initialState: OnboardingInitials = {
  progress: null,
  stage: 0,
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
  }
};

const useOnboardingContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { progress, stage } = state as OnboardingInitials;

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
  return useMemo(
    () => ({
      progress,
      stage,
      setProgress,
      setStage,
    }),
    [progress, setProgress]
  );
};

export const [OnboardingProvider, useOnboarding] =
  constate(useOnboardingContext);
