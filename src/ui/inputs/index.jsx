import React from "react";
import {
  FiEyeOff as EyeOff,
  FiEye as Eye,
  FiLock as Lock,
} from "react-icons/fi";
import { useToggle } from "../../hooks";

const Input = React.forwardRef(({ ...delegated }, ref) => {
  return <input ref={ref} {...delegated} />;
});

export const IconInput = React.forwardRef(
  ({ icon: Icon, ...delegated }, ref) => {
    return (
      <>
        {Icon && <Icon size="1.5rem" />}
        <Input ref={ref} {...delegated} />
      </>
    );
  }
);

export const ErrorInput = React.forwardRef(({ error, ...delegated }, ref) => {
  return (
    <>
      <Input ref={ref} {...delegated} />
      {error && <span>{error}</span>}
    </>
  );
});

export const ErrorIconInput = React.forwardRef(
  ({ error, ...delegated }, ref) => {
    return (
      <>
        <IconInput ref={ref} {...delegated} />
        {error && <span>{error}</span>}
      </>
    );
  }
);

export const PasswordIconInput = React.forwardRef(
  ({ error, ...delegated }, ref) => {
    const [isPasswordVisible, toggleIsPasswordVisible] = useToggle(false);
    const type = !isPasswordVisible ? "password" : "text";
    return (
      <>
        <IconInput ref={ref} icon={Lock} {...delegated} type={type} />
        <button type="button" onClick={toggleIsPasswordVisible}>
          {isPasswordVisible ? <Eye size="1.5rem" /> : <EyeOff size="1.5rem" />}
        </button>
        {error && <span>{error}</span>}
      </>
    );
  }
);
