import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import AuthLogo from "../assets/authLogo.png";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import PasswordInput from "../ui/PasswordInput";
import Loader from "../ui/Loader";
import { FormDialog } from "./Dialog/Dialog";

const ChangePasswordDialog = ({ open, setOpen }) => {
  const [passwordsVisibility, setPasswordsVisibility] = React.useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .put(
        "https://upskilling-egypt.com:443/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.message || "Password Changed Successfully", {
          position: "top-right",
        });
        setOpen(false);
      })
      .catch((err) => {
        toast.error(`${err.response.data.message || "Something Went Wrong"}`, {
          position: "top-right",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <FormDialog open={open} onOpenChange={setOpen}>
      <Wrapper>
        <LogoWrapper>
          <img src={AuthLogo} alt="Logo" />
        </LogoWrapper>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <header>
            <h1>Change Your Password</h1>
            <p> Enter your details below</p>
          </header>
          <main>
            <PasswordInput
              showPassword={passwordsVisibility.oldPassword}
              togglePassword={() => {
                setPasswordsVisibility((prev) => ({
                  ...prev,
                  oldPassword: !prev.oldPassword,
                }));
              }}
              error={errors?.oldPassword?.message}
            >
              <input
                {...register("oldPassword", {
                  required: "This field is required",
                })}
                type={passwordsVisibility.oldPassword ? "text" : "password"}
                placeholder="Old Password"
              />
            </PasswordInput>
            <PasswordInput
              showPassword={passwordsVisibility.newPassword}
              togglePassword={() => {
                setPasswordsVisibility((prev) => ({
                  ...prev,
                  newPassword: !prev.newPassword,
                }));
              }}
              error={errors?.newPassword?.message}
            >
              <input
                {...register("newPassword", {
                  required: "This field is required",
                })}
                type={passwordsVisibility.newPassword ? "text" : "password"}
                placeholder="New Password"
              />
            </PasswordInput>

            <PasswordInput
              showPassword={passwordsVisibility.confirmNewPassword}
              togglePassword={() => {
                setPasswordsVisibility((prev) => ({
                  ...prev,
                  confirmNewPassword: !prev.confirmNewPassword,
                }));
              }}
              error={errors?.confirmNewPassword?.message}
            >
              <input
                {...register("confirmNewPassword", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues("newPassword") ||
                    "The passwords do not match",
                })}
                type={
                  passwordsVisibility.confirmNewPassword ? "text" : "password"
                }
                placeholder="Confirm New Password"
              />
            </PasswordInput>

            <button disabled={loading}>
              {loading ? "Loading..." : "Change Password"}
            </button>

            <Links>
              <Login to="/login">Login Now?</Login>
            </Links>
          </main>
        </FormWrapper>
      </Wrapper>
    </FormDialog>
  );
};

const Wrapper = styled.div`
  width: clamp(30rem, 65%, 50rem);
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--grey-100);
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
  align-items: center;
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
      align-self: stretch;
      text-align: center;
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

      &:disabled {
        cursor: not-allowed;
      }

      transition: background-color 0.2s ease-in-out;
    }
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;
const Login = styled(Link)`
  color: var(--green-600);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
  transition: text-decoration 0.2s ease-in-out;
`;

export default ChangePasswordDialog;
