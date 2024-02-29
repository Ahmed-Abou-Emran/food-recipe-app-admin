import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiLock as Lock, FiMail as Email } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PasswordIconInput } from "../../../ui/inputs";
import { FiCheckCircle as Code } from "react-icons/fi";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../services/VALIDATIONS";
import { usersURLs } from "../../../services/END_POINTS";

export const ForgetPassword = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  let [searchParams, setSearchParams] = useSearchParams({ step: 1 });
  const [step, setStep] = React.useState(() => +searchParams.get("step") || 1);
  const [userInput, setUserInput] = React.useState({
    email: "",
    seed: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onStepHandler = (step) => {
    setStep(step);
    setUserInput({ userInput, ...getValues() });
    setSearchParams({ step });
  };
  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post(step === 1 ? usersURLs.resetRequest : usersURLs.reset, data)
      .then((res) => {
        toast.success(
          `${
            step === 1
              ? "OTP has been sent to your inbox"
              : "Password has been reset Successfully"
          }`,
          {
            position: "top-right",
          }
        );
        if (step === 1) {
          onStepHandler(2);
        } else {
          // useNavigate("/login");
        }
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Steps>
        <Step
          style={{ backgroundColor: step === 1 ? "var(--green-700)" : null }}
          onClick={() => onStepHandler(1)}
        >
          1
        </Step>
        <Step
          style={{ backgroundColor: step === 2 ? "var(--green-700)" : null }}
          onClick={() => onStepHandler(2)}
        >
          2
        </Step>
      </Steps>
      {/* Request Reset Password */}
      {+searchParams.get("step") === 1 && (
        // {step === 1 && (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <header>
            <h1>Request Reset Password</h1>
            <p> Please Enter Your Email And Check Your Inbox</p>
          </header>

          <main>
            <InputWrapper>
              <Email size="1.5rem" />
              <input
                {...register("email", EmailValidation)}
                type="text"
                placeholder="Email"
              />
              {errors.email && <span>{errors.email.message}</span>}
            </InputWrapper>
            <button disabled={isLoading}>
              {isLoading ? "Loading..." : "Send"}
            </button>
          </main>
        </FormWrapper>
      )}

      {+searchParams.get("step") === 2 && (
        // Reset Password
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <header>
            <h1> Reset Password</h1>
            <p> Please Enter Your OTP or Check Your Inbox </p>
          </header>

          <main>
            <InputWrapper>
              <Email size="1.5rem" />
              <input
                {...register("email", EmailValidation)}
                type="text"
                placeholder="Email"
              />
              {errors.email && <span>{errors.email.message}</span>}
            </InputWrapper>
            <InputWrapper>
              <Code size="1.5rem" />
              <input
                {...register("seed", {
                  required: "This field is required",
                })}
                type="text"
                placeholder="OTP"
              />
              {errors.seed && <span>{errors.seed.message}</span>}
            </InputWrapper>
            <InputWrapper>
              <PasswordIconInput
                error={errors?.password?.message}
                {...register("password", PasswordValidation)}
                placeholder="New Password"
              />
            </InputWrapper>
            <InputWrapper>
              <PasswordIconInput
                error={errors?.confirmPassword?.message}
                {...register("confirmPassword", {
                  validate: (value) =>
                    getValues("password") === value || "Passwords don't match",
                  ...PasswordValidation,
                })}
                placeholder="Confirm New Password"
              />
            </InputWrapper>
            <button disabled={isLoading}>
              {isLoading ? "Loading..." : "Reset Password"}
            </button>
          </main>
        </FormWrapper>
      )}
    </>
  );
};

const Steps = styled.nav`
  display: flex;
  gap: var(--spacing-40);
`;
const Step = styled.span`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;

  background-color: var(--green-400);
  color: var(--grey-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  &:hover {
    cursor: pointer;
    background-color: var(--green-600);
  }
  transition: background-color 0.2s ease-in-out;
`;

const FormWrapper = styled.form`
  main {
    display: grid;
    width: 100%;
    gap: var(--spacing-70);

    input {
      padding-inline: var(--spacing-40);
      padding-block: var(--spacing-30);
      background: var(--green-100);
      border: none;
      border-radius: 0.5rem;
    }

    button:last-child {
      padding-block: var(--spacing-30);
      margin-block: var(--spacing-30);
      background-color: var(--green-500);
      color: var(--grey-100);
      border: none;
      border-radius: 0.5rem;
      text-align: center;
      font-family: Inter;
      font-size: 1.25rem;
      font-weight: 700;

      &:hover {
        background-color: var(--green-600);
        cursor: pointer;
      }

      &:disabled {
        cursor: not-allowed;
      }
      transition: background-color 0.2s ease-in-out;
    }
  }
`;

const InputWrapper = styled.div`
  background: var(--green-100);
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;

  gap: var(--spacing-40);
  padding-inline-start: var(--spacing-40);
  border-radius: 0.5rem;
  input {
    width: 100%;
    &:focus {
      outline: 2px solid var(--green-500);
    }

    svg {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--grey-400);
    }
  }
  span {
    padding-inline-start: var(--spacing-120);
    position: absolute;
    color: #ef4444;
    font-size: 0.75rem;
    font-weight: 500;
    bottom: -5px;
    transform: translateY(100%);
  }

  input + button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    position: absolute;
    width: 3rem;
    right: 0;
    padding-inline: var(--spacing-20);
    background: var(--green-100) !important;
    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: 2px solid var(--green-500);
    }

    svg {
      color: var(--green-800);
    }
  }
`;
