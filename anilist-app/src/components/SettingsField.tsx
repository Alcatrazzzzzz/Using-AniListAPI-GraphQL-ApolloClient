import { Flex, Text } from "@chakra-ui/layout";
import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { IconType } from "react-icons";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { textCutter } from "../utils/utils";

interface SettingsFieldProps {
  title: string;
  icon?: IconType;
  isVariant?: boolean;
  variants?: string[];
  w?: string | number;
  singleOption?: boolean;
  setSettings?: (settings: any) => void;
  settingsField?: string;
  settings?: any;
}

const MotionFlex = motion(Flex);

export const SettingsField: React.FC<SettingsFieldProps> = ({
  title,
  isVariant = false,
  variants = [],
  w = "100%",
  icon = null,
  singleOption = false,
  setSettings = () => {},
  settingsField = "none",
  settings = {},
}) => {
  const [showVariants, setShowVariants] = useState(false);

  useEffect(() => {
    settings[settingsField][0];
  });

  const variantsList = variants.map((element: string, iter: number) => {
    const isInAlreadyAndIndex = settings[settingsField].indexOf(element);
    return (
      <Flex
        key={iter}
        _hover={{
          backgroundColor: "#2C2C2C",
          transition: "0.5s",
          color: "#83FFE6",
        }}
        className="variantHover"
        borderRadius="8px"
        color={isInAlreadyAndIndex !== -1 ? "mBlack" : "mGray"}
        p="5px 10px 15px 10px"
        cursor="pointer"
        alignItems="center"
        onClick={() => {
          if (isInAlreadyAndIndex !== -1) {
            if (singleOption) {
              setSettings({ ...settings, [settingsField]: [] });
              return;
            }
            const slicedArray = [
              ...settings[settingsField].slice(0, isInAlreadyAndIndex),
              ...settings[settingsField].slice(
                isInAlreadyAndIndex + 1,
                settings[settingsField].length
              ),
            ];
            setSettings({ ...settings, [settingsField]: slicedArray });
          } else {
            if (singleOption) {
              setSettings({ ...settings, [settingsField]: [element] });
              return;
            }
            setSettings({
              ...settings,
              [settingsField]: [...settings[settingsField], element],
            });
          }
        }}
      >
        <Text fontSize="16px">{element}</Text>
        {(settings[settingsField] as any).indexOf(element) !== -1 ? (
          <Icon
            className="hoveredIcon"
            color="mBlack"
            ml="auto"
            as={AiFillCheckCircle}
          />
        ) : null}
      </Flex>
    );
  });

  return (
    <Flex
      color="mBlack"
      position="relative"
      fontSize="18px"
      w={w}
      flexDir="column"
    >
      <Text mb="10px">{title}</Text>
      {!isVariant ? (
        <InputGroup
          borderRadius="8px"
          padding="10px 15px"
          backgroundColor="mLightGray"
        >
          {!icon ? null : (
            <InputLeftElement
              pointerEvents="none"
              children={<Icon mt="5px" as={icon} color="mBlack" />}
            />
          )}
          <Input
            value={settings[settingsField][0]}
            onChange={(event) => {
              setSettings({
                ...settings,
                [settingsField]: [event.target.value],
              });
            }}
            paddingLeft="20px"
            variant="unstyled"
          />
        </InputGroup>
      ) : (
        <>
          <Flex
            cursor="pointer"
            borderRadius="8px"
            padding="10px 15px"
            backgroundColor="mLightGray"
            // alignItems="center"
            onClick={() => setShowVariants(!showVariants)}
          >
            {settings[settingsField].length === 0 ? <Text>Any</Text> : null}
            {settings[settingsField].length >= 1 ? (
              <Text
                borderRadius="8px"
                color="mBlack"
                fontWeight="800"
                padding="2px 7px 1px 7px"
                backgroundColor="mGray"
                fontSize="14px"
              >
                {textCutter(settings[settingsField][0], 7)}
              </Text>
            ) : null}
            {settings[settingsField].length > 1 ? (
              <Text
                padding="2px 5px"
                fontWeight="800"
                color="mBlack"
                fontSize="14px"
                borderRadius="8px"
                backgroundColor="mGray"
                ml="5px"
              >
                +{settings[settingsField].length - 1}
              </Text>
            ) : null}
            <Icon
              ml="auto"
              as={MdKeyboardArrowDown}
              mt="2px"
              w="25px"
              h="25px"
            />
          </Flex>
          <AnimatePresence>
            {!showVariants ? null : (
              <MotionFlex
                zIndex={2}
                pointerEvents="stroke"
                top={"100px"}
                left={0}
                borderRadius="8px"
                backgroundColor="mLightGray"
                w="100%"
                position="absolute"
                height={
                  variants.length < 8 ? `${variants.length * 51.5}px` : "350px"
                }
                initial={{ opacity: 0, y: "-3%" }}
                animate={{ opacity: 1, y: "0%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Scrollbars
                  hideTracksWhenNotNeeded
                  width="100%"
                  height="100%"
                  thumbSize={60}
                  renderView={(props) => (
                    <Flex
                      {...props}
                      padding="15px 15px 15px 10px"
                      flexDir="column"
                    />
                  )}
                  renderThumbVertical={(props) => (
                    <Flex
                      {...props}
                      flexDir="column"
                      backgroundColor="#B5B5B5"
                      borderRadius="8px"
                    />
                  )}
                >
                  {variantsList}
                </Scrollbars>
              </MotionFlex>
            )}
          </AnimatePresence>
        </>
      )}
    </Flex>
  );
};
