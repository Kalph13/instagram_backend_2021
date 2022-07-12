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

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _users = require("../users.utils");

var _shared = require("../../shared/shared.utils");

var _graphqlUpload = require("graphql-upload");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var editProfile = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
    var firstName, lastName, username, email, newPassword, bio, avatar, loggedInUser, avatarURL, passwordHash, updatedUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            firstName = _ref.firstName, lastName = _ref.lastName, username = _ref.username, email = _ref.email, newPassword = _ref.password, bio = _ref.bio, avatar = _ref.avatar;
            loggedInUser = _ref2.loggedInUser;
            avatarURL = null;
            /* Seemingly Cannot Test 'Upload' on Apollo Studio: Re-test After the Client is Built */

            if (!avatar) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return (0, _shared.uploadToS3)(avatar, loggedInUser.id, "avatars");

          case 6:
            avatarURL = _context.sent;

          case 7:
            passwordHash = null;

            if (!newPassword) {
              _context.next = 12;
              break;
            }

            _context.next = 11;
            return _bcrypt["default"].hash(newPassword, 10);

          case 11:
            passwordHash = _context.sent;

          case 12:
            ;
            _context.next = 15;
            return _client["default"].user.update({
              where: {
                id: loggedInUser.id
              },
              data: _objectSpread(_objectSpread({
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                bio: bio
              }, passwordHash && {
                password: passwordHash
              }), avatarURL && {
                avatar: avatarURL
              })
            });

          case 15:
            updatedUser = _context.sent;

            if (!updatedUser.id) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return", {
              editProfileSucceed: true
            });

          case 20:
            return _context.abrupt("return", {
              editProfileSucceed: false,
              editProfileError: "Could Not Update the Profile"
            });

          case 21:
            ;

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function editProfile(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();
/* GraphQL Upload in Apollo v3: https://www.apollographql.com/docs/apollo-server/data/file-uploads */


var _default = {
  Upload: _graphqlUpload.GraphQLUpload,
  Mutation: {
    editProfile: (0, _users.protectResolver)(editProfile)
  }
};
exports["default"] = _default;