import OnboardingNavbar from "@/components/onboarding/onboardingNavbar";
import { Button, Input } from "@/components/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import google from "../../../public/icons/googleIcon.svg";
import github from "../../../public/icons/githubIcon.svg";
import { FaChevronLeft } from "react-icons/fa";
import CookieManager from "@/helper_utils/cookie_manager";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { SignInDto } from "@/models/onboarding.model";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useOnboarding } from "@/context/OnboardingContext";
import { Formik, Field, Form } from "formik";
import OnboardingLayout from "@/components/onboarding/layout";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState<string>("");
  const { setLoading, setApiErrorMessage, setUser } = useOnboarding();
  const initialValues = {
    email: "",
    password: "",
  };
  useEffect(() => {
    setLoading(false);
  }, []);

  function validate(values: any) {
    // setErrorMessage("");
    const errors: any = {};
    if (!values.email) {
      errors.email = "This field is required";
    }

    const reg = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!values.password) {
      errors.password = "This field is required";
    }
    //

    return errors;
  }

  async function onSubmit(values: any, actions: any) {
    setLoading(true);
    try {
      const loginData: SignInDto = {
        email: values.email,
        password: values.password,
      };

      const loginres = await OnboardingServices.signInUser(loginData);
      actions.setSubmitting(false);
      CookieManager.setCookie("jwt", loginres.data.jwt, 2);
      toast({
        status: "success",
        description: "Welcome",
        position: "bottom-right",
      });

      setUser(loginres.data.user);
      router.push({
        pathname: "/api_discovery",
      });
    } catch (error: any) {
      console.log(error);
      actions.setSubmitting(false);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  }

  return (
    <OnboardingLayout>
      <div className="w-full">
        <div
          className="flex my-2 items-center cursor-pointer flex-row gap-3"
          //   onClick={() => {
          //     router.p;

          //   }}
        >
          <FaChevronLeft />

          <div className="flex flex-col gap-2">
            <p className="font-[14px] font-semibold">Login</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          {(props) => (
            <Form>
              <Field name="email">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    mt={6}
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                      Email
                    </FormLabel>
                    <Input
                      // secondaryElement
                      type="text"
                      placeholder="AZY Corporation"
                      field={{ ...field }}
                    />

                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    mt={6}
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                      Password
                    </FormLabel>
                    <Input
                      secondaryElement
                      // type="text"
                      placeholder="ayz@corp.com"
                      field={{ ...field }}
                    />

                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <div className="flex mt-1 mb-3 w-full justify-end flex-row gap-2">
                <p
                  className="text-primary font-semibold text-sm cursor-pointer"
                  onClick={() => router.push("/onboarding/forgotPassword")}
                >
                  Forgot Password?
                </p>
              </div>
              <div className="mb-5">
                <Button
                  Type="submit"
                  text="Sign In"
                  type="full"
                  onClick={() => {}}
                />
              </div>
              <p className="text-dark-grey text-sm text-center ">or</p>
              <div className="flex flex-col w-full items-center my-3 md:flex-row gap-3">
                <button className="flex gap-2 w-full bg-[#C0E0FF] rounded-full items-center p-2">
                  <Image
                    src={google}
                    alt="icon"
                    width={200}
                    height={200}
                    className="w-[30px] h-[30px]"
                  />
                  <p className="text-dark-grey text-sm">Sign in with Google</p>
                </button>
                <button className="flex gap-2 w-full bg-white border-[1px] border-black rounded-full items-center p-2">
                  <Image
                    src={github}
                    alt="icon"
                    width={200}
                    height={200}
                    className="w-[30px] h-[30px]"
                  />
                  <p className="text-dark-grey text-sm">Sign in with Github</p>
                </button>
              </div>
              <p className="text-center my-3 text-dark-grey">
                Don&apos;t have an account?{" "}
                <span
                  className="text-primary cursor-pointer font-semibold"
                  onClick={() => {
                    router.push("/onboarding/sign-up-organization");
                  }}
                >
                  Sign Up{" "}
                </span>{" "}
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </OnboardingLayout>
  );
}
