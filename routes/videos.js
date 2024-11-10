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

// GET /videos/:id - get details for a specific video using the id of the video
router.get("/:id", (req, res) => {
  const videosData = readVideos();
  const video = videosData.find((v) => v.id === req.params.id);
  if (video) {
    res.status(200).json(video);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

// POST /videos - route to add a new video
router.post("/", (req, res) => {
  const videoObj = req.body;
  const videosData = readVideos();
  const newVideo = {
    id: uuidv4(),
    title: videoObj.title,
    description: videoObj.description,
    channel: "Katrin Test",
    image: "http://localhost:8080/Upload-video-preview.jpg",
    views: 0,
    likes: 0,
    duration: 10,
    video: videosData[0].video,
    timestamp: new Date().getTime(),
    comments: [],
  };
  videosData.push(newVideo);

  try {
    writeVideos(videosData);
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: "Failed to save video data" });
  }
});

export default router;
