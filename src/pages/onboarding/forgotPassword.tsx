import OnboardingLayout from "@/components/onboarding/layout";
export default function ForgotPassword() {
  return (
    <OnboardingLayout>
      <div className="w-full">
        <div
          className="flex my-2 items-center cursor-pointer flex-row gap-3"
          //   onClick={() => {
          //     router.p;

          //   }}
        >
          <div className="flex flex-col gap-2">
            <p className="font-[14px] font-semibold">Forgot Password</p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
