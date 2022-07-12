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
var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    type Query {\n        seePhoto(id: Int!): Photo\n    }\n"])));

exports["default"] = _default;