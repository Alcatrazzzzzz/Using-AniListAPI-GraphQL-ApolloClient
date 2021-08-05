import React from "react";
import { motion } from "framer-motion";
import { Flex } from "@chakra-ui/react";

interface LoadingGradientProps {}

const MotionFlex = motion(Flex);
export const LoadingGradient: React.FC<LoadingGradientProps> = ({}) => {
  return (
    <MotionFlex
      position="absolute"
      background="linear-gradient(90deg, rgba(236, 236, 236, 1) 0%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0.4) 55%, rgba(236, 236, 236,1) 100%)"
      w="100%"
      h="100%"
      animate={{
        x: ["-100%", "100%"],
      }}
      transition={{
        repeat: Infinity,
        duration: 1,
      }}
    />
  );
};
