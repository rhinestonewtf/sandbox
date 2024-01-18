"use client";
import { useState } from "react";
import { notReachable } from "@/src/utils/notReachable";
import {
  LoginView,
  OnboardingCompletedView,
  ProfileSecurityView,
  LoadingView,
} from "./views";

type ViewState =
  | "not_authenticated"
  | "profile_security"
  | "onboarding_completed"
  | "account_loading";

export const OnboardingFlow = () => {
  const [viewState, setViewState] = useState<ViewState>("not_authenticated");

  const onProfileSecurityCompleted = () => {
    setViewState("onboarding_completed");
  };

  switch (viewState) {
    case "not_authenticated":
      return (
        <LoginView
          onLoginClick={() => {
            setViewState("profile_security");
          }}
        />
      );
    case "profile_security":
      return (
        <ProfileSecurityView
          onProfileSecurityCompleted={onProfileSecurityCompleted}
          onBackClick={() => {
            setViewState("not_authenticated");
          }}
        />
      );
    case "onboarding_completed":
      return (
        <OnboardingCompletedView
          onBackClick={() => setViewState("profile_security")}
        />
      );
    case "account_loading":
      return <LoadingView />;
    default:
      return notReachable(viewState);
  }
};
