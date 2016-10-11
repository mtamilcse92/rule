import express from 'express';
import bodyParser from 'body-parser';
import routes from './router/routes';
import cors from 'cors';
let app = express();
const port = process.env.PORT || 3000;
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000/");
    res.header('Access-Control-Allow-method', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', routes);

app.listen(port, () => {
    console.log("server is running...");
});
