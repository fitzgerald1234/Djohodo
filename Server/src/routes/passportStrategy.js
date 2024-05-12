import { Strategy } from "passport-google-oauth20";
import { findUserWithName, addUserInBase } from "../dataBase/dataBase";
import { OAuth2Strategy } from "passport-google-oauth";
import { api_url } from "../config";

export let connectWithGoogle = 
    new Strategy({
        clientID: '1071194548646-nof2m91987p31ee13bsptc0jh66m6dio.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: `${api_url}/api/v1/authWithGoogleCallback`,
        passReqToCallback: true,
        }, async (req, accessToken, refreshToken, profile, done) => {
          console.log(req.session);
          const username = profile.name.givenName + profile.name.familyName;
          let status = await findUserWithName(username);
          if (status.length == 0) {
            await addUserInBase(username, '12345', profile.emails[0].value);
            status = await findUserWithName(username);
          }
         let googleauth  = {
            id : status[0]._id,
            token : accessToken
         };
    return done(null, googleauth);
});
