import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import { disableScroll } from "../utils/utils";
import { Container } from "./Container";

interface NavBarProps {
  setLoginBarOpened: (value: boolean) => void;
}

const MotionBtn = motion(Button);

export const NavBar: React.FC<NavBarProps> = ({ setLoginBarOpened }) => {
  const router = useRouter();

  return (
    <Flex
      position="relative"
      color="white"
      padding="30px 0"
      bgColor="mBlack"
      w="100%"
    >
      <Container flexDir="row" alignItems="center">
        <Flex alignItems="center">
          <Image alt="21" src="/img/logo.svg" width="44px" height="44px" />
          <Text fontSize="32px">MyAniList</Text>
        </Flex>
        <Flex
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          position="absolute"
        >
          <NextLink href="/">
            <a>
              <Text color={router.route === "/" ? "mCyian" : "mGray"}>
                Home
              </Text>
            </a>
          </NextLink>
          <NextLink href="/anime">
            <a style={{ marginLeft: "42px" }}>
              <Text color={router.route === "/anime" ? "mCyian" : "mGray"}>
                Anime List
              </Text>
            </a>
          </NextLink>
          <NextLink href="/manga">
            <a style={{ marginLeft: "42px" }}>
              <Text color={router.route === "/manga" ? "mCyian" : "mGray"}>
                Manga List
              </Text>
            </a>
          </NextLink>
        </Flex>
        <MotionBtn
          _hover={{}}
          onClick={() => {
            setLoginBarOpened(true);
            disableScroll();
          }}
          h="fit-content"
          padding="7px 30px"
          backgroundColor="mRed"
          ml="auto"
          whileHover={{ scale: 1.05 }}
        >
          Log In
        </MotionBtn>
      </Container>
    </Flex>
  );
};
