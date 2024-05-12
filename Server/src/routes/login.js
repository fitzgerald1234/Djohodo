import { addUserInBase } from '../dataBase/dataBase.js';
import { findUserWithNameandEmail } from '../dataBase/dataBase.js';
import { findUserWithName } from '../dataBase/dataBase.js';
import { sign,  verify } from 'jsonwebtoken';
import { Mail } from './verifymail.js';
import { initializeSession, getServiceInSession, islogged, getUserWithSessionId } from './tools.js';
let code = [];

export async function signup(req, res)
{
    if (!req.body.username) res.status(400).json({err: "Username don't given"});
    else if (!req.body.passWord) res.status(400).json({err: "Password don't given"}); 
    else {
        let status = await isRegisteredWithName(req, res);
        if (!status)  res.status(401).json({err: "user doesn't exist"});
        else {
            let user = await findUserWithName(req.body.username);
            if (user[0].password != req.body.passWord) res.status(401).json({err: "password Incorrect"});
            else if (user[0].isBanned) res.status(401).json({err: "You are not allowed to visit this site"});
            else {
                const token = sign({id: user[0]._id.toString()}, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'});        
                req.session._id = user[0]._id;
            req.session.token = token;
            initializeSession(req);
            req.session.save();
           // console.log(getServiceInSession(req, 'google'));
            getUserWithSessionId(req);
            res.status(200).json({message: 'you are login sucessfully!!!'});
            }
        }
    }
}

export async function changeCode(req, res) {
    let tmp = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
    code.push(tmp);
    const mail = new Mail({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'arealinvigstone@gmail.com',
          pass: 'nukf mzvt cyim yaee',
        }
      });
      let message = `<p style='font-weight:bold; font-size:25px;'>\n\nPlease confirm your authentification with the secret code: ${tmp}</p>`;
      setTimeout(() => {
        code.splice(code.indexOf(tmp), 1);
      }, 100000);
    await mail.send(req.body.email, 'authentification request', message);
    res.status(200).json({message: "email succesfully sent"});
}

export async function register(req, res)
{
    if (!req.body.username) res.status(400).json({err: "Username don't given"});
    else if (!req.body.passWord) res.status(400).json({err: "Password don't given"}); 
    else if (!req.body.email) res.status(400).json({err: "email don't given"});
    else {
        let status = await isRegisteredWithName(req, res);
        if (!status) {
            changeCode(req, res);
        } else res.status(400).json({err: "user already registered"});
    }
}

export async function authWithCode(req, res)
{
    if (!req.body.code) res.status(400).json({err: "Code don't given"});
    else if (!req.body.username) res.status(400).json({err: "Username don't given"});
    else if (!req.body.passWord) res.status(400).json({err: "Password don't given"}); 
    else if (!req.body.email) res.status(400).json({err: "email don't given"});
    else {
        console.log(code);
        if (code.includes(req.body.code)) {
            await addUserInBase(req.body.username, req.body.passWord, req.body.email);
            res.status(200).json({message: "Correct code. The registration is a success !!"});
            let user = await findUserWithName(req.body.username);
            const token = sign({id: user[0]._id.toString()}, 'RANDOM_TOKEN_SECRET');//, {expiresIn : '24h'});
            req.session.token = token;
            req.session._id = user[0]._id;
            initializeSession(req);
            req.session.save();
            code.splice(code.indexOf(req.body.code), 1);
        } else res.status(400).json({err: "Invalid code\n"});
    }
}

export async function logout(req, res)
{
    req.session.passport = undefined;
    req.session.token = undefined;
    req.session._id = undefined;
    req.session.services = undefined;
    req.session.save();
    res.status(200).json({message: "logout"});
}

export function tokenIsValid(req, token)
{
    //let decode, err;
    let status = false;
    verify(token, 'RANDOM_TOKEN_SECRET', function (err, decode) {
    if (err) {
        console.log(err);
        status = false;
    } else {
        console.log(decode);
        console.log("yoooo");
        status =  true;
    }
    });
    return status;
   // console.log(decode);
}

export async function isRegistered(req, res)
{
    let user = await findUserWithNameandEmail(req.body.username, req.body.email);
    if (user.length == 0) {
        return false;
    }
    return true;
}

export async function isRegisteredWithName(req, res)
{
    let user = await findUserWithName(req.body.username);
    if (user.length == 0) {
        return false;
    }
    return true;
}

