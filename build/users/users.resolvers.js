"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../client"));

var _default = {
  User: {
    photos: function () {
      var _photos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var id;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                return _context.abrupt("return", _client["default"].user.findUnique({
                  where: {
                    id: id
                  }
                }).photos());

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function photos(_x) {
        return _photos.apply(this, arguments);
      }

      return photos;
    }(),
    totalFollowing: function totalFollowing(_ref2) {
      var id = _ref2.id;
      return _client["default"].user.count({
        where: {
          followers: {
            some: {
              id: id
            }
          }
        }
      });
    },
    totalFollowers: function totalFollowers(_ref3) {
      var id = _ref3.id;
      return _client["default"].user.count({
        where: {
          following: {
            some: {
              id: id
            }
          }
        }
      });
    },
    isMe: function isMe(_ref4, _, _ref5) {
      var id = _ref4.id;
      var loggedInUser = _ref5.loggedInUser;

      if (!loggedInUser) {
        return false;
      }

      return id === loggedInUser.id;
    },
    isFollowing: function () {
      var _isFollowing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref6, _, _ref7) {
        var id, loggedInUser, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref6.id;
                loggedInUser = _ref7.loggedInUser;

                if (loggedInUser) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", false);

              case 4:
                _context2.next = 6;
                return _client["default"].user.count({
                  where: {
                    username: loggedInUser.username,
                    following: {
                      some: {
                        id: id
                      }
                    }
                  }
                });

              case 6:
                result = _context2.sent;
                return _context2.abrupt("return", Boolean(result));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function isFollowing(_x2, _x3, _x4) {
        return _isFollowing.apply(this, arguments);
      }

      return isFollowing;
    }()
  }
};
exports["default"] = _default;