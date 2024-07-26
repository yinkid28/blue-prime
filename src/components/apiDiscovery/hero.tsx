import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

export default function ApiHero() {
  const [view, setView] = useState<number>(1);
  const [bgGradient, setBgGradient] = useState<string>(
    "bg-gradient-to-r from-purple-700 to-purple-200"
  );
  const [bgGradientR, setBgGradientR] = useState<string>(
    "bg-gradient-to-l from-purple-500 to-purple-100"
  );
  const [content, setContent] = useState<string>("Top Finance APIs");
  const inds = [
    {
      view: 1,
      bgGradient: " bg-gradient-to-r from-purple-700 to-purple-200",
      bgGradientR: " bg-gradient-to-l from-purple-500 to-purple-100",
      content: "Top Finance APIs",
    },
    {
      view: 2,
      bgGradient: " bg-gradient-to-r from-lime-600 to-cyan-500",
      bgGradientR: " bg-gradient-to-l from-lime-600 to-cyan-500",
      content: "Top Gaming APIs",
    },
    {
      view: 3,
      bgGradient: " bg-gradient-to-r from-amber-200 to-blue-700",
      bgGradientR: " bg-gradient-to-l from-cyan-500 to-blue-500",
      content: "Top E-Commerce APIs",
    },
    {
      view: 4,
      bgGradient: " bg-gradient-to-r from-cyan-500 to-blue-500",
      bgGradientR: " bg-gradient-to-l from-cyan-500 to-blue-500",
      content: "Top Machine Learning APIs",
    },
  ];

  useEffect(() => {
    // Initialize an index for tracking the current item
    let currentIndex = 0;

    // Set up an interval to update the view state
    const interval = setInterval(() => {
      // Set view to the current item's view property
      setView(inds[currentIndex].view);
      setBgGradient(inds[currentIndex].bgGradient);
      setBgGradientR(inds[currentIndex].bgGradientR);
      setContent(inds[currentIndex].content);
      // Update currentIndex to the next item, looping back to 0 if at the end
      currentIndex = (currentIndex + 1) % inds.length;
    }, 2000); // 2000 ms = 2 seconds

    // Cleanup the interval when the component unmounts or updates
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <>
      {view !== 0 && (
        <div
          className={`w-full flex items-center text-white flex-col md:gap-7 gap-3 h-fit lg:h-[261px] p-5 ease-in-out duration-500 ${bgGradient}`}
        >
          <div className="text-center flex flex-col gap-3">
            <p className="text-xl font-semibold  md:text-2xl lg:text-3xl">
              Discover the right API you need
            </p>
            <p className="">
              Get started and search for any item you need or switch to webber
              to contribute to this platform
            </p>
          </div>
          <div
            className={`w-full md:w-[60%] ${bgGradientR} rounded-full flex justify-between p-3 items-center`}
          >
            <p className="text-xl ease-in-out duration-500">{content}</p>
            <button className="rounded-full flex items-center bg-white   px-5 py-2 gap-2 shadow-md text-primary font-seibold">
              View <FaChevronRight />
            </button>
          </div>
          <div className="flex items-center gap-2 justify-center">
            {inds.map((item, index) => (
              <div
                className={`ease-in-out duration-500 ${
                  view === item.view
                    ? "bg-[linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3))] w-[50px]"
                    : "bg-dark-grey-fade  w-[10px]"
                }  h-[10px] rounded-full`}
                key={index}
              ></div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// type MidButtonProps = {
//     view:number
// }
// function MidButton ({view}:MidButtonProps){
//     switch (view) {
//         case 1:

//             break;

//         default:
//             break;
//     }
// }
