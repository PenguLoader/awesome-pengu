const config = require("../../store/config.json");
const { fileExists, validURL, exists } = require("./test_utils");

const categoryNames = new Set(config.categories.map((c) => c.name));
it("has unique category names", () => {
    expect(categoryNames.size === config.categories.length).toBe(true);
});

it.each(config.categories)("is a valid category", (category) => {
    expect(typeof category.name).toBe("string");
    expect(typeof category.description).toBe("string");
    expect(category.name).not.toBe("");
    expect(category.description).not.toBe("");
});

const typeNames = new Set(config.types.map((c) => c.name));
it("has unique types name", () => {
    expect(typeNames.size === config.types.length).toBe(true);
});
it.each(config.types)("is a valid type", (category) => {
    expect(typeof category.name).toBe("string");
    expect(typeof category.description).toBe("string");
});
