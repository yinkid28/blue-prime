import { Button } from "../../utils";
import { RiNotificationLine } from "react-icons/ri";
import { BiMessageRounded } from "react-icons/bi";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/router";
import { useOnboarding } from "@/context/OnboardingContext";
import {
  Hide,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Show,
} from "@chakra-ui/react";
type NavbarProps = {
  title: string;
};

export default function Navbar({ title }: NavbarProps) {
  const { userType, setUserType } = useUser();
  const { setLoading, setSidebar } = useOnboarding();
  const router = useRouter();
  return (
    <div className="w-full bg-transparent flex justify-between items-center p-5 ">
      <div>
        <p className="md:text-xl font-semibold">{title}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="fit"
          className="sm:flex hidden"
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
        <RiNotificationLine className="sm:flex hidden" />
        <BiMessageRounded className="sm:flex hidden" />

        <div className="w-[40px] h-[40px] rounded-full overflow-hidden sm:flex hidden">
          <Image
            className="w-[40px] h-[40px]"
            width={200}
            height={200}
            alt="avi"
            src={"/images/avatar.jpg"}
          />
        </div>
        <FaChevronDown className="text-mid-grey sm:flex hidden" />

        {/* THE MENU */}
        <Show breakpoint="(max-width: 640px)">
          {/* To show on screens 640px and smaller */}
          <Menu>
            <MenuButton>
              <div className="w-full h-[40px] items-center flex gap-2 rounded-full overflow-hidden">
                <Image
                  className="w-[40px] h-[40px]"
                  width={200}
                  height={200}
                  alt="avi"
                  src={"/images/avatar.jpg"}
                />
                <FaChevronDown className="text-mid-grey" />
              </div>
            </MenuButton>

            <MenuList>
              <MenuGroup>
                <MenuItem className="flex items-center gap-2">
                  <RiNotificationLine />
                  <p>Notifications</p>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <BiMessageRounded />
                  <p>Messages</p>
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem>
                <Button
                  text={
                    userType === "weaver"
                      ? "Switch to Webber"
                      : "Switch to Weaver"
                  }
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
              </MenuItem>
            </MenuList>
          </Menu>
        </Show>
      </div>
    </div>
  );
}
