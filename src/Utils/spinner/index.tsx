import React from "react"
import { motion, Transition } from "framer-motion"

const loadingContainer = {
  width: "2rem",
  height: "2rem",
  display: "flex",
  justifyContent: "space-around",
}

const loadingCircleStyle = {
  display: "block",
  width: "0.5rem",
  height: "0.5rem",
  backgroundColor: "var(--white)",
  borderRadius: "0.25rem",
}

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const loadingCircleVariants = {
  start: {
    y: "50%",
  },
  end: {
    y: "150%",
  },
}

const loadingCircleTransition: Transition = {
  repeatType: "mirror",
  ease: "easeInOut",
  repeat: Infinity,
  duration: 0.5,
}

type Props = {
  color?: "LIGHT" | "DARK"
}
export default function ThreeDotsWave({ color = "DARK" }: Props) {
  const loadingCircle = {
    ...loadingCircleStyle,
    ...(color === "DARK" && { backgroundColor: "var(--purple)" }),
  }
  return (
    <motion.div
      style={loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  )
}
