import { Flex, Text, Wrap } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import { MediaItemType } from "../utils/types";
import { LoadingGradient } from "./LoadingGradient";
import { motion } from "framer-motion";
import { useRef } from "react";
import prettyMilliseconds from "pretty-ms";
import { Icon } from "@chakra-ui/icons";
import { CgSmileNeutral } from "react-icons/cg";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { FiSmile } from "react-icons/fi";
import { calculateSmileType } from "../utils/utils";

interface MediaItemBigProps {
  data?: MediaItemType;
  loading?: boolean;
}

const MotionFlex = motion(Flex);
const MotionText = motion(Text);

export const MediaItemBig: React.FC<MediaItemBigProps> = ({
  data,
  loading,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();
  const [isAddonLefted, setisAddonLefted] = useState(false);

  useEffect(() => {
    setisAddonLefted(
      (ref as any).current.offsetLeft >
        4 * (ref as any).current.clientWidth +
          (window.screen.availWidth * 0.26) / 2
    );
  }, []);

  const smileType = calculateSmileType(data?.averageScore);

  const genresList = [];
  if (data?.genres) {
    for (let i = 0; i < 3; i++) {
      genresList.push(
        <Text
          key={i}
          padding="4px 8px"
          borderRadius="12px"
          backgroundColor={data.coverImage?.color || "#FF5F5F"}
          fontSize="12px"
        >
          {data?.genres[i]}
        </Text>
      );
    }
  }

  return (
    <Flex
      ref={ref as any}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      flexDir="column"
      position="relative"
      cursor="pointer"
    >
      {!loading && isHovered ? (
        <MotionFlex
          position="absolute"
          zIndex={2}
          w="160%"
          left={isAddonLefted ? "-170%" : "110%"}
          top="5%"
          h="50%"
          pointerEvents="none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Flex
            flexDir="column"
            w="100%"
            h="100%"
            zIndex={2}
            backgroundColor="mBlack"
            borderRadius="8px"
            position="relative"
            padding="16px"
            color="mLightGray"
          >
            <Flex w="100%" fontSize="18px">
              <Text>
                {data?.nextAiringEpisode
                  ? `Ep ${
                      data?.nextAiringEpisode.episode
                    } airing in ${prettyMilliseconds(
                      data.nextAiringEpisode.timeUntilAiring * 1000,
                      { compact: true, verbose: true }
                    )}`
                  : null}
              </Text>
              {data?.averageScore ? (
                <>
                  <Icon
                    color={
                      smileType === 1
                        ? "#f15050"
                        : smileType === 2
                        ? "#fad944"
                        : smileType === 3
                        ? "#28FD97"
                        : undefined
                    }
                    ml="auto"
                    as={
                      smileType === 1
                        ? HiOutlineEmojiSad
                        : smileType === 2
                        ? CgSmileNeutral
                        : smileType === 3
                        ? FiSmile
                        : undefined
                    }
                    w="28px"
                    h="28px"
                  />
                  <Text ml="6px">{data?.averageScore}%</Text>
                </>
              ) : null}
            </Flex>
            <Flex
              flexDir="column"
              mt={data?.nextAiringEpisode ? "12px" : "0px"}
              fontSize="14px"
              h="100%"
            >
              <Text color={data?.coverImage?.color || "mLightGray"}>
                {data?.studios?.nodes ? data?.studios?.nodes[0]?.name : null}
              </Text>
              <Flex alignItems="center">
                <Text>
                  {data?.format === "TV" ? `${data.format} Show` : data?.format}
                </Text>
                {data?.episodes ? (
                  <>
                    <Flex
                      mx="8px"
                      w="4px"
                      h="4px"
                      borderRadius="50px"
                      backgroundColor="mLightGray"
                    />
                    <Text>{data?.episodes} episodes</Text>
                  </>
                ) : null}
              </Flex>
              <Wrap mt="auto">{genresList}</Wrap>
            </Flex>
            <Flex
              borderWidth={
                isAddonLefted ? "10px 20px 10px 10px" : "10px 10px 10px 20px"
              }
              zIndex={-1}
              borderColor={
                isAddonLefted
                  ? "transparent #2C2C2C transparent transparent"
                  : "transparent transparent transparent #2C2C2C"
              }
              position="absolute"
              left={isAddonLefted ? "100%" : "none"}
              right={isAddonLefted ? "none" : "100%"}
              transform="scale(-1, 1)"
              top="15%"
              w="0px"
              h="0px"
            ></Flex>
          </Flex>
        </MotionFlex>
      ) : null}
      <Flex
        borderRadius="8px"
        overflow="hidden"
        position="relative"
        w="100%"
        h="290px"
        backgroundColor={data?.coverImage?.color || "mLightGray"}
      >
        {loading ? <LoadingGradient /> : null}
        {!loading ? (
          <>
            <Image
              src={data?.coverImage?.extraLarge || ""}
              alt={data?.title?.english || data?.title?.romaji || ""}
              layout="fill"
            />
          </>
        ) : null}
      </Flex>
      {loading ? (
        <Flex
          borderRadius="8px"
          overflow="hidden"
          position="relative"
          backgroundColor="mLightGray"
          w="100%"
          h="24px"
          mt="10px"
        >
          <LoadingGradient />
        </Flex>
      ) : (
        <MotionText
          animate={{
            color: isHovered ? data?.coverImage?.color || "#FF5F5F" : "#2C2C2C",
          }}
          transition={{ duration: 0.2 }}
          initial={{ color: "#2C2C2C" }}
          fontWeight="bold"
          mt="10px"
          fontSize="14px"
        >
          {data?.title?.english || data?.title?.romaji}
        </MotionText>
      )}
    </Flex>
  );
};
