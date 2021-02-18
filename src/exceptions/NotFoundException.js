module.exports = class NotFoundException extends Error {

    constructor(message) {
        super(message);
        this.name = "NotFoundException"
    }
}