import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import OnboardingLayout from "@/components/Layout/onboardingLayout";
import { Button, Input } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { SignInDto } from "@/models/onboarding.model";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
type NewCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewRole({ isOpen, onClose }: NewCategoryModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const { setApiErrorMessage } = useOnboarding();
  const initialValues = {
    email: "",
    name: "",
    role: "",
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
    if (!values.name) {
      errors.name = "This field is required";
    }

    // const reg = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!values.role) {
      errors.role = "This field is required";
    }
    //

    return errors;
  }

  async function onSubmit(values: any, actions: any) {
    setLoading(true);
    try {
      const loginData = {
        email: values.email,
        role: values.role,
        name: values.name,
      };

      //   const loginres = await OnboardingServices.signInUser(loginData);
      //   actions.setSubmitting(false);
      //   CookieManager.setCookie("jwt", loginres.data.jwt, 12);
      //   toast({
      //     status: "success",
      //     description: "Welcome",
      //     position: "bottom-right",
      //   });

      //   setUser(loginres.data.user);
      //   if (loginres.data.user.roles.some((r: Irole) => r.id === 1)) {
      //     router.push({
      //       pathname: "/api_discovery",
      //     });
      //     setUserType("webber");
      //   } else {
      //     router.push({
      //       pathname: "/admin_back_office/category_management",
      //     });
      //   }
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="">
          <div className="flex flex-col ">
            <p className="text-[24px] font-bold">Configure Role</p>
            <p className="text-[16px] text-mid-grey">
              A mail will be sent to the user to complete their account setup
            </p>
          </div>
        </ModalHeader>
        <ModalCloseButton
          position="absolute"
          top="28px"
          right="30px"
          size="sm"
          _hover={{ bg: "gray.200" }}
          sx={{
            borderRadius: "full",
            border: "2px solid gray",
            borderColor: "gray.700",
          }}
        />
        <ModalBody className="w-full rounded-lg bg-white">
          <div className=" rounded-xl flex flex-col gap-3 p-5 ">
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
                          mt={3}
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                            Email Address
                          </FormLabel>
                          <Input
                            // secondaryElement
                            type="text"
                            placeholder="Your email address ( .....@.....)"
                            field={{ ...field }}
                          />

                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="name">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          mt={3}
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                            Name of User
                          </FormLabel>
                          <Input
                            // secondaryElement
                            type="text"
                            placeholder="Your name (Jane Foster)"
                            field={{ ...field }}
                          />

                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="role">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          mt={3}
                          isInvalid={form.errors.role && form.touched.role}
                        >
                          <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                            Role
                          </FormLabel>
                          <select
                            // type="text"
                            // placeholder="Assign a role to the user"
                            {...field}
                            className="p-2 w-full rounded-lg border"
                          >
                            <option value="">Assign a role to the user</option>
                            <option value="CCM">CCM</option>
                          </select>

                          <FormErrorMessage>
                            {form.errors.role}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <div className="my-5 flex gap-2 items-center justify-end">
                      <button
                        className="bg-[#F5F5F5] w-fit h-fit px-5 py-2 rounded-lg text-[#474A57]"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        Cancel
                      </button>
                      <Button
                        Type="submit"
                        className="font-semibold"
                        text="Add User"
                        type="fit"
                        onClick={() => {}}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
