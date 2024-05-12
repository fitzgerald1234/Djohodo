import passport from "passport";
import { findUserWithName, addUserInBase } from './dataBase/dataBase';

passport.use(new Strategy({
  clientID: '1071194548646-nof2m91987p31ee13bsptc0jh66m6dio.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:8080/api/v1/authWithGoogleCallback',
  passReqToCallback: true,
  }, async (req, accessToken, refreshToken, profile, done) => {
    const username = profile.name.givenName + profile.name.familyName;
    let status = await findUserWithName(username);
    if (status.length == 0) {
      await addUserInBase(username, '12345', profile.emails[0].value);
      status = await findUserWithName(username);
    }
    req.session._id = status[0]._id.toString();
    req.session.token = accessToken;
   let googleauth  = {
      id : status[0]._id.toString(),
      token : accessToken
   };
    return done(null, googleauth);
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});