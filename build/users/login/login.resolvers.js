"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _default = {
  Mutation: {
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var username, password, user, passwordCompare, jwtToken;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = _ref.username, password = _ref.password;
                _context.next = 3;
                return _client["default"].user.findFirst({
                  where: {
                    username: username
                  }
                });

              case 3:
                user = _context.sent;

                if (user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", {
                  loginSucceed: false,
                  loginError: "Username Not Found"
                });

              case 6:
                ;
                _context.next = 9;
                return _bcrypt["default"].compare(password, user.password);

              case 9:
                passwordCompare = _context.sent;

                if (passwordCompare) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", {
                  loginSucceed: false,
                  loginError: "Incorrect Password"
                });

              case 12:
                ;
                /* JSON Web Token: https://jwt.io */

                /* - Doc: https://github.com/auth0/node-jsonwebtoken */

                /* - Ref: https://mangkyu.tistory.com/56 */

                jwtToken = _jsonwebtoken["default"].sign({
                  id: user.id
                }, process.env.SECRET_KEY);
                return _context.abrupt("return", {
                  loginSucceed: true,
                  loginToken: jwtToken
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }
};
exports["default"] = _default;