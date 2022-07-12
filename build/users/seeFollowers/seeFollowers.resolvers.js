"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _default = {
  Query: {
    seeFollowers: function () {
      var _seeFollowers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var username, page, checkUsername, followersPerPage, followers, totalFollowers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = _ref.username, page = _ref.page;
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
                  SeeFollowersSucceed: false,
                  SeeFollowersError: "The User Doesn't Exist"
                });

              case 6:
                followersPerPage = 5;
                _context.next = 9;
                return _client["default"].user.findUnique({
                  where: {
                    username: username
                  }
                }).followers({
                  skip: (page - 1) * followersPerPage,
                  take: followersPerPage
                  /* Pagination: https://www.prisma.io/docs/concepts/components/prisma-client/pagination#offset-pagination */

                });

              case 9:
                followers = _context.sent;
                _context.next = 12;
                return _client["default"].user.count({
                  where: {
                    following: {
                      some: {
                        username: username
                      }
                    }
                  }
                  /* Some: Returns All Records Where At Least One Releated Record Matches Filtering Criteria */

                });

              case 12:
                totalFollowers = _context.sent;
                return _context.abrupt("return", {
                  SeeFollowersSucceed: true,
                  SeeFollowersData: followers,
                  SeeFollowersTotalPages: Math.ceil(totalFollowers / followersPerPage)
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function seeFollowers(_x, _x2) {
        return _seeFollowers.apply(this, arguments);
      }

      return seeFollowers;
    }()
  }
};
exports["default"] = _default;