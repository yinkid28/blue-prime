import UploadAdp from "@/components/modals/dashboard/uploadAdp";
import { Button } from "@/components/utils";
import Image from "next/image";

type dashprops = {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
};
export default function DashboardMain({ onOpen, isOpen, onClose }: dashprops) {
  return (
    <div className="flex flex-col items-center justify-center  gap-8 h-full w-full h-full">
      <div className="w-[50%]">
        <div className="flex-col items-center text-center justify-center h-full  flex gap-8">
          <Image
            src={"/icons/dashSvg.svg"}
            alt="icon"
            className="w-[100px] h-[100px]"
            width={500}
            height={500}
          />
          <p className="text-xl text-[#353535]">
            Welcome to your AI Driving Dynamic Scheduling and Loading solution
          </p>
          <Button
            type="fit"
            text="Import ADP"
            onClick={() => {
              onOpen();
            }}
            className="font-semibold"
            icon={
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.859 3.377L15.429 1.582C15.4999 1.57182 15.5722 1.57702 15.641 1.59723C15.7098 1.61744 15.7734 1.65219 15.8275 1.69913C15.8817 1.74608 15.9251 1.80411 15.9549 1.86931C15.9846 1.9345 16 2.00534 16 2.077V22.923C16 22.9946 15.9846 23.0653 15.9549 23.1304C15.9252 23.1955 15.8819 23.2535 15.8278 23.3004C15.7738 23.3474 15.7103 23.3821 15.6417 23.4024C15.5731 23.4227 15.5009 23.428 15.43 23.418L2.858 21.623C2.61962 21.5891 2.40149 21.4702 2.24369 21.2884C2.08589 21.1065 1.999 20.8738 1.999 20.633V4.367C1.999 4.12621 2.08589 3.89351 2.24369 3.71164C2.40149 3.52978 2.61962 3.41095 2.858 3.377H2.859ZM4 5.235V19.765L14 21.194V3.806L4 5.235ZM17 19.5H20V5.5H17V3.5H21C21.2652 3.5 21.5196 3.60536 21.7071 3.79289C21.8946 3.98043 22 4.23478 22 4.5V20.5C22 20.7652 21.8946 21.0196 21.7071 21.2071C21.5196 21.3946 21.2652 21.5 21 21.5H17V19.5ZM10.2 12.5L13 16.5H10.6L9 14.214L7.4 16.5H5L7.8 12.5L5 8.5H7.4L9 10.786L10.6 8.5H13L10.2 12.5Z"
                  fill="white"
                />
              </svg>
            }
          />
        </div>
      </div>
      <UploadAdp isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
