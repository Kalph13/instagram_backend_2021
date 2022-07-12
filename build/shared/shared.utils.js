"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToS3 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var uploadToS3 = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file, userID, folderName) {
    var _yield$file, filename, createReadStream, readStream, newFilename, _yield$AWS$S3$upload$, Location;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _awsSdk["default"].config.update({
              credentials: {
                accessKeyId: process.env.AWS_KEY,
                secretAccessKey: process.env.AWS_SECRET
              }
            });

            _context.next = 3;
            return file;

          case 3:
            _yield$file = _context.sent;
            filename = _yield$file.filename;
            createReadStream = _yield$file.createReadStream;
            readStream = createReadStream();
            newFilename = "".concat(folderName, "/").concat(userID, "-").concat(Date.now(), "-").concat(filename);
            _context.next = 10;
            return new _awsSdk["default"].S3().upload({
              Bucket: "kalph13-instagram-uploads",
              Key: newFilename,
              ACL: "public-read",
              Body: readStream
            }).promise();

          case 10:
            _yield$AWS$S3$upload$ = _context.sent;
            Location = _yield$AWS$S3$upload$.Location;
            return _context.abrupt("return", Location);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function uploadToS3(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadToS3 = uploadToS3;