"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var _templateObject;

var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    type Room {\n        id: Int!\n        users: [User]\n        messages: [Message]\n        unreadTotal: Int!\n        createdAt: String!\n        updatedAt: String!\n    }\n    type Message {\n        id: Int!\n        payload: String!\n        user: User\n        userID: Int\n        room: Room\n        roomID: Int\n        read: Boolean!\n        createdAt: String!\n        updatedAt: String!\n    }\n"])));

exports["default"] = _default;