"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

var _templateObject;

/* GraphQL Upload in Apollo v3: https://www.apollographql.com/docs/apollo-server/data/file-uploads */
var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    scalar Upload\n    type EditProfileResult {\n        editProfileSucceed: Boolean!\n        editProfileError: String\n    }\n    type File {\n        filename: String!\n        mimetype: String!\n        encoding: String!\n    }\n    type Mutation {\n        editProfile (\n            firstName: String\n            lastName: String\n            username: String\n            email: String\n            password: String\n            bio: String\n            avatar: Upload\n        ): EditProfileResult!\n    }\n"])));

exports["default"] = _default;