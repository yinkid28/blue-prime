type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};
export default function OnboardingLayout({ children }: LayoutProps) {
  return <div className="onboardingBg">{children}</div>;
}
