const express = require("express");
const helmet = require('helmet');
const cors = require("cors");
const passport = require('passport');
const cookieParser = require('cookie-parser');

const sequelize = require('../config/database');
const configurePassport = require('./passport');
const { router, authRouter } = require('./routes');

const PORT = process.env.PORT || 3003;

configurePassport(passport);
const app = express();

sequelize.authenticate()
  .then(() => console.log('Credentials connected...'))
  .catch((err) => console.log(err));

app.use(express.json({ limit: '100mb' }))

app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(passport.initialize());
app.use(cookieParser());

app.use(cors(
  {
    origin: 'http://localhost:3003',
    allowedHeaders: ['Content-Type', 'Authorization', 'Keep-Alive', 'Connection'],
  }
));

app.use('/service', router);
app.use('/service', authRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});