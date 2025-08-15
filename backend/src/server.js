const express = require("express");
const cors = require("cors");
const session = require("express-session");
require('dotenv').config();

// start
const app = express();

const routes = require("./routes/routes");

const PORT = process.env.PORT_BACK;

const corsOptions = {
  origin: [`http://localhost:${process.env.PORT_FRONT}`],
  credentials: true,
};
// authorize json
app.use(express.json());
app.use(cors(corsOptions));

app.use('/uploads',express.static('uploads', []));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1h
    },
  })
);

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Serveur started on port ${PORT}`);
});
