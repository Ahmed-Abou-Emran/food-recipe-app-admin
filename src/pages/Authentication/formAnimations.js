export const formVariants = {
  initial: () => {
    return {
      opacity: 0,
      scale: 0,
      // x: 100,
    };
  },

  animate: () => {
    return {
      opacity: 1,
      scale: [1, 1.2, 1],
      // x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        duration: 0.4,
      },
    };
  },
};
