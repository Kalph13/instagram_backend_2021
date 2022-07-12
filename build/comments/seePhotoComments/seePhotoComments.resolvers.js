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
    seePhotoComments: function () {
      var _seePhotoComments = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var id;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                _context.next = 3;
                return _client["default"].comment.findMany({
                  where: {
                    photoID: id
                  },
                  orderBy: {
                    createdAt: "asc"
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

      function seePhotoComments(_x, _x2) {
        return _seePhotoComments.apply(this, arguments);
      }

      return seePhotoComments;
    }()
  }
};
exports["default"] = _default;