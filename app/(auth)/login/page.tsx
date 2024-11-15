"use client";
import { AppButton } from "@/components/atoms/buttons/app-button";
import { AppInput } from "@/components/atoms/inputs/app-input";
import Link from "next/link";
import { useReducer } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { formatAuthError } from "@/utils/format-auth-error";
import { toast } from "react-toastify";
import { AuthError } from "@supabase/supabase-js";
type InitialState = {
  email: {
    value: string;
    error: string;
    blur: boolean;
  };
  password: { value: string; error: string; blur: boolean };
  loading: boolean;
  error: string;
};
const initialState: InitialState = {
  email: { value: "", error: "", blur: false },
  password: { value: "", error: "", blur: false },
  loading: false,
  error: "",
};
type Action =
  | { type: "email"; payload: { value: string; error: string; blur: boolean } }
  | {
      type: "password";
      payload: { value: string; error: string; blur: boolean };
    }
  | { type: "loading"; payload: boolean }
  | { type: "error"; payload: string };
const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "email":
      return {
        ...state,
        email: {
          ...state.email,
          value: action.payload.value,
          error: action.payload.error,
          blur: action.payload.blur,
        },
      };
    case "password":
      return {
        ...state,
        password: {
          ...state.password,
          value: action.payload.value,
          error: action.payload.error,
          blur: action.payload.blur,
        },
      };
    case "loading":
      return { ...state, loading: action.payload };
    case "error":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default function LoginPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    let formIsValid = true;
    if (state.email.value.trim() === "") {
      dispatch({
        type: "email",
        payload: {
          value: state.email.value,
          error: "Can't be empty",
          blur: true,
        },
      });
      formIsValid = false;
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.value) === false) {
      dispatch({
        type: "email",
        payload: {
          value: state.email.value,
          error: "Please check again",
          blur: true,
        },
      });
      formIsValid = false;
    } else {
      dispatch({
        type: "email",
        payload: {
          value: state.email.value,
          error: "",
          blur: true,
        },
      });
    }

    if (state.password.value.trim() === "") {
      dispatch({
        type: "password",
        payload: {
          value: state.password.value,
          error: "Can't be empty",
          blur: true,
        },
      });
      formIsValid = false;
    } else if (state.password.value.trim().length < 8) {
      dispatch({
        type: "password",
        payload: {
          value: state.password.value,
          error: "At least 8 characters",
          blur: true,
        },
      });
      formIsValid = false;
    } else {
      dispatch({
        type: "password",
        payload: {
          value: state.password.value,
          error: "",
          blur: true,
        },
      });
    }
    if (!formIsValid) return;

    dispatch({ type: "loading", payload: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: state.email.value,
        password: state.password.value,
      });
      dispatch({ type: "loading", payload: false });

      if (error) {
        dispatch({ type: "error", payload: formatAuthError(error.message) });
        throw error;
      }

      router.push("/");
    } catch (error) {
      toast.error(
        formatAuthError(
          (error as AuthError)?.message || "Failed to authenticate"
        )
      );
      console.log(error);
    }
  };
  return (
    <form className="bg-white flex flex-col items-start w-full sm:w-fit sm:p-10 gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-dark-grey !text-2xl text-heading-m  sm:text-heading-m">
          Login
        </h1>
        <p className="text-grey text-body-m">
          Add your details below to get back into the app
        </p>
      </div>
      <div className="w-full sm:w-[400px] flex flex-col self-stretch items-start gap-6">
        <AppInput
          id="email"
          title="Email address"
          value={state.email.value}
          blur={state.email.blur}
          type="email"
          onChange={(e) =>
            dispatch({
              type: "email",
              payload: {
                value: e.target.value,
                error:
                  e.target.value === ""
                    ? "Can't be empty"
                    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                    ? ""
                    : "Please check again",
                blur: state.email.blur,
              },
            })
          }
          onBlur={(e) =>
            dispatch({
              type: "email",
              payload: {
                value: state.email.value,
                error: state.email.error,
                blur: true,
              },
            })
          }
          hasIcon={true}
          hasError={state.email.error.length > 0}
          errorValue={state.email.error}
          placeholder="e.g.ben@example.com"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM13.5 12H2.5V4.63688L7.66187 9.36875C7.75412 9.45343 7.87478 9.50041 8 9.50041C8.12522 9.50041 8.24588 9.45343 8.33813 9.36875L13.5 4.63688V12Z"
              fill="#737373"
            />
          </svg>
        </AppInput>
        <AppInput
          type="password"
          id="password"
          title="Password"
          placeholder="At least 8 characters"
          value={state.password.value}
          blur={state.password.blur}
          onChange={(e) =>
            dispatch({
              type: "password",
              payload: {
                value: e.target.value,
                error:
                  e.target.value.trim() === ""
                    ? "Can't be empty"
                    : e.target.value.trim().length < 8
                    ? "At least 8 characters"
                    : "",
                blur: state.password.blur,
              },
            })
          }
          onBlur={(e) =>
            dispatch({
              type: "password",
              payload: {
                value: state.password.value,
                error: state.password.error,
                blur: true,
              },
            })
          }
          hasIcon={true}
          hasError={state.password.error.length > 0}
          errorValue={state.password.error}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13 5H11V3.5C11 2.70435 10.6839 1.94129 10.1213 1.37868C9.55871 0.81607 8.79565 0.5 8 0.5C7.20435 0.5 6.44129 0.81607 5.87868 1.37868C5.31607 1.94129 5 2.70435 5 3.5V5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V6C14 5.73478 13.8946 5.48043 13.7071 5.29289C13.5196 5.10536 13.2652 5 13 5ZM8.5 9.91438V11.5C8.5 11.6326 8.44732 11.7598 8.35355 11.8536C8.25979 11.9473 8.13261 12 8 12C7.86739 12 7.74021 11.9473 7.64645 11.8536C7.55268 11.7598 7.5 11.6326 7.5 11.5V9.91438C7.16639 9.79643 6.88522 9.56434 6.70618 9.25914C6.52715 8.95393 6.46177 8.59526 6.5216 8.24651C6.58144 7.89776 6.76264 7.58139 7.03317 7.35332C7.3037 7.12525 7.64616 7.00016 8 7.00016C8.35384 7.00016 8.6963 7.12525 8.96683 7.35332C9.23736 7.58139 9.41856 7.89776 9.4784 8.24651C9.53823 8.59526 9.47285 8.95393 9.29382 9.25914C9.11478 9.56434 8.83361 9.79643 8.5 9.91438ZM10 5H6V3.5C6 2.96957 6.21071 2.46086 6.58579 2.08579C6.96086 1.71071 7.46957 1.5 8 1.5C8.53043 1.5 9.03914 1.71071 9.41421 2.08579C9.78929 2.46086 10 2.96957 10 3.5V5Z"
              fill="#737373"
            />
          </svg>
        </AppInput>
        <AppButton
          value="Login"
          type="submit"
          onSubmit={submitForm}
          loading={state.loading}
        />
        {state.error && (
          <p className="text-red text-body-m text-center flex justify-center w-full">
            {state.error}
          </p>
        )}
        <p className="text-center text-grey text-body-m mx-auto">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-purple">
            Create account
          </Link>
        </p>
      </div>
    </form>
  );
}
