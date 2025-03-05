// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Redirect www to non-www
app.use((req, res, next) => {
  if (req.headers.host.startsWith('www.')) {
    const newHost = req.headers.host.slice(4);
    return res.redirect(301, `${req.protocol}://${newHost}${req.originalUrl}`);
  }
  next();
});

// Handle all requests to serve the React app
app.get('*', (req, res) => {
  const title = "Edjobster";
  const description = "Edjobster helps you organise your hiring and recruitment process.";
  const keyword = "Edjobster, hiring, recruitment";

  fs.readFile(path.join(__dirname, 'build', 'index.html'), 'utf8', (err, htmlContent) => {
    if (err) {
      return res.status(500).send('Error reading index.html');
    }
    htmlContent = htmlContent
      .replace('__META_TITLE__', title)
      .replace('__META_DESCRIPTION__', description)
      .replace('__META_KEYWORDS__', keyword);
    res.send(htmlContent);
  });
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});