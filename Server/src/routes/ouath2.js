import { google } from "googleapis";
import { sign } from "jsonwebtoken";
import { redisStore } from "../app";
import { initializeSession } from "./tools";
import { findUserWithName, addUserInBase } from "../dataBase/dataBase";
let credential = require('../../client_secret_1071194548646-nof2m91987p31ee13bsptc0jh66m6dio.apps.googleusercontent.com.json');

export async function connectToGoogle(req, res)
{
    const auth = new google.auth.OAuth2(credential.web.client_id, credential.web.client_secret, credential.web.redirect_uris[3]);
    const scopes = ['profile', 'email'];
    const authurl = auth.generateAuthUrl({access_type: 'offline', scope: scopes, prompt: 'consent', state: req.sessionID});
    
    res.status(200).json({url: authurl});
}

export async function getGoogleUserInfos(req, res)
{
    const code = req.query.code;
    const auth = new google.auth.OAuth2(credential.web.client_id, credential.web.client_secret, credential.web.redirect_uris[3]);
    console.log(req.query.state);
    try {
        const {tokens} = await auth.getToken(code);
        auth.setCredentials(tokens);
        const peopleApi = google.people({ version: 'v1', auth: auth});
        const userInfo = await peopleApi.people.get({
          resourceName: 'people/me',
          personFields: 'emailAddresses,names'
        });
        const email = userInfo.data.emailAddresses[0].value;
        const name = userInfo.data.names[0].displayName;
        let userId;
        const username = userInfo.data.names[0].givenName + userInfo.data.names[3].familyName;
        let status = await findUserWithName(username);
        if (status.length == 0) {
            userId = await addUserInBase(username, '12345', email);
            req.session._id = userId;
            req.session.save();
        } else {
            req.session._id = status[0]._id;
            req.session.save();
        }
        const token = sign({id: req.session._id.toString()}, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'}); 
        req.session.token = token;
        initializeSession(req);
        req.session.save();
        console.log(req.session);
        res.status(200).send("Sucessfully log in");
    } catch (error) {
      console.error('Erreur lors de l\'authentification avec Google :', error);
      res.status(500).send('Une erreur est survenue lors de l\'authentification avec Google.');
    }
}

const getSessionData = (sessionId, callback) => {
    redisStore.get(sessionId, (err, sessionData) => {
      if (err) {
        return callback(err);
      }
  
      // sessionData contient les données de session
      callback(null, sessionData);
    });
  };
  
  // Exemple d'utilisation
  export const getSession = (sessionId) => {
    getSessionData(sessionId, (err, sessionData) => {
      if (err) {
        console.error('Erreur lors de la récupération des données de session :', err);
        return;
      }
  
      // Faire quelque chose avec les données de session
      console.log('Données de session :', sessionData);
    });
  };
  