module.exports = class UnAuthenticatedException extends Error {

    constructor(message) {
        super(message);
        this.name = "UnAuthenticatedException"
    }
}