// import OnboardingLayout from "@/components/onboarding/layout";
import { Button, Input } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { ResetPassword, VerifyTokenDto } from "@/models/onboarding.model";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const OnboardingLayout = dynamic(
  () => import("@/components/onboarding/layout"),
  {
    ssr: false,
  }
);

import { useState } from "react";
import { BsDot } from "react-icons/bs";
import OTPInput from "react-otp-input";
export default function ForgotPassword() {
  const toast = useToast();
  const router = useRouter();
  const [view, setView] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const { setApiErrorMessage } = useOnboarding();
  const initialValues = {
    password: "",
    cPassword: "",
  };

  const requestForgetPassword = async (email: string) => {
    if (email === "") {
      setApiErrorMessage &&
        setApiErrorMessage("Email is required to proceed", "error");
      return;
    }

    try {
      const res = await OnboardingServices.requestForgotPassword(email);
      if (res.data.responseCode === 200) {
        toast({
          description: "A verification Token has been sent to your mail.",
          status: "success",
          position: "bottom-right",
        });
        setView(2);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  const verifyToken = async (email: string, token: string) => {
    const data: VerifyTokenDto = {
      email,
      token,
    };
    try {
      const res = await OnboardingServices.VerifyPasswordToken(data);
      toast({
        description: "Token successfully Verified",
        status: "success",
        position: "bottom-right",
      });
      setView(3);
    } catch (error: any) {
      console.log(error);
      // actions.setSubmitting(false);

      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };

  function validate(values: any) {
    // setErrorMessage("");
    const errors: any = {};

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
    const data: ResetPassword = {
      email,
      newPassword: values.cPassword,
    };
    try {
      const res = await OnboardingServices.resetPassword(data);

      actions.setSubmitting(false);
      toast({
        status: "success",
        description: "Password reset successful",
        position: "bottom-right",
      });
      router.push({
        pathname: "/onboarding/login",
      });
    } catch (error: any) {
      console.log(error);
      actions.setSubmitting(false);

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
          <div className="flex flex-col gap-2">
            <p className="font-[14px] font-semibold">Forgot Password</p>
          </div>
        </div>
        {view === 1 ? (
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Email Address</p>
              <input
                type="text"
                name="email"
                placeholder="ayz@corp.com"
                className="outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-end">
              <Button
                text="Send Token"
                type="fit"
                onClick={() => {
                  requestForgetPassword(email);
                }}
              />
            </div>
          </div>
        ) : view === 2 ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col ">
              <p className="text-sm text-dark-grey my-3 font-semibold">
                A verification token has been sent to{" "}
                <span className="w-fit px-3 py-1 bg-primaryFade rounded-full text-primary">
                  {email}
                </span>
              </p>
              <OTPInput
                value={token}
                onChange={setToken}
                numInputs={6}
                containerStyle={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
                renderSeparator={
                  <span className="mx-3">
                    <BsDot />
                  </span>
                }
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{
                      width: 50,
                    }}
                    className="border-[1px] border-light-grey w-[70px] h-[50px] rounded p-4 "
                  />
                )}
              />
              <div className="w-full flex my-4 justify-end">
                <Button
                  text="Verify Token"
                  type="fit"
                  onClick={() => {
                    verifyToken(email, token);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validate={validate}
            >
              {(props) => (
                <Form>
                  <Field name="password">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        mt={6}
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
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

                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cPassword">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        mt={6}
                        isInvalid={
                          form.errors.cPassword && form.touched.cPassword
                        }
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
                        <FormErrorMessage>
                          {form.errors.cPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <div className="flex items-end flex-col mt-4 gap-2">
                    <Button
                      text="Reset Password"
                      type="fit"
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
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </OnboardingLayout>
  );
}
