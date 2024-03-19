import { Button } from "../utils";
import { RiNotificationLine } from "react-icons/ri";
import { BiMessageRounded } from "react-icons/bi";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
type NavbarProps = {
  title: string;
};

export default function Navbar({ title }: NavbarProps) {
  return (
    <div className="w-full bg-transparent flex justify-between items-center p-5 ">
      <p className="md:text-xl font-semibold">{title}</p>
      <div className="flex items-center gap-3">
        <Button type="fit" text="Switch to Webber" onClick={() => {}} />
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
