(function (ns) {
  "use strict";

  function UrlQuery() {}

  // Get query string parameter value.
  UrlQuery.get = function (url, field) {
    if (!url) {
      return;
    }

    var re = new RegExp("[?&]" + field + "=([^&]*)");
    var match = url.match(re);
    if (match && match.length > 1) {
      return match[1];
    }
  };

  // Add or update query string parameter from an url.
  UrlQuery.update = function (url, field, value) {
    if (url === undefined) {
      return url;
    }

    var re = new RegExp("([?&])" + field + "=[^&]*");
    var match = url.match(re);
    if (match && match.length > 1) {
      return url.replace(re, "$1" + field + "=" + value);
    } else {
      var separator = url.indexOf("?") > 0 ? "&": "?";
      return url + separator + field + "=" + value;
    }
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

  ns[ns.exports ? 'exports' : 'UrlQuery'] = UrlQuery;
}(typeof module !== 'undefined' && module.exports ? module : window));
