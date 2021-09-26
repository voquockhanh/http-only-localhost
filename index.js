var express = require("express");
// var cors = require("cors");
const cookieParser = require("cookie-parser");
var app = express();
var PORT = 8080;

app.use(cookieParser());

// app.use(cors());

// app.use(function (req, res, next) {
//     res.set('Access-Control-Allow-Origin', req.headers.origin); //req.headers.origin
//     res.set('Access-Control-Allow-Credentials', 'true');
//     // access-control-expose-headers allows JS in the browser to see headers other than the default 7
//     res.set(
//         'Access-Control-Expose-Headers',
//         'date, etag, access-control-allow-origin, access-control-allow-credentials'
//     );

//     next()
// })

// Without middleware
app.get("/debug", function (req, res) {
  console.log("req.headers.cookie", req.cookies);
  res.json({ cookie: req.cookies });
});

app.get("/login", function (req, res) {
  console.log("/login route", process.env.NODE_ENV);
  const token = "*/*--=3432432$%^%$";

  res
    .cookie("auth-token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    })
    .status(200)
    .json({ message: "success" });
});

app.get("/validate", function (req, res) {
  console.log("/validate route", process.env.NODE_ENV);
  if (!req.cookies["auth-token"]) {
    return res.status(401).json({ message: "invalid token" });
  }

  res.status(200).json({ message: "success" });
});

app.get("/logout", function (req, res) {
  console.log("/logout route", process.env.NODE_ENV);
  res.clearCookie("auth-token").status(200).json({ message: "success" });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
