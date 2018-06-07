(function (ns) {
  "use strict";

  function UrlQuery() {}

  // Get query string parameter value.
  UrlQuery.get = function (url, field, defaultValue) {
    if (!url) {
      return;
    }

    var re = new RegExp("[?&]" + field + "=([^&]*)");
    var match = url.match(re);
    if (match && match.length > 1) {
      return decodeURIComponent(match[1]);
    } else {
      return defaultValue;
    }
  };

  UrlQuery.getAll = function (url) {
    if (!url) {
      return {};
    }

    var query = {};
    var qsIndex = url.indexOf("?");
    if (url.length > 1 && qsIndex >= 0) {
      var queryParts = url.substring(qsIndex + 1).split("&");
      for (var i = 0; i < queryParts.length; i++) {
        var param = queryParts[i].split("=");
        if (param.length === 2) {
          query[param[0]] = decodeURIComponent(param[1]);
        }
      }
    }

    return query;
  };

  // Add or update query string parameter from an url.
  UrlQuery.update = function (url, field, value) {
    if (url === undefined) {
      return url;
    }

    var re = new RegExp("([?&])" + field + "=[^&]*");
    var match = url.match(re);
    if (match && match.length > 1) {
      return url.replace(re, "$1" + field + "=" + encodeURIComponent(value));
    } else {
      var separator = url.indexOf("?") > 0 ? "&": "?";
      return url + separator + field + "=" + encodeURIComponent(value);
    }
  };

  // Add or update multiple query string parameters from an url.
  UrlQuery.updateAll = function (url, fields, values) {
    if (url === undefined || !fields || !values) {
      return url;
    }

    if (fields.length !== values.length) {
      return url;
    }

    var updatedUrl = url;
    for (var i = 0; i < fields.length; i++) {
      updatedUrl = UrlQuery.update(updatedUrl, fields[i], values[i]);
    }

    return updatedUrl;
  };

  // Remove query string parameter from an url.
  UrlQuery.remove = function (url, field) {
    if (url === undefined) {
      return url;
    }

    // Check middle field
    var re = new RegExp("[&]" + field + "=[^&]*");
    if (url.match(re)) {
      return url.replace(re, "");
    }

    // Check last field
    re = new RegExp("[?]" + field + "=[^&]*$");
    if (url.match(re)) {
      return url.replace(re, "");
    }

    // Check first
    re = new RegExp("[?]" + field + "=[^&]*&");
    if (url.match(re)) {
      return url.replace(re, "?");
    }

    return url;
  }

  // Remove multiple query string parameters from an url.
  UrlQuery.removeAll = function (url, fields) {
    if (url === undefined || !fields) {
      return url;
    }

    var updatedUrl = url;
    for (var i = 0; i < fields.length; i++) {
      updatedUrl = UrlQuery.remove(updatedUrl, fields[i]);
    }

    return updatedUrl;
  };

   // AMD support - from https://gist.github.com/CrocoDillon/9990078
    if (typeof define === "function" && define.amd) {
        define(function () { return UrlQuery; });
    // CommonJS and Node.js module support.
    } else if (typeof exports !== "undefined") {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = UrlQuery;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.UrlQuery = UrlQuery;
    } else {
        ns.UrlQuery = UrlQuery;
    }
})(this);
