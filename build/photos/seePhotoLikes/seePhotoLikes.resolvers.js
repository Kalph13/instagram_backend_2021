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
  Query: {
    seePhotoLikes: (0, _users.protectResolver)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var id, likeObj;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                _context.next = 3;
                return _client["default"].like.findMany({
                  where: {
                    photoID: id
                  },
                  select: {
                    id: true,
                    photoID: true,
                    photo: true,
                    user: true
                  }
                  /*
                      likeObj without select: { user: true } (Return All Fields Except @relation)
                      [
                          {
                              id: 1,
                              photoID: 7,
                              userID: 14,
                              createdAt: 2022-06-15T09:08:02.354Z,
                              updatedAt: 2022-06-15T09:08:02.358Z
                          }
                      ]
                        likeObj with select: { user: true } (Return Only Selected Fields - Return 'user' in this Case )
                      [
                          {
                              user: {
                                  id: 14,
                                  firstName: 'Soonsoon',
                                  lastName: 'Kim',
                                  username: 'Trouble Maker',
                                  email: 'soonsoon.kim@gmail.com',
                                  password: '$2b$10$sAfP498xOjCsAAsmMKo/9.9MCyUPihHkjtRJgiWxNrnVOJLSksu4y',
                                  bio: "I'm the King of Dogs",
                                  avatar: null,
                                  createdAt: 2022-06-14T21:42:28.509Z,
                                  updatedAt: 2022-06-14T21:47:28.797Z
                              }
                          }
                      ]
                  */

                });

              case 3:
                likeObj = _context.sent;
                return _context.abrupt("return", likeObj.map(function (item) {
                  return item.user;
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;