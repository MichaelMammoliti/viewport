'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewportManager = function () {
  function ViewportManager(options) {
    _classCallCheck(this, ViewportManager);

    this.options = _extends({}, options);

    this.initialise();
  }

  // Initialise
  // =============================================


  _createClass(ViewportManager, [{
    key: 'initialise',
    value: function initialise() {
      var _this = this;

      var _options = this.options,
          delay = _options.delay,
          breakpoints = _options.breakpoints;


      if (!breakpoints) {
        console.warn('It seems you didn\'t set any breakpoint. Check "options.breakpoints".');

        return;
      }

      this.breakpoints = this.getBreakpoints(breakpoints);
      this.breakpointKeys = Object.keys(this.breakpoints);
      this.listenerCollection = [];

      window.addEventListener('resize', function () {
        if (!delay) return _this.handleWindowResize();

        window.clearTimeout(_this.timeout);
        _this.timeout = window.setTimeout(function () {
          return _this.handleWindowResize();
        }, delay);
      });
    }

    // Events
    // =============================================

  }, {
    key: 'handleWindowResize',
    value: function handleWindowResize() {
      var _this2 = this;

      var currentViewport = this.getViewport();

      // if we don't have listeners, we return.
      if (!this.listenerCollection.length) return;

      // if same viewport we don't want to fire the functions
      if (this.activeViewport === currentViewport) return;

      // we set the viewport
      this.activeViewport = currentViewport;

      // we call all listeners.
      this.listenerCollection.forEach(function (listenerFn) {
        return listenerFn(_this2.activeViewport);
      });
    }

    // Getters
    // =============================================

  }, {
    key: 'getViewport',
    value: function getViewport() {
      var _this3 = this;

      return this.breakpointKeys.reduce(function (acc, breakpointLimit) {
        if (window.matchMedia(_this3.breakpoints[breakpointLimit]).matches) return breakpointLimit;

        return acc;
      }, '');
    }
  }, {
    key: 'getMediaQueryString',
    value: function getMediaQueryString(_ref) {
      var _ref$min = _ref.min,
          min = _ref$min === undefined ? 0 : _ref$min,
          _ref$max = _ref.max,
          max = _ref$max === undefined ? 10000 : _ref$max;

      return '(min-width: ' + min + 'px) and (max-width: ' + max + 'px)';
    }
  }, {
    key: 'getBreakpoints',
    value: function getBreakpoints(breakpoints) {
      var _this4 = this;

      return Object.keys(breakpoints).reduce(function (acc, size) {
        return _extends({}, acc, _defineProperty({}, size, _this4.getMediaQueryString(breakpoints[size])));
      }, {});
    }

    // Listeners
    // =============================================

  }, {
    key: 'listen',
    value: function listen(listenerFn) {
      this.listenerCollection.push(listenerFn);
    }
  }, {
    key: 'unlisten',
    value: function unlisten(listenerFn) {
      var index = this.listenerCollection.indexOf(listenerFn);

      if (index === -1) return;

      this.listenerCollection.splice(index, 0);
    }

    // shortcuts

  }, {
    key: 'get',
    value: function get() {
      return this.getViewport();
    }
  }]);

  return ViewportManager;
}();

module.exports = ViewportManager;
