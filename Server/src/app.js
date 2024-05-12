import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes';
import cors from 'cors'
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
//const redis = require('redis');
//import { islogged } from './routes/tools';
//import { ConnectAdmin } from './routes/admistration';

const app = express();
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

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'yoooooooo',
  resave: false,
  cookie: {
    secure: false, 
    sameSite: 'none',  
    maxAge: 60 * 60 * 24 * 1000
  },
  saveUninitialized: false,
  //store: redisStore
}));


// app.use('/api/v1/admin/', islogged);
// app.use('/api/v1/admin/', ConnectAdmin);
// app.use('/api/v1/area/', islogged);
// app.use('/api/v1/logout', islogged);
// app.use('/api/v1/reset/password', islogged);



app.get('/', (req, res) => {
  res.status(200).send("connard utilise /api/v1. Mais si tu veux une suprise t'attend à /secret_flag");
});

app.get('/secret_flag', (req, res) => {
  res.status(200).send("Tu es con hein tu penses c'est un ctf lol, concentre toi et ravaille");
});

app.use('/api/v1/', indexRouter);

export default app;
