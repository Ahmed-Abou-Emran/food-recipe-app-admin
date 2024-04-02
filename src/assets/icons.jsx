import { motion } from "framer-motion";

// Trash animations
const trashVariants = {
  hover: {
    y: [0, -30, -20, 0],
    scale: [1, 1.2],
    x: 5,
    rotate: [0, 900, 0, 40],
    // rotate: [0, 10, 0 - 10, 0, 50],
    originX: [0.5, 0.5, 0.5, 0.5, 0.9],
    transition: { times: [0, 0.5, 0.8, 1], duration: 1.5, delay: 0.25 },
  },
  tap: {
    x: 2,
    rotate: 0,
    transition: { duration: 0.5, ease: "easeInOut" }, // Added transition for tap
  },
};

const trashLinesVariants = {
  hover: (custom) => ({
    y: [0, -3, -1, 0],
    transition: {
      duration: 0.25,
      //   delay: custom * 0.5,
    },
  }),
};

const grabageVariants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: [0, 1, 0],
    x: [0, 4, 5],
    y: [3, 6, 16],
    transition: { delay: 1.7, duration: 0.75 },
  },
};
const XCircleVariants = {
  hover: {
    rotate: 90,
    scale: 1.4,
    color: "var(--red-400)",
    transition: { type: "spring", damping: 5 },
  },
  tap: {
    rotate: 360,
    transition: { type: "spring", damping: 5 },
  },
};

const ViewEyeVariants = {
  hover: {
    scaleX: 1.1,
    fill: ["none", "var(--grey-700)"],
    x: [0, -1, 0, 1, 0],
    transition: { type: "tween", duration: 1, repeat: 2 },
  },
};
const SqaurePenVariants = {
  hover: {
    scale: [1, 1.2],
    x: [0, 2, 5, 1, 4, 1],
    y: [0, -2, -5, 1, -4, -1],
    rotate: [0, 5, -10, -15, -10, -5],
    prespective: 250,
    transition: { repeat: 3 },
    color: ["var(--grey-600)", "var(--green-500)"],
    transition: { repeat: 3 },
  },
};
export const Trash = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="trash"
    >
      <motion.g variants={trashVariants}>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <path d="M3 6h18" />
      </motion.g>
      <motion.circle
        variants={grabageVariants}
        r="2"
        cx="6"
        cy="-6"
        fill="red"
      />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <motion.g>
        <motion.line
          custom={0}
          variants={trashLinesVariants}
          x1="10"
          x2="10"
          y1="11"
          y2="17"
        />
        <motion.line
          custom={1}
          variants={trashLinesVariants}
          x1="14"
          x2="14"
          y1="11"
          y2="17"
        />
      </motion.g>
    </svg>
  );
};

export const XCircle = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      //   color="var(--red-400)"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <motion.g variants={XCircleVariants}>
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </motion.g>
    </svg>
  );
};

export const ViewEye = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={ViewEyeVariants}
    >
      <motion.path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <motion.circle
        fill="none"
        variants={ViewEyeVariants}
        cx="12"
        cy="12"
        r="3"
      />
    </svg>
  );
};

export const SquarePen = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="edit"
    >
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <motion.path
        className="pen"
        variants={SqaurePenVariants}
        d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"
      />
    </svg>
  );
};
