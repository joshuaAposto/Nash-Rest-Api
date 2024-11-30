const express = require("express");
const secure = require('ssl-express-www');
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const path = require("path");
const compression = require('compression');
const log = require("./includes/log");
const config = require("./config.json");

global.config = config;
global.api = new Map();

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(compression());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'includes', 'public'), {
  maxAge: '1d',
  etag: true
}));
app.use(express.static(path.join(__dirname, 'includes', 'web'), {
  maxAge: '1d',
  etag: true
}));

const router = require("./includes/router");
app.use(router);

app.enable('trust proxy');
app.set("json spaces", 2);

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(secure);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}));

app.get("/api-list", (req, res) => {
  try {
    const apiList = Array.from(global.api.values()).map(api => ({
      name: api.config.name,
      description: api.config.description,
      endpoint: `api${api.config.link}`,
      category: api.config.category
    }));
    res.json(apiList);
  } catch (error) {
    log.error('Error generating API list:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate API list'
    });
  }
});

app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "includes", "public", "index.html"));
  } catch (error) {
    log.error('Error serving index page:', error);
    res.status(500).send('Internal server error');
  }
});

app.use((req, res) => {
  try {
    res.status(404).sendFile(path.join(__dirname, "includes", "public", "404.html"));
  } catch (error) {
    log.error('Error serving 404 page:', error);
    res.status(404).send('Page not found');
  }
});

app.use((err, req, res, next) => {
  log.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message
  });
});

const PORT = process.env.PORT || global.config.port || 3000;

const server = app.listen(PORT, () => {
  log.main(`Server is running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  log.main('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    log.main('HTTP server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (error) => {
  log.error('Uncaught Exception:', error);
  server.close(() => {
    process.exit(1);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  log.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
