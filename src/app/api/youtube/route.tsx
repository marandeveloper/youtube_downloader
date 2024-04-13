import { NextApiRequest } from "next";
import { getInfo } from "ytdl-core";

type accType =
  | null
  | {
      quality: string;
      link: string;
    }[];

export const GET = async (req: NextApiRequest) => {
  if (!req?.url)
    return Response.json({ success: false, msg: "Please give valid url" });

  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url)
    return Response.json({ success: false, msg: "Please give valid url" });
  const { videoDetails, formats } = await getInfo(url);
  const { title, thumbnails } = videoDetails;

  const videoLinks = formats.reduce((acc: accType, format) => {
    if (acc && !acc.some((link) => link.quality === format.qualityLabel)) {
      acc.push({
        quality: format.qualityLabel,
        link: format.url,
      });
    }
    return acc;
  }, []);

  const videoInfo = {
    title,
    thumbnail: thumbnails.slice(-1)[0].url,
    videoLinks,
  };
  return Response.json({ success: true, videoInfo });
};
