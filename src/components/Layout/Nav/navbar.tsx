import { Button } from "../../utils";
import { RiNotificationLine } from "react-icons/ri";
import { BiMessageRounded } from "react-icons/bi";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/router";
import { useOnboarding } from "@/context/OnboardingContext";
type NavbarProps = {
  title: string;
};

export default function Navbar({ title }: NavbarProps) {
  const { userType, setUserType } = useUser();
  const { setLoading, setSidebar } = useOnboarding();
  const router = useRouter();
  return (
    <div className="w-full bg-transparent flex justify-between items-center p-5 ">
      <p className="md:text-xl font-semibold">{title}</p>
      <div className="flex items-center gap-3">
        <Button
          type="fit"
          text={userType === "weaver" ? "Switch to Webber" : "Switch to Weaver"}
          onClick={() => {
            if (userType === "weaver") {
              setLoading(true);
              setUserType("webber");
              router.push("/webber/dashboard");
              setSidebar("webber");
            } else {
              setLoading(true);
              setUserType("weaver");
              router.push("/api_discovery");
              setSidebar("");
            }
          }}
        />
        <RiNotificationLine />
        <BiMessageRounded />
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <Image
            className="w-[40px] h-[40px]"
            width={200}
            height={200}
            alt="avi"
            src={"/images/avatar.jpg"}
          />
        </div>
        <FaChevronDown className="text-mid-grey" />
      </div>
    </div>
  );
}
