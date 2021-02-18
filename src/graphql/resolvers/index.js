const { AuthenticationError } = require("apollo-server-express");
const {
    createProduct, getAllProducts,
    getById, remove, update
} = require("./ProducResolver");

const isUserAuthenticated = (resolver) => {
    return async (parent, args, context) => {
        if (!context.userAuthenticated) {
            throw new AuthenticationError("You can't access or execute action.")
        }
        return resolver(parent, args, context);
    }
}

module.exports = {
    Query: {
        getAllProducts: isUserAuthenticated(getAllProducts),
        getById: isUserAuthenticated(getById)
    },
    Mutation: {
        createProduct: isUserAuthenticated(createProduct),
        remove: isUserAuthenticated(remove), 
        update: isUserAuthenticated(update)
    }
};