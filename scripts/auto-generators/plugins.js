const fs = require("fs");
const { pluginConfigs } = require(__dirname + "/../tests/test_utils");

const generatePluginsList = () => {
    const dir = __dirname + "./../../.auto-generated";
    if (!fs.existsSync(dir)) {
        fs.mkdir(dir);
    }

    const authorsData = new Map();

    const allPluginConfigs = pluginConfigs();
    for (const config of allPluginConfigs) {
        for (const author of config.authors) {
            if (!authorsData.has(author.name))
                authorsData.set(author.name, { plCount: 0 });
            authorsData.get(author.name).plCount += 1;
        }
    }

    for (const config of allPluginConfigs) {
        for (const author of config.authors) {
            author.pluginsCount = authorsData.get(author.name).plCount;
        }
    }

    fs.writeFileSync(
        `${dir}/plugins.json`,
        JSON.stringify(pluginConfigs(), null, 2)
    );
};

module.exports = {
    generatePluginsList,
};