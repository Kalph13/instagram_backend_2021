"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  Comment: {
    isMine: function isMine(_ref, _, _ref2) {
      var userID = _ref.userID;
      var loggedInUser = _ref2.loggedInUser;

      if (!loggedInUser) {
        return false;
      }

      return userID === loggedInUser.id;
    }
  }
};
exports["default"] = _default;