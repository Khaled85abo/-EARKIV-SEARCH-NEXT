// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body);
  const url = body.url;
  console.log("recieved url : ", req.body);
  console.log("recieved url : ", url);
  if (!url || typeof url !== "string") {
    console.log(" No url ");
    res.status(400).json({ message: "Url is not valid" });
  }
  const response = await fetch(url);
  console.log("recieved url : ", response);
  const data = await response.json();
  console.log("recieved url : ", data);

  res.status(200).json(data);
}
