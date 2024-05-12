import { findUserWithiD, putElemInBase } from "../dataBase/dataBase";
import { tokenIsValid } from "./login";
import { getAllAreaOfUser, getAllUser } from '../dataBase/dataBase';
import { reaction_functions } from '../services/service'
import { ObjectId } from "mongodb";
import { services_array } from "../services/service";


export function initializeSession(req)
{
    req.session.services = 
    {
        github: {
            connected: 'false',
        },
        discord : {
            connected: 'false',
        },
        twitter: {
            connected: 'false',
        },
        reddit: {
            connected: 'false',
        },
        gitlab: {
            connected: 'false',
        },
        gmail: {
            connected: 'false',
        },
        calendar: {
            connected: 'false',
        }
    };
}

export function modifyServiceInSession(req, service, value, data)
{
    req.session.services[service][value] = data;
    req.session.save();
}

export function getServiceInSession(req, service)
{
    return req.session.services[service];
}

export async function getUserWithSessionId(req)
{
    let id  = req.session._id;
    let user = await findUserWithiD(id);
    console.log(user);
}

export async function islogged(req, res, next)
{
    if (!req.session.token) {
        res.status(400).json({err: "Unhauthorized please log in"});
        await putElemInBase(new ObjectId(req.session._id), {connected: 'false'});
    }
    else {
        if (!tokenIsValid(req, req.session.token)) {
            res.status(400).json({err: "Your session is expired please log in"});
            await putElemInBase(new ObjectId(req.session._id), {connected: 'false'});
        }
        else {
            await putElemInBase(new ObjectId(req.session._id), {connected: 'true'});
            next();
        }
    }
}

export function getActionArea(service, action, areas)
{
    let action_area = [];
    //console.log("all user area:", areas);
    if (areas) {
        for (let i = 0; i < areas.length; i++) {
            if (areas[i].action[0])
                if (areas[i].action[0].params.service == service && areas[i].action[0].name == action) {
                    action_area.push(areas[i]);
                }
        }
    }
    return action_area;
}

export function getAllActiveArea(areas)
{
    let active_area = []
    if (areas) {
        for (let i = 0; i < areas.length; i++) {
            if (areas[i].status == true) {
                active_area.push(areas[i]);
            }
        }
    }
    return active_area;
}

export function isAreaExist(name, areas)
{
    if (areas) {
        for (let i = 0; i < areas.length; i++) {
            if (areas[i].name == name)
                return  true;
        }
    }
    return false;
}


export async function executereactions(reactions, user)
{
    console.log("reactions execution for user:", user.username);
    console.log("user reactions:", reactions)
    for (let i = 0; i < reactions.length; i++) {
        if (reactions[i]) {
            let service_name = reactions[i].params.service;
            let funcs = reaction_functions[service_name];
            if (funcs) {
                if (user[service_name]) {
                    const access_token = user[service_name].access_token;
                    if (access_token) await funcs[reactions[i].name](reactions[i].params, user);
                    else console.log(`You are not connected to ${service_name} service`);
                } else console.log(`You are not connected to ${service_name} service`);
            }  else console.error("Reaction function doesn't exist");
        }  else console.error("Reacion is empty");
    }
}

export async function userConnectedToService(user, service_name)
{
    console.log("info service", user[service_name]);
    if (user[service_name] && user[service_name].access_token) return true;
    else return false;
}


export function serviceExist(service)
{
    if (services_array[service])
        return true;
    return false;
}

export function actionExist(action, service)
{
    if (serviceExist(service)) {
        if (services_array[service].actions[action]) {
            return true;
        } else return false;
    } else return false;
}


export function reactionExist(reaction, service)
{
    if (serviceExist(service)) {
        if (services_array[service].reactions[reaction]) {
            return true;
        } else return false;
    } else return false;
}


export async function areaNameAlreadyExsit(areaName, userid)
{
    const areas = await getAllAreaOfUser(new ObjectId(userid));
    
    for (let i; i < areas.length; i++) {
        if (areas.name == areaName) return true;
    }
    return false;
}

export function actionParamExist(service, action, param)
{
    if (!actionExist(action)) return false;
    if (services_array[service].actions[action].params.includes(param)) return true;
    else return false;
}

export function reactionParamExist(service, reaction, param)
{
    if (!reactionExist(reaction)) return false;
    if (services_array[service].reactions[reaction].params.includes(param)) return true;
    else return false;
}

export function opGetAllAreaOfUser(areas, userid)
{
    let find = [];
    for (let i = 0; i < areas.length; i++) {
        if (areas[i].user.equals(userid)) {
            find.push(areas[i]);
        }
    }
    return find;
}