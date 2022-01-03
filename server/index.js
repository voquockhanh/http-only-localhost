var express = require("express");
const cookieParser = require("cookie-parser");
var cors = require('cors')

var app = express();
var PORT = 8080;
const tokenKey = "auth-token";
const tokenValue = "JWT_token_value";


app.use(cookieParser());
app.use(cors())

// Without middleware
app.get("/debug", function (req, res) {
  console.log("req.headers.cookie", req.cookies);
  res.json({ cookie: req.cookies });
});

app.post("/login", function (req, res) {
  console.log("/login route", process.env.NODE_ENV);

  res
    .cookie(tokenKey, tokenValue, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    })
    .status(200)
    .json({ message: "success" });
});

app.get("/validate", function (req, res) {
  console.log("/validate route", process.env.NODE_ENV);
  let authToken = req.cookies[tokenKey];
  if (authToken && authToken === tokenValue) {
    return res.status(200).json({ message: "success" });
  }

  return res.status(401).json({ message: "invalid token" });
});

app.post("/logout", function (req, res) {
  console.log("/logout route", process.env.NODE_ENV);
  res.clearCookie(tokenKey).status(200).json({ message: "success" });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
