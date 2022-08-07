const express = require("express");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json({ limit: '100mb' }));

app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  console.log('hiiii');
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});