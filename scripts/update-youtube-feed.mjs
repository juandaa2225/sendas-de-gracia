import { mkdir, readFile, writeFile } from "node:fs/promises";

const CHANNEL_ID = "UC0b_oVYLc5l6g6Vf7PV1O3A";
const FEED_URL = process.env.YOUTUBE_FEED_URL || `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUTPUT = new URL("../assets/data/sermons.json", import.meta.url);

const decodeEntities = (value = "") =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

const getTag = (entry, tag) => {
  const match = entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return decodeEntities(match?.[1] || "");
};

const getThumbnail = (entry) => {
  const match = entry.match(/<media:thumbnail[^>]+url="([^"]+)"/);
  return decodeEntities(match?.[1] || "");
};

const parseFeed = (xml) => {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
  return entries
    .map((entry) => {
      const videoId = getTag(entry, "yt:videoId");
      return {
        videoId,
        title: getTag(entry, "title"),
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: getThumbnail(entry),
        published: getTag(entry, "published"),
        updated: getTag(entry, "updated"),
        description: getTag(entry, "media:description").replace(/\s+/g, " ").trim(),
        channelTitle: "Comunidad de Gracia Envigado",
      };
    })
    .filter((video) => video.videoId && video.title)
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
};

const metadata = {
  source: "youtube-rss",
  channelId: CHANNEL_ID,
  channelUrl: "https://www.youtube.com/@comunidaddegraciaenvigado4810",
};

const writeFeed = async (videos) => {
  await mkdir(new URL("../assets/data/", import.meta.url), { recursive: true });
  await writeFile(
    OUTPUT,
    `${JSON.stringify(
      {
        ...metadata,
        generatedAt: new Date().toISOString(),
        videos,
      },
      null,
      2,
    )}\n`,
  );
};

const keepExistingFeed = async (reason) => {
  try {
    const existing = JSON.parse(await readFile(OUTPUT, "utf8"));
    const videos = Array.isArray(existing.videos) ? existing.videos : [];
    console.warn(`${reason}; keeping existing feed with ${videos.length} videos.`);
  } catch (error) {
    console.warn(`${reason}; writing an empty feed because no valid existing feed was found.`);
    console.warn(error);
    await writeFeed([]);
  }
};

try {
  const response = await fetch(FEED_URL, {
    headers: {
      "user-agent": "sendas-de-gracia-site/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube feed: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const videos = parseFeed(xml).slice(0, 12);

  if (!videos.length) {
    throw new Error("YouTube feed did not contain any videos");
  }

  await writeFeed(videos);
  console.log(`Wrote ${videos.length} videos to ${OUTPUT.pathname}`);
} catch (error) {
  await keepExistingFeed(error.message || "Failed to update YouTube feed");
}
