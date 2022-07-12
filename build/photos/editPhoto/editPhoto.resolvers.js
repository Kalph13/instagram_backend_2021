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

var _photos = require("../photos.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = {
  Mutation: {
    editPhoto: (0, _users.protectResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, caption, loggedInUser, oldPhoto, newPhoto;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id, caption = _ref.caption;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _client["default"].photo.findFirst({
                  where: {
                    id: id,
                    userID: loggedInUser.id
                  },
                  include: {
                    hashtags: {
                      select: {
                        tag: true
                      }
                    }
                  }
                });

              case 4:
                oldPhoto = _context.sent;

                if (oldPhoto) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  editPhotoSucceed: false,
                  editPhotoError: "Can't Find the Photo"
                });

              case 7:
                _context.next = 9;
                return _client["default"].photo.update({
                  where: {
                    id: id
                  },
                  data: {
                    caption: caption,
                    hashtags: _objectSpread({
                      disconnect: oldPhoto.hashtags
                    }, (0, _photos.extractHashtags)(caption) && {
                      connectOrCreate: (0, _photos.extractHashtags)(caption)
                    })
                  }
                });

              case 9:
                newPhoto = _context.sent;
                return _context.abrupt("return", {
                  editPhotoSucceed: true
                });

              case 11:
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