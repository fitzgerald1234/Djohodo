import crypto from 'crypto'
import { log_dir } from '../config';
import fs from 'fs';

export function registerNewAgent(req, res) {
    console.log("Request body", req.body);
    console.log("Header", req.headers);
    if (!req.body.agent_name) res.status(400).json({error: "agent name don't given"});
    else if (!req.body.ip) res.status(400).json({error: "host ip don't given"});
    else {
        const k = crypto.randomBytes(16).toString('hex')
        const hash = crypto.createHash('md5').update(k).digest("hex");
        res.status(301).json({key: k});
        fs.writeFileSync(`agent/agent`, JSON.stringify({agent_name: req.body.agent_name, ip: req.body.ip, key: hash}, null, 2), 'utf-8');
    }
}

export function receiveAgentLog(req, res) {
    if (req.headers.key) {
        console.log("Request Body", req.body);
        const hash = crypto.createHash('md5').update(req.headers.key).digest("hex");
        fs.writeFileSync(`${log_dir}/${hash}.log`, JSON.stringify(req.body, null, 2) , 'utf-8');
        res.status(200).send("Information receive");
    } else { 
        res.status(401).json({error: "Permission Denied"});
    }
}

export function listAgent(req, res) {
    fs.readFile("./agent/agent", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        //console.log(data);
        res.status(200).send(data);
    });
}
