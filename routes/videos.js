import express from "express";
import axios from "axios";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const FILE_PATH = "./data/videos.json";

// this is a helper function to read data from JSON file
const readVideos = () => {
  try {
    const videosData = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
    return videosData;
  } catch (error) {
    console.error("Error reading videos data:", error);
    return [];
  }
};

// GET /videos - get the list of videos from the data file
router.get("/", (_req, res) => {
  const videosData = readVideos();
  const videoList = videosData.map(({ id, title, channel, image }) => ({
    id,
    title,
    channel,
    image,
  }));
  res.json(videoList);
});

export default router;
