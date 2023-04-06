const imageType = require("image-type");
const sizeOf = require("image-size");
const { readdirSync, readFileSync } = require("fs");
const { fileExists, pluginConfigs } = require("../test_utils");
const fs = require("fs");

const plugins = pluginConfigs();
const configuredPlugins = new Set(plugins.map((plugin) => plugin.title));
const potentialFiles = new Set([
    "screenshot.png",
    "plugin.json",
    "plugin.zip",
]);

readdirSync("./store/plugins/", { withFileTypes: true }).forEach((plugin) => {
    it("is a directory", () => {
        expect(plugin.isDirectory()).toBe(true);
    });

    it("is configured in plugins.json", () => {
        expect(configuredPlugins.has(plugin.name)).toBe(true);
    });

    it("has an plugin.zip file", () => {
        expect(fileExists(`./store/plugins/${plugin.name}/plugin.zip`)).toBe(
            true
        );
    });

    it("may have a screenshot", () => {
        const path = `./store/plugins/${plugin.name}/screenshot.png`;
        if (fileExists(path)) {
            const buffer = readFileSync(path);
            const imgType = imageType(buffer);
            expect(imgType.ext).toBe("png");
            const dim = sizeOf(path);
            expect(dim.width).toBeLessThanOrEqual(960);
            expect(dim.height).toBeLessThanOrEqual(1200);
            expect(dim.width).toBeGreaterThanOrEqual(128);
            expect(dim.height).toBeGreaterThanOrEqual(64);
        }
    });

    it('has an plugin.json file', () => {
        const path = `./store/plugins/${plugin.name}/plugin.json`
        expect(fileExists(path)).toBe(true);
    })

    it('does not have other files', () => {
        fs.readdirSync(`./store/plugins/${plugin.name}/`).forEach(file => {
            expect(potentialFiles.has(file)).toBe(true)
        })
    })
});
