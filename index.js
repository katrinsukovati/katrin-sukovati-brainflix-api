import express from "express";
import cors from "cors";
import "dotenv/config";
import videosRoutes from "./routes/videos.js";

const app = express();

// Retrieves the port number/client url from the environment variables
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// Enables CORS for the client URL
app.use(cors({ origin: CLIENT_URL }));

// This is used to parse JSON bodies
app.use(express.json());
// This is used to serve static files like images
app.use(express.static("public"));

// Use videos routes
app.use("/videos", videosRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
