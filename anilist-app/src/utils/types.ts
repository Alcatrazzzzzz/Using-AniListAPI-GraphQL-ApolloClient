import {
  Maybe,
  Media,
  MediaTitle,
  MediaCoverImage,
  Studio,
  AiringSchedule,
} from "../generated/graphql";

export interface Settings {
  type: string;
  search: string[];
  genres: string[];
  year: string[];
  season: string[];
  formats: string[];
  [key: string]: string[] | string;
}

export type MediaItemType = Maybe<
  { __typename?: "Media" } & Pick<
    Media,
    "id" | "genres" | "averageScore" | "episodes" | "format" | "season"
  > & {
      title?: Maybe<
        { __typename?: "MediaTitle" } & Pick<MediaTitle, "english" | "romaji">
      >;
      studios?: Maybe<
        { __typename?: "StudioConnection" } & {
          nodes?: Maybe<
            Array<Maybe<{ __typename?: "Studio" } & Pick<Studio, "name">>>
          >;
        }
      >;
      coverImage?: Maybe<
        { __typename?: "MediaCoverImage" } & Pick<
          MediaCoverImage,
          "extraLarge" | "large" | "medium" | "color"
        >
      >;
      nextAiringEpisode?: Maybe<
        { __typename?: "AiringSchedule" } & Pick<
          AiringSchedule,
          "episode" | "timeUntilAiring"
        >
      >;
      airingSchedule?: Maybe<
        { __typename?: "AiringScheduleConnection" } & {
          edges?: Maybe<
            Array<
              Maybe<
                { __typename?: "AiringScheduleEdge" } & {
                  node?: Maybe<
                    { __typename?: "AiringSchedule" } & Pick<
                      AiringSchedule,
                      "episode" | "timeUntilAiring"
                    >
                  >;
                }
              >
            >
          >;
        }
      >;
    }
>;
