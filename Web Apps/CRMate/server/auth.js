const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// middleware for token validation with Auth0

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://crmate.au.auth0.com/.well-known/jwks.json`
      }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: [`https://crmate.au.auth0.com/`],
    algorithms: ['RS256']
});

module.exports = checkJwt;