import { Flex, Text, Wrap } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaTags } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MediaFormat, MediaSeason } from "../generated/graphql";
import { deleteArrayItem } from "../utils/utils";
import { SettingsField } from "./SettingsField";
import { Settings } from "../utils/types";

interface SettingsBarProps {
  genres?: [string];
  settings: Settings;
  setSettings: (elem: Settings) => void;
}

const MotionFlex = motion(Flex);
const MotionText = motion(Text);

let years: any = [];
for (let i = new Date().getFullYear() + 1; i >= 1940; i--) {
  years.push("" + i);
}
export const SettingsBar: React.FC<SettingsBarProps> = ({
  genres,
  settings,
  setSettings,
}) => {
  // useEffect(() => {
  //   console.log(settings);
  // });

  let tags: any = [];
  for (const element in settings) {
    if (element === "type" || settings[element][0] === "") {
      continue;
    }

    if (settings[element].length) {
      (settings[element] as any).forEach((item: any) => {
        tags.push(
          <MotionFlex
            _hover={{
              ".tagIcon": {
                display: "block",
              },
            }}
            borderRadius="8px"
            color="#FCFCFC"
            padding="2px 7px 1px 7px"
            backgroundColor="mRed"
            fontSize="14px"
            key={item}
            alignItems="center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {item}
            <Icon
              cursor="pointer"
              w="18px"
              h="18px"
              ml="5px"
              display="none"
              className="tagIcon"
              as={IoMdClose}
              onClick={() => {
                if (settings[element].length === 1) {
                  setSettings({
                    ...settings,
                    [element]: element === "search" ? [""] : [],
                  });
                  return;
                }
                const isInAlreadyAndIndex = settings[element].indexOf(item);
                const slicedArray = deleteArrayItem(
                  settings[element] as string[],
                  isInAlreadyAndIndex
                );
                setSettings({ ...settings, [element]: slicedArray });
              }}
            />
          </MotionFlex>
        );
      });
    }
  }
  return (
    <Flex mt="60px" flexDir="column">
      <AnimateSharedLayout>
        <Flex
          borderRadius="12px"
          padding="4px"
          w="100%"
          backgroundColor="#ECECEC"
          mb="20px"
        >
          <Flex
            cursor="pointer"
            onClick={() => {
              setSettings({ ...settings, type: "ANIME" });
            }}
            position="relative"
            w="50%"
            justifyContent="center"
          >
            <MotionText
              fontWeight={800}
              zIndex={2}
              initial={{ color: "#83FFE6" }}
              animate={{
                color: settings.type === "ANIME" ? "#83FFE6" : "#B5B5B5",
              }}
            >
              Anime
            </MotionText>
            {settings.type === "ANIME" ? (
              <MotionFlex
                layoutId="bg"
                position="absolute"
                borderRadius="12px"
                backgroundColor="mBlack"
                w="100%"
                h="100%"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            ) : null}
          </Flex>
          <Flex
            cursor="pointer"
            onClick={() => {
              setSettings({ ...settings, type: "MANGA" });
            }}
            position="relative"
            w="50%"
            justifyContent="center"
          >
            <MotionText
              fontWeight={800}
              zIndex={2}
              initial={{ color: "#B5B5B5" }}
              animate={{
                color: settings.type === "MANGA" ? "#83FFE6" : "#B5B5B5",
              }}
            >
              Manga
            </MotionText>
            {settings.type === "MANGA" ? (
              <MotionFlex
                layoutId="bg"
                position="absolute"
                borderRadius="12px"
                backgroundColor="mBlack"
                w="100%"
                h="100%"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            ) : null}
          </Flex>
        </Flex>
      </AnimateSharedLayout>
      <Flex flexWrap="wrap" justifyContent="space-between" w="100%">
        <SettingsField
          setSettings={(settings: any) => setSettings(settings)}
          settingsField="search"
          settings={settings}
          icon={BiSearch}
          w="26%"
          title="Search"
        />
        <SettingsField
          setSettings={(settings: any) => setSettings(settings)}
          settingsField="genres"
          settings={settings}
          variants={genres}
          isVariant
          w="16%"
          title="Genres"
        />
        <SettingsField
          setSettings={(settings: any) => setSettings(settings)}
          settingsField="year"
          settings={settings}
          variants={years}
          singleOption
          isVariant
          w="16%"
          title="Year"
        />
        <SettingsField
          setSettings={(settings: any) => setSettings(settings)}
          settingsField="season"
          settings={settings}
          variants={Object.keys(MediaSeason)}
          singleOption
          isVariant
          w="16%"
          title="Season"
        />
        <SettingsField
          setSettings={(settings: any) => setSettings(settings)}
          settingsField="formats"
          settings={settings}
          variants={Object.keys(MediaFormat)}
          isVariant
          w="16%"
          title="Format"
        />
      </Flex>
      <Flex mt="20px" h="22px" alignItems="center">
        {!tags.length ? null : (
          <>
            <MotionFlex animate={{ scale: 1 }} initial={{ scale: 0 }}>
              <Icon color="mGray" w="22px" h="22px" mr="15px" as={FaTags} />
            </MotionFlex>
            <Wrap spacing="10px">{tags}</Wrap>
          </>
        )}
      </Flex>
    </Flex>
  );
};
