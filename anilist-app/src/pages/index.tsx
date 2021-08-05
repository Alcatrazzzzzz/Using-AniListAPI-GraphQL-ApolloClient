import { gql } from "@apollo/client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Container } from "../components/Container";
import { NavBar } from "../components/NavBar";
import { SettingsBar } from "../components/SettingsBar";
import {
  Maybe,
  MediaSeason,
  MediaSort,
  MediaType,
  useGetAnimePageQuery,
} from "../generated/graphql";
import { client } from "./_app";
import { Settings } from "../utils/types";
import { Flex } from "@chakra-ui/react";
import { ItemBlock } from "../components/ItemBlock";
import { calculateNextSeason, getCurrentSeason } from "../utils/utils";

interface IndexProps {
  genreCollection: [string];
  mediaTagCollection: any;
}

const Index: React.FC<IndexProps> = ({
  genreCollection,
  mediaTagCollection,
}) => {
  const [settings, setSettings]: [Settings, any] = useState({
    type: "ANIME",
    search: [""],
    genres: [],
    year: [],
    season: [],
    formats: [],
  });

  const { data: treindingDescData, loading: treindingDescDataLoading } =
    useGetAnimePageQuery({
      variables: {
        sort: "TRENDING_DESC" as Maybe<MediaSort>,
        perPage: 5,
        type: settings.type as Maybe<MediaType>,
      },
    });

  const { data: popularSeasonData, loading: popularSeasonDataLoading } =
    useGetAnimePageQuery({
      variables: {
        sort: "POPULARITY_DESC" as Maybe<MediaSort>,
        perPage: 5,
        season: getCurrentSeason() as Maybe<MediaSeason>,
        seasonYear: new Date().getUTCFullYear(),
        type: settings.type as Maybe<MediaType>,
      },
    });

  const { data: commingNextSeasonData, loading: commingNextSeasonDataLoading } =
    useGetAnimePageQuery({
      variables: {
        sort: "POPULARITY_DESC" as Maybe<MediaSort>,
        perPage: 5,
        season: calculateNextSeason(
          getCurrentSeason() || "WINTER"
        ) as Maybe<MediaSeason>,
        seasonYear: new Date().getUTCFullYear(),
        type: settings.type as Maybe<MediaType>,
      },
    });

  return (
    <>
      <NavBar />
      <Container>
        <SettingsBar
          settings={settings}
          setSettings={(elem: Settings) => setSettings(elem)}
          genres={genreCollection}
        />
        <Flex mt="-50px" flexDir="column">
          <ItemBlock
            heading="TRENDING NOW"
            data={!treindingDescDataLoading ? treindingDescData! : undefined}
            loading={treindingDescDataLoading}
          />

          <ItemBlock
            heading="POPULAR THIS SEASON"
            data={!popularSeasonDataLoading ? popularSeasonData! : undefined}
            loading={popularSeasonDataLoading}
          />

          <ItemBlock
            heading="UPCOMMING NEXT SEASON"
            data={
              !commingNextSeasonDataLoading ? commingNextSeasonData! : undefined
            }
            loading={commingNextSeasonDataLoading}
          />
        </Flex>
      </Container>
    </>
    /* <NavBar
        href={`https://anilist.co/api/v2/oauth/authorize?client_id=5578&response_type=token`}
      >
        Login with AniList
      </NavBar> */
  );
};

export async function getStaticProps() {
  const { data: genresData } = await client.query({
    query: gql`
      query {
        GenreCollection
      }
    `,
  });
  const { data: tagData } = await client.query({
    query: gql`
      query {
        MediaTagCollection {
          name
        }
      }
    `,
  });
  return {
    props: {
      genreCollection: genresData.GenreCollection,
      mediaTagCollection: tagData.MediaTagCollection,
    },
  };
}

export default Index;
