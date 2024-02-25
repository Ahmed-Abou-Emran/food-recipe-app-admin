import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiCheckCircle as Code } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  FiUser as User,
  FiGlobe as Country,
  FiPhone as Phone,
  FiMail as Email,
} from "react-icons/fi";

import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PasswordIconInput } from "../../../ui/inputs";
import { usersURLs } from "../../../services/END_POINTS";
import {
  EmailValidation,
  PasswordValidation,
  PhoneValidation,
} from "../../../services/VALIDATIONS";

function Register() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams({ step: 1 });
  const step = searchParams.get("step");
  console.log(step);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    axios[step == 1 ? "post" : "put"](
      step == 1 ? usersURLs.register : usersURLs.verify,
      step == 1 ? data : { email: data.email, code: data.code }
    )
      .then((res) => {
        toast.success(
          res?.data?.message ||
            `${
              step == 1
                ? "A Verification Code has been sent to your inbox"
                : "Email Verified Successfully"
            }`,
          {
            position: "top-right",
          }
        );
        step == 1 ? setSearchParams({ step: 2 }) : null;
      })
      .catch((err) => {
        toast.error(`${err.response.data.message || "Something Went Wrong!"}`, {
          position: "top-right",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Steps>
        <Step
          style={{ backgroundColor: step == 1 ? "var(--green-700)" : null }}
          onClick={() => setSearchParams({ step: 1 })}
        >
          1
        </Step>
        <Step
          style={{ backgroundColor: step == 2 ? "var(--green-700)" : null }}
          onClick={() => setSearchParams({ step: 2 })}
        >
          2
        </Step>
      </Steps>
      {step == 1 && (
        // {step === 1 && (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <header>
            <h1>Register a New User</h1>
            <p> Please Enter Your Details !</p>
          </header>

          <main>
            {/* #todo: add image upload with avatar preview */}
            <InputWrapper>
              <User size="1.5rem" />
              <input
                {...register("userName", {
                  required: "This field is required ",
                })}
                type="text"
                placeholder="User Name"
              />
              {errors.userName && <span>{errors.userName.message}</span>}
            </InputWrapper>
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
              <Country size="1.5rem" />
              <input
                {...register("country", {
                  required: "This field is required ",
                })}
                type="text"
                placeholder="country"
              />
              {errors.country && <span>{errors.country.message}</span>}
            </InputWrapper>
            <InputWrapper>
              <Phone size="1.5rem" />
              <input
                {...register("phoneNumber", PhoneValidation)}
                type="text"
                placeholder="Phone Number"
              />
              {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
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
                placeholder="Confirm Password"
              />
            </InputWrapper>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Register"}
            </button>
          </main>
          <Login to="/login">Login instead?</Login>
        </FormWrapper>
      )}

      {step == 2 && (
        // {step === 2 && (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <header>
            <h1>Verify New Account</h1>
            <p>
              Please Enter the verification code and email to verify your
              Account
            </p>
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
                {...register("code", {
                  required: "This field is required",
                })}
                type="text"
                placeholder="Verification Code"
              />
              {errors.code && <span>{errors.code.message}</span>}
            </InputWrapper>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Verify"}
            </button>
          </main>
        </FormWrapper>
      )}
    </>
  );
}

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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--spacing-60);

  h1 {
    font-weight: 600;
    font-size: 1.5625rem;
  }
  p {
    font-size: 1rem;
    font-weight: 400;
    color: var(--grey-400);
  }
  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
    gap: var(--spacing-70);
    width: 100%;

    input {
      padding-inline: var(--spacing-40);
      padding-block: var(--spacing-30);
      background: var(--green-100);
      border: none;
      border-radius: 0.5rem;
    }

    button {
      grid-column: 1/-1;
      padding-block: var(--spacing-30);
      margin-block: var(--spacing-100) var(--spacing-20);
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

const Login = styled(Link)`
  grid-column: -1/2;
  align-self: flex-end;
  color: var(--green-600);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }

  transition: text-decoration 0.2s ease-in-out;
`;
export default Register;
