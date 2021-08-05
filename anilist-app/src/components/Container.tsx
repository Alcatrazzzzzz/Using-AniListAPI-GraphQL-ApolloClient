import { Flex } from "@chakra-ui/layout";
import { ResponsiveValue } from "@chakra-ui/react";
import React from "react";

interface ContainerProps {
  flexDir?: ResponsiveValue<any>;
  alignItems?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  flexDir = "column",
  alignItems = "unset",
}) => {
  return (
    <Flex mx="auto" flexDirection={flexDir} w="74%" alignItems={alignItems}>
      {children}
    </Flex>
  );
};
