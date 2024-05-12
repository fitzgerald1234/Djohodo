"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUser = addUser;
exports.addUserInBase = addUserInBase;
exports.changeAreaStatus = changeAreaStatus;
exports.connectToCluster = connectToCluster;
exports.createAction = createAction;
exports.createArea = createArea;
exports.createReaction = createReaction;
exports.deleteAreaWithName = deleteAreaWithName;
exports.deleteUserInBase = deleteUserInBase;
exports.findActionWithid = findActionWithid;
exports.findAreaWithName = findAreaWithName;
exports.findReactionWithid = findReactionWithid;
exports.findUserWithName = findUserWithName;
exports.findUserWithNameandEmail = findUserWithNameandEmail;
exports.findUserWithiD = findUserWithiD;
exports.getAllArea = getAllArea;
exports.getAllAreaOfUser = getAllAreaOfUser;
exports.getAllUser = getAllUser;
exports.getAreaWithName = getAreaWithName;
exports.putElemInBase = putElemInBase;
exports.updateData = updateData;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongodb = require("mongodb");
function connectToCluster(_x) {
  return _connectToCluster.apply(this, arguments);
} //let mongoClient = await connectToCluster('mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority');
function _connectToCluster() {
  _connectToCluster = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(uri) {
    var mongoClient;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          mongoClient = new _mongodb.MongoClient(uri);
          console.log('Connecting to MongoDB Atlas cluster...');
          _context.next = 5;
          return mongoClient.connect();
        case 5:
          console.log('Successfully connected to MongoDB Atlas!');
          return _context.abrupt("return", mongoClient);
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Connection to MongoDB Atlas failed!', _context.t0);
          process.exit();
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return _connectToCluster.apply(this, arguments);
}
function getAllUser() {
  return _getAllUser.apply(this, arguments);
}
function _getAllUser() {
  _getAllUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var uri, mongoClient, users, db, collection;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context2.prev = 1;
          _context2.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context2.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('USERS');
          _context2.next = 9;
          return collection.find({}).toArray();
        case 9:
          users = _context2.sent;
        case 10:
          _context2.prev = 10;
          _context2.next = 13;
          return mongoClient.close();
        case 13:
          return _context2.finish(10);
        case 14:
          return _context2.abrupt("return", users);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1,, 10, 14]]);
  }));
  return _getAllUser.apply(this, arguments);
}
function getAllAreaOfUser(_x2) {
  return _getAllAreaOfUser.apply(this, arguments);
}
function _getAllAreaOfUser() {
  _getAllAreaOfUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var uri, mongoClient, area, db, collection;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context3.prev = 1;
          _context3.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context3.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('AREAS');
          _context3.next = 9;
          return collection.find({
            user: id
          }).toArray();
        case 9:
          area = _context3.sent;
        case 10:
          _context3.prev = 10;
          _context3.next = 13;
          return mongoClient.close();
        case 13:
          return _context3.finish(10);
        case 14:
          return _context3.abrupt("return", area);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1,, 10, 14]]);
  }));
  return _getAllAreaOfUser.apply(this, arguments);
}
function getAllArea() {
  return _getAllArea.apply(this, arguments);
}
function _getAllArea() {
  _getAllArea = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var uri, mongoClient, area, db, collection;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context4.prev = 1;
          _context4.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context4.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('AREAS');
          _context4.next = 9;
          return collection.find({}).toArray();
        case 9:
          area = _context4.sent;
        case 10:
          _context4.prev = 10;
          _context4.next = 13;
          return mongoClient.close();
        case 13:
          return _context4.finish(10);
        case 14:
          return _context4.abrupt("return", area);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1,, 10, 14]]);
  }));
  return _getAllArea.apply(this, arguments);
}
function addUserInBase(_x3, _x4, _x5) {
  return _addUserInBase.apply(this, arguments);
}
function _addUserInBase() {
  _addUserInBase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(Username, passWord, email) {
    var uri, mongoClient, insert, db, collection, User;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context5.prev = 1;
          _context5.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context5.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('USERS');
          User = {
            username: Username,
            password: passWord,
            mail: email
          };
          _context5.next = 10;
          return collection.insertOne(User);
        case 10:
          insert = _context5.sent;
        case 11:
          _context5.prev = 11;
          _context5.next = 14;
          return mongoClient.close();
        case 14:
          return _context5.finish(11);
        case 15:
          return _context5.abrupt("return", insert.insertedId);
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1,, 11, 15]]);
  }));
  return _addUserInBase.apply(this, arguments);
}
function addUser(_x6, _x7, _x8, _x9) {
  return _addUser.apply(this, arguments);
}
function _addUser() {
  _addUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(collection, Username, passWord, email) {
    var User;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          User = {
            username: Username,
            password: passWord,
            mail: email
          };
          _context6.next = 3;
          return collection.insertOne(User);
        case 3:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _addUser.apply(this, arguments);
}
function updateData(_x10, _x11, _x12) {
  return _updateData.apply(this, arguments);
}
function _updateData() {
  _updateData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(collection, name, updating) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return collection.updateOne({
            name: name
          }, {
            $set: updating
          });
        case 2:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _updateData.apply(this, arguments);
}
function putElemInBase(_x13, _x14) {
  return _putElemInBase.apply(this, arguments);
}
function _putElemInBase() {
  _putElemInBase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id, updating) {
    var uri, mongoClient, db, collection;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context8.prev = 1;
          _context8.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context8.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('USERS');
          _context8.next = 9;
          return collection.updateOne({
            _id: id
          }, {
            $set: updating
          });
        case 9:
          _context8.prev = 9;
          _context8.next = 12;
          return mongoClient.close();
        case 12:
          return _context8.finish(9);
        case 13:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1,, 9, 13]]);
  }));
  return _putElemInBase.apply(this, arguments);
}
function deleteUserInBase(_x15) {
  return _deleteUserInBase.apply(this, arguments);
}
function _deleteUserInBase() {
  _deleteUserInBase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(Username) {
    var uri, mongoClient, db, collection;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context9.prev = 1;
          _context9.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context9.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('USERS');
          _context9.next = 9;
          return collection.deleteOne({
            username: Username
          });
        case 9:
          _context9.prev = 9;
          _context9.next = 12;
          return mongoClient.close();
        case 12:
          return _context9.finish(9);
        case 13:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1,, 9, 13]]);
  }));
  return _deleteUserInBase.apply(this, arguments);
}
function findUserWithNameandEmail(_x16, _x17) {
  return _findUserWithNameandEmail.apply(this, arguments);
}
function _findUserWithNameandEmail() {
  _findUserWithNameandEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(Username, email) {
    var uri, mongoClient, user, db, collection;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context10.prev = 1;
          _context10.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context10.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('USERS');
          _context10.next = 9;
          return collection.find({
            username: Username,
            mail: email
          }).toArray();
        case 9:
          user = _context10.sent;
        case 10:
          _context10.prev = 10;
          _context10.next = 13;
          return mongoClient.close();
        case 13:
          return _context10.finish(10);
        case 14:
          return _context10.abrupt("return", user);
        case 15:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1,, 10, 14]]);
  }));
  return _findUserWithNameandEmail.apply(this, arguments);
}
function findUserWithName(_x18) {
  return _findUserWithName.apply(this, arguments);
}
function _findUserWithName() {
  _findUserWithName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(Username) {
    var uri, mongoClient, user, db, collection;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context11.prev = 1;
          _context11.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context11.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('USERS');
          _context11.next = 9;
          return collection.find({
            username: Username
          }).toArray();
        case 9:
          user = _context11.sent;
        case 10:
          _context11.prev = 10;
          _context11.next = 13;
          return mongoClient.close();
        case 13:
          return _context11.finish(10);
        case 14:
          return _context11.abrupt("return", user);
        case 15:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[1,, 10, 14]]);
  }));
  return _findUserWithName.apply(this, arguments);
}
function findUserWithiD(_x19) {
  return _findUserWithiD.apply(this, arguments);
}
function _findUserWithiD() {
  _findUserWithiD = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(id) {
    var uri, mongoClient, user, db, collection;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context12.prev = 1;
          _context12.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context12.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('USERS');
          _context12.next = 9;
          return collection.find({
            _id: id
          }).toArray();
        case 9:
          user = _context12.sent;
        case 10:
          _context12.prev = 10;
          _context12.next = 13;
          return mongoClient.close();
        case 13:
          return _context12.finish(10);
        case 14:
          return _context12.abrupt("return", user);
        case 15:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[1,, 10, 14]]);
  }));
  return _findUserWithiD.apply(this, arguments);
}
function createAction(_x20, _x21) {
  return _createAction.apply(this, arguments);
}
function _createAction() {
  _createAction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(actionName, Params) {
    var uri, mongoClient, obj, db, collection, Action;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context13.prev = 1;
          _context13.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context13.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('ACTIONS');
          Action = {
            name: actionName,
            params: Params
          };
          _context13.next = 10;
          return collection.insertOne(Action);
        case 10:
          obj = _context13.sent;
        case 11:
          _context13.prev = 11;
          _context13.next = 14;
          return mongoClient.close();
        case 14:
          return _context13.finish(11);
        case 15:
          return _context13.abrupt("return", obj.insertedId);
        case 16:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[1,, 11, 15]]);
  }));
  return _createAction.apply(this, arguments);
}
function findActionWithid(_x22) {
  return _findActionWithid.apply(this, arguments);
}
function _findActionWithid() {
  _findActionWithid = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(actionId) {
    var uri, mongoClient, action, db, collection;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context14.prev = 1;
          _context14.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context14.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('ACTIONS');
          _context14.next = 9;
          return collection.find({
            _id: actionId
          }).toArray();
        case 9:
          action = _context14.sent;
        case 10:
          _context14.prev = 10;
          _context14.next = 13;
          return mongoClient.close();
        case 13:
          return _context14.finish(10);
        case 14:
          return _context14.abrupt("return", action);
        case 15:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[1,, 10, 14]]);
  }));
  return _findActionWithid.apply(this, arguments);
}
function findReactionWithid(_x23) {
  return _findReactionWithid.apply(this, arguments);
}
function _findReactionWithid() {
  _findReactionWithid = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(reactionId) {
    var uri, mongoClient, reaction, db, collection;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context15.prev = 1;
          _context15.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context15.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('REACTIONS');
          _context15.next = 9;
          return collection.find({
            _id: reactionId
          }).toArray();
        case 9:
          reaction = _context15.sent;
        case 10:
          _context15.prev = 10;
          _context15.next = 13;
          return mongoClient.close();
        case 13:
          return _context15.finish(10);
        case 14:
          return _context15.abrupt("return", reaction);
        case 15:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[1,, 10, 14]]);
  }));
  return _findReactionWithid.apply(this, arguments);
}
function createReaction(_x24, _x25) {
  return _createReaction.apply(this, arguments);
}
function _createReaction() {
  _createReaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(reactionName, Params) {
    var uri, mongoClient, obj, db, collection, Reaction;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context16.prev = 1;
          _context16.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context16.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('REACTIONS');
          Reaction = {
            name: reactionName,
            params: Params
          };
          _context16.next = 10;
          return collection.insertOne(Reaction);
        case 10:
          obj = _context16.sent;
        case 11:
          _context16.prev = 11;
          _context16.next = 14;
          return mongoClient.close();
        case 14:
          return _context16.finish(11);
        case 15:
          return _context16.abrupt("return", obj.insertedId);
        case 16:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[1,, 11, 15]]);
  }));
  return _createReaction.apply(this, arguments);
}
function createArea(_x26, _x27, _x28, _x29) {
  return _createArea.apply(this, arguments);
}
function _createArea() {
  _createArea = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(areaName, actions, reactions, userId) {
    var uri, mongoClient, db, collection, area;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context17.prev = 1;
          _context17.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context17.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('AREAS');
          area = {
            name: areaName,
            action: actions,
            reaction: reactions,
            status: true,
            user: userId
          };
          _context17.next = 10;
          return collection.insertOne(area);
        case 10:
          _context17.prev = 10;
          _context17.next = 13;
          return mongoClient.close();
        case 13:
          return _context17.finish(10);
        case 14:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[1,, 10, 14]]);
  }));
  return _createArea.apply(this, arguments);
}
function findAreaWithName(_x30) {
  return _findAreaWithName.apply(this, arguments);
}
function _findAreaWithName() {
  _findAreaWithName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(areaName) {
    var uri, mongoClient, area, db, collection;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context18.prev = 1;
          _context18.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context18.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('AREAS');
          _context18.next = 9;
          return collection.find({
            name: areaName
          }).toArray();
        case 9:
          area = _context18.sent;
        case 10:
          _context18.prev = 10;
          _context18.next = 13;
          return mongoClient.close();
        case 13:
          return _context18.finish(10);
        case 14:
          return _context18.abrupt("return", area);
        case 15:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[1,, 10, 14]]);
  }));
  return _findAreaWithName.apply(this, arguments);
}
function changeAreaStatus(_x31, _x32) {
  return _changeAreaStatus.apply(this, arguments);
}
function _changeAreaStatus() {
  _changeAreaStatus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(areaname, updating) {
    var uri, mongoClient, db, collection;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context19.prev = 1;
          _context19.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context19.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('AREAS');
          _context19.next = 9;
          return collection.updateOne({
            name: areaname
          }, {
            $set: {
              status: updating
            }
          });
        case 9:
          _context19.prev = 9;
          _context19.next = 12;
          return mongoClient.close();
        case 12:
          return _context19.finish(9);
        case 13:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[1,, 9, 13]]);
  }));
  return _changeAreaStatus.apply(this, arguments);
}
function getAreaWithName(_x33) {
  return _getAreaWithName.apply(this, arguments);
}
function _getAreaWithName() {
  _getAreaWithName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(areaname) {
    var uri, mongoClient, area, db, collection;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context20.prev = 1;
          _context20.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context20.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('USERS');
          _context20.next = 9;
          return collection.find({
            name: areaname
          }).toArray();
        case 9:
          area = _context20.sent;
        case 10:
          _context20.prev = 10;
          _context20.next = 13;
          return mongoClient.close();
        case 13:
          return _context20.finish(10);
        case 14:
          return _context20.abrupt("return", area);
        case 15:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[1,, 10, 14]]);
  }));
  return _getAreaWithName.apply(this, arguments);
}
function deleteAreaWithName(_x34) {
  return _deleteAreaWithName.apply(this, arguments);
}
function _deleteAreaWithName() {
  _deleteAreaWithName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(Areaname) {
    var uri, mongoClient, db, collection;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          uri = 'mongodb+srv://HLC:macdehlc1.1@cluster0.k4kq8xz.mongodb.net/?retryWrites=true&w=majority';
          _context21.prev = 1;
          _context21.next = 4;
          return connectToCluster(uri);
        case 4:
          mongoClient = _context21.sent;
          db = mongoClient.db('AREA');
          collection = db.collection('AREAS');
          _context21.next = 9;
          return collection.deleteOne({
            name: Areaname
          });
        case 9:
          _context21.prev = 9;
          _context21.next = 12;
          return mongoClient.close();
        case 12:
          return _context21.finish(9);
        case 13:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[1,, 9, 13]]);
  }));
  return _deleteAreaWithName.apply(this, arguments);
}