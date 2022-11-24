const port = 5500;
const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const fileUpload = require("express-fileupload");
const exphbs = require("express-handlebars"); // updated to 6.0.X
const multer = require("multer");
const session = require("express-session");

const handlebars = exphbs.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password1",
  database: "foxify",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

app.use(
  session({
    secret: "secret",
    resave: "true",
    saveUninitialized: true,
  })
);


conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connection established");
});

app.use(express.json());
app.use("/components", express.static(path.join(__dirname, "/components")));
app.use("/static", express.static(path.join(__dirname, "/public")));
app.use("/songs", express.static(path.join(__dirname, "/songs")));
app.set("assets", path.join(__dirname, "/public/assets"));
app.use("/img", express.static(path.join(__dirname, "/img")))
app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "style.css"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "index.html"));
});
app.get("/genesis.mp3", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/songs", "genesis.mp3"));
});
app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "script.js"));
});
app.get("/liked.js", (req, res) => {
  res.sendFile(path.join(__dirname, "components", "liked.js"));
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "admin.html"));
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "app.js"));
})
app.get("/playlist/all", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "playlist.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "login.html"));
})


app.get("/home", (req, res) => {
  conn.query("SELECT * FROM songs", function (err, result) {
    if (err) {
      res.status(404).send(err);
      return;
    }
    res.status(200).send({
      data: result,
      username: req.session.username,
    })
  });
});


app.post("/auth", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    conn.query(
      `SELECT * FROM users WHERE username = ? AND pass = ?`,
      [username, password],
      (error, result, fields) => {
        if (error) {
          throw new Error("Something went wrong");
        }
        if (result.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          console.log(username)
          res.redirect("/");
        } else {
          res.status(404).send("Incorrect Username or Password");
        }
        res.end();
      }
    );
  } else {
    res.send("Please enter Username and Password");
    res.end();
  }
});


app.post("/user", (req, res) => {
  const username = req.body.username;
  const pass = req.body.password;
  const email = req.body.email;

  const query = `INSERT INTO users(username, pass, email)
                 VALUES(?,?,?)`;

  const params = [username, pass, email];

  conn.query(query, params, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).redirect("index");
  });
});


app.get("/api/playlist/all", (req, res) => {
  conn.query("SELECT * FROM songs ORDER BY id DESC", function (err, liked) {
    if (err) {
      res.status(404).send({ message: err });
      return;
    }
    res.status(200).send({data: liked});
  });
});

app.post("/admin/songs/upload", (req, res) => {
  let title = req.body.title;
  let author = req.body.author;
  let sampleFile;
  let uploadPath;
  let sampleSong;
  let uploadSongPath;

  sampleSong = req.files.sampleSong;
  sampleFile = req.files.sampleFile;
  uploadSongPath = "./songs/" + sampleSong.name;
  uploadPath = "./img/" + sampleFile.name;
  sampleFile.mv(uploadPath, function (imageErr) {
    sampleSong.mv(uploadSongPath, function (SongErr) {
      if (imageErr || SongErr)
        return res.status(500).send({ message: "error" });
      const query = `INSERT INTO songs(title, author, thumbImg, file)
                    VALUES(?,?,?,?)`;

      const params = [title, author, sampleFile.name, sampleSong.name];
      conn.query(query, params, (err, result) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).redirect("/");
      });
    });
  });
});

module.exports = app;


app.listen(port, () => {
  console.log("Server running on port", port);
  })
