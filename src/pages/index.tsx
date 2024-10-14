"use client";
import { Button } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import Image from "next/image";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false, // Disable server-side rendering for this component
});
// import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
// logout function
// auth config
// http  & services config
// protected routes implementation

export default function Home() {
  return (
    <div className="flex items-center h-screen justify-center">
      {/* <p className="text-5xl">{progress}</p> */}
      <Button
        type="full"
        text="Hello"
        onClick={() => {
          console.log("first");
        }}
      />
      hello
      <div className="overflow-scroll h-[400px]">
        {/* <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" /> */}
      </div>
    </div>
  );
}
