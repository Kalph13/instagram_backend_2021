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
    createComment: (0, _users.protectResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var photoID, payload, loggedInUser, commentedPhoto, newComment;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                photoID = _ref.photoID, payload = _ref.payload;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _client["default"].photo.findUnique({
                  where: {
                    id: photoID
                  },
                  select: {
                    id: true
                  }
                });

              case 4:
                commentedPhoto = _context.sent;

                if (commentedPhoto) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  createCommentSucceed: false,
                  createCommentError: "Can't Find the Photo"
                });

              case 7:
                if (payload) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  createCommentSucceed: false,
                  createCommentError: "Please Write a Comment"
                });

              case 9:
                _context.next = 11;
                return _client["default"].comment.create({
                  data: {
                    payload: payload,
                    user: {
                      connect: {
                        id: loggedInUser.id
                      }
                    },
                    photo: {
                      connect: {
                        id: photoID
                      }
                    }
                    /* userID and photoID Don't Need to be Assigned Here (Automatically Matched via 'connect' */

                    /* userID: loggedInUser.id, */

                    /* photoID */

                  }
                });

              case 11:
                newComment = _context.sent;
                return _context.abrupt("return", {
                  createCommentSucceed: true,
                  createCommentID: newComment.id
                });

              case 13:
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