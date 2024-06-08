import { nanoid } from "nanoid";

import URL from "../models/url.js";

export const handleGenerateShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = nanoid(8);
  const newUrl = new URL({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });

  await newUrl.save();
  return res.render("home", { id: shortID });
};

export const handleGetShortId = async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
};

export const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });
  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
