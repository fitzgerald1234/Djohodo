import { deleteUserInBase, findUserWithiD, getAllAreaOfUser, getAllUser, putElemInBase } from "../dataBase/dataBase";
import { reaction_functions } from "../services/service"
import { ObjectId } from "mongodb";


export async function changeInfosUser(req, res)
{
    if (!req.body.username) {
        res.status(400).json({err: "Please give a username"});
        return;
    }
    if (!req.body.password) {
        res.status(400).json({err: "Please give a password"});
        return;
    }
    if (!req.body.email) {
        res.status(400).json({err: "Please give a password"});
        return;
    }
    let users = await getAllUser();
    for (let i = 0; i != users.length; i++) {
        if (users[i].username == req.body.username) {
            res.status(400).json({err: "The username already exits"});
            return;
        }
    }
    putElemInBase(new ObjectId(req.session._id), {username: req.body.username, password: req.body.password, mail: req.body.mail});
    res.status(200).json({message: "Profile udpated"});
}

export async function deleteUser(req, res)
{
    if (!req.username) res.status(400).json({err: "Please give a username"});
    else {
        await deleteUserInBase(req.body.username);
        res.status(400).json({message: "User sucessfully delete"});
    }
}

export async function listUsers(req, res)
{
    const list_infos = [];
    let users = await getAllUser();
    for (let i = 0; i != users.length; i++) {
        list_infos.push(users[i].username + '\n');
    }
    res.status(200).json({message: list_infos})
}


export async function adduserInAppli(req, res)
{
    if (!req.body.username) res.status(400).json({err: "Username don't given"});
    else if (!req.body.passWord) res.status(400).json({err: "Password don't given"}); 
    else if (!req.body.email) res.status(400).json({err: "email don't given"});
    else {
        await addUserInBase(req.body.username, req.body.password, req.body.email);
        res.status(200).json({message: "The user is added in server"});
    }
}

export async function checkUserStatus(req, res)
{
        let list_infos = [];
        let users = await getAllUser();
        for (let i = 0; i != users.length; i++) {
            let user_areas = await getAllAreaOfUser(new ObjectId(users[i]._id));
            list_infos.push({username: users[i].username, connected: users[i].connected, nb_areas: user_areas.length, admin: await isAdmin(users[i].username, users[i].mail)});
        }
        res.status(200).json({infos: list_infos});
}

export async function bannedUser(req, res)
{
    if (!req.body.user.username) res.status(400).json({err: "give a username"});
    else {
        await putElemInBase(new ObjectId(req.session._id), {isBanned: 'true'});
        res.status(200).json({message: "User successfully"});
    }
}

export async function ConnectAdmin(req, res, next)
{
    let user = await findUserWithiD(new ObjectId(req.session._id));
    if (isAdmin(user[0].username, user[0].mail))
        next();
    else res.status(400).json({message: 'You don\'t have a permission'});
}

export async function isAdmin(username, email)
{
    if (email == 'mouamaradjaho20@gmail.com' && username == 'Mouamar MomboladjiADJAHO') return true;
    if (email == 'hanslylinvigstone@gmail.com' && username == 'HanslyLinvigstone') return true;
    if (email == 'fitzadechian0007@gmail.com' && username == 'FitzgeraldAdechian') return true;
    return false;
}