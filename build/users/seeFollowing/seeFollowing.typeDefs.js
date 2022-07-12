"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var _templateObject;

/* typeDef - schema.prisma Must be Synchronized */
var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    type SeeFollowingResult {\n        SeeFollowingSucceed: Boolean!\n        SeeFollowingError: String\n        SeeFollowingData: [User]\n    }\n    type Query {\n        seeFollowing(\n            username: String!\n            lastID: Int\n        ): SeeFollowingResult!\n    }\n"])));

exports["default"] = _default;