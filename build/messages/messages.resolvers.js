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
  Room: {
    users: function () {
      var _users = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var id;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                _context.next = 3;
                return _client["default"].room.findUnique({
                  where: {
                    id: id
                  }
                }).users();

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function users(_x) {
        return _users.apply(this, arguments);
      }

      return users;
    }(),
    messages: function () {
      var _messages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
        var id;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref2.id;
                _context2.next = 3;
                return _client["default"].message.findMany({
                  where: {
                    roomID: id
                  },
                  orderBy: {
                    createdAt: "asc"
                  }
                });

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function messages(_x2) {
        return _messages.apply(this, arguments);
      }

      return messages;
    }(),
    unreadTotal: function () {
      var _unreadTotal = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3, _, _ref4) {
        var id, loggedInUser;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref3.id;
                loggedInUser = _ref4.loggedInUser;
                _context3.next = 4;
                return _client["default"].message.count({
                  where: {
                    read: false,
                    roomID: id,
                    user: {
                      id: {
                        not: loggedInUser.id
                      }
                    }
                  }
                });

              case 4:
                return _context3.abrupt("return", _context3.sent);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function unreadTotal(_x3, _x4, _x5) {
        return _unreadTotal.apply(this, arguments);
      }

      return unreadTotal;
    }()
  },
  Message: {
    user: function () {
      var _user = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref5) {
        var id;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref5.id;
                _context4.next = 3;
                return _client["default"].message.findUnique({
                  where: {
                    id: id
                  }
                }).user();

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function user(_x6) {
        return _user.apply(this, arguments);
      }

      return user;
    }(),
    room: function () {
      var _room = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref6) {
        var id;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = _ref6.id;
                _context5.next = 3;
                return _client["default"].message.findUnique({
                  where: {
                    id: id
                  }
                }).room();

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function room(_x7) {
        return _room.apply(this, arguments);
      }

      return room;
    }()
  }
};
exports["default"] = _default;