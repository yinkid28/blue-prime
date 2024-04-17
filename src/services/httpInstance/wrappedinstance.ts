import axios, { HeadersDefaults, AxiosInstance } from "axios";
import CookieManager from "@/helper_utils/cookie_manager";
import { useEffect } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
// ErrorHandling.ts
import { AxiosResponse, AxiosError } from "axios";
const baseURL = "http://40.118.91.177:8060";
const instance = axios.create({
  baseURL,
});

export function getJWT() {
  if (typeof window !== "undefined") {
    let token = CookieManager.getCookie("jwt");
    if (token?.charAt(0) === '"' && token?.charAt(token?.length - 1) === '"') {
      token = token?.substring(1, token?.length - 2);
    }
    // token?.replace(/^"(.*)"$/, '$1');
    // console.log(token?.split('"'))
    return "Bearer " + token;
  }
  return "";
}
export function withErrorHandling(apiCall: Promise<AxiosResponse<any>>) {
  return apiCall.catch((error: AxiosError) => {
    // Error handling logic

    console.error("API Error:", error.response?.status, error.response?.data);
    throw error; // Re-throw the error to be handled where the API call was made
  });
}
// const useHandleResponseErrors = () => {
//   const { setApiErrorMessage } = useOnboarding();
//   useEffect(() => {
//     const interceptor = instance.interceptors.response.use(
//       (res) => res,
//       (err) => {
//         if (process.env.NODE_ENV === "production") {
//           const status = err.response?.status;
//           const statusText = err.response?.statusText;
//           const request = err.response?.data;
//           const url = err.response?.url;

//           console.log({ url, status, statusText, request });
//           console.trace(status + " " + statusText + ": " + url);
//         }

//         switch (err.response?.status || err.response?.data?.statusCode) {
//           case 404:
//             setApiErrorMessage &&
//               setApiErrorMessage(err.response?.data?.message, "error");
//             break;

//           case 400: {
//             if (Array.isArray(err?.response.data?.message)) {
//               setApiErrorMessage &&
//                 setApiErrorMessage(
//                   err?.response.data?.message.join("\n"),
//                   "error"
//                 );
//               return;
//             }
//             setApiErrorMessage &&
//               setApiErrorMessage(err?.response.data?.message, "error");
//             break;
//           }

//           case 401: {
//             const message = err?.response?.data?.message;
//             console.log("setApiErrorMessage", setApiErrorMessage);

//             if (message.toLowerCase().includes("token")) {
//               // logoutSuccess();
//               setApiErrorMessage &&
//                 setApiErrorMessage("Session Timeout, logging out ...", "error");
//             } else {
//               setApiErrorMessage &&
//                 setApiErrorMessage("Invalid login details", "error");
//             }

//             break;
//           }

//           // default:
//           case 500:
//             setApiErrorMessage &&
//               setApiErrorMessage(err.response.message, "error");
//             break;

//           default: {
//             if (err?.message === "Network Error") {
//               // Handle network error
//               const e = "Network Error. Please check your internet connection.";
//               setApiErrorMessage && setApiErrorMessage(e, "error");
//             } else {
//               // Handle other errors
//               const errMessage = err?.response?.data?.message;
//               const message = err.message || "Unknown error occurred";
//               setApiErrorMessage &&
//                 setApiErrorMessage(errMessage || message, "error");
//             }
//           }
//         }
//         return Promise.reject(err);
//       }
//     );

//     return () => {
//       if (interceptor) {
//         instance.interceptors.response.eject(interceptor);
//       }
//     };
//   }, [setApiErrorMessage]);
// };

class HTTPClient {
  static async get(endpoint: string) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json",
      Authorization: getJWT(),
    };

    return withErrorHandling(instance.get(endpoint, { headers }));
  }

  static async post(endpoint: string, data: any) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Content-Type": "application/json",
      Authorization: getJWT(),
    };

    return withErrorHandling(instance.post(endpoint, data, { headers }));
  }

  static async delete(endpoint: string) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json",
      Authorization: getJWT(),
    };
    return withErrorHandling(instance.delete(endpoint, { headers }));
  }

  static async put(endpoint: string, data: any) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Content-Type": "application/json",
      Authorization: getJWT(),
    };

    return withErrorHandling(instance.put(endpoint, data, { headers }));
  }
  static async formDataPost(endpoint: string, data: any) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Content-Type": "multipart/form", //this is not the correct content type please change it
      Authorization: getJWT(),
    };

    withErrorHandling(instance.post(endpoint, data, { headers }));
  }

  static async patch(endpoint: string, data: any) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PATCH",
      "Content-Type": "application/json",
      Authorization: getJWT(),
    };
    withErrorHandling(instance.patch(endpoint, data, { headers }));
  }
}
export default HTTPClient;
