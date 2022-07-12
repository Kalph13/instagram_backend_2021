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
    seeRooms: function () {
      var _seeRooms = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, __, _ref) {
        var loggedInUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                loggedInUser = _ref.loggedInUser;
                console.log("------ SeeRooms Called ------ id:", loggedInUser.username);
                _context.next = 4;
                return _client["default"].room.findMany({
                  where: {
                    users: {
                      some: {
                        id: loggedInUser.id
                      }
                    }
                  }
                });

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function seeRooms(_x, _x2, _x3) {
        return _seeRooms.apply(this, arguments);
      }

      return seeRooms;
    }()
  }
};
exports["default"] = _default;