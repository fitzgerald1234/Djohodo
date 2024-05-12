import express from 'express';
import axios from 'axios'
import { sign } from 'jsonwebtoken';
import { findUserWithiD, putElemInBase, putTokenInBase } from '../dataBase/dataBase.js';
import { ObjectId } from 'mongodb';
import cron from 'node-cron';
import { receiveAgentLog, registerNewAgent, listAgent } from './agents.js';
import { checkEvents } from './event.js';

// cron.schedule('* * * * *', () => {
//   triggers_manager();
//   console.log('Trigger checker executed');
// });


const indexRouter = express.Router();


indexRouter.post('/login', (req, res) => signup(req, res));

indexRouter.get('/',  (req, res) =>{
  res.status.send("Suck my dick")
});

indexRouter.post('/agents', (req, res) => registerNewAgent(req, res));
indexRouter.get('/agents', (req, res) => listAgent(req, res));
indexRouter.post('/agents/info/logs', (req, res) => receiveAgentLog(req, res));
indexRouter.post('/agents/info/process', (req, res) => {
  console.log(req.body);
  res.status(200).send("Information receive");
})

indexRouter.post('/events', (req, res) => checkEvents(req, res));

indexRouter.get('/log/sources', (req, res) => {
  res.status(200).json({
    "log_sources": [
      {
        "path": "/var/log/messages",
        "description": "General message and system related stuff"
      },
      {
        "path": "/var/log/auth.log",
        "description": "Authentication logs"
      },
      {
        "path": "/var/log/kern.log",
        "description": "Kernel logs"
      },
      {
        "path": "/var/log/cron.log",
        "description": "Crond logs (cron job)"
      },
      {
        "path": "/var/log/maillog",
        "description": "Mail server logs"
      },
      {
        "path": "/var/log/qmail/",
        "description": "Qmail log directory (more files inside this directory)"
      },
      {
        "path": "/var/log/httpd/",
        "description": "Apache access and error logs directory"
      },
      {
        "path": "/var/log/lighttpd/",
        "description": "Lighttpd access and error logs directory"
      },
      {
        "path": "/var/log/nginx/",
        "description": "Nginx access and error logs directory"
      },
      {
        "path": "/var/log/apt/",
        "description": "Apt/apt-get command history and logs directory"
      },
      {
        "path": "/var/log/boot.log",
        "description": "System boot log"
      },
      {
        "path": "/var/log/mysqld.log",
        "description": "MySQL database server log file"
      },
      {
        "path": "/var/log/secure",
        "description": "Authentication log"
      },
      {
        "path": "/var/log/utmp",
        "description": "Login records file"
      },
      {
        "path": "/var/log/yum.log",
        "description": "Yum command log file"
      },
      {
        "path": "/var/log/dnf.log",
        "description": "Dnf command log file"
      }
    ]
  })
})

export default indexRouter;
