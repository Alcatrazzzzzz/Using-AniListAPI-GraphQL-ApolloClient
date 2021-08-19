import { Flex, Link, SimpleGrid, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import React, { useEffect } from "react";
import { GetAnimePageQuery } from "../generated/graphql";
import { MediaItemBig } from "./MediaItemBig";

interface ItemBlockProps {
  data?: GetAnimePageQuery;
  loading?: boolean;
  heading?: string;
}

export const ItemBlock: React.FC<ItemBlockProps> = ({
  data,
  heading,
  loading,
}) => {
  if (data?.Page?.media?.length === 0 || !data) {
    return null;
  }

  let parsedCardBlocks: any = [];
  for (let i = 0; i < (heading ? 5 : data!.Page!.media!.length); i++) {
    parsedCardBlocks.push(
      loading ? (
        <MediaItemBig key={`${i}${heading}`} loading={loading} />
      ) : (
        <MediaItemBig key={`${i}${heading}`} data={data!.Page!.media![i]} />
      )
    );
  }

  useEffect(() => {
    console.log(data);
  });
  return (
    <Flex mt="60px" flexDir="column">
      {!heading ? null : (
        <Flex mb="20px">
          <Text fontSize="24px" fontWeight="bold">
            {heading}
          </Text>
          <NextLink href="/blog/hello-world">
            <Link
              _hover={{ color: "#FF5F5F", transition: "1s" }}
              ml="auto"
              fontSize="14px"
              color="mGray"
              mt="auto"
            >
              View All
            </Link>
          </NextLink>
        </Flex>
      )}
      <SimpleGrid columns={5} spacing={10}>
        {parsedCardBlocks}
      </SimpleGrid>
    </Flex>
  );
};
