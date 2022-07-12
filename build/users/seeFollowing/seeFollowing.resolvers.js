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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = {
  Query: {
    seeFollowing: function () {
      var _seeFollowing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var username, lastID, checkUsername, followingPerPage, following;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = _ref.username, lastID = _ref.lastID;
                _context.next = 3;
                return _client["default"].user.findUnique({
                  where: {
                    username: username
                  },
                  select: {
                    id: true
                  }
                  /* Select: Return a Limited Subset of Fields (Returns Only 'id' of the username in this Case) */

                  /* - Doc: https://www.prisma.io/docs/concepts/components/prisma-client/select-fields */

                });

              case 3:
                checkUsername = _context.sent;

                if (checkUsername) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", {
                  SeeFollowingSucceed: false,
                  SeeFollowingError: "The User Doesn't Exist"
                });

              case 6:
                followingPerPage = 5;
                _context.next = 9;
                return _client["default"].user.findUnique({
                  where: {
                    username: username
                  }
                }).following(_objectSpread({
                  skip: lastID ? 1 : 0,

                  /* 1: Skip the Cursor */

                  /* 2: Don't Skip the Cursor (In this Case, Start From the Beginning) */
                  take: followingPerPage
                }, lastID && {
                  cursor: {
                    id: lastID
                  }
                }));

              case 9:
                following = _context.sent;
                return _context.abrupt("return", {
                  SeeFollowingSucceed: true,
                  SeeFollowingData: following
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function seeFollowing(_x, _x2) {
        return _seeFollowing.apply(this, arguments);
      }

      return seeFollowing;
    }()
  }
};
exports["default"] = _default;