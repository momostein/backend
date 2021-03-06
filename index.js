var express = require("express");
var bodyParser = require("body-parser");

var logger = require("./logger");

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.text());

app.use(require("./auth").authMid(false));

app.get("/", (req, res) => {
	logger.reqInfo(req);
	return res.send("ahoj");
});

app.use(require("./auth").app);
app.use(require("./notifications").app);
app.use(require("./element").app);
app.use(require("./recipe").app);


app.all("/*", (req, res, next) => {
	logger.error(req.method + " " + req.originalUrl, req);
	res.status(400);
	return res.send("not implemented yet sorry");
});

var port = process.env.PORT || 80;
app.listen(port, () => {
	console.log("Server running on http port 80");
});

export default app;