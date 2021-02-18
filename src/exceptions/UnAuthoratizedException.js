module.exports = class UnAuthoratizedException extends Error {

    constructor(message) {
        super(message);
        this.name = "UnAuthoratizedException"
    }
}