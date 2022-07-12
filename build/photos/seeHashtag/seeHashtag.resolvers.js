"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _default = {
  Query: {
    seeHashtag: function seeHashtag(_, _ref) {
      var tag = _ref.tag;
      return _client["default"].hashtag.findUnique({
        where: {
          tag: tag
        }
      });
    }
  }
};
exports["default"] = _default;