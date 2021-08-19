import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { enableScroll } from "../utils/utils";
import Image from "next/image";

interface LogInModalProps {
  setLoginBarOpened: (value: boolean) => void;
}

const MotionFlex = motion(Flex);

export const LogInModal: React.FC<LogInModalProps> = ({
  setLoginBarOpened,
}) => {
  return (
    <Flex
      className="login-modal-bg"
      onClick={(event) => {
        if ((event as any).target.className.includes("login-modal-bg")) {
          setLoginBarOpened(false);
          enableScroll();
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
        flexDir="column"
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
        borderRadius="0.8vw"
        mx="auto"
        mt="14%"
        w="18%"
        h="max-content"
        backgroundColor="white"
      >
        <Flex
          mx="auto"
          mt="-5vh"
          position="relative"
          width="10vh"
          height="10vh"
        >
          <Image
            loading="eager"
            alt="21"
            src="/img/logo2.svg"
            layout="fill"
            objectFit="contain"
          />
        </Flex>
        <Flex padding="1.5vw" flexDir="column">
          <Text fontSize="1.6vw" fontWeight="bold" textAlign="center">
            Log in with Ani<span style={{ color: "#02A9FF" }}>List</span>
          </Text>
          <Text fontSize="0.9vw" mt="5%" textAlign="center">
            As this project uses AniList open API, in order to use all functions
            you have to log in with AniList oficial web site.
          </Text>
          <a href="https://anilist.co/api/v2/oauth/authorize?client_id=5578&redirect_uri=http://localhost:3000/&response_type=code">
            <MotionFlex
              cursor="pointer"
              bgColor="#2B2D42"
              padding="0.5vw"
              alignItems="center"
              borderRadius="0.4vw"
              mt="10vh"
              w="100%"
              whileHover={{ scale: 1.05 }}
            >
              <Flex
                backgroundColor="white"
                borderRadius="0.4vw"
                position="relative"
                width="1.8vw"
                height="1.8vw"
              >
                <Image
                  loading="eager"
                  alt="21"
                  src="/img/aniListLogo.svg"
                  layout="fill"
                  objectFit="contain"
                />
              </Flex>
              <Text
                mt="2px"
                ml="5%"
                fontSize="0.9vw"
                letterSpacing="0.1vw"
                color="mLightGray"
              >
                Continue with AniList
              </Text>
            </MotionFlex>
          </a>
        </Flex>
      </MotionFlex>
    </Flex>
  );
};
