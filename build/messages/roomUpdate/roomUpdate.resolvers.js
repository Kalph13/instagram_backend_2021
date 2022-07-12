"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _pubsub = _interopRequireDefault(require("../../pubsub"));

var _constants = require("../../constants");

var _graphqlSubscriptions = require("graphql-subscriptions");

/* Listening for Events: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#listening-for-events */
var _default = {
  Subscription: {
    roomUpdate: {
      subscribe: function () {
        var _subscribe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(root, arg, context, info) {
          var checkRoom;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  console.log("------ RoomUpdate Called ------ context:", context);
                  console.log("------ RoomUpdate Called ------ id:", context.loggedInUser.username);
                  _context2.next = 4;
                  return _client["default"].room.findFirst({
                    where: {
                      id: arg.id,
                      users: {
                        some: {
                          id: context.loggedInUser.id
                        }
                      }
                    },
                    select: {
                      id: true
                    }
                  });

                case 4:
                  checkRoom = _context2.sent;

                  if (checkRoom) {
                    _context2.next = 7;
                    break;
                  }

                  throw new Error("You Shall Not See This");

                case 7:
                  return _context2.abrupt("return", (0, _graphqlSubscriptions.withFilter)(function () {
                    return _pubsub["default"].asyncIterator(_constants.NEW_MESSAGE);
                  }, /*#__PURE__*/function () {
                    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, _ref2, _ref3) {
                      var roomUpdate, id, loggedInUser, subscribedRoom;
                      return _regenerator["default"].wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              roomUpdate = _ref.roomUpdate;
                              id = _ref2.id;
                              loggedInUser = _ref3.loggedInUser;

                              if (!(roomUpdate.roomID === id)) {
                                _context.next = 10;
                                break;
                              }

                              _context.next = 6;
                              return _client["default"].room.findFirst({
                                where: {
                                  id: id,
                                  users: {
                                    some: {
                                      id: loggedInUser.id
                                    }
                                  }
                                },
                                select: {
                                  id: true
                                }
                              });

                            case 6:
                              subscribedRoom = _context.sent;

                              if (subscribedRoom) {
                                _context.next = 9;
                                break;
                              }

                              return _context.abrupt("return", false);

                            case 9:
                              return _context.abrupt("return", true);

                            case 10:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x5, _x6, _x7) {
                      return _ref4.apply(this, arguments);
                    };
                  }())(root, arg, context, info));

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function subscribe(_x, _x2, _x3, _x4) {
          return _subscribe.apply(this, arguments);
        }

        return subscribe;
      }()
    }
  }
};
exports["default"] = _default;