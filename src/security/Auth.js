const apiFakeTokens = require("../fakeDatas/ApiToken");

module.exports = {

    hasPermission(apiToken) {
        return apiFakeTokens[apiToken] || false;
    }
}