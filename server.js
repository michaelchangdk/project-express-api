import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
// import redditJokes from "./data/reddit_jokes.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Michael!");
});

app.get("/avocadosales", (req, res) => {
  res.status(200).json({
    data: avocadoSalesData,
    success: true,
  });
});

app.get("/avocadosales/:region", (req, res) => {
  const region = req.params.region;
  const avocadoRegion = avocadoSalesData.filter(
    (item) => item.region === region
  );
  if (avocadoRegion) {
    res.status(200).json({ data: avocadoRegion, success: true });
  } else {
    res.status(404).json({ data: "Data not found", success: false });
  }
});

app.get("/regions", (req, res) => {
  const regionsList = avocadoSalesData.map((o) => o.region);
  const regions = [...new Set(regionsList)];

  if (regions) {
    res.status(200).json({ data: regions, success: true });
  } else {
    res.status(404).json({ data: "Data not found", success: false });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
