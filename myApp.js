require("dotenv").config();
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

module.exports = app;
