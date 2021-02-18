const { gql, ApolloServer, AuthenticationError } = require("apollo-server-express");
const path = require("path");
const fs = require("fs");
const productSchema = fs.readFileSync(path.join(__dirname, "schemas", "product.graphql"));
const resolvers = require("./resolvers");
const UnAuthenticatedException = require("../exceptions/UnAuthenticatedException");
const auth = require("../security/Auth");
const UnAuthoratizedException = require("../exceptions/UnAuthoratizedException");

const typeDefinitions = gql`
    ${productSchema}
`;

module.exports = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers: resolvers,
    context({ req }) {
        if (!req.headers["x-api-token"]) {
            throw new AuthenticationError("You need mencionate x-api-token.");
        }

        const apiToken = req.headers["x-api-token"];
        if (!auth.hasPermission(apiToken)) {
            throw new AuthenticationError("You need mencionate x-api-token valid.");
        }

        return { userAuthenticated: true, "x-api-token": apiToken };
    },
    formatError: (err) => {
        replyErrorBasedTypeError = { 
            "NotFoundException": {
                statusCode: 404,
                error: err.message
            },
            "BusinessException": {
                statusCode: 408,
                error: err.message
            },
            "UnAuthenticatedException": {
                statusCode: 401,        
                error: err.message
            },
            "UnAuthoratizedException": {
                statusCode: 403,        
                error: err.message
            }
        }

        return replyErrorBasedTypeError[err.extensions.exception.name] || err;
    }
});