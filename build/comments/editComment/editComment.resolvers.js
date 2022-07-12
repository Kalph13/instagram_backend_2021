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
    editComment: (0, _users.protectResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, payload, loggedInUser, editedComment;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id, payload = _ref.payload;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _client["default"].comment.findUnique({
                  where: {
                    id: id
                  },
                  select: {
                    userID: true
                  }
                });

              case 4:
                editedComment = _context.sent;

                if (editedComment) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  editCommentSucceed: false,
                  editCommentError: "Can't Find the Comment"
                });

              case 9:
                if (!(editedComment.userID !== loggedInUser.id)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", {
                  editCommentSucceed: false,
                  editCommentError: "Can't Edit Other User's Comment"
                });

              case 13:
                _context.next = 15;
                return _client["default"].comment.update({
                  where: {
                    id: id
                  },
                  data: {
                    payload: payload
                  }
                });

              case 15:
                return _context.abrupt("return", {
                  editCommentSucceed: true
                });

              case 16:
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