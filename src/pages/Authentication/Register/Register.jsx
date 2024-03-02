import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  FiUser as User,
  FiGlobe as Country,
  FiPhone as Phone,
  FiMail as Email,
  FiCheckCircle as Code,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ErrorIconInput, PasswordIconInput } from "../../../ui/inputs";
import { usersURLs } from "../../../services/END_POINTS";
import {
  EmailValidation,
  PasswordValidation,
  PhoneValidation,
} from "../../../services/VALIDATIONS";
import { formVariants } from "../formAnimations";

function Register() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams({ step: 1 });
  const [verified, setVerified] = React.useState(false);
  const step = searchParams.get("step");
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
            }`
        );
        step == 1 ? setSearchParams({ step: 2 }) : setVerified(true);
      })
      .catch((err) => {
        toast.error(`${err.response.data.message || "Something Went Wrong!"}`);
      })
      .finally(() => setIsLoading(false));
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
          Email Verified Sucessfully !
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
          variants={formVariants}
          style={{ backgroundColor: step == 1 ? "var(--green-700)" : null }}
          onClick={() => setSearchParams({ step: 1 })}
        >
          1
        </Step>
        <Step
          variants={formVariants}
          style={{ backgroundColor: step == 2 ? "var(--green-700)" : null }}
          onClick={() => setSearchParams({ step: 2 })}
        >
          2
        </Step>
      </Steps>
      <FormWrapper
        as={motion.form}
        variants={formVariants}
        initial="initial"
        animate="animate"
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.header key={step} variants={formVariants}>
          <motion.h1 variants={formVariants}>
            {step == 1 ? "Register a New User" : "Verify New Account"}
          </motion.h1>
          <motion.p variants={formVariants}>
            {step == 1
              ? " Please Enter Your Details !"
              : " Please Enter the verification code and email to verify your Account"}
          </motion.p>
        </motion.header>
        {step == 1 && (
          <>
            <motion.main
              variants={formVariants}
              initial="initial"
              animate="animate"
            >
              {/* #todo: add image upload with avatar preview */}
              <InputWrapper as={motion.div} variants={formVariants}>
                <ErrorIconInput
                  icon={User}
                  error={errors?.userName?.message}
                  {...register("userName", {
                    required: "This field is required ",
                  })}
                  type="text"
                  placeholder="User Name"
                />
              </InputWrapper>
              <InputWrapper as={motion.div} variants={formVariants}>
                <ErrorIconInput
                  icon={Email}
                  error={errors?.email?.message}
                  {...register("email", EmailValidation)}
                  type="text"
                  placeholder="Email"
                />
              </InputWrapper>

              <InputWrapper as={motion.div} variants={formVariants}>
                <ErrorIconInput
                  icon={Country}
                  error={errors?.country?.message}
                  {...register("country", {
                    required: "This field is required ",
                  })}
                  type="text"
                  placeholder="country"
                />
              </InputWrapper>
              <InputWrapper as={motion.div} variants={formVariants}>
                <ErrorIconInput
                  icon={Phone}
                  error={errors?.phoneNumber?.message}
                  {...register("phoneNumber", PhoneValidation)}
                  type="text"
                  placeholder="Phone Number"
                />
              </InputWrapper>

              <InputWrapper as={motion.div} variants={formVariants}>
                <PasswordIconInput
                  error={errors?.password?.message}
                  {...register("password", PasswordValidation)}
                  placeholder="New Password"
                />
              </InputWrapper>
              <InputWrapper as={motion.div} variants={formVariants}>
                <PasswordIconInput
                  error={errors?.confirmPassword?.message}
                  {...register("confirmPassword", {
                    validate: (value) =>
                      getValues("password") === value ||
                      "Passwords don't match",
                    ...PasswordValidation,
                  })}
                  placeholder="Confirm Password"
                />
              </InputWrapper>
              <motion.button
                variants={formVariants}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Register"}
              </motion.button>
            </motion.main>
            <Login variants={formVariants} to="/login">
              Login instead?
            </Login>
          </>
        )}

        {step == 2 && (
          // {step === 2 && (
          <>
            <motion.main variants={formVariants}>
              <InputWrapper as={motion.div} variants={formVariants}>
                <ErrorIconInput
                  icon={Email}
                  error={errors?.email?.message}
                  {...register("email", EmailValidation)}
                  type="text"
                  placeholder="Email"
                />
              </InputWrapper>
              <InputWrapper as={motion.div} variants={formVariants}>
                <ErrorIconInput
                  icon={Code}
                  error={errors?.code?.message}
                  {...register("code", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Verification Code"
                />
              </InputWrapper>

              <motion.button
                variants={formVariants}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Verify"}
              </motion.button>
            </motion.main>
          </>
        )}
      </FormWrapper>
    </>
  );
}

const Steps = styled.nav`
  display: flex;
  gap: var(--spacing-40);
`;
const Step = motion(styled("w")`
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
  text-decoration: none;
  &:hover {
    background-color: var(--green-600);
  }
  transition: background-color 0.2s ease-in-out;
`);

const FormWrapper = styled.form`
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

    button[type="submit"] {
      grid-column: 1/-1;
      padding-block: var(--spacing-30);
      border-radius: 0.5rem;
      margin-block: var(--spacing-100) var(--spacing-20);
      background-color: var(--green-500);
      color: var(--grey-100);
      border: none;
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
    padding-block: var(--spacing-30);
    border-radius: 0.5rem;
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

const Login = motion(styled(Link)`
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
`);
export default Register;
