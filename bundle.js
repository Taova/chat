/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(8).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chat = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Марина on 25.05.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

//import


var _chatTmpl = __webpack_require__(6);

var _chatTmpl2 = _interopRequireDefault(_chatTmpl);

var _utils = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {Object} ChatMessage
 * @property {string} username
 * @property {string} message
 */

var Chat = function () {
    function Chat(_ref) {
        var el = _ref.el,
            _ref$data = _ref.data,
            data = _ref$data === undefined ? { messages: [] } : _ref$data,
            chatService = _ref.chatService;

        _classCallCheck(this, Chat);

        this.el = el;
        this.data = data;
        this.chatService = chatService;
        this._init();
    }

    _createClass(Chat, [{
        key: '_init',
        value: function _init() {
            // this.startPolling();
            this.addMessages();
        }

        // startPolling() {
        //     this._pollingId = setInterval(() => {
        //         this.addMessages();
        //
        //     }, 8000);
        // }

    }, {
        key: 'stopPolling',
        value: function stopPolling() {
            clearInterval(this._pollingId);
        }
    }, {
        key: 'render',
        value: function render() {
            this.el.innerHTML = (0, _chatTmpl2.default)(this.data);
        }

        /**
         * Add message into chat store. Without render
         * @param {ChatMessage} данные сообщения
         */

    }, {
        key: 'addMessages',
        value: function addMessages() {
            var _this = this;

            this.chatService.getMessage(function (data) {
                console.log('Получаем сообщение из ', data);
                _this.setMessages(data);
                _this.render();
            });
        }

        /**
         * Устанавливаем текущего юзера
         */

    }, {
        key: 'setUserName',
        value: function setUserName(name) {
            this.data.user = name;
            this.saveUserName(name);
        }

        /**
         * Получаем текущего юзера
         */

    }, {
        key: 'getUsername',
        value: function getUsername() {
            return this.data.user || window.localStorage.getItem('name');
        }

        /**
         *  Сохраняем текущего юзера
         */

    }, {
        key: 'saveUserName',
        value: function saveUserName(value) {
            window.localStorage.setItem('name', value);
        }
    }, {
        key: 'setMessages',
        value: function setMessages(messages) {
            var _this2 = this;

            messages = Object.values(messages);
            this.data.messages = messages.map(function (item) {
                return {
                    message: item.message,
                    username: item.username,
                    isMine: _this2.getIsMine(item.username, window.localStorage.getItem('name')),
                    data: _this2.setData(item.data) || null,
                    img: item.img || './components/img/noavatar.png'
                };
            });
        }
    }, {
        key: 'getIsMine',
        value: function getIsMine(name, localname) {
            if (name == localname) {
                return true;
            }
            return false;
        }
    }, {
        key: 'setData',
        value: function setData(timeMs) {
            var ms = new Date(timeMs);
            var month = ms.getMonth();
            var day = ms.getDate();
            var hours = ms.getHours();
            var min = ms.getMinutes();

            switch (month) {
                case 0:
                    month = 'января';break;
                case 1:
                    month = 'февраля';break;
                case 2:
                    month = "марта";break;
                case 3:
                    month = "апреля";break;
                case 4:
                    month = "мае";break;
                case 5:
                    month = "июня";break;
                case 6:
                    month = "июля";break;
                case 7:
                    month = "августа";break;
                case 8:
                    month = "сентября";break;
                case 9:
                    month = "октября";break;
                case 10:
                    month = "ноября";break;
                case 11:
                    month = "декабря";break;

            }
            if (day <= 9) day = "0" + day;
            if (hours <= 9) hours = "0" + hours;
            if (min <= 9) min = "0" + min;

            return day + ' ' + month + ' ' + hours + ' : ' + min;
        }
    }]);

    return Chat;
}();

exports.Chat = Chat;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Марина on 25.05.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

//import


var _formTmpl = __webpack_require__(7);

var _formTmpl2 = _interopRequireDefault(_formTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = function () {
    function Form(_ref) {
        var el = _ref.el;

        _classCallCheck(this, Form);

        this.el = el;
        this._initEvents();
    }

    /**
     * init the Form events.
     */

    _createClass(Form, [{
        key: '_initEvents',
        value: function _initEvents() {
            this.el.addEventListener('submit', this._onSubmit.bind(this));
        }
    }, {
        key: '_onSubmit',
        value: function _onSubmit(event) {
            event.preventDefault();
            var formData = this._getFormData();
            this.onSubmit(formData);
            this.setNameValue(formData.username);
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(message) {
            console.info('message: ' + message);
            console.warn('Error in event onSubmit file form.js');
        }
    }, {
        key: 'setNameValue',
        value: function setNameValue(name) {
            name = name || window.localStorage.getItem('name');
            if (name) {
                this.input[0].value = name;
                this.input[0].hidden = true;
            }
        }
    }, {
        key: '_getFormData',
        value: function _getFormData() {
            var names = this.el.querySelectorAll('[name]');
            var data = {};

            names.forEach(function (elem) {
                data[elem.name] = elem.value;
            });

            return data;
        }
    }, {
        key: 'render',
        value: function render() {

            this.el.innerHTML = (0, _formTmpl2.default)();
            this.input = this.el.querySelectorAll('input');
            this.formEl = this.el.querySelector('form');
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.formEl.reset();
        }
    }]);

    return Form;
}();

//export


exports.Form = Form;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Марина on 02.06.2017.
 */

var ChatService = function () {
    function ChatService(_ref) {
        var baseUrl = _ref.baseUrl;

        _classCallCheck(this, ChatService);

        this.baseUrl = baseUrl;
    }

    _createClass(ChatService, [{
        key: '_makeRequest',
        value: function _makeRequest(cb) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
            var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var xhr = new XMLHttpRequest();
            xhr.open(type, this.baseUrl, true);

            xhr.onload = function () {
                cb(JSON.parse(xhr.responseText));
            };

            xhr.send(JSON.stringify(data));
        }
    }, {
        key: 'getMessage',
        value: function getMessage(cb) {
            this._makeRequest(function (msg) {
                cb(Object.values(msg));
            });
        }
    }, {
        key: 'sendMessage',
        value: function sendMessage(data, cb) {
            data.data = Date.now();
            this._makeRequest(cb, 'POST', data);
        }
    }]);

    return ChatService;
}();

//export


exports.ChatService = ChatService;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Марина on 27.05.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

//import


var _chat = __webpack_require__(1);

var _form = __webpack_require__(2);

var _chatService = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chatService = new _chatService.ChatService({
    baseUrl: 'https://chat-1c82d.firebaseio.com/messages.json'
});

var App = function () {
    function App(options) {
        _classCallCheck(this, App);

        this.el = options.el;

        this._createComponents();
        this._initMediate();

        this.render();
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            this.form.render();
            this.chat.render();
        }
    }, {
        key: '_createComponents',
        value: function _createComponents() {
            this.form = new _form.Form({
                el: document.querySelector('.js-form')
            });

            this.chat = new _chat.Chat({
                el: document.querySelector('.js-chat'),
                chatService: chatService
            });
        }
    }, {
        key: '_initMediate',
        value: function _initMediate() {
            var _this = this;

            // document.addEventListener('visibilitychange', () => {
            //    if (document.visibilityState === 'hidden') {
            //        this.chat.stopPolling();
            //    } else {
            //        this.chat.stopPolling();
            //        this.chat.startPolling();
            //    }
            // });

            document.addEventListener('DOMContentLoaded', function () {
                if (window.localStorage.getItem('name')) {
                    _this.chat.setUserName(window.localStorage.getItem('name'));
                    _this.form.setNameValue(window.localStorage.getItem('name'));
                }
            });

            this.form.onSubmit = function (message) {

                if (message.username) {
                    _this.chat.setUserName(message.username);
                }

                var data = {
                    message: message.message,
                    username: _this.chat.getUsername()
                };

                chatService.sendMessage(data, function () {
                    console.log('send new Message');
                });

                _this.chat.addMessages();
                _this.chat.render();
                _this.form.reset();
            };
        }
    }]);

    return App;
}();

window.App = App;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by Марина on 16.06.2017.
 */
var utils = {
    deepEqual: function deepEqual(src, dest) {
        return JSON.stringify(src) === JSON.stringify(dest);
    }
};

//export

exports.utils = utils;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (messages, user) {pug_html = pug_html + "\u003Ch1 class=\"chat__header\"\u003E" + (pug.escape(null == (pug_interp = 'добро пожаловать ' + (user || '')) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003Cdiv class=\"chat__content\"\u003E\u003Cul class=\"chat__list\"\u003E";
if (!messages.length) {
pug_html = pug_html + "\u003Ch3 class=\"cfont\"\u003EНет сообщений\u003C\u002Fh3\u003E";
}
// iterate messages
;(function(){
  var $$obj = messages;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes(["chat__item",message.isMine ? 'right-img' : 'left-img'], [false,true]), false, true)) + "\u003E\u003Cdiv class=\"chat__item__avatar\"\u003E\u003Cimg" + (pug.attr("src", message.img, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__item__header clearfix\"\u003E\u003Cspan class=\"chat__item__autor\"\u003E" + (pug.escape(null == (pug_interp = message.username) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"chat__item__data\"\u003E" + (pug.escape(null == (pug_interp = message.data) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__item__message\"\u003E" + (pug.escape(null == (pug_interp = message.message) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes(["chat__item",message.isMine ? 'right-img' : 'left-img'], [false,true]), false, true)) + "\u003E\u003Cdiv class=\"chat__item__avatar\"\u003E\u003Cimg" + (pug.attr("src", message.img, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__item__header clearfix\"\u003E\u003Cspan class=\"chat__item__autor\"\u003E" + (pug.escape(null == (pug_interp = message.username) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"chat__item__data\"\u003E" + (pug.escape(null == (pug_interp = message.data) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__item__message\"\u003E" + (pug.escape(null == (pug_interp = message.message) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";}.call(this,"messages" in locals_for_with?locals_for_with.messages:typeof messages!=="undefined"?messages:undefined,"user" in locals_for_with?locals_for_with.user:typeof user!=="undefined"?user:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cform class=\"form__content\" autocomplete=\"off\"\u003E\u003Cinput class=\"form__username\" type=\"text\" name=\"username\" placeholder=\"Введите имя\" required=\"\"\u003E\u003Ctextarea class=\"form__msg\" name=\"message\" rows=\"3\" placeholder=\"Введите сообщение...\" required=\"\"\u003E\u003C\u002Ftextarea\u003E\u003Cinput class=\"form__submit\" type=\"submit\" value=\"&gt;\"\u003E\u003C\u002Fform\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);