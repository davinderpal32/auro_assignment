require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const http = require('http');
const path = require("path");
const app = express();
const createError = require('http-errors');
// parse requests of content-type: application/json


// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(expressValidator());
//////////////  Global Parameters   //////////////////////////
global.appRoot = path.resolve(__dirname);

app.use("/product", require("./routes/productRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/admin", require("./routes/adminRoute"));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    console.log('err', err);
    // set locals, only providing error in devexpressdevelopment" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(process.env.PORT, function () {
    console.log("Started application on port ", process.env.PORT)
});