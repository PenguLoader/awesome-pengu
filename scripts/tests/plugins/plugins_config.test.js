const plugin_configTest = require("../../../store/config.json");
const cur_plugins = require("../../../.auto-generated/plugins.json");
const fs = require("fs");
const moment = require("moment");
const { exists, validURL, isVersion, pluginConfigs } = require("../test_utils");

const plugins = pluginConfigs();
const allCategories = new Set(plugin_configTest.categories.map((c) => c.name));
const types = new Set(plugin_configTest.types.map((c) => c.name));

it("has unique plugin title", () => {
    const allNames = new Set(
        plugins.map((plugin) => plugin.title.toLowerCase())
    );
    expect(allNames.size === plugins.length);
});

for (const p of plugins) {
    describe("plugin syntax & validaty", () => {
        expect(typeof p.title).toBe("string");
        expect(p.title.match("^[^_.]+$") !== null).toBe(true);
        expect(p.title.length).toBeGreaterThan(4);
    });

    it("has a description", () => {
        expect(typeof p.description).toBe("string");
    });

    it("has at least one author", () => {
        expect(p.authors.length).toBeGreaterThanOrEqual(1);
    });

    it.each(p.authors)("has a valid author", (author) => {
        expect(typeof author.name).toBe("string");
        expect(
            !exists(author.discord) || author.discord.match(".*#[0-9]{4}$")
        ).not.toBe(null);
    });

    it("has a valid version", () => {
        expect(isVersion(p.version)).toBe(true);
    });

    it("has at least one category", () => {
        expect(p.categories.length >= 1).toBe(true);
    });

    it.each(p.categories)("has a valid category", (category) => {
        expect(allCategories.has(category)).toBe(true);
    });

    it("has a type", () => {
        expect(types.has(p.type)).toBe(true);
    });

    it("has the isOutdated field", () => {
        expect(typeof p.isOutdated).toBe("boolean");
    });
}
