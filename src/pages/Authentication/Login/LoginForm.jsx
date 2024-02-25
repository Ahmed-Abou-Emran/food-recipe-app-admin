import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";

import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail as Email } from "react-icons/ai";
import { useUserContext } from "../../UserProvider";
import { ErrorIconInput, PasswordIconInput } from "../../../ui/inputs";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../services/VALIDATIONS";
import { usersURLs } from "../../../services/END_POINTS";
const LoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  const { loginHandler } = useUserContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(usersURLs.login, data)
      .then((res) => {
        toast.success("Login Successfully", {
          position: "top-right",
        });
        const token = res.data.token;
        loginHandler(token);
        navigate("/home");
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`, {
          position: "top-right",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <header>
        <h1>Login</h1>
        <p> Welcome Back! Please enter your details</p>
      </header>
      <main>
        <InputWrapper>
          <ErrorIconInput
            icon={Email}
            error={errors?.email?.message}
            {...register("email", EmailValidation)}
            type="email"
            placeholder="Enter your email"
          />
        </InputWrapper>
        <InputWrapper>
          <PasswordIconInput
            error={errors?.password?.message}
            {...register("password", PasswordValidation)}
            placeholder="Password"
          />
        </InputWrapper>

        <button disabled={loading}>
          {loading ? "Letting you In ⌛" : "Login"}
        </button>
        <Links>
          <Register to="/register">Register Now</Register>
          <Forget to="/forget-password">Forgot Password?</Forget>
        </Links>
      </main>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--spacing-80);

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
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--green-100);
  padding-inline-start: var(--spacing-40);
  border-radius: 0.5rem;
  gap: var(--spacing-20);
  position: relative;
  margin-block-end: var(--spacing-30);
  input {
    width: 100%;
    &:focus {
      outline: 2px solid var(--green-500);
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

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
    transition: text-decoration 0.2s ease-in-out;
  }
`;
const Register = styled(Link)`
  color: var(--green-950);
`;

const Forget = styled(Link)`
  color: var(--green-600);
`;

export default LoginForm;
