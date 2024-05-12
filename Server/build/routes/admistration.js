"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectAdmin = ConnectAdmin;
exports.adduserInAppli = adduserInAppli;
exports.bannedUser = bannedUser;
exports.changeInfosUser = changeInfosUser;
exports.checkUserStatus = checkUserStatus;
exports.deleteUser = deleteUser;
exports.isAdmin = isAdmin;
exports.listUsers = listUsers;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dataBase = require("../dataBase/dataBase");
var _service = require("../services/service");
var _mongodb = require("mongodb");
function changeInfosUser(_x, _x2) {
  return _changeInfosUser.apply(this, arguments);
}
function _changeInfosUser() {
  _changeInfosUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var users, i;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (req.body.username) {
            _context.next = 3;
            break;
          }
          res.status(400).json({
            err: "Please give a username"
          });
          return _context.abrupt("return");
        case 3:
          if (req.body.password) {
            _context.next = 6;
            break;
          }
          res.status(400).json({
            err: "Please give a password"
          });
          return _context.abrupt("return");
        case 6:
          if (req.body.email) {
            _context.next = 9;
            break;
          }
          res.status(400).json({
            err: "Please give a password"
          });
          return _context.abrupt("return");
        case 9:
          _context.next = 11;
          return (0, _dataBase.getAllUser)();
        case 11:
          users = _context.sent;
          i = 0;
        case 13:
          if (!(i != users.length)) {
            _context.next = 20;
            break;
          }
          if (!(users[i].username == req.body.username)) {
            _context.next = 17;
            break;
          }
          res.status(400).json({
            err: "The username already exits"
          });
          return _context.abrupt("return");
        case 17:
          i++;
          _context.next = 13;
          break;
        case 20:
          (0, _dataBase.putElemInBase)(new _mongodb.ObjectId(req.session._id), {
            username: req.body.username,
            password: req.body.password,
            mail: req.body.mail
          });
          res.status(200).json({
            message: "Profile udpated"
          });
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _changeInfosUser.apply(this, arguments);
}
function deleteUser(_x3, _x4) {
  return _deleteUser.apply(this, arguments);
}
function _deleteUser() {
  _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (req.username) {
            _context2.next = 4;
            break;
          }
          res.status(400).json({
            err: "Please give a username"
          });
          _context2.next = 7;
          break;
        case 4:
          _context2.next = 6;
          return (0, _dataBase.deleteUserInBase)(req.body.username);
        case 6:
          res.status(400).json({
            message: "User sucessfully delete"
          });
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _deleteUser.apply(this, arguments);
}
function listUsers(_x5, _x6) {
  return _listUsers.apply(this, arguments);
}
function _listUsers() {
  _listUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var list_infos, users, i;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          list_infos = [];
          _context3.next = 3;
          return (0, _dataBase.getAllUser)();
        case 3:
          users = _context3.sent;
          for (i = 0; i != users.length; i++) {
            list_infos.push(users[i].username + '\n');
          }
          res.status(200).json({
            message: list_infos
          });
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _listUsers.apply(this, arguments);
}
function adduserInAppli(_x7, _x8) {
  return _adduserInAppli.apply(this, arguments);
}
function _adduserInAppli() {
  _adduserInAppli = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (req.body.username) {
            _context4.next = 4;
            break;
          }
          res.status(400).json({
            err: "Username don't given"
          });
          _context4.next = 15;
          break;
        case 4:
          if (req.body.passWord) {
            _context4.next = 8;
            break;
          }
          res.status(400).json({
            err: "Password don't given"
          });
          _context4.next = 15;
          break;
        case 8:
          if (req.body.email) {
            _context4.next = 12;
            break;
          }
          res.status(400).json({
            err: "email don't given"
          });
          _context4.next = 15;
          break;
        case 12:
          _context4.next = 14;
          return addUserInBase(req.body.username, req.body.password, req.body.email);
        case 14:
          res.status(200).json({
            message: "The user is added in server"
          });
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _adduserInAppli.apply(this, arguments);
}
function checkUserStatus(_x9, _x10) {
  return _checkUserStatus.apply(this, arguments);
}
function _checkUserStatus() {
  _checkUserStatus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var list_infos, users, i, user_areas;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          list_infos = [];
          _context5.next = 3;
          return (0, _dataBase.getAllUser)();
        case 3:
          users = _context5.sent;
          i = 0;
        case 5:
          if (!(i != users.length)) {
            _context5.next = 21;
            break;
          }
          _context5.next = 8;
          return (0, _dataBase.getAllAreaOfUser)(new _mongodb.ObjectId(users[i]._id));
        case 8:
          user_areas = _context5.sent;
          _context5.t0 = list_infos;
          _context5.t1 = users[i].username;
          _context5.t2 = users[i].connected;
          _context5.t3 = user_areas.length;
          _context5.next = 15;
          return isAdmin(users[i].username, users[i].mail);
        case 15:
          _context5.t4 = _context5.sent;
          _context5.t5 = {
            username: _context5.t1,
            connected: _context5.t2,
            nb_areas: _context5.t3,
            admin: _context5.t4
          };
          _context5.t0.push.call(_context5.t0, _context5.t5);
        case 18:
          i++;
          _context5.next = 5;
          break;
        case 21:
          res.status(200).json({
            infos: list_infos
          });
        case 22:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _checkUserStatus.apply(this, arguments);
}
function bannedUser(_x11, _x12) {
  return _bannedUser.apply(this, arguments);
}
function _bannedUser() {
  _bannedUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (req.body.user.username) {
            _context6.next = 4;
            break;
          }
          res.status(400).json({
            err: "give a username"
          });
          _context6.next = 7;
          break;
        case 4:
          _context6.next = 6;
          return (0, _dataBase.putElemInBase)(new _mongodb.ObjectId(req.session._id), {
            isBanned: 'true'
          });
        case 6:
          res.status(200).json({
            message: "User successfully"
          });
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _bannedUser.apply(this, arguments);
}
function ConnectAdmin(_x13, _x14, _x15) {
  return _ConnectAdmin.apply(this, arguments);
}
function _ConnectAdmin() {
  _ConnectAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _dataBase.findUserWithiD)(new _mongodb.ObjectId(req.session._id));
        case 2:
          user = _context7.sent;
          if (isAdmin(user[0].username, user[0].mail)) next();else res.status(400).json({
            message: 'You don\'t have a permission'
          });
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _ConnectAdmin.apply(this, arguments);
}
function isAdmin(_x16, _x17) {
  return _isAdmin.apply(this, arguments);
}
function _isAdmin() {
  _isAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(username, email) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (!(email == 'mouamaradjaho20@gmail.com' && username == 'Mouamar MomboladjiADJAHO')) {
            _context8.next = 2;
            break;
          }
          return _context8.abrupt("return", true);
        case 2:
          if (!(email == 'hanslylinvigstone@gmail.com' && username == 'HanslyLinvigstone')) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", true);
        case 4:
          if (!(email == 'fitzadechian0007@gmail.com' && username == 'FitzgeraldAdechian')) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", true);
        case 6:
          return _context8.abrupt("return", false);
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _isAdmin.apply(this, arguments);
}