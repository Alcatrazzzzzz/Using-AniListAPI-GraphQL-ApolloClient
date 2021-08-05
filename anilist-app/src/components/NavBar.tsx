import { Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Container } from "./Container";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
import { Button } from "@chakra-ui/button";
import { motion } from "framer-motion";

interface NavBarProps {}

const MotionBtn = motion(Button);
const MotionFlex = motion(Flex);

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [loginBarOpened, setLoginBarOpened] = useState(false);

  return (
    <>
      {!loginBarOpened ? null : (
        <Flex
          onClick={(event) => {
            if (!(event as any).target.className.includes("login-modal")) {
              setLoginBarOpened(false);
            }
          }}
          pointerEvents="fill"
          zIndex={3}
          position="absolute"
          w="100%"
          h="100%"
          backdropFilter="blur(4px)"
          backgroundColor="rgba(0, 0, 0, 0.671)"
        >
          <MotionFlex
            className="login-modal"
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
              x: 0,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 30, x: "-50%" }}
            transition={{
              type: "spring",
              duration: 2,
              bounce: 0.5,
            }}
            mx="auto"
            mt="10%"
            w="20%"
            h="50vh"
            backgroundColor="mLightGray"
          >
            <Image
              alt="21"
              src="/img/login.png"
              layout="fill"
              objectFit="fill"
            />
          </MotionFlex>
        </Flex>
      )}
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
            onClick={() => setLoginBarOpened(true)}
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
    </>
  );
};
