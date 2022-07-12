"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectResolver = exports.getUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../client"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var getUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var _jwt$verify, id, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", null);

          case 3:
            _jwt$verify = _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY), id = _jwt$verify.id;
            _context.next = 6;
            return _client["default"].user.findUnique({
              where: {
                id: id
              }
            });

          case 6:
            user = _context.sent;

            if (!user) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", user);

          case 11:
            return _context.abrupt("return", null);

          case 12:
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", null);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var protectResolver = function protectResolver(resolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      var checkInfo = info.operation.operation === "query";

      if (checkInfo) {
        return null;
      } else {
        return {
          loginSucceed: false,
          loginError: "You Need to Login"
        };
      }
    }

    return resolver(root, args, context, info);
  };
};
/* Same as Above (Traditional Expression) */

/* export function protectResolver(resolver) {
    return function (root, args, context, info) {
        if (!context.loggedInUser) {
            return {
                loginSucceed: false,
                loginError: "You Need to Login"
            };
        }
        return resolver(root, args, context, info);
    };
} */


exports.protectResolver = protectResolver;