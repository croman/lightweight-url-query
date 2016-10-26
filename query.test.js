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
assert(urlQuery.get("http://example.com/a/b", "c") === undefined);

// Test 'update'.
assert(urlQuery.update(undefined, "c", "1") === undefined);
assert(urlQuery.update("", "c", "1") === "?c=1");
assert(urlQuery.update("http://example.com/a/b", "c", "1") === "http://example.com/a/b?c=1");
assert(urlQuery.update("http://example.com/a/b?c=1", "c", "1") === "http://example.com/a/b?c=1");
assert(urlQuery.update("http://example.com/a/b?c=1", "c", "2") === "http://example.com/a/b?c=2");
assert(urlQuery.update("http://example.com/a/b?d=2&c=1&e=3", "c", "2") === "http://example.com/a/b?d=2&c=2&e=3");
assert(urlQuery.update("http://example.com/a/b?d=2", "c", "1") === "http://example.com/a/b?d=2&c=1");
assert(urlQuery.update("http://example.com/a/b?d=2&e=3", "c", "1") === "http://example.com/a/b?d=2&e=3&c=1");
assert(urlQuery.update("http://example.com/a/b?d=2&e=3", "g") === "http://example.com/a/b?d=2&e=3&g=undefined");
assert(urlQuery.update("http://example.com/a/b?d=2&c=1&e=3", "c") === "http://example.com/a/b?d=2&c=undefined&e=3");

// Test 'remove'
assert(urlQuery.remove("http://example.com/a/b", "c") === "http://example.com/a/b");
assert(urlQuery.remove("http://example.com/a/b?c=1", "c") === "http://example.com/a/b");
assert(urlQuery.remove("http://example.com/a/b?c=1&d=2", "c") === "http://example.com/a/b?d=2");
assert(urlQuery.remove("http://example.com/a/b?e=3&c=1&d=2", "c") === "http://example.com/a/b?e=3&d=2");
assert(urlQuery.remove("http://example.com/a/b?e=3&c=1&d=2", "d") === "http://example.com/a/b?e=3&c=1");

console.log("Tests passed");
