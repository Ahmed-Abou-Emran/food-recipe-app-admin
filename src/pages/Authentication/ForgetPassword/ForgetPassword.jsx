import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiLock as Lock, FiMail as Email } from "react-icons/fi";
import { useSearchParams, Link } from "react-router-dom";
import styled from "styled-components";
import { PasswordIconInput } from "../../../ui/inputs";
import { FiCheckCircle as Code } from "react-icons/fi";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../services/VALIDATIONS";
import { usersURLs } from "../../../services/END_POINTS";
import { motion } from "framer-motion";
import { formVariants } from "../formAnimations";
export const ForgetPassword = () => {
  const [isLoading, setisLoading] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams({ step: 1 });
  const step = searchParams.get("step");
  const [verified, setVerified] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setisLoading(true);
      const response = axios.post(
        step == 1 ? usersURLs.resetRequest : usersURLs.reset,
        data
      );

      toast.success(
        `${
          step == 1
            ? "OTP has been sent to your inbox"
            : "Password has been reset Successfully"
        }`
      );
      if (step == 1) {
        setSearchParams({ step: 2 });
      } else {
        setVerified(true);
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    } finally {
      setisLoading(false);
    }
  };

  if (verified)
    return (
      <Wrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style={{ width: "5rem", height: "5rem", color: "var(--green-500)" }}
        >
          <motion.path
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 1.5 }}
            d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
          />
          <motion.path
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            d="m9 11 3 3L22 4"
          />
        </svg>
        <motion.h2
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Password Reset Sucessfully !
        </motion.h2>
        <Login
          to="/login"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Go To Login
        </Login>
      </Wrapper>
    );

  return (
    <>
      <Steps
        as={motion.div}
        variants={formVariants}
        initial="initial"
        animate="animate"
      >
        <Step
          as={motion.button}
          variants={formVariants}
          style={{ backgroundColor: step == 1 ? "var(--green-700)" : null }}
          onClick={() => setSearchParams({ step: 1 })}
        >
          1
        </Step>
        <Step
          as={motion.button}
          variants={formVariants}
          style={{ backgroundColor: step == 2 ? "var(--green-700)" : null }}
          onClick={() => setSearchParams({ step: 2 })}
        >
          2
        </Step>
      </Steps>
      {/* Request Reset Password */}
      <FormWrapper
        as={motion.form}
        variants={formVariants}
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.header variants={formVariants}>
          <motion.h1 variants={formVariants}>
            {step == 1 ? "Request Reset Password" : "Reset Password"}
          </motion.h1>
          <motion.p variants={formVariants}>
            {step == 1
              ? "Please Enter Your Email And Check Your Inbox"
              : "Please Enter Your OTP or Check Your Inbox"}
          </motion.p>
        </motion.header>
        <motion.main
          key={step}
          variants={formVariants}
          initial="initial"
          animate="animate"
        >
          {step == 1 && (
            // {step === 1 && (

            <InputWrapper variants={formVariants}>
              <Email size="1.5rem" />
              <input
                {...register("email", EmailValidation)}
                type="text"
                placeholder="Email"
              />
              {errors.email && <span>{errors.email.message}</span>}
            </InputWrapper>
          )}

          {step == 2 && (
            // Reset Password
            <>
              <InputWrapper variants={formVariants}>
                <Email size="1.5rem" />
                <input
                  {...register("email", EmailValidation)}
                  type="text"
                  placeholder="Email"
                />
                {errors.email && <span>{errors.email.message}</span>}
              </InputWrapper>
              <InputWrapper variants={formVariants}>
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
              <InputWrapper variants={formVariants}>
                <PasswordIconInput
                  error={errors?.password?.message}
                  {...register("password", PasswordValidation)}
                  placeholder="New Password"
                />
              </InputWrapper>
              <InputWrapper variants={formVariants}>
                <PasswordIconInput
                  error={errors?.confirmPassword?.message}
                  {...register("confirmPassword", {
                    validate: (value) =>
                      getValues("password") === value ||
                      "Passwords don't match",
                    ...PasswordValidation,
                  })}
                  placeholder="Confirm New Password"
                />
              </InputWrapper>
            </>
          )}
          <motion.button
            variants={formVariants}
            type="submit"
            disabled={isLoading}
          >
            {step == 1 &&
              (isLoading ? "Sending verification Code ⌛" : " Reset Password")}
            {step == 2 && (isLoading ? "Verifying your Request ⌛" : "Verify ")}
          </motion.button>
        </motion.main>
      </FormWrapper>
    </>
  );
};

const Steps = styled.nav`
  display: flex;
  gap: var(--spacing-40);
`;
const Step = styled.button`
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
  &:focus {
    outline-offset: 2px;
  }
  transition: background-color 0.2s ease-in-out;
`;
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  h2 {
    color: var(--green-900);
  }
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

const InputWrapper = motion(styled.div`
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
    right: 0;
    width: 3rem;
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
`);

const Login = motion(styled(Link)`
  align-self: flex-end;
  color: var(--green-600);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  &:hover,
  &:focus {
    text-decoration: underline;
    outline: none;
  }

  transition: text-decoration 0.2s ease-in-out;
`);
