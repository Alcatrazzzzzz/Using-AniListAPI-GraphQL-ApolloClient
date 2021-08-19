import { MediaFormat } from "../generated/graphql";
import { Settings } from "./types";

export const textCutter = (str: string, endNumber: number): string => {
  if (endNumber > str.length) return str;
  return str.slice(0, endNumber) + "..";
};

export const deleteArrayItem = (array: any[], index: number): any[] => {
  return [...array.slice(0, index), ...array.slice(index + 1, array.length)];
};

export const getCurrentSeason = () => {
  const todayMonth = new Date().getUTCMonth();

  if ((todayMonth >= 1 && todayMonth <= 2) || todayMonth === 12)
    return "WINTER";
  if (todayMonth >= 3 && todayMonth <= 5) return "SPRING";
  if (todayMonth >= 6 && todayMonth <= 8) return "SUMMER";
  if (todayMonth >= 9 && todayMonth <= 11) return "FALL";
};

export const calculateNextSeason = (season: string) => {
  if (season === "WINTER") return "SPRING";
  if (season === "SPRING") return "SUMMER";
  if (season === "SUMMER") return "FALL";
  if (season === "FALL") return "WINTER";
};

export const calculateSmileType = (raiting: number | undefined | null) => {
  if (!raiting) return undefined;
  if (raiting > 0 && raiting <= 50) return 1;
  if (raiting > 50 && raiting <= 70) return 2;
  if (raiting > 70) return 3;
};

export const disableScroll = () => {
  document.body.classList.add("stop-scrolling");
};

export const enableScroll = () => {
  document.body.classList.remove("stop-scrolling");
};

export const isAnySettings = (obj: Settings) => {
  for (let key in obj) {
    if (key === "type") continue;
    if (key === "search" && obj[key][0]) return true;
    if (key !== "search" && obj[key].length > 0) return true;
  }

  return false;
};

export const convertFormatsBack = (formats: string[]) => {
  return formats.map((elem) => {
    return (MediaFormat as any)[elem === "TV" ? "TV" : elem];
  });
};
