"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../../users/users.utils");

var _pubsub = _interopRequireDefault(require("../../pubsub"));

var _constants = require("../../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = {
  Mutation: {
    sendMessage: (0, _users.protectResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var userID, roomID, payload, loggedInUser, room, invitedUser, newMessage;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userID = _ref.userID, roomID = _ref.roomID, payload = _ref.payload;
                loggedInUser = _ref2.loggedInUser;
                room = null;

                if (!userID) {
                  _context.next = 14;
                  break;
                }

                _context.next = 6;
                return _client["default"].user.findUnique({
                  where: {
                    id: userID
                  },
                  select: {
                    id: true
                  }
                });

              case 6:
                invitedUser = _context.sent;

                if (invitedUser) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  sendMessageSucceed: false,
                  sendMessageError: "Can't Find the User"
                });

              case 9:
                _context.next = 11;
                return _client["default"].room.create({
                  data: {
                    users: {
                      connect: [{
                        id: userID
                      }, {
                        id: loggedInUser.id
                      }]
                    }
                  }
                });

              case 11:
                room = _context.sent;
                _context.next = 20;
                break;

              case 14:
                if (!roomID) {
                  _context.next = 20;
                  break;
                }

                _context.next = 17;
                return _client["default"].room.findUnique({
                  where: {
                    id: roomID
                  }
                });

              case 17:
                room = _context.sent;

                if (room) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("return", {
                  sendMessageSucceed: false,
                  sendMessageError: "Can't Find the Room"
                });

              case 20:
                _context.next = 22;
                return _client["default"].message.create({
                  data: {
                    payload: payload,
                    user: {
                      connect: {
                        id: loggedInUser.id
                      }
                    },
                    room: {
                      connect: {
                        id: room.id
                      }
                    }
                  }
                });

              case 22:
                newMessage = _context.sent;
                console.log("------ SendMessage Called ------ id:", loggedInUser.username);
                console.log("newMessage: ", newMessage.payload);
                /* Publishing Events: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#publishing-an-event */

                _pubsub["default"].publish(_constants.NEW_MESSAGE, {
                  roomUpdate: _objectSpread({}, newMessage)
                });

                return _context.abrupt("return", {
                  sendMessageSucceed: true,
                  sendMessageID: newMessage.id
                });

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;