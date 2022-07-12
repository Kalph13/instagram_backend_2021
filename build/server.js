"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _graphqlUpload = require("graphql-upload");

var _http = require("http");

var _ws = require("ws");

var _apolloServerCore = require("apollo-server-core");

var _ws2 = require("graphql-ws/lib/use/ws");

var _schema = require("@graphql-tools/schema");

var _morgan = _interopRequireDefault(require("morgan"));

var _schema2 = require("./schema");

var _users = require("./users/users.utils");

/* Babel (Enables ES6 Syntax) is Required to Use 'import' */

/* Babel Install: npm install @babel/node @babel/preset-env @babel/core -D */

/* Babel Setting: Create babel.config.json ("preset") and Modify the Run Script (node server.js → babel-node server) */

/* dotenv: https://www.npmjs.com/package/dotenv */

/* Enables .env in Node.js */
require('dotenv').config();
/* GraphQL Upload in Apollo v3: https://www.apollographql.com/docs/apollo-server/data/file-uploads */


/* To Set 'PORT', Enter '$env:PORT=4000' in the PowerShell Before Running or Add 'PORT=4000' in '.env' */

/* Ref: https://stackoverflow.com/questions/52666152/process-env-port-is-undefined-in-linuxcloud-environment */
var PORT = process.env.PORT;
var schema = (0, _schema.makeExecutableSchema)({
  typeDefs: _schema2.typeDefs,
  resolvers: _schema2.resolvers
});
var userToken;
/* GraphQL Upload in Apollo v3: https://www.apollographql.com/docs/apollo-server/data/file-uploads */

/* Enabling Subscription: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#enabling-subscriptions */

/* Apollo Studio Setting For Subscription: https://www.apollographql.com/docs/studio/explorer/additional-features/#subscription-support */

var startServer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var app, httpServer, wsServer, serverCleanup, apollo;
    return _regenerator["default"].wrap(function _callee7$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            app = (0, _express["default"])();
            httpServer = (0, _http.createServer)(app);
            wsServer = new _ws.WebSocketServer({
              server: httpServer,
              path: '/graphql'
            });
            /* Context Setting For Subscription: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#operation-context */

            serverCleanup = (0, _ws2.useServer)({
              schema: schema,

              /* Context to Subscription, Not GraphQL Resolvers */
              context: function () {
                var _context = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, msg, args) {
                  return _regenerator["default"].wrap(function _callee$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          // console.log("Subscription Context", ctx);
                          // console.log("Subscription Message", msg);
                          // console.log("Subscription Arguments", args);
                          console.log("------ Subscription Context ------ userToken: ", userToken);

                          if (userToken) {
                            _context2.next = 6;
                            break;
                          }

                          _context2.next = 4;
                          return (0, _users.getUser)(userToken);

                        case 4:
                          _context2.t0 = _context2.sent;
                          return _context2.abrupt("return", {
                            loggedInUser: _context2.t0
                          });

                        case 6:
                          return _context2.abrupt("return", {
                            loggedInUser: null
                          });

                        case 7:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee);
                }));

                function context(_x, _x2, _x3) {
                  return _context.apply(this, arguments);
                }

                return context;
              }(),

              /* onConnect and onDisconnect: Configure Subscription Server's Behavior When a Client Connects or Disconnects */

              /* - Doc: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#onconnect-and-ondisconnect */
              onConnect: function () {
                var _onConnect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
                  return _regenerator["default"].wrap(function _callee2$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          console.log("------ Subscription onConnect ------ userToken: ", userToken);

                          if (userToken) {
                            _context3.next = 3;
                            break;
                          }

                          throw new Error("You Can't Connect");

                        case 3:
                          console.log("Subscription Connected");
                          _context3.next = 6;
                          return (0, _users.getUser)(userToken);

                        case 6:
                          _context3.t0 = _context3.sent;
                          return _context3.abrupt("return", {
                            loggedInUser: _context3.t0
                          });

                        case 8:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee2);
                }));

                function onConnect(_x4) {
                  return _onConnect.apply(this, arguments);
                }

                return onConnect;
              }(),
              onDisconnect: function () {
                var _onDisconnect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
                  return _regenerator["default"].wrap(function _callee3$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          console.log("Subscription Disconnected");

                        case 1:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee3);
                }));

                function onDisconnect(_x5) {
                  return _onDisconnect.apply(this, arguments);
                }

                return onDisconnect;
              }()
            }, wsServer);
            apollo = new _apolloServerExpress.ApolloServer({
              resolvers: _schema2.resolvers,
              typeDefs: _schema2.typeDefs,

              /* GraphQL Playground is Deprecated in Apollo 3: https://www.apollographql.com/docs/apollo-server/migration/#graphql-playground */

              /* playground: true, */

              /* GraphQL Introspection: Information About the Underlying Schema (A Discovery and Diagnostic Tool in Development Phase, Not in Production Phase) */

              /* - Ref: https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/ */

              /* introspection: true, */

              /* Context to GraphQL Resolvers */
              context: function () {
                var _context5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref2) {
                  var req;
                  return _regenerator["default"].wrap(function _callee4$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          req = _ref2.req;

                          if (!req) {
                            _context6.next = 7;
                            break;
                          }

                          userToken = req.headers.authorization;
                          _context6.next = 5;
                          return (0, _users.getUser)(req.headers.authorization);

                        case 5:
                          _context6.t0 = _context6.sent;
                          return _context6.abrupt("return", {
                            loggedInUser: _context6.t0
                          });

                        case 7:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee4);
                }));

                function context(_x6) {
                  return _context5.apply(this, arguments);
                }

                return context;
              }(),
              plugins: [(0, _apolloServerCore.ApolloServerPluginDrainHttpServer)({
                httpServer: httpServer
              }), {
                serverWillStart: function serverWillStart() {
                  return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
                    return _regenerator["default"].wrap(function _callee6$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            return _context8.abrupt("return", {
                              drainServer: function drainServer() {
                                return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
                                  return _regenerator["default"].wrap(function _callee5$(_context7) {
                                    while (1) {
                                      switch (_context7.prev = _context7.next) {
                                        case 0:
                                          _context7.next = 2;
                                          return serverCleanup.dispose();

                                        case 2:
                                        case "end":
                                          return _context7.stop();
                                      }
                                    }
                                  }, _callee5);
                                }))();
                              }
                            });

                          case 1:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee6);
                  }))();
                }
              }],
              cache: 'bounded',

              /* Must be Included for Security When Using GraphQL Upload */

              /* Doc: https://www.apollographql.com/blog/backend/file-uploads/file-upload-best-practices */
              csrfPrevention: true
            });
            _context9.next = 7;
            return apollo.start();

          case 7:
            app.use((0, _graphqlUpload.graphqlUploadExpress)());
            /* app.use(morgan("combined")); */

            apollo.applyMiddleware({
              app: app
            });
            /* Express Static: http://expressjs.com/ko/starter/static-files.html */

            app.use("/static", _express["default"]["static"]("uploads"));
            _context9.next = 12;
            return new Promise(function (r) {
              httpServer.listen({
                port: PORT
              }, r);
            });

          case 12:
            console.log("Server is Ready at http://localhost:".concat(PORT).concat(apollo.graphqlPath));

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee7);
  }));

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();

startServer();
/* server.listen(PORT).then(() => {
    console.log(`Server is Ready at http://localhost:${PORT}`);
}); */

/* Heroku */

/* - Getting Started: https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true */

/* - Environment: https://devcenter.heroku.com/articles/config-vars */

/* - Postgres: https://devcenter.heroku.com/articles/heroku-postgresql#set-up-postgres-on-windows */

/* - Apollo GraphQL <> Heroku: https://www.apollographql.com/docs/apollo-server/deployment/heroku/ */

/* - GraphQL URL: https://circleci.com/blog/continuous-deployment-of-an-express-graphql-server-to-heroku/ */

/* File Upload: Multipart Request -> Signed URL */

/* - Give the Client a Temporary URL for Uploading a File Directly (Bypass the GraphQL Server) */

/* - Scalability (Don't Use Multipart Upload Requests in a Real Project) */

/* - Doc (Official): https://www.apollographql.com/blog/backend/file-uploads/file-upload-best-practices */

/* - Doc (GraphQL S3): https://github.com/graphql-services/graphql-files-s3 */

/* - ENG 1: https://wundergraph.com/blog/graphql_file_uploads_evaluating_the_5_most_common_approaches#combining-a-graphql-api-with-a-dedicated-s3-storage-api */

/* - ENG 2: https://stackoverflow.com/questions/69012648/use-pre-signed-urls-to-upload-files-to-amazon-s3-hasura-actions-reacjs */

/* - KOR 1: https://velog.io/@mimi0905/Presigned-URL%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-S3%EB%A1%9C-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C */

/* - KOR 2: https://velog.io/@godkimchichi/AWS-S3-presigned-url%EB%A1%9C-%EC%97%85%EB%A1%9C%EB%93%9C%EC%8B%9C-%ED%8C%8C%EC%9D%BC%EC%9D%B4-%EA%B9%A8%EC%A7%88-%EB%95%8C */