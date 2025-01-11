export type UserInfoParams = {
  id: string;
  tag: string;
};

export type JandiParams = UserInfoParams & {
  year: number;
  month: number;
};

export type LeaderBoardParams = {
  year: number;
  month: number;
};
