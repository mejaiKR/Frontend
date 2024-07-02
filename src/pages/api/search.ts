import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let mockArr = [
    "hide on bush#KR1",
    "hide on bus#KR1",
    "hide on Dalcong$KR1",
    "hide#MKD",
    "hide on bush#88848",
    "lobonabeat1#KR1",
    "용카리나#KR1",
    "BELL#KRR",
    "김승종#과로사",
  ];
  let result = [];

  if (!req.query.nickname) {
    return res
      .status(400)
      .json({ error: "Nickname query parameter is required." });
  }

  result = mockArr.filter((item) =>
    item.startsWith(req.query.nickname as string),
  );

  return res.status(200).json(result);
}
