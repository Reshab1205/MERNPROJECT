const express = require("express");
const dB = require("./middlewares/db");
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const cors = require('cors');
var compression = require('compression');
const configureScheduler = require("./middlewares/configureScheduler");
dB.connectToDatabase();
app.use(
  express.json({
    extended: false
  })
);
app.use(expressValidator());
app.use(compression()); //use compression
app.use(bodyParser.json({ limit: "50mb", strict: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cors());
configureScheduler.schedule();
const routes = require('./routes/routes.js')
app.use('/', routes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// serverless config credentials --provider aws --key AKIAQYQMAFAWDPVOUEZ4 --secret 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
