"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../../users/users.utils");

var _default = {
  Mutation: {
    toggleLike: (0, _users.protectResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, loggedInUser, likedPhoto, likeIDs, likeObj;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _client["default"].photo.findUnique({
                  where: {
                    id: id
                  }
                });

              case 4:
                likedPhoto = _context.sent;

                if (likedPhoto) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  toggleLikeSucceed: false,
                  toggleLikeError: "Can't Find the Photo"
                });

              case 7:
                /* photoID: ID of the Liked Photo */

                /* userID: ID of the User Who Liked the Photo */
                likeIDs = {
                  /* The Name Matters: Must be 'photoID_userID' */

                  /* In schema.prisma: @@unique([photoID, userID]) */

                  /* In migration.sql: CREATE UNIQUE INDEX "Like_photoID_userID_key" ON "Like"("photoID", "userID") */
                  photoID_userID: {
                    photoID: id,
                    userID: loggedInUser.id
                  }
                };
                /* Check Whether the User Liked the Photo Before */

                _context.next = 10;
                return _client["default"].like.findUnique({
                  where: likeIDs
                });

              case 10:
                likeObj = _context.sent;

                if (!likeObj) {
                  _context.next = 16;
                  break;
                }

                _context.next = 14;
                return _client["default"].like["delete"]({
                  where: likeIDs
                });

              case 14:
                _context.next = 18;
                break;

              case 16:
                _context.next = 18;
                return _client["default"].like.create({
                  data: {
                    user: {
                      connect: {
                        id: loggedInUser.id
                      }
                    },
                    photo: {
                      connect: {
                        id: likedPhoto.id
                      }
                    }
                  }
                });

              case 18:
                return _context.abrupt("return", {
                  toggleLikeSucceed: true
                });

              case 19:
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