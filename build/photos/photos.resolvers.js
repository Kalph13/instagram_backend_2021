"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../client"));

var _default = {
  Photo: {
    /* @relations Values (user, hashtags and likes) Appear in Prisma but Don't Appear in GraphQL Query */

    /* Below Codes Enable GraphQL to Get @relations Value */
    user: function () {
      var _user = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var userID;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userID = _ref.userID;
                _context.next = 3;
                return _client["default"].user.findUnique({
                  where: {
                    id: userID
                  }
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function user(_x) {
        return _user.apply(this, arguments);
      }

      return user;
    }(),
    hashtags: function () {
      var _hashtags = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
        var id;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref2.id;
                _context2.next = 3;
                return _client["default"].hashtag.findMany({
                  where: {
                    photos: {
                      some: {
                        id: id
                      }
                    }
                  }
                });

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function hashtags(_x2) {
        return _hashtags.apply(this, arguments);
      }

      return hashtags;
    }(),
    likes: function () {
      var _likes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
        var id;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref3.id;
                _context3.next = 3;
                return _client["default"].like.count({
                  where: {
                    photoID: id
                  }
                });

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function likes(_x3) {
        return _likes.apply(this, arguments);
      }

      return likes;
    }(),
    comments: function () {
      var _comments = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref4) {
        var id;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref4.id;
                _context4.next = 3;
                return _client["default"].comment.findMany({
                  where: {
                    photoID: id
                  },
                  include: {
                    user: true
                  }
                });

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function comments(_x4) {
        return _comments.apply(this, arguments);
      }

      return comments;
    }(),
    commentsNumber: function () {
      var _commentsNumber = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref5) {
        var id;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = _ref5.id;
                _context5.next = 3;
                return _client["default"].comment.count({
                  where: {
                    photoID: id
                  }
                });

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function commentsNumber(_x5) {
        return _commentsNumber.apply(this, arguments);
      }

      return commentsNumber;
    }(),
    isMine: function isMine(_ref6, _, _ref7) {
      var userID = _ref6.userID;
      var loggedInUser = _ref7.loggedInUser;

      if (!loggedInUser) {
        return false;
      }

      return userID === loggedInUser.id;
    },
    isLiked: function () {
      var _isLiked = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref8, _, _ref9) {
        var id, loggedInUser, checkLiked;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = _ref8.id;
                loggedInUser = _ref9.loggedInUser;

                if (loggedInUser) {
                  _context6.next = 4;
                  break;
                }

                return _context6.abrupt("return", false);

              case 4:
                _context6.next = 6;
                return _client["default"].like.findUnique({
                  where: {
                    photoID_userID: {
                      photoID: id,
                      userID: loggedInUser.id
                    }
                  },
                  select: {
                    id: true
                  }
                });

              case 6:
                checkLiked = _context6.sent;

                if (!checkLiked) {
                  _context6.next = 9;
                  break;
                }

                return _context6.abrupt("return", true);

              case 9:
                return _context6.abrupt("return", false);

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function isLiked(_x6, _x7, _x8) {
        return _isLiked.apply(this, arguments);
      }

      return isLiked;
    }()
  },
  Hashtag: {
    photos: function () {
      var _photos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_ref10, _ref11, _ref12) {
        var id, page, loggedInUser;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                id = _ref10.id;
                page = _ref11.page;
                loggedInUser = _ref12.loggedInUser;
                _context7.next = 5;
                return _client["default"].hashtag.findUnique({
                  where: {
                    id: id
                  }
                }).photos();

              case 5:
                return _context7.abrupt("return", _context7.sent);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function photos(_x9, _x10, _x11) {
        return _photos.apply(this, arguments);
      }

      return photos;
    }(),
    totalPhotos: function () {
      var _totalPhotos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(_ref13) {
        var id;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                id = _ref13.id;
                _context8.next = 3;
                return _client["default"].photo.count({
                  where: {
                    hashtags: {
                      some: {
                        id: id
                      }
                    }
                  }
                });

              case 3:
                return _context8.abrupt("return", _context8.sent);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function totalPhotos(_x12) {
        return _totalPhotos.apply(this, arguments);
      }

      return totalPhotos;
    }()
  }
};
exports["default"] = _default;