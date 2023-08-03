require("dotenv").config();
let bodyparser = require("body-parser");
let express = require("express");
let app = express();
console.log("Hello World");
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});
app.use("/public", express.static(__dirname + "/public"));
app.get("/json", (req, res) => {
	if (process.env.MESSAGE_STYLE === "uppercase") {
		return res.json({ message: "Hello json".toUpperCase() });
	}
	res.json({ message: "Hello json" });
});
app.get(
	"/now",
	(req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.json({ time: req.time });
	}
);
app.get("/:word/echo", (req, res) => {
	res.json({ echo: req.params.word });
});
app.route("/name").get((req, res, next) => {
	res.json({ name: `${req.query.first} ${req.query.last}` });
});
app.use(bodyparser.urlencoded({ extended: false }));
module.exports = app;
