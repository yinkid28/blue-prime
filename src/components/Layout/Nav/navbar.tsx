import { Button } from "../../utils";
import { RiNotificationLine } from "react-icons/ri";
import { BiMessageRounded } from "react-icons/bi";
import { ImCog } from "react-icons/im";
import { HiMiniLanguage, HiOutlineCog6Tooth } from "react-icons/hi2";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
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

import { FiLogOut } from "react-icons/fi";
import { HiOutlineCog } from "react-icons/hi";

import { useLogout } from "@/hooks/useLocalStorage";

type NavbarProps = {
  title: string;
};

export default function Navbar({ title }: NavbarProps) {
  const { userType, setUserType } = useUser();
  const { setLoading, setSidebar, user, setUser } = useOnboarding();
  const router = useRouter();
  const logout = useLogout();
  return (
    <div className="w-full bg-transparent flex justify-between items-center p-4 ">
      <div>
        <p className="md:text-[18px] font-semibold">{title}</p>
      </div>

      <div className="flex items-center md:gap-3 lg:gap-8">
        {user !== null ? (
          <div className="flex items-center md:gap-3 lg:gap-5">
            <Button
              type="fit"
              className="md:flex hidden"
              text={
                userType === "weaver" ? "Switch to Webber" : "Switch to Weaver"
              }
              onClick={() => {
                if (userType === "weaver") {
                  setLoading(true);
                  setUserType("webber");
                  router.push("/api_discovery");
                  setSidebar("");
                } else {
                  setSidebar("webber");
                  router.push("/weaver/dashboard");
                  setLoading(true);
                  setUserType("weaver");
                }
              }}
            />
            <RiNotificationLine className="md:flex hidden" />
            <BiMessageRounded className="md:flex hidden" />

            <div className="w-[24px] h-[24px] rounded-full overflow-hidden md:flex hidden">
              <Image
                className="w-[40px] h-[40px]"
                width={200}
                height={200}
                alt="avi"
                src={"/images/avatar.jpg"}
              />
            </div>
            <Menu>
              <MenuButton>
                <FaChevronDown className="text-mid-grey md:flex hidden" />
              </MenuButton>
              <MenuList>
                {/* <MenuItem> */}
                <div className="w-full text-center font-semibold">Profile</div>
                {/* </MenuItem> */}
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  <div className="w-full  ">Logout</div>
                </MenuItem>
                <MenuItem>
                  <div className="w-full  ">Language</div>
                </MenuItem>
                <MenuItem>
                  <div className="w-full  ">Settings</div>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <div className="">
            <Menu>
              <MenuButton>
                <div className="w-fit border border-primary rounded-lg px-4 py-2 text-primary font-semibold">
                  Signup / Login
                </div>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    router.push("/onboarding/sign-up-organization")
                  }
                >
                  Sign up
                </MenuItem>
                <MenuItem onClick={() => router.push("/onboarding/login")}>
                  Login
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        )}

        {/* THE MENU */}
        <Show breakpoint="(max-width: 768px)">
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
                <MenuItem
                  className="flex items-center gap-2"
                  onClick={() => setUser(null)}
                >
                  <FiLogOut />

                  <p>Logout</p>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <HiMiniLanguage />

                  <p>Language</p>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <HiOutlineCog6Tooth />

                  <p>Settings</p>
                </MenuItem>
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
                      router.push("/weaver/dashboard");
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
