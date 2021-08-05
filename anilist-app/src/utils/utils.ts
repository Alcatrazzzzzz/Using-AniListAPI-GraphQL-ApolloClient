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
