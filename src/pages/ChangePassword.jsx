import React from "react";
import styled from "styled-components";
import { get, useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AuthLogo from "../assets/authLogo.png";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    axios
      .put(
        "http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Password Changed Successfully", {
          position: "top-right",
        });
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
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <header>
          <h1>Change Your Password</h1>
          <p> Enter your details below</p>
        </header>
        <main>
          <InputWrapper>
            <input
              {...register("oldPassword", {
                required: "This field is required",
              })}
              type="password"
              placeholder="Old Password"
            />
            {errors.oldPassword && <span>{errors.oldPassword.message}</span>}
          </InputWrapper>
          <InputWrapper>
            <input
              {...register("newPassword", {
                required: "This field is required",
              })}
              type="password"
              placeholder="New Password"
            />
            {errors.newPassword && <span>{errors.newPassword.message}</span>}
          </InputWrapper>
          <InputWrapper>
            <input
              {...register("confirmNewPassword", {
                required: "This field is required",
                validate: (value) =>
                  getValues("newPassword") === value || "Passwords don't match",
              })}
              type="password"
              placeholder="Confirm New Password"
            />
            {errors.confirmNewPassword && (
              <span>{errors.confirmNewPassword.message}</span>
            )}
          </InputWrapper>
          <button>Change Password</button>
          <Links>
            <Login to="/login">Login Now?</Login>
          </Links>
        </main>
      </FormWrapper>
    </Wrapper>
  );
}

// function ChangePassword() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//     axios
//       .put(
//         "http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(data);
//         navigate("/login"); // Assuming 'navigate' is defined
//       })
//       .catch((error) => {
//         toast(error.response?.data?.message);
//       });
//   };

//   return (
//     <div className="Auth-container container-fluid">
//       <div className="row bg-overlay vh-100 justify-content-center align-items-center">
//         <div className="col-md-6">
//           <div className="bg-white rounded p-3">
//             <div className="logo-cont text-center">
//               {/* <img src={logo} alt="logo" /> */}
//             </div>

//             <form className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
//               <h2>Change Your Password</h2>
//               <p>Enter your details below</p>

//               <div className="form-group my-3">
//                 <input
//                   placeholder="Old Password"
//                   className="form-control my-3"
//                   type="password"
//                   {...register("oldPassword", {
//                     required: true,
//                   })}
//                 />
//                 {errors.oldPassword &&
//                   errors.oldPassword.type === "required" && (
//                     <span className="text-danger my-1">
//                       Old password is required
//                     </span>
//                   )}
//               </div>

//               <div className="form-group my-3">
//                 <input
//                   placeholder="New Password"
//                   className="form-control my-3"
//                   type="password"
//                   {...register("newPassword", {
//                     required: true,
//                   })}
//                 />
//                 {errors.newPassword &&
//                   errors.newPassword.type === "required" && (
//                     <span className="text-danger my-1">
//                       New password is required
//                     </span>
//                   )}
//               </div>

//               <div className="form-group my-3">
//                 <input
//                   placeholder="Confirm New Password"
//                   className="form-control my-3"
//                   type="password"
//                   {...register("confirmNewPassword", {
//                     required: true,
//                   })}
//                 />
//                 {errors.confirmNewPassword &&
//                   errors.confirmNewPassword.type === "required" && (
//                     <span className="text-danger my-1">
//                       Confirm new password is required
//                     </span>
//                   )}
//               </div>

//               <div className="d-flex justify-content-between align-items-center">
//                 <div className="form-check mb-0">
//                   {/* Assuming this label is not related to the form */}
//                 </div>
//                 <a href="#!" className="text-success">
//                   Forgot password?
//                 </a>
//               </div>

//               <div className="form-group my-3">
//                 <button className="btn btn-success w-100">
//                   Change Password
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

export default ChangePassword;
