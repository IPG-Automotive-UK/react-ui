const express = require("express");

// initialize express
const app = express();

// serve storybook static files
app.use(express.static("storybook-static"));

// start server
app.listen(6006, () => {
  console.log("Storybook is now being served from http://localhost:6006");
});
