const express = require("express");
const cors = require("cors");
const session = require("express-session");

// start
const app = express();

const routes = require("./routes/routes");

const PORT = 8080;

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
// authorize json
app.use(express.json());
app.use(cors(corsOptions));

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
  console.log("Serveur started on port 8080");
});
