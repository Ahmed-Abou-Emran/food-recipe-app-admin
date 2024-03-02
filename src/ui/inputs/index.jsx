import React from "react";
import {
  FiEyeOff as EyeOff,
  FiEye as Eye,
  FiLock as Lock,
} from "react-icons/fi";
import { useToggle } from "../../hooks";
import { motion } from "framer-motion";
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
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-eye"
            size="1.5rem"
            style={{ strokeWidth: 2 }}
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
            <motion.line
              x1="2"
              x2="22"
              y1="2"
              y2="22"
              initial={{ pathLength: 1, opacity: 1 }}
              animate={{
                pathLength: isPasswordVisible ? 0 : 1,
                opacity: isPasswordVisible ? 0 : 1,
              }}
            />
          </motion.svg>
        </button>
        {error && <span>{error}</span>}
      </>
    );
  }
);
