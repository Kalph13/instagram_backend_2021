"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlSubscriptions = require("graphql-subscriptions");

/* Subscription: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#the-pubsub-class */

/* PubSub: Tracks Events */
var pubsub = new _graphqlSubscriptions.PubSub();
var _default = pubsub;
exports["default"] = _default;