module.exports = {
    "facebookAuth": {
        "clientID": "199827757247091",
        "clientSecret": "4c5001024b09190d61790fe5f32b556f",
        "callbackURL": "http://localhost:3000/users/auth/facebook/callback",
        profileFields: ["id", "email", "name", "gender", "displayName", "photos"],
        passReqToCallback: true
    }
};