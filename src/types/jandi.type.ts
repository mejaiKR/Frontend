export type DayGameData = {
  date: string;
  gameCount: number;
  imageUrl: string;
};

export type JandiData = {
  userGameCount: DayGameData[];
  lastUpdatedAt: string;
};

export type ViewType = "mejai" | "chart";
