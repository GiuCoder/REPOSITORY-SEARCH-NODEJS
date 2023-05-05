const express = require("express");
const app = express();
const port = 3000;
const rateLimit = require("express-rate-limit");

// Serve static files from the public directory
app.use(express.static("public"));
// Apply rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after some time",
});
app.use(limiter);

// Route for searching a repository
app.get("/", async (req, res, next) => {
  try {
    // Check if the honeypot field is filled out
    if (req.query.honeypot) {
      // If the honeypot field is filled out, assume the user is a bot and display an error message
      console.log("Error: Please confirm you are not a bot.");
      res.sendStatus(400);
      return;
    }

    const repositoryName = req.query.name;
    const apiURL =
      "https://api.github.com/search/repositories?q=" + repositoryName;

    console.log(`Searching for repository "${repositoryName}"...`);

    // Make API call to search for repository
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.items.length > 0) {
      const repo = data.items[0];
      const creationDate = new Date(repo.created_at).toLocaleDateString();
      const license = repo.license ? repo.license.name : "None";
      const language = repo.language ? repo.language : "Unknown";

      // Get metadata for the repository
      const metadataURL = `https://api.github.com/repos/${repo.full_name}`;
      const metadataResponse = await fetch(metadataURL);
      const metadata = await metadataResponse.json();

      const email = metadata.owner.email ? metadata.owner.email : "Unknown";
      const source = metadata.source ? metadata.source.full_name : "None";
      const ipAddress = metadata.network_count
        ? metadata.network_count
        : "Unknown";

      console.log(`Repository "${repo.full_name}" exists!`);
      console.log(`Description: ${repo.description}`);
      console.log(`Created: ${creationDate}`);
      console.log(`License: ${license}`);
      console.log(`Language: ${language}`);
      console.log(`Email: ${email}`);
      console.log(`Source: ${source}`);
      console.log(`IP Address: ${ipAddress}`);

      const repositoryData = {
        name: repo.full_name,
        description: repo.description,
        created_at: creationDate,
        license: license,
        language: language,
        owner_email: email,
        source: source,
        network_count: ipAddress,
      };

      res.json(repositoryData);
    } else {
      console.log(`Repository "${repositoryName}" does not exist.`);
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

app.get("/error-page", (req, res, next) => {
  res.sendFile(__dirname + "/error.html");
});

// Route for handling 404 errors
app.use((req, res, next) => {
  res.status(404);
  res.redirect("/error-page");
});

app.listen(port, () => {
  console.log(`Search The Repository listening on port ${port}`);
});
