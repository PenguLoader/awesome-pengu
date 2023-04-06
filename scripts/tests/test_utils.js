const fs = require("fs");
const { readdirSync } = require("fs");
const exists = (x) => x !== null && x !== undefined;

const validURL = (str) => {
    // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
};

const isVersion = (str) =>
    str.match("^([0-9]+.)*[0-9]+$") != null && str.match("[1-9]") != null;

const fileExists = (path) => {
    try {
        return fs.statSync(path).isFile();
    } catch (err) {
        return false;
    }
};

const pluginConfigs = () => {
    return readdirSync("./store/plugins/").map((plugin) =>
        require(__dirname +
            `/../../store/plugins/${plugin}/plugin.json`)
    );
};

module.exports = {
    exists,
    validURL,
    isVersion,
    fileExists,
    pluginConfigs,
};
