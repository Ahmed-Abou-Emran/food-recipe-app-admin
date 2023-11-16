import React from "react";
import styled from "styled-components";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import AuthLogo from "../assets/authLogo.png";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
function ForgetPassword() {
  const [step, setStep] = React.useState(1);
  const [userInput, setUserInput] = React.useState({
    email: "",
    otp: "",
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
  };
  const onSubmit = (data) => {
    axios
      .post(
        `http://upskilling-egypt.com:3002/api/v1/Users/Reset/${
          step === 1 ? "Request" : ""
        }`,
        data
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        //   },
        // }
      )
      .then((res) => {
        console.log(res.data);
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
        localStorage.setItem("adminToken", res.data.token);
      })
      .catch((err) => {
        console.error(err);
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
        });
        console.error(err.response.data.message);
      });
  };
  console.log(errors);
  return (
    <Wrapper>
      <LogoWrapper>
        <img src={AuthLogo} alt="Logo" />
      </LogoWrapper>
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
      {step === 1 && (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <header>
            <h1>Reset Password</h1>
            <p> Please Enter Your Email And Check Your Inbox</p>
          </header>

          <main>
            <InputWrapper>
              <input
                {...register("email", {
                  required: "This field is required ",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                type="text"
                placeholder="Email"
              />
              {errors.email && <span>{errors.email.message}</span>}
            </InputWrapper>
            <button>Send</button>
          </main>
        </FormWrapper>
      )}

      {step === 2 && (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <header>
            <h1>Request Reset Password</h1>
            <p> Please Enter Your OTP or Check Your Inbox </p>
          </header>

          <main>
            <InputWrapper>
              <input
                {...register("email", {
                  required: "This field is required ",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                type="text"
                placeholder="Email"
              />
              {errors.email && <span>{errors.email.message}</span>}
            </InputWrapper>
            <InputWrapper>
              <input
                {...register("seed", {
                  required: "This field is required",
                })}
                type="text"
                placeholder="OTP"
              />
              {errors.oldPassword && <span>{errors.oldPassword.message}</span>}
            </InputWrapper>
            <InputWrapper>
              <input
                {...register("password", {
                  required: "This field is required",
                })}
                type="password"
                placeholder="New Password"
              />
              {errors.newPassword && <span>{errors.newPassword.message}</span>}
            </InputWrapper>
            <InputWrapper>
              <input
                {...register("confirmPassword", {
                  required: "This field is required",
                  validate: (value) =>
                    getValues("password") === value || "Passwords don't match",
                })}
                type="password"
                placeholder="Confirm New Password"
              />
              {errors.confirmNewPassword && (
                <span>{errors.confirmNewPassword.message}</span>
              )}
            </InputWrapper>
            <button>Reset Password</button>
          </main>
        </FormWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: clamp(30rem, 65%, 50rem);
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--grey-100);
  padding-inline: var(--spacing-200);
  padding-block: var(--spacing-100);
  gap: var(--spacing-40);
  border-radius: 1rem;
`;

const LogoWrapper = styled.div`
  height: 6rem;
  img {
    height: 100%;
  }
`;

const Steps = styled.nav`
  display: flex;
  gap: var(--spacing-40);
`;
const Step = styled.span`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  /* background-color: ${(props) =>
    props.currentStep ? "var(--green-500)" : "var(--green-300"}; */

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
  gap: var(--spacing-80);

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
    display: flex;
    flex-direction: column;
    gap: var(--spacing-60);
    width: 100%;

    input {
      padding-inline: var(--spacing-40);
      padding-block: var(--spacing-30);
      background: var(--green-100);
      border: none;
      border-radius: 0.5rem;
    }

    button {
      padding-block: var(--spacing-30);
      background-color: var(--green-500);
      color: var(--grey-100);
      border: none;
      border-radius: 0.5rem;

      font-family: Inter;
      font-size: 1.25rem;
      font-weight: 700;

      &:hover {
        background-color: var(--green-600);
        cursor: pointer;
      }

      transition: background-color 0.2s ease-in-out;
    }
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    &:focus {
      outline: 2px solid var(--green-500);
    }
  }
  span {
    position: absolute;
    right: 3rem;
    color: #ef4444;
    font-size: 0.75rem;
    font-weight: 500;
    transform: translateY(50%);
    bottom: 50%;
  }
`;

export default ForgetPassword;
