import Image from "next/image";

export default function OnboardingNavbar() {
  return (
    <div className="py-5 w-full">
      <p className="text-xl md:text-2xl font-urban">
        <Image
          src={"/icons/logo.svg"}
          alt="logo"
          width={200}
          height={100}
          className="w-[10%]"
        />
      </p>
    </div>
  );
}
