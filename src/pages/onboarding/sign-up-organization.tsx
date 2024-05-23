import dynamic from "next/dynamic";
const OnboardingLayout = dynamic(
  () => import("../../components/onboarding/layout"),
  { ssr: false }
);
import { Button, Input } from "@/components/utils";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import google from "../../../public/icons/googleIcon.svg";
import github from "../../../public/icons/githubIcon.svg";
import { useOnboarding } from "@/context/OnboardingContext";
import { RegisterUserDto, SignInDto } from "@/models/onboarding.model";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { Formik, Field, Form } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import CookieManager from "@/helper_utils/cookie_manager";

export default function SignUpOrganization() {
  const router = useRouter();
  const {
    progress,
    setProgress,
    setStage,
    setLoading,
    setApiErrorMessage,
    setUser,
  } = useOnboarding();
  const toast = useToast();
  const [email, setEmail] = useState<string>("");
  const initialValues = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
    check: false,
  };

  function validate(values: any) {
    // setErrorMessage("");
    const errors: any = {};
    if (!values.email) {
      errors.email = "This field is required";
    }
    if (!values.name) {
      errors.name = "This field is required";
    }
    if (!values.check) {
      errors.check = "This field is required";
    }
    const reg = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!values.password) {
      errors.password = "This field is required";
    } else if (!reg.test(values.password)) {
      errors.password =
        "password is not strong enough, minimum length must be 8 characters and must includes a capital letter, special character";
    } else if (values.password !== values.cPassword) {
      errors.cPassword = "This field does not matched password";
    }
    //

    return errors;
  }

  async function onSubmit(values: any, actions: any) {
    setLoading(true);
    setProgress(50);
    setStage(2);
    const data: RegisterUserDto = {
      name: values.name,
      officeEmail: values.email,
      officePhoneNumber: "string",
      usageLocation: "string;",
      prefferedLanguageId: 1,
      createdBy: values.name,
      password: values.password,
    };
    try {
      const res = await OnboardingServices.RegisterUser(data);

      const loginData: SignInDto = {
        email: res.data.officeEmail,
        password: values.password,
      };

      const loginres = await OnboardingServices.signInUser(loginData);
      actions.setSubmitting(false);
      CookieManager.setCookie("jwt", loginres.data.jwt, 2);
      toast({
        status: "success",
        description: "User successfully created",
        position: "bottom-right",
      });
      router.push({
        pathname: "/onboarding/authentication",
        query: {
          email: values.email,
          userId: loginres.data.user.id,
        },
      });
      setUser(loginres.data.user);
    } catch (error: any) {
      console.log(error);
      actions.setSubmitting(false);
      setProgress(25);
      setStage(1);
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
      return;
    }
  }

  useEffect(() => {
    setLoading(false);
    setProgress(25);
    setStage(1);
  }, []);
  return (
    <OnboardingLayout title="Finish creating your account" step={1}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(props) => (
          <Form>
            <Field name="name">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  mt={6}
                  isInvalid={form.errors.name && form.touched.name}
                >
                  <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                    Name
                  </FormLabel>
                  <Input
                    // secondaryElement
                    type="text"
                    placeholder="AZY Corporation"
                    field={{ ...field }}
                  />

                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  mt={6}
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                    Email Address
                  </FormLabel>
                  <Input
                    // secondaryElement
                    type="text"
                    placeholder="ayz@corp.com"
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
            <Field name="cPassword">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  mt={6}
                  isInvalid={form.errors.cPassword && form.touched.cPassword}
                >
                  <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                    Confirm Password
                  </FormLabel>
                  <Input
                    secondaryElement
                    // type="text"
                    placeholder="ayz@corp.com"
                    field={{ ...field }}
                  />
                  <FormErrorMessage>{form.errors.cPassword}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="check">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  mt={6}
                  isInvalid={form.errors.check && form.touched.check}
                >
                  <div className="flex flex-row gap-2">
                    <input
                      // secondaryElement
                      type="checkbox"
                      placeholder="ayz@corp.com"
                      {...field}
                    />
                    <p className="text-dark-grey">
                      By signing up, I agree to the{" "}
                      <span className="text-primary">Terms</span> and{" "}
                      <span className="text-primary">Privacy Policy</span>{" "}
                    </p>
                  </div>

                  <FormErrorMessage>{form.errors.check}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <div className="flex flex-col mt-2 gap-2">
              <Button
                text="Create Account"
                type="full"
                Type="submit"
                onClick={() => {
                  // router.push({
                  //   pathname: "/onboarding/authentication",
                  //   query: {
                  //     email,
                  //   },
                  // });
                  // setLoading(true);
                  // setProgress(50);
                  // setStage(2);
                }}
              />
              <p className="text-dark-grey text-sm text-center ">or</p>
              <div className="flex flex-col items-center md:flex-row gap-3">
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
              <p className="text-center text-dark-grey">
                Already have an account?{" "}
                <span
                  className="text-primary cursor-pointer font-semibold"
                  onClick={() => {
                    router.push("/onboarding/login");
                  }}
                >
                  Log in{" "}
                </span>{" "}
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </OnboardingLayout>
  );
}
