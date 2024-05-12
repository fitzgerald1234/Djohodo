"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _morgan = _interopRequireDefault(require("morgan"));
var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _routes = _interopRequireDefault(require("./routes"));
var _cors = _interopRequireDefault(require("cors"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _dataBase = require("./dataBase/dataBase");
var _connectRedis = _interopRequireDefault(require("connect-redis"));
var _redis = require("redis");
//const redis = require('redis');
//import { islogged } from './routes/tools';
//import { ConnectAdmin } from './routes/admistration';

var app = (0, _express["default"])();
//export let redisClient = createClient();

/*export let redisClient = redis.createClient({
  url: 'redis://redis:6379'
  });
*/

// redisClient.connect().catch(console.error);
// export let redisStore = new RedisStore({
//   client: redisClient,
//   prefix: "myapp:",
// });

// app.use(cors({
//   origin: 'http://localhost:8081',
//   credentials: true,
// }));

app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use((0, _expressSession["default"])({
  secret: 'yoooooooo',
  resave: false,
  cookie: {
    secure: false,
    sameSite: 'none',
    maxAge: 60 * 60 * 24 * 1000
  },
  saveUninitialized: false
  //store: redisStore
}));

// app.use('/api/v1/admin/', islogged);
// app.use('/api/v1/admin/', ConnectAdmin);
// app.use('/api/v1/area/', islogged);
// //app.use('/api/v1/service/', islogged);
// app.use('/api/v1/logout', islogged);
// app.use('/api/v1/reset/password', islogged);

app.get('/', function (req, res) {
  res.status(200).send("connard utilise /api/v1. Mais si tu veux une suprise t'attend à /secret_flag");
});
app.get('/secret_flag', function (req, res) {
  res.status(200).send("Tu es con hein tu penses c'est un ctf lol, concentre toi et ravaille");
});
app.use('/api/v1/', _routes["default"]);
var _default = exports["default"] = app;