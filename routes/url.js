import express from "express";

import {
  handleGenerateShortUrl,
  handleGetAnalytics,
  handleGetShortId,
} from "../controllers/url.js";

const router = express.Router();

router.post("/", handleGenerateShortUrl);

router.get("/:shortId", handleGetShortId);

router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
