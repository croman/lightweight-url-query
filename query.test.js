var assert = require("assert");
var urlQuery = require("./query");

// Test 'get'.
assert(urlQuery.get(undefined, "c") === undefined);
assert(urlQuery.get("", "c") === undefined);
assert(urlQuery.get("http://example.com/a/b?c=1&d=2&e=3", "c") === "1");
assert(urlQuery.get("http://example.com/a/b?c=1&d=2&e=3", "d") === "2");
assert(urlQuery.get("http://example.com/a/b?c=1&d=2&e=3", "e") === "3");
assert(urlQuery.get("http://example.com/a/b?c=1&d=2&e=3", "f") === undefined);
assert(urlQuery.get("http://example.com/a/b?c=1&d=2&e=3&f=", "f") === "");
assert(urlQuery.get("http://example.com/a/b?c=1&d=2&e=3&f=&g=5", "f") === "");
assert(urlQuery.get("http://example.com/a/b?c=1&d=2&e=a%3Db%26c%3Dd&f=&g=5", "e") === "a=b&c=d");
assert(urlQuery.get("http://example.com/a/b", "c") === undefined);
assert(urlQuery.get("http://example.com/a/b", "c", "1") === "1");
assert(urlQuery.get("http://example.com/a/b?c=1", "d", "2") === "2");

//Test 'getAll'.
assert.deepEqual(urlQuery.getAll(undefined), {});
assert.deepEqual(urlQuery.getAll(""), {});
assert.deepEqual(urlQuery.getAll("http://example.com/a/b?c=1&d=2&e=3"), {c: "1", d: "2", e: "3"});
assert.deepEqual(urlQuery.getAll("http://example.com/a/b?c=1&d=2&e=3&f="), {c: "1", d: "2", e: "3", f: ""});
assert.deepEqual(urlQuery.getAll("http://example.com/a/b?c=1&d=2&e=3&f=&g=5"), {c: "1", d: "2", e: "3", f: "", g: "5"});
assert.deepEqual(urlQuery.getAll("http://example.com/a/b?c=1&d=2&e=a%3Db%26c%3Dd&f=&g=5"), {c: "1", d: "2", e: "a=b&c=d", f: "", g: "5"});

// Test 'update'.
assert(urlQuery.update(undefined, "c", "1") === undefined);
assert(urlQuery.update("", "c", "1") === "?c=1");
assert(urlQuery.update("http://example.com/a/b", "c", "1") === "http://example.com/a/b?c=1");
assert(urlQuery.update("http://example.com/a/b", "c", "a=b&c=d") === "http://example.com/a/b?c=a%3Db%26c%3Dd");
assert(urlQuery.update("http://example.com/a/b?c=1", "c", "1") === "http://example.com/a/b?c=1");
assert(urlQuery.update("http://example.com/a/b?c=1", "c", "2") === "http://example.com/a/b?c=2");
assert(urlQuery.update("http://example.com/a/b?d=2&c=1&e=3", "c", "2") === "http://example.com/a/b?d=2&c=2&e=3");
assert(urlQuery.update("http://example.com/a/b?d=2&c=1&e=3", "c", "a=b&c=d") === "http://example.com/a/b?d=2&c=a%3Db%26c%3Dd&e=3");
assert(urlQuery.update("http://example.com/a/b?d=2", "c", "1") === "http://example.com/a/b?d=2&c=1");
assert(urlQuery.update("http://example.com/a/b?d=2&e=3", "c", "1") === "http://example.com/a/b?d=2&e=3&c=1");
assert(urlQuery.update("http://example.com/a/b?d=2&e=3", "g") === "http://example.com/a/b?d=2&e=3&g=undefined");
assert(urlQuery.update("http://example.com/a/b?d=2&c=1&e=3", "c") === "http://example.com/a/b?d=2&c=undefined&e=3");

//Test 'updateAll'.
assert(urlQuery.updateAll(undefined, ["c"], ["1"]) === undefined);
assert(urlQuery.updateAll("", ["c"], ["1"]) === "?c=1");
assert(urlQuery.updateAll("http://example.com/a/b", ["c"], ["1"]) === "http://example.com/a/b?c=1");
assert(urlQuery.updateAll("http://example.com/a/b", ["c", "d"], ["1", "2"]) === "http://example.com/a/b?c=1&d=2");
assert(urlQuery.updateAll("http://example.com/a/b", ["b", "c", "d"], ["1", "a=b&c=d", "2"]) === "http://example.com/a/b?b=1&c=a%3Db%26c%3Dd&d=2");
assert(urlQuery.updateAll("http://example.com/a/b?c=1", ["c"], ["1"]) === "http://example.com/a/b?c=1");
assert(urlQuery.updateAll("http://example.com/a/b?c=1", ["c"], ["2"]) === "http://example.com/a/b?c=2");
assert(urlQuery.updateAll("http://example.com/a/b?d=2&c=1&e=3", ["c"], ["2"]) === "http://example.com/a/b?d=2&c=2&e=3");
assert(urlQuery.updateAll("http://example.com/a/b?d=2&c=1&e=3", ["c"], ["a=b&c=d"]) === "http://example.com/a/b?d=2&c=a%3Db%26c%3Dd&e=3");
assert(urlQuery.updateAll("http://example.com/a/b?d=2", ["c"], ["1"]) === "http://example.com/a/b?d=2&c=1");
assert(urlQuery.updateAll("http://example.com/a/b?d=2&e=3", ["c"], ["1"]) === "http://example.com/a/b?d=2&e=3&c=1");
assert(urlQuery.updateAll("http://example.com/a/b?d=2&e=3", ["g"]) === "http://example.com/a/b?d=2&e=3");
assert(urlQuery.updateAll("http://example.com/a/b?d=2&e=3", undefined, ["g"]) === "http://example.com/a/b?d=2&e=3");
assert(urlQuery.updateAll("http://example.com/a/b?d=2&e=3") === "http://example.com/a/b?d=2&e=3");
assert(urlQuery.updateAll("http://example.com/a/b?d=2&e=3", ["g"], []) === "http://example.com/a/b?d=2&e=3");

// Test 'remove'.
assert(urlQuery.remove("http://example.com/a/b", "c") === "http://example.com/a/b");
assert(urlQuery.remove("http://example.com/a/b?c=1", "c") === "http://example.com/a/b");
assert(urlQuery.remove("http://example.com/a/b?c=a%3Db%26c%3Dd", "c") === "http://example.com/a/b");
assert(urlQuery.remove("http://example.com/a/b?c=1&d=2", "c") === "http://example.com/a/b?d=2");
assert(urlQuery.remove("http://example.com/a/b?e=3&c=1&d=2", "c") === "http://example.com/a/b?e=3&d=2");
assert(urlQuery.remove("http://example.com/a/b?e=3&c=a%3Db%26c%3Dd&d=2", "c") === "http://example.com/a/b?e=3&d=2");
assert(urlQuery.remove("http://example.com/a/b?e=3&c=1&d=2", "d") === "http://example.com/a/b?e=3&c=1");

// Test 'removeAll'.
assert(urlQuery.removeAll("http://example.com/a/b", ["c"]) === "http://example.com/a/b");
assert(urlQuery.removeAll("http://example.com/a/b?c=1", ["c"]) === "http://example.com/a/b");
assert(urlQuery.removeAll("http://example.com/a/b?c=a%3Db%26c%3Dd", ["c"]) === "http://example.com/a/b");
assert(urlQuery.removeAll("http://example.com/a/b?c=1&d=2", ["c"]) === "http://example.com/a/b?d=2");
assert(urlQuery.removeAll("http://example.com/a/b?c=1&d=2", ["c", "d"]) === "http://example.com/a/b");
assert(urlQuery.removeAll("http://example.com/a/b?e=3&c=1&d=2", ["c"]) === "http://example.com/a/b?e=3&d=2");
assert(urlQuery.removeAll("http://example.com/a/b?e=3&c=1&d=2", ["c", "d"]) === "http://example.com/a/b?e=3");
assert(urlQuery.removeAll("http://example.com/a/b?e=3&c=1&d=2", ["c", "d", "e"]) === "http://example.com/a/b");
assert(urlQuery.removeAll("http://example.com/a/b?e=3&c=a%3Db%26c%3Dd&d=2", ["c", "e"]) === "http://example.com/a/b?d=2");
assert(urlQuery.removeAll("http://example.com/a/b?e=3&c=1&d=2", ["d", "e"]) === "http://example.com/a/b?c=1");

console.log("Tests passed");
