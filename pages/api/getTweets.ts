// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { groq } from "next-sanity";

import { Tweet } from "../../types";

const feedQuery = groq`
  *[_type == "tweet"] {
    _id,
    ...
  } | order(_createdAt desc)
`;

type Data = {
  tweets: Tweet[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweets = await sanityClient.fetch(feedQuery);

  res.status(200).json({ tweets });
}
