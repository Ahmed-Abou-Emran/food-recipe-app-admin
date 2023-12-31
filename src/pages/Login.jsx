import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import AuthLogo from "../assets/authLogo.png";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail as Email } from "react-icons/ai";
import PasswordInput from "../ui/PasswordInput";
import { useUserContext } from "./UserProvider";

function Login() {
  const [loading, setLoading] = React.useState(false);
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
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
      .post("https://upskilling-egypt.com/api/v1/Users/Login", data)
      .then((res) => {
        toast.success("Login Successfully", {
          position: "top-right",
        });
        // const decodedData = JSON.stringify(jwtDecode(res.data.token));
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

  React.useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <Wrapper>
      <LogoWrapper>
        <Link to="/">
          <img src={AuthLogo} alt="Logo" />
        </Link>
      </LogoWrapper>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <header>
          <h1>Login</h1>
          <p> Welcome Back! Please enter your details</p>
        </header>
        <main>
          <InputWrapper>
            <Email size="1.5rem" />
            <input
              {...register("email", {
                required: "This field is required ",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              type="text"
              placeholder="Enter your email"
            />
            {errors.email && <span>{errors.email.message}</span>}
          </InputWrapper>
          <PasswordInput
            showPassword={passwordVisibility}
            togglePassword={() => {
              setPasswordVisibility((prev) => !prev);
            }}
            error={errors?.password?.message}
          >
            <input
              {...register("password", { required: "This field is required" })}
              type={passwordVisibility ? "text" : "password"}
              placeholder="Password"
            />
          </PasswordInput>
          <button disabled={loading}>
            {loading ? "Loading ..." : "Login"}
          </button>
          <Links>
            <Register to="/register">Register Now</Register>
            <Forget to="/forget-password">Forgot Password?</Forget>
          </Links>
        </main>
      </FormWrapper>
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

const FormWrapper = styled.form`
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
    position: absolute;
    color: #ef4444;
    font-size: 0.75rem;
    font-weight: 500;
    bottom: -5px;
    transform: translateY(100%);
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Register = styled(Link)`
  color: var(--green-950);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
  transition: text-decoration 0.2s ease-in-out;
`;

const Forget = styled(Link)`
  color: var(--green-600);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }

  transition: text-decoration 0.2s ease-in-out;
`;

export default Login;
