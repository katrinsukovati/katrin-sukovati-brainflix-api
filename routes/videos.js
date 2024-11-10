import express from "express";
import axios from "axios";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const FILE_PATH = "./data/videos.json";

export default router;