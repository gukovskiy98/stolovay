"use strict";

function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    /*!
     * Glide.js v3.4.1
     * (c) 2013-2019 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
     * Released under the MIT License.
     */
    (function (global, factory) {
      _typeof2(exports) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Glide = factory();
    })(this, function () {
      'use strict';

      var defaults = {
        /**
         * Type of the movement.
         *
         * Available types:
         * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
         * `carousel` - Changes slides without starting over when it reaches the first or last slide.
         *
         * @type {String}
         */
        type: 'slider',

        /**
         * Start at specific slide number defined with zero-based index.
         *
         * @type {Number}
         */
        startAt: 0,

        /**
         * A number of slides visible on the single viewport.
         *
         * @type {Number}
         */
        perView: 1,

        /**
         * Focus currently active slide at a specified position in the track.
         *
         * Available inputs:
         * `center` - Current slide will be always focused at the center of a track.
         * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
         *
         * @type {String|Number}
         */
        focusAt: 0,

        /**
         * A size of the gap added between slides.
         *
         * @type {Number}
         */
        gap: 10,

        /**
         * Change slides after a specified interval. Use `false` for turning off autoplay.
         *
         * @type {Number|Boolean}
         */
        autoplay: false,

        /**
         * Stop autoplay on mouseover event.
         *
         * @type {Boolean}
         */
        hoverpause: true,

        /**
         * Allow for changing slides with left and right keyboard arrows.
         *
         * @type {Boolean}
         */
        keyboard: true,

        /**
         * Stop running `perView` number of slides from the end. Use this
         * option if you don't want to have an empty space after
         * a slider. Works only with `slider` type and a
         * non-centered `focusAt` setting.
         *
         * @type {Boolean}
         */
        bound: false,

        /**
         * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
         *
         * @type {Number|Boolean}
         */
        swipeThreshold: 80,

        /**
         * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
         *
         * @type {Number|Boolean}
         */
        dragThreshold: 120,

        /**
         * A maximum number of slides to which movement will be made on swiping or dragging. Use `false` for unlimited.
         *
         * @type {Number|Boolean}
         */
        perTouch: false,

        /**
         * Moving distance ratio of the slides on a swiping and dragging.
         *
         * @type {Number}
         */
        touchRatio: 0.5,

        /**
         * Angle required to activate slides moving on swiping or dragging.
         *
         * @type {Number}
         */
        touchAngle: 45,

        /**
         * Duration of the animation in milliseconds.
         *
         * @type {Number}
         */
        animationDuration: 400,

        /**
         * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
         *
         * @type {Boolean}
         */
        rewind: true,

        /**
         * Duration of the rewinding animation of the `slider` type in milliseconds.
         *
         * @type {Number}
         */
        rewindDuration: 800,

        /**
         * Easing function for the animation.
         *
         * @type {String}
         */
        animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

        /**
         * Throttle costly events at most once per every wait milliseconds.
         *
         * @type {Number}
         */
        throttle: 10,

        /**
         * Moving direction mode.
         *
         * Available inputs:
         * - 'ltr' - left to right movement,
         * - 'rtl' - right to left movement.
         *
         * @type {String}
         */
        direction: 'ltr',

        /**
         * The distance value of the next and previous viewports which
         * have to peek in the current view. Accepts number and
         * pixels as a string. Left and right peeking can be
         * set up separately with a directions object.
         *
         * For example:
         * `100` - Peek 100px on the both sides.
         * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
         *
         * @type {Number|String|Object}
         */
        peek: 0,

        /**
         * Collection of options applied at specified media breakpoints.
         * For example: display two slides per view under 800px.
         * `{
         *   '800px': {
         *     perView: 2
         *   }
         * }`
         */
        breakpoints: {},

        /**
         * Collection of internally used HTML classes.
         *
         * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
         * @type {Object}
         */
        classes: {
          direction: {
            ltr: 'glide--ltr',
            rtl: 'glide--rtl'
          },
          slider: 'glide--slider',
          carousel: 'glide--carousel',
          swipeable: 'glide--swipeable',
          dragging: 'glide--dragging',
          cloneSlide: 'glide__slide--clone',
          activeNav: 'glide__bullet--active',
          activeSlide: 'glide__slide--active',
          disabledArrow: 'glide__arrow--disabled'
        }
      };
      /**
       * Outputs warning message to the bowser console.
       *
       * @param  {String} msg
       * @return {Void}
       */

      function warn(msg) {
        console.error("[Glide warn]: " + msg);
      }

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };

      var classCallCheck = function classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };

      var createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);

          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;

          if (getter === undefined) {
            return undefined;
          }

          return getter.call(receiver);
        }
      };

      var inherits = function inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + _typeof2(superClass));
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      };

      var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (_typeof2(call) === "object" || typeof call === "function") ? call : self;
      };
      /**
       * Converts value entered as number
       * or string to integer value.
       *
       * @param {String} value
       * @returns {Number}
       */


      function toInt(value) {
        return parseInt(value);
      }
      /**
       * Converts value entered as number
       * or string to flat value.
       *
       * @param {String} value
       * @returns {Number}
       */


      function toFloat(value) {
        return parseFloat(value);
      }
      /**
       * Indicates whether the specified value is a string.
       *
       * @param  {*}   value
       * @return {Boolean}
       */


      function isString(value) {
        return typeof value === 'string';
      }
      /**
       * Indicates whether the specified value is an object.
       *
       * @param  {*} value
       * @return {Boolean}
       *
       * @see https://github.com/jashkenas/underscore
       */


      function isObject(value) {
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
        return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
      }
      /**
       * Indicates whether the specified value is a number.
       *
       * @param  {*} value
       * @return {Boolean}
       */


      function isNumber(value) {
        return typeof value === 'number';
      }
      /**
       * Indicates whether the specified value is a function.
       *
       * @param  {*} value
       * @return {Boolean}
       */


      function isFunction(value) {
        return typeof value === 'function';
      }
      /**
       * Indicates whether the specified value is undefined.
       *
       * @param  {*} value
       * @return {Boolean}
       */


      function isUndefined(value) {
        return typeof value === 'undefined';
      }
      /**
       * Indicates whether the specified value is an array.
       *
       * @param  {*} value
       * @return {Boolean}
       */


      function isArray(value) {
        return value.constructor === Array;
      }
      /**
       * Creates and initializes specified collection of extensions.
       * Each extension receives access to instance of glide and rest of components.
       *
       * @param {Object} glide
       * @param {Object} extensions
       *
       * @returns {Object}
       */


      function mount(glide, extensions, events) {
        var components = {};

        for (var name in extensions) {
          if (isFunction(extensions[name])) {
            components[name] = extensions[name](glide, components, events);
          } else {
            warn('Extension must be a function');
          }
        }

        for (var _name in components) {
          if (isFunction(components[_name].mount)) {
            components[_name].mount();
          }
        }

        return components;
      }
      /**
       * Defines getter and setter property on the specified object.
       *
       * @param  {Object} obj         Object where property has to be defined.
       * @param  {String} prop        Name of the defined property.
       * @param  {Object} definition  Get and set definitions for the property.
       * @return {Void}
       */


      function define(obj, prop, definition) {
        Object.defineProperty(obj, prop, definition);
      }
      /**
       * Sorts aphabetically object keys.
       *
       * @param  {Object} obj
       * @return {Object}
       */


      function sortKeys(obj) {
        return Object.keys(obj).sort().reduce(function (r, k) {
          r[k] = obj[k];
          return r[k], r;
        }, {});
      }
      /**
       * Merges passed settings object with default options.
       *
       * @param  {Object} defaults
       * @param  {Object} settings
       * @return {Object}
       */


      function mergeOptions(defaults, settings) {
        var options = _extends({}, defaults, settings); // `Object.assign` do not deeply merge objects, so we
        // have to do it manually for every nested object
        // in options. Although it does not look smart,
        // it's smaller and faster than some fancy
        // merging deep-merge algorithm script.


        if (settings.hasOwnProperty('classes')) {
          options.classes = _extends({}, defaults.classes, settings.classes);

          if (settings.classes.hasOwnProperty('direction')) {
            options.classes.direction = _extends({}, defaults.classes.direction, settings.classes.direction);
          }
        }

        if (settings.hasOwnProperty('breakpoints')) {
          options.breakpoints = _extends({}, defaults.breakpoints, settings.breakpoints);
        }

        return options;
      }

      var EventsBus = function () {
        /**
         * Construct a EventBus instance.
         *
         * @param {Object} events
         */
        function EventsBus() {
          var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          classCallCheck(this, EventsBus);
          this.events = events;
          this.hop = events.hasOwnProperty;
        }
        /**
         * Adds listener to the specifed event.
         *
         * @param {String|Array} event
         * @param {Function} handler
         */


        createClass(EventsBus, [{
          key: 'on',
          value: function on(event, handler) {
            if (isArray(event)) {
              for (var i = 0; i < event.length; i++) {
                this.on(event[i], handler);
              }
            } // Create the event's object if not yet created


            if (!this.hop.call(this.events, event)) {
              this.events[event] = [];
            } // Add the handler to queue


            var index = this.events[event].push(handler) - 1; // Provide handle back for removal of event

            return {
              remove: function remove() {
                delete this.events[event][index];
              }
            };
          }
          /**
           * Runs registered handlers for specified event.
           *
           * @param {String|Array} event
           * @param {Object=} context
           */

        }, {
          key: 'emit',
          value: function emit(event, context) {
            if (isArray(event)) {
              for (var i = 0; i < event.length; i++) {
                this.emit(event[i], context);
              }
            } // If the event doesn't exist, or there's no handlers in queue, just leave


            if (!this.hop.call(this.events, event)) {
              return;
            } // Cycle through events queue, fire!


            this.events[event].forEach(function (item) {
              item(context || {});
            });
          }
        }]);
        return EventsBus;
      }();

      var Glide = function () {
        /**
         * Construct glide.
         *
         * @param  {String} selector
         * @param  {Object} options
         */
        function Glide(selector) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          classCallCheck(this, Glide);
          this._c = {};
          this._t = [];
          this._e = new EventsBus();
          this.disabled = false;
          this.selector = selector;
          this.settings = mergeOptions(defaults, options);
          this.index = this.settings.startAt;
        }
        /**
         * Initializes glide.
         *
         * @param {Object} extensions Collection of extensions to initialize.
         * @return {Glide}
         */


        createClass(Glide, [{
          key: 'mount',
          value: function mount$$1() {
            var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this._e.emit('mount.before');

            if (isObject(extensions)) {
              this._c = mount(this, extensions, this._e);
            } else {
              warn('You need to provide a object on `mount()`');
            }

            this._e.emit('mount.after');

            return this;
          }
          /**
           * Collects an instance `translate` transformers.
           *
           * @param  {Array} transformers Collection of transformers.
           * @return {Void}
           */

        }, {
          key: 'mutate',
          value: function mutate() {
            var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            if (isArray(transformers)) {
              this._t = transformers;
            } else {
              warn('You need to provide a array on `mutate()`');
            }

            return this;
          }
          /**
           * Updates glide with specified settings.
           *
           * @param {Object} settings
           * @return {Glide}
           */

        }, {
          key: 'update',
          value: function update() {
            var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            this.settings = mergeOptions(this.settings, settings);

            if (settings.hasOwnProperty('startAt')) {
              this.index = settings.startAt;
            }

            this._e.emit('update');

            return this;
          }
          /**
           * Change slide with specified pattern. A pattern must be in the special format:
           * `>` - Move one forward
           * `<` - Move one backward
           * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
           * `>>` - Rewinds to end (last slide)
           * `<<` - Rewinds to start (first slide)
           *
           * @param {String} pattern
           * @return {Glide}
           */

        }, {
          key: 'go',
          value: function go(pattern) {
            this._c.Run.make(pattern);

            return this;
          }
          /**
           * Move track by specified distance.
           *
           * @param {String} distance
           * @return {Glide}
           */

        }, {
          key: 'move',
          value: function move(distance) {
            this._c.Transition.disable();

            this._c.Move.make(distance);

            return this;
          }
          /**
           * Destroy instance and revert all changes done by this._c.
           *
           * @return {Glide}
           */

        }, {
          key: 'destroy',
          value: function destroy() {
            this._e.emit('destroy');

            return this;
          }
          /**
           * Start instance autoplaying.
           *
           * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
           * @return {Glide}
           */

        }, {
          key: 'play',
          value: function play() {
            var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (interval) {
              this.settings.autoplay = interval;
            }

            this._e.emit('play');

            return this;
          }
          /**
           * Stop instance autoplaying.
           *
           * @return {Glide}
           */

        }, {
          key: 'pause',
          value: function pause() {
            this._e.emit('pause');

            return this;
          }
          /**
           * Sets glide into a idle status.
           *
           * @return {Glide}
           */

        }, {
          key: 'disable',
          value: function disable() {
            this.disabled = true;
            return this;
          }
          /**
           * Sets glide into a active status.
           *
           * @return {Glide}
           */

        }, {
          key: 'enable',
          value: function enable() {
            this.disabled = false;
            return this;
          }
          /**
           * Adds cuutom event listener with handler.
           *
           * @param  {String|Array} event
           * @param  {Function} handler
           * @return {Glide}
           */

        }, {
          key: 'on',
          value: function on(event, handler) {
            this._e.on(event, handler);

            return this;
          }
          /**
           * Checks if glide is a precised type.
           *
           * @param  {String} name
           * @return {Boolean}
           */

        }, {
          key: 'isType',
          value: function isType(name) {
            return this.settings.type === name;
          }
          /**
           * Gets value of the core options.
           *
           * @return {Object}
           */

        }, {
          key: 'settings',
          get: function get$$1() {
            return this._o;
          }
          /**
           * Sets value of the core options.
           *
           * @param  {Object} o
           * @return {Void}
           */
          ,
          set: function set$$1(o) {
            if (isObject(o)) {
              this._o = o;
            } else {
              warn('Options must be an `object` instance.');
            }
          }
          /**
           * Gets current index of the slider.
           *
           * @return {Object}
           */

        }, {
          key: 'index',
          get: function get$$1() {
            return this._i;
          }
          /**
           * Sets current index a slider.
           *
           * @return {Object}
           */
          ,
          set: function set$$1(i) {
            this._i = toInt(i);
          }
          /**
           * Gets type name of the slider.
           *
           * @return {String}
           */

        }, {
          key: 'type',
          get: function get$$1() {
            return this.settings.type;
          }
          /**
           * Gets value of the idle status.
           *
           * @return {Boolean}
           */

        }, {
          key: 'disabled',
          get: function get$$1() {
            return this._d;
          }
          /**
           * Sets value of the idle status.
           *
           * @return {Boolean}
           */
          ,
          set: function set$$1(status) {
            this._d = !!status;
          }
        }]);
        return Glide;
      }();

      function Run(Glide, Components, Events) {
        var Run = {
          /**
           * Initializes autorunning of the glide.
           *
           * @return {Void}
           */
          mount: function mount() {
            this._o = false;
          },

          /**
           * Makes glides running based on the passed moving schema.
           *
           * @param {String} move
           */
          make: function make(move) {
            var _this = this;

            if (!Glide.disabled) {
              Glide.disable();
              this.move = move;
              Events.emit('run.before', this.move);
              this.calculate();
              Events.emit('run', this.move);
              Components.Transition.after(function () {
                if (_this.isStart()) {
                  Events.emit('run.start', _this.move);
                }

                if (_this.isEnd()) {
                  Events.emit('run.end', _this.move);
                }

                if (_this.isOffset('<') || _this.isOffset('>')) {
                  _this._o = false;
                  Events.emit('run.offset', _this.move);
                }

                Events.emit('run.after', _this.move);
                Glide.enable();
              });
            }
          },

          /**
           * Calculates current index based on defined move.
           *
           * @return {Void}
           */
          calculate: function calculate() {
            var move = this.move,
                length = this.length;
            var steps = move.steps,
                direction = move.direction;
            var countableSteps = isNumber(toInt(steps)) && toInt(steps) !== 0;

            switch (direction) {
              case '>':
                if (steps === '>') {
                  Glide.index = length;
                } else if (this.isEnd()) {
                  if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
                    this._o = true;
                    Glide.index = 0;
                  }
                } else if (countableSteps) {
                  Glide.index += Math.min(length - Glide.index, -toInt(steps));
                } else {
                  Glide.index++;
                }

                break;

              case '<':
                if (steps === '<') {
                  Glide.index = 0;
                } else if (this.isStart()) {
                  if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
                    this._o = true;
                    Glide.index = length;
                  }
                } else if (countableSteps) {
                  Glide.index -= Math.min(Glide.index, toInt(steps));
                } else {
                  Glide.index--;
                }

                break;

              case '=':
                Glide.index = steps;
                break;

              default:
                warn('Invalid direction pattern [' + direction + steps + '] has been used');
                break;
            }
          },

          /**
           * Checks if we are on the first slide.
           *
           * @return {Boolean}
           */
          isStart: function isStart() {
            return Glide.index === 0;
          },

          /**
           * Checks if we are on the last slide.
           *
           * @return {Boolean}
           */
          isEnd: function isEnd() {
            return Glide.index === this.length;
          },

          /**
           * Checks if we are making a offset run.
           *
           * @param {String} direction
           * @return {Boolean}
           */
          isOffset: function isOffset(direction) {
            return this._o && this.move.direction === direction;
          }
        };
        define(Run, 'move', {
          /**
           * Gets value of the move schema.
           *
           * @returns {Object}
           */
          get: function get() {
            return this._m;
          },

          /**
           * Sets value of the move schema.
           *
           * @returns {Object}
           */
          set: function set(value) {
            var step = value.substr(1);
            this._m = {
              direction: value.substr(0, 1),
              steps: step ? toInt(step) ? toInt(step) : step : 0
            };
          }
        });
        define(Run, 'length', {
          /**
           * Gets value of the running distance based
           * on zero-indexing number of slides.
           *
           * @return {Number}
           */
          get: function get() {
            var settings = Glide.settings;
            var length = Components.Html.slides.length; // If the `bound` option is acitve, a maximum running distance should be
            // reduced by `perView` and `focusAt` settings. Running distance
            // should end before creating an empty space after instance.

            if (Glide.isType('slider') && settings.focusAt !== 'center' && settings.bound) {
              return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
            }

            return length - 1;
          }
        });
        define(Run, 'offset', {
          /**
           * Gets status of the offsetting flag.
           *
           * @return {Boolean}
           */
          get: function get() {
            return this._o;
          }
        });
        return Run;
      }
      /**
       * Returns a current time.
       *
       * @return {Number}
       */


      function now() {
        return new Date().getTime();
      }
      /**
       * Returns a function, that, when invoked, will only be triggered
       * at most once during a given window of time.
       *
       * @param {Function} func
       * @param {Number} wait
       * @param {Object=} options
       * @return {Function}
       *
       * @see https://github.com/jashkenas/underscore
       */


      function throttle(func, wait, options) {
        var timeout = void 0,
            context = void 0,
            args = void 0,
            result = void 0;
        var previous = 0;
        if (!options) options = {};

        var later = function later() {
          previous = options.leading === false ? 0 : now();
          timeout = null;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        };

        var throttled = function throttled() {
          var at = now();
          if (!previous && options.leading === false) previous = at;
          var remaining = wait - (at - previous);
          context = this;
          args = arguments;

          if (remaining <= 0 || remaining > wait) {
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }

            previous = at;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
          }

          return result;
        };

        throttled.cancel = function () {
          clearTimeout(timeout);
          previous = 0;
          timeout = context = args = null;
        };

        return throttled;
      }

      var MARGIN_TYPE = {
        ltr: ['marginLeft', 'marginRight'],
        rtl: ['marginRight', 'marginLeft']
      };

      function Gaps(Glide, Components, Events) {
        var Gaps = {
          /**
           * Applies gaps between slides. First and last
           * slides do not receive it's edge margins.
           *
           * @param {HTMLCollection} slides
           * @return {Void}
           */
          apply: function apply(slides) {
            for (var i = 0, len = slides.length; i < len; i++) {
              var style = slides[i].style;
              var direction = Components.Direction.value;

              if (i !== 0) {
                style[MARGIN_TYPE[direction][0]] = this.value / 2 + 'px';
              } else {
                style[MARGIN_TYPE[direction][0]] = '';
              }

              if (i !== slides.length - 1) {
                style[MARGIN_TYPE[direction][1]] = this.value / 2 + 'px';
              } else {
                style[MARGIN_TYPE[direction][1]] = '';
              }
            }
          },

          /**
           * Removes gaps from the slides.
           *
           * @param {HTMLCollection} slides
           * @returns {Void}
          */
          remove: function remove(slides) {
            for (var i = 0, len = slides.length; i < len; i++) {
              var style = slides[i].style;
              style.marginLeft = '';
              style.marginRight = '';
            }
          }
        };
        define(Gaps, 'value', {
          /**
           * Gets value of the gap.
           *
           * @returns {Number}
           */
          get: function get() {
            return toInt(Glide.settings.gap);
          }
        });
        define(Gaps, 'grow', {
          /**
           * Gets additional dimentions value caused by gaps.
           * Used to increase width of the slides wrapper.
           *
           * @returns {Number}
           */
          get: function get() {
            return Gaps.value * (Components.Sizes.length - 1);
          }
        });
        define(Gaps, 'reductor', {
          /**
           * Gets reduction value caused by gaps.
           * Used to subtract width of the slides.
           *
           * @returns {Number}
           */
          get: function get() {
            var perView = Glide.settings.perView;
            return Gaps.value * (perView - 1) / perView;
          }
        });
        /**
         * Apply calculated gaps:
         * - after building, so slides (including clones) will receive proper margins
         * - on updating via API, to recalculate gaps with new options
         */

        Events.on(['build.after', 'update'], throttle(function () {
          Gaps.apply(Components.Html.wrapper.children);
        }, 30));
        /**
         * Remove gaps:
         * - on destroying to bring markup to its inital state
         */

        Events.on('destroy', function () {
          Gaps.remove(Components.Html.wrapper.children);
        });
        return Gaps;
      }
      /**
       * Finds siblings nodes of the passed node.
       *
       * @param  {Element} node
       * @return {Array}
       */


      function siblings(node) {
        if (node && node.parentNode) {
          var n = node.parentNode.firstChild;
          var matched = [];

          for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== node) {
              matched.push(n);
            }
          }

          return matched;
        }

        return [];
      }
      /**
       * Checks if passed node exist and is a valid element.
       *
       * @param  {Element} node
       * @return {Boolean}
       */


      function exist(node) {
        if (node && node instanceof window.HTMLElement) {
          return true;
        }

        return false;
      }

      var TRACK_SELECTOR = '[data-glide-el="track"]';

      function Html(Glide, Components) {
        var Html = {
          /**
           * Setup slider HTML nodes.
           *
           * @param {Glide} glide
           */
          mount: function mount() {
            this.root = Glide.selector;
            this.track = this.root.querySelector(TRACK_SELECTOR);
            this.slides = Array.prototype.slice.call(this.wrapper.children).filter(function (slide) {
              return !slide.classList.contains(Glide.settings.classes.cloneSlide);
            });
          }
        };
        define(Html, 'root', {
          /**
           * Gets node of the glide main element.
           *
           * @return {Object}
           */
          get: function get() {
            return Html._r;
          },

          /**
           * Sets node of the glide main element.
           *
           * @return {Object}
           */
          set: function set(r) {
            if (isString(r)) {
              r = document.querySelector(r);
            }

            if (exist(r)) {
              Html._r = r;
            } else {
              warn('Root element must be a existing Html node');
            }
          }
        });
        define(Html, 'track', {
          /**
           * Gets node of the glide track with slides.
           *
           * @return {Object}
           */
          get: function get() {
            return Html._t;
          },

          /**
           * Sets node of the glide track with slides.
           *
           * @return {Object}
           */
          set: function set(t) {
            if (exist(t)) {
              Html._t = t;
            } else {
              warn('Could not find track element. Please use ' + TRACK_SELECTOR + ' attribute.');
            }
          }
        });
        define(Html, 'wrapper', {
          /**
           * Gets node of the slides wrapper.
           *
           * @return {Object}
           */
          get: function get() {
            return Html.track.children[0];
          }
        });
        return Html;
      }

      function Peek(Glide, Components, Events) {
        var Peek = {
          /**
           * Setups how much to peek based on settings.
           *
           * @return {Void}
           */
          mount: function mount() {
            this.value = Glide.settings.peek;
          }
        };
        define(Peek, 'value', {
          /**
           * Gets value of the peek.
           *
           * @returns {Number|Object}
           */
          get: function get() {
            return Peek._v;
          },

          /**
           * Sets value of the peek.
           *
           * @param {Number|Object} value
           * @return {Void}
           */
          set: function set(value) {
            if (isObject(value)) {
              value.before = toInt(value.before);
              value.after = toInt(value.after);
            } else {
              value = toInt(value);
            }

            Peek._v = value;
          }
        });
        define(Peek, 'reductor', {
          /**
           * Gets reduction value caused by peek.
           *
           * @returns {Number}
           */
          get: function get() {
            var value = Peek.value;
            var perView = Glide.settings.perView;

            if (isObject(value)) {
              return value.before / perView + value.after / perView;
            }

            return value * 2 / perView;
          }
        });
        /**
         * Recalculate peeking sizes on:
         * - when resizing window to update to proper percents
         */

        Events.on(['resize', 'update'], function () {
          Peek.mount();
        });
        return Peek;
      }

      function Move(Glide, Components, Events) {
        var Move = {
          /**
           * Constructs move component.
           *
           * @returns {Void}
           */
          mount: function mount() {
            this._o = 0;
          },

          /**
           * Calculates a movement value based on passed offset and currently active index.
           *
           * @param  {Number} offset
           * @return {Void}
           */
          make: function make() {
            var _this = this;

            var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            this.offset = offset;
            Events.emit('move', {
              movement: this.value
            });
            Components.Transition.after(function () {
              Events.emit('move.after', {
                movement: _this.value
              });
            });
          }
        };
        define(Move, 'offset', {
          /**
           * Gets an offset value used to modify current translate.
           *
           * @return {Object}
           */
          get: function get() {
            return Move._o;
          },

          /**
           * Sets an offset value used to modify current translate.
           *
           * @return {Object}
           */
          set: function set(value) {
            Move._o = !isUndefined(value) ? toInt(value) : 0;
          }
        });
        define(Move, 'translate', {
          /**
           * Gets a raw movement value.
           *
           * @return {Number}
           */
          get: function get() {
            return Components.Sizes.slideWidth * Glide.index;
          }
        });
        define(Move, 'value', {
          /**
           * Gets an actual movement value corrected by offset.
           *
           * @return {Number}
           */
          get: function get() {
            var offset = this.offset;
            var translate = this.translate;

            if (Components.Direction.is('rtl')) {
              return translate + offset;
            }

            return translate - offset;
          }
        });
        /**
         * Make movement to proper slide on:
         * - before build, so glide will start at `startAt` index
         * - on each standard run to move to newly calculated index
         */

        Events.on(['build.before', 'run'], function () {
          Move.make();
        });
        return Move;
      }

      function Sizes(Glide, Components, Events) {
        var Sizes = {
          /**
           * Setups dimentions of slides.
           *
           * @return {Void}
           */
          setupSlides: function setupSlides() {
            var width = this.slideWidth + 'px';
            var slides = Components.Html.slides;

            for (var i = 0; i < slides.length; i++) {
              slides[i].style.width = width;
            }
          },

          /**
           * Setups dimentions of slides wrapper.
           *
           * @return {Void}
           */
          setupWrapper: function setupWrapper(dimention) {
            Components.Html.wrapper.style.width = this.wrapperSize + 'px';
          },

          /**
           * Removes applied styles from HTML elements.
           *
           * @returns {Void}
           */
          remove: function remove() {
            var slides = Components.Html.slides;

            for (var i = 0; i < slides.length; i++) {
              slides[i].style.width = '';
            }

            Components.Html.wrapper.style.width = '';
          }
        };
        define(Sizes, 'length', {
          /**
           * Gets count number of the slides.
           *
           * @return {Number}
           */
          get: function get() {
            return Components.Html.slides.length;
          }
        });
        define(Sizes, 'width', {
          /**
           * Gets width value of the glide.
           *
           * @return {Number}
           */
          get: function get() {
            return Components.Html.root.offsetWidth;
          }
        });
        define(Sizes, 'wrapperSize', {
          /**
           * Gets size of the slides wrapper.
           *
           * @return {Number}
           */
          get: function get() {
            return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
          }
        });
        define(Sizes, 'slideWidth', {
          /**
           * Gets width value of the single slide.
           *
           * @return {Number}
           */
          get: function get() {
            return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
          }
        });
        /**
         * Apply calculated glide's dimensions:
         * - before building, so other dimentions (e.g. translate) will be calculated propertly
         * - when resizing window to recalculate sildes dimensions
         * - on updating via API, to calculate dimensions based on new options
         */

        Events.on(['build.before', 'resize', 'update'], function () {
          Sizes.setupSlides();
          Sizes.setupWrapper();
        });
        /**
         * Remove calculated glide's dimensions:
         * - on destoting to bring markup to its inital state
         */

        Events.on('destroy', function () {
          Sizes.remove();
        });
        return Sizes;
      }

      function Build(Glide, Components, Events) {
        var Build = {
          /**
           * Init glide building. Adds classes, sets
           * dimensions and setups initial state.
           *
           * @return {Void}
           */
          mount: function mount() {
            Events.emit('build.before');
            this.typeClass();
            this.activeClass();
            Events.emit('build.after');
          },

          /**
           * Adds `type` class to the glide element.
           *
           * @return {Void}
           */
          typeClass: function typeClass() {
            Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.type]);
          },

          /**
           * Sets active class to current slide.
           *
           * @return {Void}
           */
          activeClass: function activeClass() {
            var classes = Glide.settings.classes;
            var slide = Components.Html.slides[Glide.index];

            if (slide) {
              slide.classList.add(classes.activeSlide);
              siblings(slide).forEach(function (sibling) {
                sibling.classList.remove(classes.activeSlide);
              });
            }
          },

          /**
           * Removes HTML classes applied at building.
           *
           * @return {Void}
           */
          removeClasses: function removeClasses() {
            var classes = Glide.settings.classes;
            Components.Html.root.classList.remove(classes[Glide.settings.type]);
            Components.Html.slides.forEach(function (sibling) {
              sibling.classList.remove(classes.activeSlide);
            });
          }
        };
        /**
         * Clear building classes:
         * - on destroying to bring HTML to its initial state
         * - on updating to remove classes before remounting component
         */

        Events.on(['destroy', 'update'], function () {
          Build.removeClasses();
        });
        /**
         * Remount component:
         * - on resizing of the window to calculate new dimentions
         * - on updating settings via API
         */

        Events.on(['resize', 'update'], function () {
          Build.mount();
        });
        /**
         * Swap active class of current slide:
         * - after each move to the new index
         */

        Events.on('move.after', function () {
          Build.activeClass();
        });
        return Build;
      }

      function Clones(Glide, Components, Events) {
        var Clones = {
          /**
           * Create pattern map and collect slides to be cloned.
           */
          mount: function mount() {
            this.items = [];

            if (Glide.isType('carousel')) {
              this.items = this.collect();
            }
          },

          /**
           * Collect clones with pattern.
           *
           * @return {Void}
           */
          collect: function collect() {
            var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var slides = Components.Html.slides;
            var _Glide$settings = Glide.settings,
                perView = _Glide$settings.perView,
                classes = _Glide$settings.classes;
            var peekIncrementer = +!!Glide.settings.peek;
            var part = perView + peekIncrementer;
            var start = slides.slice(0, part);
            var end = slides.slice(-part);

            for (var r = 0; r < Math.max(1, Math.floor(perView / slides.length)); r++) {
              for (var i = 0; i < start.length; i++) {
                var clone = start[i].cloneNode(true);
                clone.classList.add(classes.cloneSlide);
                items.push(clone);
              }

              for (var _i = 0; _i < end.length; _i++) {
                var _clone = end[_i].cloneNode(true);

                _clone.classList.add(classes.cloneSlide);

                items.unshift(_clone);
              }
            }

            return items;
          },

          /**
           * Append cloned slides with generated pattern.
           *
           * @return {Void}
           */
          append: function append() {
            var items = this.items;
            var _Components$Html = Components.Html,
                wrapper = _Components$Html.wrapper,
                slides = _Components$Html.slides;
            var half = Math.floor(items.length / 2);
            var prepend = items.slice(0, half).reverse();
            var append = items.slice(half, items.length);
            var width = Components.Sizes.slideWidth + 'px';

            for (var i = 0; i < append.length; i++) {
              wrapper.appendChild(append[i]);
            }

            for (var _i2 = 0; _i2 < prepend.length; _i2++) {
              wrapper.insertBefore(prepend[_i2], slides[0]);
            }

            for (var _i3 = 0; _i3 < items.length; _i3++) {
              items[_i3].style.width = width;
            }
          },

          /**
           * Remove all cloned slides.
           *
           * @return {Void}
           */
          remove: function remove() {
            var items = this.items;

            for (var i = 0; i < items.length; i++) {
              Components.Html.wrapper.removeChild(items[i]);
            }
          }
        };
        define(Clones, 'grow', {
          /**
           * Gets additional dimentions value caused by clones.
           *
           * @return {Number}
           */
          get: function get() {
            return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
          }
        });
        /**
         * Append additional slide's clones:
         * - while glide's type is `carousel`
         */

        Events.on('update', function () {
          Clones.remove();
          Clones.mount();
          Clones.append();
        });
        /**
         * Append additional slide's clones:
         * - while glide's type is `carousel`
         */

        Events.on('build.before', function () {
          if (Glide.isType('carousel')) {
            Clones.append();
          }
        });
        /**
         * Remove clones HTMLElements:
         * - on destroying, to bring HTML to its initial state
         */

        Events.on('destroy', function () {
          Clones.remove();
        });
        return Clones;
      }

      var EventsBinder = function () {
        /**
         * Construct a EventsBinder instance.
         */
        function EventsBinder() {
          var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          classCallCheck(this, EventsBinder);
          this.listeners = listeners;
        }
        /**
         * Adds events listeners to arrows HTML elements.
         *
         * @param  {String|Array} events
         * @param  {Element|Window|Document} el
         * @param  {Function} closure
         * @param  {Boolean|Object} capture
         * @return {Void}
         */


        createClass(EventsBinder, [{
          key: 'on',
          value: function on(events, el, closure) {
            var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            if (isString(events)) {
              events = [events];
            }

            for (var i = 0; i < events.length; i++) {
              this.listeners[events[i]] = closure;
              el.addEventListener(events[i], this.listeners[events[i]], capture);
            }
          }
          /**
           * Removes event listeners from arrows HTML elements.
           *
           * @param  {String|Array} events
           * @param  {Element|Window|Document} el
           * @param  {Boolean|Object} capture
           * @return {Void}
           */

        }, {
          key: 'off',
          value: function off(events, el) {
            var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (isString(events)) {
              events = [events];
            }

            for (var i = 0; i < events.length; i++) {
              el.removeEventListener(events[i], this.listeners[events[i]], capture);
            }
          }
          /**
           * Destroy collected listeners.
           *
           * @returns {Void}
           */

        }, {
          key: 'destroy',
          value: function destroy() {
            delete this.listeners;
          }
        }]);
        return EventsBinder;
      }();

      function Resize(Glide, Components, Events) {
        /**
         * Instance of the binder for DOM Events.
         *
         * @type {EventsBinder}
         */
        var Binder = new EventsBinder();
        var Resize = {
          /**
           * Initializes window bindings.
           */
          mount: function mount() {
            this.bind();
          },

          /**
           * Binds `rezsize` listener to the window.
           * It's a costly event, so we are debouncing it.
           *
           * @return {Void}
           */
          bind: function bind() {
            Binder.on('resize', window, throttle(function () {
              Events.emit('resize');
            }, Glide.settings.throttle));
          },

          /**
           * Unbinds listeners from the window.
           *
           * @return {Void}
           */
          unbind: function unbind() {
            Binder.off('resize', window);
          }
        };
        /**
         * Remove bindings from window:
         * - on destroying, to remove added EventListener
         */

        Events.on('destroy', function () {
          Resize.unbind();
          Binder.destroy();
        });
        return Resize;
      }

      var VALID_DIRECTIONS = ['ltr', 'rtl'];
      var FLIPED_MOVEMENTS = {
        '>': '<',
        '<': '>',
        '=': '='
      };

      function Direction(Glide, Components, Events) {
        var Direction = {
          /**
           * Setups gap value based on settings.
           *
           * @return {Void}
           */
          mount: function mount() {
            this.value = Glide.settings.direction;
          },

          /**
           * Resolves pattern based on direction value
           *
           * @param {String} pattern
           * @returns {String}
           */
          resolve: function resolve(pattern) {
            var token = pattern.slice(0, 1);

            if (this.is('rtl')) {
              return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
            }

            return pattern;
          },

          /**
           * Checks value of direction mode.
           *
           * @param {String} direction
           * @returns {Boolean}
           */
          is: function is(direction) {
            return this.value === direction;
          },

          /**
           * Applies direction class to the root HTML element.
           *
           * @return {Void}
           */
          addClass: function addClass() {
            Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
          },

          /**
           * Removes direction class from the root HTML element.
           *
           * @return {Void}
           */
          removeClass: function removeClass() {
            Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
          }
        };
        define(Direction, 'value', {
          /**
           * Gets value of the direction.
           *
           * @returns {Number}
           */
          get: function get() {
            return Direction._v;
          },

          /**
           * Sets value of the direction.
           *
           * @param {String} value
           * @return {Void}
           */
          set: function set(value) {
            if (VALID_DIRECTIONS.indexOf(value) > -1) {
              Direction._v = value;
            } else {
              warn('Direction value must be `ltr` or `rtl`');
            }
          }
        });
        /**
         * Clear direction class:
         * - on destroy to bring HTML to its initial state
         * - on update to remove class before reappling bellow
         */

        Events.on(['destroy', 'update'], function () {
          Direction.removeClass();
        });
        /**
         * Remount component:
         * - on update to reflect changes in direction value
         */

        Events.on('update', function () {
          Direction.mount();
        });
        /**
         * Apply direction class:
         * - before building to apply class for the first time
         * - on updating to reapply direction class that may changed
         */

        Events.on(['build.before', 'update'], function () {
          Direction.addClass();
        });
        return Direction;
      }
      /**
       * Reflects value of glide movement.
       *
       * @param  {Object} Glide
       * @param  {Object} Components
       * @return {Object}
       */


      function Rtl(Glide, Components) {
        return {
          /**
           * Negates the passed translate if glide is in RTL option.
           *
           * @param  {Number} translate
           * @return {Number}
           */
          modify: function modify(translate) {
            if (Components.Direction.is('rtl')) {
              return -translate;
            }

            return translate;
          }
        };
      }
      /**
       * Updates glide movement with a `gap` settings.
       *
       * @param  {Object} Glide
       * @param  {Object} Components
       * @return {Object}
       */


      function Gap(Glide, Components) {
        return {
          /**
           * Modifies passed translate value with number in the `gap` settings.
           *
           * @param  {Number} translate
           * @return {Number}
           */
          modify: function modify(translate) {
            return translate + Components.Gaps.value * Glide.index;
          }
        };
      }
      /**
       * Updates glide movement with width of additional clones width.
       *
       * @param  {Object} Glide
       * @param  {Object} Components
       * @return {Object}
       */


      function Grow(Glide, Components) {
        return {
          /**
           * Adds to the passed translate width of the half of clones.
           *
           * @param  {Number} translate
           * @return {Number}
           */
          modify: function modify(translate) {
            return translate + Components.Clones.grow / 2;
          }
        };
      }
      /**
       * Updates glide movement with a `peek` settings.
       *
       * @param  {Object} Glide
       * @param  {Object} Components
       * @return {Object}
       */


      function Peeking(Glide, Components) {
        return {
          /**
           * Modifies passed translate value with a `peek` setting.
           *
           * @param  {Number} translate
           * @return {Number}
           */
          modify: function modify(translate) {
            if (Glide.settings.focusAt >= 0) {
              var peek = Components.Peek.value;

              if (isObject(peek)) {
                return translate - peek.before;
              }

              return translate - peek;
            }

            return translate;
          }
        };
      }
      /**
       * Updates glide movement with a `focusAt` settings.
       *
       * @param  {Object} Glide
       * @param  {Object} Components
       * @return {Object}
       */


      function Focusing(Glide, Components) {
        return {
          /**
           * Modifies passed translate value with index in the `focusAt` setting.
           *
           * @param  {Number} translate
           * @return {Number}
           */
          modify: function modify(translate) {
            var gap = Components.Gaps.value;
            var width = Components.Sizes.width;
            var focusAt = Glide.settings.focusAt;
            var slideWidth = Components.Sizes.slideWidth;

            if (focusAt === 'center') {
              return translate - (width / 2 - slideWidth / 2);
            }

            return translate - slideWidth * focusAt - gap * focusAt;
          }
        };
      }
      /**
       * Applies diffrent transformers on translate value.
       *
       * @param  {Object} Glide
       * @param  {Object} Components
       * @return {Object}
       */


      function mutator(Glide, Components, Events) {
        /**
         * Merge instance transformers with collection of default transformers.
         * It's important that the Rtl component be last on the list,
         * so it reflects all previous transformations.
         *
         * @type {Array}
         */
        var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);
        return {
          /**
           * Piplines translate value with registered transformers.
           *
           * @param  {Number} translate
           * @return {Number}
           */
          mutate: function mutate(translate) {
            for (var i = 0; i < TRANSFORMERS.length; i++) {
              var transformer = TRANSFORMERS[i];

              if (isFunction(transformer) && isFunction(transformer().modify)) {
                translate = transformer(Glide, Components, Events).modify(translate);
              } else {
                warn('Transformer should be a function that returns an object with `modify()` method');
              }
            }

            return translate;
          }
        };
      }

      function Translate(Glide, Components, Events) {
        var Translate = {
          /**
           * Sets value of translate on HTML element.
           *
           * @param {Number} value
           * @return {Void}
           */
          set: function set(value) {
            var transform = mutator(Glide, Components).mutate(value);
            Components.Html.wrapper.style.transform = 'translate3d(' + -1 * transform + 'px, 0px, 0px)';
          },

          /**
           * Removes value of translate from HTML element.
           *
           * @return {Void}
           */
          remove: function remove() {
            Components.Html.wrapper.style.transform = '';
          }
        };
        /**
         * Set new translate value:
         * - on move to reflect index change
         * - on updating via API to reflect possible changes in options
         */

        Events.on('move', function (context) {
          var gap = Components.Gaps.value;
          var length = Components.Sizes.length;
          var width = Components.Sizes.slideWidth;

          if (Glide.isType('carousel') && Components.Run.isOffset('<')) {
            Components.Transition.after(function () {
              Events.emit('translate.jump');
              Translate.set(width * (length - 1));
            });
            return Translate.set(-width - gap * length);
          }

          if (Glide.isType('carousel') && Components.Run.isOffset('>')) {
            Components.Transition.after(function () {
              Events.emit('translate.jump');
              Translate.set(0);
            });
            return Translate.set(width * length + gap * length);
          }

          return Translate.set(context.movement);
        });
        /**
         * Remove translate:
         * - on destroying to bring markup to its inital state
         */

        Events.on('destroy', function () {
          Translate.remove();
        });
        return Translate;
      }

      function Transition(Glide, Components, Events) {
        /**
         * Holds inactivity status of transition.
         * When true transition is not applied.
         *
         * @type {Boolean}
         */
        var disabled = false;
        var Transition = {
          /**
           * Composes string of the CSS transition.
           *
           * @param {String} property
           * @return {String}
           */
          compose: function compose(property) {
            var settings = Glide.settings;

            if (!disabled) {
              return property + ' ' + this.duration + 'ms ' + settings.animationTimingFunc;
            }

            return property + ' 0ms ' + settings.animationTimingFunc;
          },

          /**
           * Sets value of transition on HTML element.
           *
           * @param {String=} property
           * @return {Void}
           */
          set: function set() {
            var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
            Components.Html.wrapper.style.transition = this.compose(property);
          },

          /**
           * Removes value of transition from HTML element.
           *
           * @return {Void}
           */
          remove: function remove() {
            Components.Html.wrapper.style.transition = '';
          },

          /**
           * Runs callback after animation.
           *
           * @param  {Function} callback
           * @return {Void}
           */
          after: function after(callback) {
            setTimeout(function () {
              callback();
            }, this.duration);
          },

          /**
           * Enable transition.
           *
           * @return {Void}
           */
          enable: function enable() {
            disabled = false;
            this.set();
          },

          /**
           * Disable transition.
           *
           * @return {Void}
           */
          disable: function disable() {
            disabled = true;
            this.set();
          }
        };
        define(Transition, 'duration', {
          /**
           * Gets duration of the transition based
           * on currently running animation type.
           *
           * @return {Number}
           */
          get: function get() {
            var settings = Glide.settings;

            if (Glide.isType('slider') && Components.Run.offset) {
              return settings.rewindDuration;
            }

            return settings.animationDuration;
          }
        });
        /**
         * Set transition `style` value:
         * - on each moving, because it may be cleared by offset move
         */

        Events.on('move', function () {
          Transition.set();
        });
        /**
         * Disable transition:
         * - before initial build to avoid transitioning from `0` to `startAt` index
         * - while resizing window and recalculating dimentions
         * - on jumping from offset transition at start and end edges in `carousel` type
         */

        Events.on(['build.before', 'resize', 'translate.jump'], function () {
          Transition.disable();
        });
        /**
         * Enable transition:
         * - on each running, because it may be disabled by offset move
         */

        Events.on('run', function () {
          Transition.enable();
        });
        /**
         * Remove transition:
         * - on destroying to bring markup to its inital state
         */

        Events.on('destroy', function () {
          Transition.remove();
        });
        return Transition;
      }
      /**
       * Test via a getter in the options object to see
       * if the passive property is accessed.
       *
       * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
       */


      var supportsPassive = false;

      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function get() {
            supportsPassive = true;
          }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
      } catch (e) {}

      var supportsPassive$1 = supportsPassive;
      var START_EVENTS = ['touchstart', 'mousedown'];
      var MOVE_EVENTS = ['touchmove', 'mousemove'];
      var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
      var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

      function Swipe(Glide, Components, Events) {
        /**
         * Instance of the binder for DOM Events.
         *
         * @type {EventsBinder}
         */
        var Binder = new EventsBinder();
        var swipeSin = 0;
        var swipeStartX = 0;
        var swipeStartY = 0;
        var disabled = false;
        var capture = supportsPassive$1 ? {
          passive: true
        } : false;
        var Swipe = {
          /**
           * Initializes swipe bindings.
           *
           * @return {Void}
           */
          mount: function mount() {
            this.bindSwipeStart();
          },

          /**
           * Handler for `swipestart` event. Calculates entry points of the user's tap.
           *
           * @param {Object} event
           * @return {Void}
           */
          start: function start(event) {
            if (!disabled && !Glide.disabled) {
              this.disable();
              var swipe = this.touches(event);
              swipeSin = null;
              swipeStartX = toInt(swipe.pageX);
              swipeStartY = toInt(swipe.pageY);
              this.bindSwipeMove();
              this.bindSwipeEnd();
              Events.emit('swipe.start');
            }
          },

          /**
           * Handler for `swipemove` event. Calculates user's tap angle and distance.
           *
           * @param {Object} event
           */
          move: function move(event) {
            if (!Glide.disabled) {
              var _Glide$settings = Glide.settings,
                  touchAngle = _Glide$settings.touchAngle,
                  touchRatio = _Glide$settings.touchRatio,
                  classes = _Glide$settings.classes;
              var swipe = this.touches(event);
              var subExSx = toInt(swipe.pageX) - swipeStartX;
              var subEySy = toInt(swipe.pageY) - swipeStartY;
              var powEX = Math.abs(subExSx << 2);
              var powEY = Math.abs(subEySy << 2);
              var swipeHypotenuse = Math.sqrt(powEX + powEY);
              var swipeCathetus = Math.sqrt(powEY);
              swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

              if (swipeSin * 180 / Math.PI < touchAngle) {
                event.stopPropagation();
                Components.Move.make(subExSx * toFloat(touchRatio));
                Components.Html.root.classList.add(classes.dragging);
                Events.emit('swipe.move');
              } else {
                return false;
              }
            }
          },

          /**
           * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
           *
           * @param {Object} event
           * @return {Void}
           */
          end: function end(event) {
            if (!Glide.disabled) {
              var settings = Glide.settings;
              var swipe = this.touches(event);
              var threshold = this.threshold(event);
              var swipeDistance = swipe.pageX - swipeStartX;
              var swipeDeg = swipeSin * 180 / Math.PI;
              var steps = Math.round(swipeDistance / Components.Sizes.slideWidth);
              this.enable();

              if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
                // While swipe is positive and greater than threshold move backward.
                if (settings.perTouch) {
                  steps = Math.min(steps, toInt(settings.perTouch));
                }

                if (Components.Direction.is('rtl')) {
                  steps = -steps;
                }

                Components.Run.make(Components.Direction.resolve('<' + steps));
              } else if (swipeDistance < -threshold && swipeDeg < settings.touchAngle) {
                // While swipe is negative and lower than negative threshold move forward.
                if (settings.perTouch) {
                  steps = Math.max(steps, -toInt(settings.perTouch));
                }

                if (Components.Direction.is('rtl')) {
                  steps = -steps;
                }

                Components.Run.make(Components.Direction.resolve('>' + steps));
              } else {
                // While swipe don't reach distance apply previous transform.
                Components.Move.make();
              }

              Components.Html.root.classList.remove(settings.classes.dragging);
              this.unbindSwipeMove();
              this.unbindSwipeEnd();
              Events.emit('swipe.end');
            }
          },

          /**
           * Binds swipe's starting event.
           *
           * @return {Void}
           */
          bindSwipeStart: function bindSwipeStart() {
            var _this = this;

            var settings = Glide.settings;

            if (settings.swipeThreshold) {
              Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
                _this.start(event);
              }, capture);
            }

            if (settings.dragThreshold) {
              Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
                _this.start(event);
              }, capture);
            }
          },

          /**
           * Unbinds swipe's starting event.
           *
           * @return {Void}
           */
          unbindSwipeStart: function unbindSwipeStart() {
            Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
            Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
          },

          /**
           * Binds swipe's moving event.
           *
           * @return {Void}
           */
          bindSwipeMove: function bindSwipeMove() {
            var _this2 = this;

            Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
              _this2.move(event);
            }, Glide.settings.throttle), capture);
          },

          /**
           * Unbinds swipe's moving event.
           *
           * @return {Void}
           */
          unbindSwipeMove: function unbindSwipeMove() {
            Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
          },

          /**
           * Binds swipe's ending event.
           *
           * @return {Void}
           */
          bindSwipeEnd: function bindSwipeEnd() {
            var _this3 = this;

            Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
              _this3.end(event);
            });
          },

          /**
           * Unbinds swipe's ending event.
           *
           * @return {Void}
           */
          unbindSwipeEnd: function unbindSwipeEnd() {
            Binder.off(END_EVENTS, Components.Html.wrapper);
          },

          /**
           * Normalizes event touches points accorting to different types.
           *
           * @param {Object} event
           */
          touches: function touches(event) {
            if (MOUSE_EVENTS.indexOf(event.type) > -1) {
              return event;
            }

            return event.touches[0] || event.changedTouches[0];
          },

          /**
           * Gets value of minimum swipe distance settings based on event type.
           *
           * @return {Number}
           */
          threshold: function threshold(event) {
            var settings = Glide.settings;

            if (MOUSE_EVENTS.indexOf(event.type) > -1) {
              return settings.dragThreshold;
            }

            return settings.swipeThreshold;
          },

          /**
           * Enables swipe event.
           *
           * @return {self}
           */
          enable: function enable() {
            disabled = false;
            Components.Transition.enable();
            return this;
          },

          /**
           * Disables swipe event.
           *
           * @return {self}
           */
          disable: function disable() {
            disabled = true;
            Components.Transition.disable();
            return this;
          }
        };
        /**
         * Add component class:
         * - after initial building
         */

        Events.on('build.after', function () {
          Components.Html.root.classList.add(Glide.settings.classes.swipeable);
        });
        /**
         * Remove swiping bindings:
         * - on destroying, to remove added EventListeners
         */

        Events.on('destroy', function () {
          Swipe.unbindSwipeStart();
          Swipe.unbindSwipeMove();
          Swipe.unbindSwipeEnd();
          Binder.destroy();
        });
        return Swipe;
      }

      function Images(Glide, Components, Events) {
        /**
         * Instance of the binder for DOM Events.
         *
         * @type {EventsBinder}
         */
        var Binder = new EventsBinder();
        var Images = {
          /**
           * Binds listener to glide wrapper.
           *
           * @return {Void}
           */
          mount: function mount() {
            this.bind();
          },

          /**
           * Binds `dragstart` event on wrapper to prevent dragging images.
           *
           * @return {Void}
           */
          bind: function bind() {
            Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
          },

          /**
           * Unbinds `dragstart` event on wrapper.
           *
           * @return {Void}
           */
          unbind: function unbind() {
            Binder.off('dragstart', Components.Html.wrapper);
          },

          /**
           * Event handler. Prevents dragging.
           *
           * @return {Void}
           */
          dragstart: function dragstart(event) {
            event.preventDefault();
          }
        };
        /**
         * Remove bindings from images:
         * - on destroying, to remove added EventListeners
         */

        Events.on('destroy', function () {
          Images.unbind();
          Binder.destroy();
        });
        return Images;
      }

      function Anchors(Glide, Components, Events) {
        /**
         * Instance of the binder for DOM Events.
         *
         * @type {EventsBinder}
         */
        var Binder = new EventsBinder();
        /**
         * Holds detaching status of anchors.
         * Prevents detaching of already detached anchors.
         *
         * @private
         * @type {Boolean}
         */

        var detached = false;
        /**
         * Holds preventing status of anchors.
         * If `true` redirection after click will be disabled.
         *
         * @private
         * @type {Boolean}
         */

        var prevented = false;
        var Anchors = {
          /**
           * Setups a initial state of anchors component.
           *
           * @returns {Void}
           */
          mount: function mount() {
            /**
             * Holds collection of anchors elements.
             *
             * @private
             * @type {HTMLCollection}
             */
            this._a = Components.Html.wrapper.querySelectorAll('a');
            this.bind();
          },

          /**
           * Binds events to anchors inside a track.
           *
           * @return {Void}
           */
          bind: function bind() {
            Binder.on('click', Components.Html.wrapper, this.click);
          },

          /**
           * Unbinds events attached to anchors inside a track.
           *
           * @return {Void}
           */
          unbind: function unbind() {
            Binder.off('click', Components.Html.wrapper);
          },

          /**
           * Handler for click event. Prevents clicks when glide is in `prevent` status.
           *
           * @param  {Object} event
           * @return {Void}
           */
          click: function click(event) {
            if (prevented) {
              event.stopPropagation();
              event.preventDefault();
            }
          },

          /**
           * Detaches anchors click event inside glide.
           *
           * @return {self}
           */
          detach: function detach() {
            prevented = true;

            if (!detached) {
              for (var i = 0; i < this.items.length; i++) {
                this.items[i].draggable = false;
                this.items[i].setAttribute('data-href', this.items[i].getAttribute('href'));
                this.items[i].removeAttribute('href');
              }

              detached = true;
            }

            return this;
          },

          /**
           * Attaches anchors click events inside glide.
           *
           * @return {self}
           */
          attach: function attach() {
            prevented = false;

            if (detached) {
              for (var i = 0; i < this.items.length; i++) {
                this.items[i].draggable = true;
                this.items[i].setAttribute('href', this.items[i].getAttribute('data-href'));
              }

              detached = false;
            }

            return this;
          }
        };
        define(Anchors, 'items', {
          /**
           * Gets collection of the arrows HTML elements.
           *
           * @return {HTMLElement[]}
           */
          get: function get() {
            return Anchors._a;
          }
        });
        /**
         * Detach anchors inside slides:
         * - on swiping, so they won't redirect to its `href` attributes
         */

        Events.on('swipe.move', function () {
          Anchors.detach();
        });
        /**
         * Attach anchors inside slides:
         * - after swiping and transitions ends, so they can redirect after click again
         */

        Events.on('swipe.end', function () {
          Components.Transition.after(function () {
            Anchors.attach();
          });
        });
        /**
         * Unbind anchors inside slides:
         * - on destroying, to bring anchors to its initial state
         */

        Events.on('destroy', function () {
          Anchors.attach();
          Anchors.unbind();
          Binder.destroy();
        });
        return Anchors;
      }

      var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
      var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';

      function Controls(Glide, Components, Events) {
        /**
         * Instance of the binder for DOM Events.
         *
         * @type {EventsBinder}
         */
        var Binder = new EventsBinder();
        var capture = supportsPassive$1 ? {
          passive: true
        } : false;
        var Controls = {
          /**
           * Inits arrows. Binds events listeners
           * to the arrows HTML elements.
           *
           * @return {Void}
           */
          mount: function mount() {
            /**
             * Collection of navigation HTML elements.
             *
             * @private
             * @type {HTMLCollection}
             */
            this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
            /**
             * Collection of controls HTML elements.
             *
             * @private
             * @type {HTMLCollection}
             */

            this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
            this.addBindings();
          },

          /**
           * Sets active class to current slide.
           *
           * @return {Void}
           */
          setActive: function setActive() {
            for (var i = 0; i < this._n.length; i++) {
              this.addClass(this._n[i].children);
            }
          },

          /**
           * Removes active class to current slide.
           *
           * @return {Void}
           */
          removeActive: function removeActive() {
            for (var i = 0; i < this._n.length; i++) {
              this.removeClass(this._n[i].children);
            }
          },

          /**
           * Toggles active class on items inside navigation.
           *
           * @param  {HTMLElement} controls
           * @return {Void}
           */
          addClass: function addClass(controls) {
            var settings = Glide.settings;
            var item = controls[Glide.index];

            if (item) {
              item.classList.add(settings.classes.activeNav);
              siblings(item).forEach(function (sibling) {
                sibling.classList.remove(settings.classes.activeNav);
              });
            }
          },

          /**
           * Removes active class from active control.
           *
           * @param  {HTMLElement} controls
           * @return {Void}
           */
          removeClass: function removeClass(controls) {
            var item = controls[Glide.index];

            if (item) {
              item.classList.remove(Glide.settings.classes.activeNav);
            }
          },

          /**
           * Adds handles to the each group of controls.
           *
           * @return {Void}
           */
          addBindings: function addBindings() {
            for (var i = 0; i < this._c.length; i++) {
              this.bind(this._c[i].children);
            }
          },

          /**
           * Removes handles from the each group of controls.
           *
           * @return {Void}
           */
          removeBindings: function removeBindings() {
            for (var i = 0; i < this._c.length; i++) {
              this.unbind(this._c[i].children);
            }
          },

          /**
           * Binds events to arrows HTML elements.
           *
           * @param {HTMLCollection} elements
           * @return {Void}
           */
          bind: function bind(elements) {
            for (var i = 0; i < elements.length; i++) {
              Binder.on('click', elements[i], this.click);
              Binder.on('touchstart', elements[i], this.click, capture);
            }
          },

          /**
           * Unbinds events binded to the arrows HTML elements.
           *
           * @param {HTMLCollection} elements
           * @return {Void}
           */
          unbind: function unbind(elements) {
            for (var i = 0; i < elements.length; i++) {
              Binder.off(['click', 'touchstart'], elements[i]);
            }
          },

          /**
           * Handles `click` event on the arrows HTML elements.
           * Moves slider in driection precised in
           * `data-glide-dir` attribute.
           *
           * @param {Object} event
           * @return {Void}
           */
          click: function click(event) {
            event.preventDefault();
            Components.Run.make(Components.Direction.resolve(event.currentTarget.getAttribute('data-glide-dir')));
          }
        };
        define(Controls, 'items', {
          /**
           * Gets collection of the controls HTML elements.
           *
           * @return {HTMLElement[]}
           */
          get: function get() {
            return Controls._c;
          }
        });
        /**
         * Swap active class of current navigation item:
         * - after mounting to set it to initial index
         * - after each move to the new index
         */

        Events.on(['mount.after', 'move.after'], function () {
          Controls.setActive();
        });
        /**
         * Remove bindings and HTML Classes:
         * - on destroying, to bring markup to its initial state
         */

        Events.on('destroy', function () {
          Controls.removeBindings();
          Controls.removeActive();
          Binder.destroy();
        });
        return Controls;
      }

      function Keyboard(Glide, Components, Events) {
        /**
         * Instance of the binder for DOM Events.
         *
         * @type {EventsBinder}
         */
        var Binder = new EventsBinder();
        var Keyboard = {
          /**
           * Binds keyboard events on component mount.
           *
           * @return {Void}
           */
          mount: function mount() {
            if (Glide.settings.keyboard) {
              this.bind();
            }
          },

          /**
           * Adds keyboard press events.
           *
           * @return {Void}
           */
          bind: function bind() {
            Binder.on('keyup', document, this.press);
          },

          /**
           * Removes keyboard press events.
           *
           * @return {Void}
           */
          unbind: function unbind() {
            Binder.off('keyup', document);
          },

          /**
           * Handles keyboard's arrows press and moving glide foward and backward.
           *
           * @param  {Object} event
           * @return {Void}
           */
          press: function press(event) {
            if (event.keyCode === 39) {
              Components.Run.make(Components.Direction.resolve('>'));
            }

            if (event.keyCode === 37) {
              Components.Run.make(Components.Direction.resolve('<'));
            }
          }
        };
        /**
         * Remove bindings from keyboard:
         * - on destroying to remove added events
         * - on updating to remove events before remounting
         */

        Events.on(['destroy', 'update'], function () {
          Keyboard.unbind();
        });
        /**
         * Remount component
         * - on updating to reflect potential changes in settings
         */

        Events.on('update', function () {
          Keyboard.mount();
        });
        /**
         * Destroy binder:
         * - on destroying to remove listeners
         */

        Events.on('destroy', function () {
          Binder.destroy();
        });
        return Keyboard;
      }

      function Autoplay(Glide, Components, Events) {
        /**
         * Instance of the binder for DOM Events.
         *
         * @type {EventsBinder}
         */
        var Binder = new EventsBinder();
        var Autoplay = {
          /**
           * Initializes autoplaying and events.
           *
           * @return {Void}
           */
          mount: function mount() {
            this.start();

            if (Glide.settings.hoverpause) {
              this.bind();
            }
          },

          /**
           * Starts autoplaying in configured interval.
           *
           * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
           * @return {Void}
           */
          start: function start() {
            var _this = this;

            if (Glide.settings.autoplay) {
              if (isUndefined(this._i)) {
                this._i = setInterval(function () {
                  _this.stop();

                  Components.Run.make('>');

                  _this.start();
                }, this.time);
              }
            }
          },

          /**
           * Stops autorunning of the glide.
           *
           * @return {Void}
           */
          stop: function stop() {
            this._i = clearInterval(this._i);
          },

          /**
           * Stops autoplaying while mouse is over glide's area.
           *
           * @return {Void}
           */
          bind: function bind() {
            var _this2 = this;

            Binder.on('mouseover', Components.Html.root, function () {
              _this2.stop();
            });
            Binder.on('mouseout', Components.Html.root, function () {
              _this2.start();
            });
          },

          /**
           * Unbind mouseover events.
           *
           * @returns {Void}
           */
          unbind: function unbind() {
            Binder.off(['mouseover', 'mouseout'], Components.Html.root);
          }
        };
        define(Autoplay, 'time', {
          /**
           * Gets time period value for the autoplay interval. Prioritizes
           * times in `data-glide-autoplay` attrubutes over options.
           *
           * @return {Number}
           */
          get: function get() {
            var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

            if (autoplay) {
              return toInt(autoplay);
            }

            return toInt(Glide.settings.autoplay);
          }
        });
        /**
         * Stop autoplaying and unbind events:
         * - on destroying, to clear defined interval
         * - on updating via API to reset interval that may changed
         */

        Events.on(['destroy', 'update'], function () {
          Autoplay.unbind();
        });
        /**
         * Stop autoplaying:
         * - before each run, to restart autoplaying
         * - on pausing via API
         * - on destroying, to clear defined interval
         * - while starting a swipe
         * - on updating via API to reset interval that may changed
         */

        Events.on(['run.before', 'pause', 'destroy', 'swipe.start', 'update'], function () {
          Autoplay.stop();
        });
        /**
         * Start autoplaying:
         * - after each run, to restart autoplaying
         * - on playing via API
         * - while ending a swipe
         */

        Events.on(['run.after', 'play', 'swipe.end'], function () {
          Autoplay.start();
        });
        /**
         * Remount autoplaying:
         * - on updating via API to reset interval that may changed
         */

        Events.on('update', function () {
          Autoplay.mount();
        });
        /**
         * Destroy a binder:
         * - on destroying glide instance to clearup listeners
         */

        Events.on('destroy', function () {
          Binder.destroy();
        });
        return Autoplay;
      }
      /**
       * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
       *
       * @param {Object} points
       * @returns {Object}
       */


      function sortBreakpoints(points) {
        if (isObject(points)) {
          return sortKeys(points);
        } else {
          warn('Breakpoints option must be an object');
        }

        return {};
      }

      function Breakpoints(Glide, Components, Events) {
        /**
         * Instance of the binder for DOM Events.
         *
         * @type {EventsBinder}
         */
        var Binder = new EventsBinder();
        /**
         * Holds reference to settings.
         *
         * @type {Object}
         */

        var settings = Glide.settings;
        /**
         * Holds reference to breakpoints object in settings. Sorts breakpoints
         * from smaller to larger. It is required in order to proper
         * matching currently active breakpoint settings.
         *
         * @type {Object}
         */

        var points = sortBreakpoints(settings.breakpoints);
        /**
         * Cache initial settings before overwritting.
         *
         * @type {Object}
         */

        var defaults = _extends({}, settings);

        var Breakpoints = {
          /**
           * Matches settings for currectly matching media breakpoint.
           *
           * @param {Object} points
           * @returns {Object}
           */
          match: function match(points) {
            if (typeof window.matchMedia !== 'undefined') {
              for (var point in points) {
                if (points.hasOwnProperty(point)) {
                  if (window.matchMedia('(max-width: ' + point + 'px)').matches) {
                    return points[point];
                  }
                }
              }
            }

            return defaults;
          }
        };
        /**
         * Overwrite instance settings with currently matching breakpoint settings.
         * This happens right after component initialization.
         */

        _extends(settings, Breakpoints.match(points));
        /**
         * Update glide with settings of matched brekpoint:
         * - window resize to update slider
         */


        Binder.on('resize', window, throttle(function () {
          Glide.settings = mergeOptions(settings, Breakpoints.match(points));
        }, Glide.settings.throttle));
        /**
         * Resort and update default settings:
         * - on reinit via API, so breakpoint matching will be performed with options
         */

        Events.on('update', function () {
          points = sortBreakpoints(points);
          defaults = _extends({}, settings);
        });
        /**
         * Unbind resize listener:
         * - on destroying, to bring markup to its initial state
         */

        Events.on('destroy', function () {
          Binder.off('resize', window);
        });
        return Breakpoints;
      }

      var COMPONENTS = {
        // Required
        Html: Html,
        Translate: Translate,
        Transition: Transition,
        Direction: Direction,
        Peek: Peek,
        Sizes: Sizes,
        Gaps: Gaps,
        Move: Move,
        Clones: Clones,
        Resize: Resize,
        Build: Build,
        Run: Run,
        // Optional
        Swipe: Swipe,
        Images: Images,
        Anchors: Anchors,
        Controls: Controls,
        Keyboard: Keyboard,
        Autoplay: Autoplay,
        Breakpoints: Breakpoints
      };

      var Glide$1 = function (_Core) {
        inherits(Glide$$1, _Core);

        function Glide$$1() {
          classCallCheck(this, Glide$$1);
          return possibleConstructorReturn(this, (Glide$$1.__proto__ || Object.getPrototypeOf(Glide$$1)).apply(this, arguments));
        }

        createClass(Glide$$1, [{
          key: 'mount',
          value: function mount() {
            var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return get(Glide$$1.prototype.__proto__ || Object.getPrototypeOf(Glide$$1.prototype), 'mount', this).call(this, _extends({}, COMPONENTS, extensions));
          }
        }]);
        return Glide$$1;
      }(Glide);

      return Glide$1;
    });
  }, {}],
  2: [function (require, module, exports) {
    /*!
     * clipboard.js v2.0.6
     * https://clipboardjs.com/
     * 
     * Licensed MIT © Zeno Rocha
     */
    (function webpackUniversalModuleDefinition(root, factory) {
      if (_typeof2(exports) === 'object' && _typeof2(module) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if (_typeof2(exports) === 'object') exports["ClipboardJS"] = factory();else root["ClipboardJS"] = factory();
    })(this, function () {
      return (
        /******/
        function (modules) {
          // webpackBootstrap

          /******/
          // The module cache

          /******/
          var installedModules = {};
          /******/

          /******/
          // The require function

          /******/

          function __webpack_require__(moduleId) {
            /******/

            /******/
            // Check if module is in cache

            /******/
            if (installedModules[moduleId]) {
              /******/
              return installedModules[moduleId].exports;
              /******/
            }
            /******/
            // Create a new module (and put it into the cache)

            /******/


            var module = installedModules[moduleId] = {
              /******/
              i: moduleId,

              /******/
              l: false,

              /******/
              exports: {}
              /******/

            };
            /******/

            /******/
            // Execute the module function

            /******/

            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/

            /******/
            // Flag the module as loaded

            /******/

            module.l = true;
            /******/

            /******/
            // Return the exports of the module

            /******/

            return module.exports;
            /******/
          }
          /******/

          /******/

          /******/
          // expose the modules object (__webpack_modules__)

          /******/


          __webpack_require__.m = modules;
          /******/

          /******/
          // expose the module cache

          /******/

          __webpack_require__.c = installedModules;
          /******/

          /******/
          // define getter function for harmony exports

          /******/

          __webpack_require__.d = function (exports, name, getter) {
            /******/
            if (!__webpack_require__.o(exports, name)) {
              /******/
              Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
              });
              /******/
            }
            /******/

          };
          /******/

          /******/
          // define __esModule on exports

          /******/


          __webpack_require__.r = function (exports) {
            /******/
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
              /******/
              Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
              });
              /******/
            }
            /******/


            Object.defineProperty(exports, '__esModule', {
              value: true
            });
            /******/
          };
          /******/

          /******/
          // create a fake namespace object

          /******/
          // mode & 1: value is a module id, require it

          /******/
          // mode & 2: merge all properties of value into the ns

          /******/
          // mode & 4: return value when already ns object

          /******/
          // mode & 8|1: behave like require

          /******/


          __webpack_require__.t = function (value, mode) {
            /******/
            if (mode & 1) value = __webpack_require__(value);
            /******/

            if (mode & 8) return value;
            /******/

            if (mode & 4 && _typeof2(value) === 'object' && value && value.__esModule) return value;
            /******/

            var ns = Object.create(null);
            /******/

            __webpack_require__.r(ns);
            /******/


            Object.defineProperty(ns, 'default', {
              enumerable: true,
              value: value
            });
            /******/

            if (mode & 2 && typeof value != 'string') for (var key in value) {
              __webpack_require__.d(ns, key, function (key) {
                return value[key];
              }.bind(null, key));
            }
            /******/

            return ns;
            /******/
          };
          /******/

          /******/
          // getDefaultExport function for compatibility with non-harmony modules

          /******/


          __webpack_require__.n = function (module) {
            /******/
            var getter = module && module.__esModule ?
            /******/
            function getDefault() {
              return module['default'];
            } :
            /******/
            function getModuleExports() {
              return module;
            };
            /******/

            __webpack_require__.d(getter, 'a', getter);
            /******/


            return getter;
            /******/
          };
          /******/

          /******/
          // Object.prototype.hasOwnProperty.call

          /******/


          __webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          /******/

          /******/
          // __webpack_public_path__

          /******/


          __webpack_require__.p = "";
          /******/

          /******/

          /******/
          // Load entry module and return exports

          /******/

          return __webpack_require__(__webpack_require__.s = 6);
          /******/
        }(
        /************************************************************************/

        /******/
        [
        /* 0 */

        /***/
        function (module, exports) {
          function select(element) {
            var selectedText;

            if (element.nodeName === 'SELECT') {
              element.focus();
              selectedText = element.value;
            } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
              var isReadOnly = element.hasAttribute('readonly');

              if (!isReadOnly) {
                element.setAttribute('readonly', '');
              }

              element.select();
              element.setSelectionRange(0, element.value.length);

              if (!isReadOnly) {
                element.removeAttribute('readonly');
              }

              selectedText = element.value;
            } else {
              if (element.hasAttribute('contenteditable')) {
                element.focus();
              }

              var selection = window.getSelection();
              var range = document.createRange();
              range.selectNodeContents(element);
              selection.removeAllRanges();
              selection.addRange(range);
              selectedText = selection.toString();
            }

            return selectedText;
          }

          module.exports = select;
          /***/
        },
        /* 1 */

        /***/
        function (module, exports) {
          function E() {// Keep this empty so it's easier to inherit from
            // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
          }

          E.prototype = {
            on: function on(name, callback, ctx) {
              var e = this.e || (this.e = {});
              (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx: ctx
              });
              return this;
            },
            once: function once(name, callback, ctx) {
              var self = this;

              function listener() {
                self.off(name, listener);
                callback.apply(ctx, arguments);
              }

              ;
              listener._ = callback;
              return this.on(name, listener, ctx);
            },
            emit: function emit(name) {
              var data = [].slice.call(arguments, 1);
              var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
              var i = 0;
              var len = evtArr.length;

              for (i; i < len; i++) {
                evtArr[i].fn.apply(evtArr[i].ctx, data);
              }

              return this;
            },
            off: function off(name, callback) {
              var e = this.e || (this.e = {});
              var evts = e[name];
              var liveEvents = [];

              if (evts && callback) {
                for (var i = 0, len = evts.length; i < len; i++) {
                  if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
                }
              } // Remove event from queue to prevent memory leak
              // Suggested by https://github.com/lazd
              // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910


              liveEvents.length ? e[name] = liveEvents : delete e[name];
              return this;
            }
          };
          module.exports = E;
          module.exports.TinyEmitter = E;
          /***/
        },
        /* 2 */

        /***/
        function (module, exports, __webpack_require__) {
          var is = __webpack_require__(3);

          var delegate = __webpack_require__(4);
          /**
           * Validates all params and calls the right
           * listener function based on its target type.
           *
           * @param {String|HTMLElement|HTMLCollection|NodeList} target
           * @param {String} type
           * @param {Function} callback
           * @return {Object}
           */


          function listen(target, type, callback) {
            if (!target && !type && !callback) {
              throw new Error('Missing required arguments');
            }

            if (!is.string(type)) {
              throw new TypeError('Second argument must be a String');
            }

            if (!is.fn(callback)) {
              throw new TypeError('Third argument must be a Function');
            }

            if (is.node(target)) {
              return listenNode(target, type, callback);
            } else if (is.nodeList(target)) {
              return listenNodeList(target, type, callback);
            } else if (is.string(target)) {
              return listenSelector(target, type, callback);
            } else {
              throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
            }
          }
          /**
           * Adds an event listener to a HTML element
           * and returns a remove listener function.
           *
           * @param {HTMLElement} node
           * @param {String} type
           * @param {Function} callback
           * @return {Object}
           */


          function listenNode(node, type, callback) {
            node.addEventListener(type, callback);
            return {
              destroy: function destroy() {
                node.removeEventListener(type, callback);
              }
            };
          }
          /**
           * Add an event listener to a list of HTML elements
           * and returns a remove listener function.
           *
           * @param {NodeList|HTMLCollection} nodeList
           * @param {String} type
           * @param {Function} callback
           * @return {Object}
           */


          function listenNodeList(nodeList, type, callback) {
            Array.prototype.forEach.call(nodeList, function (node) {
              node.addEventListener(type, callback);
            });
            return {
              destroy: function destroy() {
                Array.prototype.forEach.call(nodeList, function (node) {
                  node.removeEventListener(type, callback);
                });
              }
            };
          }
          /**
           * Add an event listener to a selector
           * and returns a remove listener function.
           *
           * @param {String} selector
           * @param {String} type
           * @param {Function} callback
           * @return {Object}
           */


          function listenSelector(selector, type, callback) {
            return delegate(document.body, selector, type, callback);
          }

          module.exports = listen;
          /***/
        },
        /* 3 */

        /***/
        function (module, exports) {
          /**
           * Check if argument is a HTML element.
           *
           * @param {Object} value
           * @return {Boolean}
           */
          exports.node = function (value) {
            return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
          };
          /**
           * Check if argument is a list of HTML elements.
           *
           * @param {Object} value
           * @return {Boolean}
           */


          exports.nodeList = function (value) {
            var type = Object.prototype.toString.call(value);
            return value !== undefined && (type === '[object NodeList]' || type === '[object HTMLCollection]') && 'length' in value && (value.length === 0 || exports.node(value[0]));
          };
          /**
           * Check if argument is a string.
           *
           * @param {Object} value
           * @return {Boolean}
           */


          exports.string = function (value) {
            return typeof value === 'string' || value instanceof String;
          };
          /**
           * Check if argument is a function.
           *
           * @param {Object} value
           * @return {Boolean}
           */


          exports.fn = function (value) {
            var type = Object.prototype.toString.call(value);
            return type === '[object Function]';
          };
          /***/

        },
        /* 4 */

        /***/
        function (module, exports, __webpack_require__) {
          var closest = __webpack_require__(5);
          /**
           * Delegates event to a selector.
           *
           * @param {Element} element
           * @param {String} selector
           * @param {String} type
           * @param {Function} callback
           * @param {Boolean} useCapture
           * @return {Object}
           */


          function _delegate(element, selector, type, callback, useCapture) {
            var listenerFn = listener.apply(this, arguments);
            element.addEventListener(type, listenerFn, useCapture);
            return {
              destroy: function destroy() {
                element.removeEventListener(type, listenerFn, useCapture);
              }
            };
          }
          /**
           * Delegates event to a selector.
           *
           * @param {Element|String|Array} [elements]
           * @param {String} selector
           * @param {String} type
           * @param {Function} callback
           * @param {Boolean} useCapture
           * @return {Object}
           */


          function delegate(elements, selector, type, callback, useCapture) {
            // Handle the regular Element usage
            if (typeof elements.addEventListener === 'function') {
              return _delegate.apply(null, arguments);
            } // Handle Element-less usage, it defaults to global delegation


            if (typeof type === 'function') {
              // Use `document` as the first parameter, then apply arguments
              // This is a short way to .unshift `arguments` without running into deoptimizations
              return _delegate.bind(null, document).apply(null, arguments);
            } // Handle Selector-based usage


            if (typeof elements === 'string') {
              elements = document.querySelectorAll(elements);
            } // Handle Array-like based usage


            return Array.prototype.map.call(elements, function (element) {
              return _delegate(element, selector, type, callback, useCapture);
            });
          }
          /**
           * Finds closest match and invokes callback.
           *
           * @param {Element} element
           * @param {String} selector
           * @param {String} type
           * @param {Function} callback
           * @return {Function}
           */


          function listener(element, selector, type, callback) {
            return function (e) {
              e.delegateTarget = closest(e.target, selector);

              if (e.delegateTarget) {
                callback.call(element, e);
              }
            };
          }

          module.exports = delegate;
          /***/
        },
        /* 5 */

        /***/
        function (module, exports) {
          var DOCUMENT_NODE_TYPE = 9;
          /**
           * A polyfill for Element.matches()
           */

          if (typeof Element !== 'undefined' && !Element.prototype.matches) {
            var proto = Element.prototype;
            proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
          }
          /**
           * Finds the closest parent that matches a selector.
           *
           * @param {Element} element
           * @param {String} selector
           * @return {Function}
           */


          function closest(element, selector) {
            while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
              if (typeof element.matches === 'function' && element.matches(selector)) {
                return element;
              }

              element = element.parentNode;
            }
          }

          module.exports = closest;
          /***/
        },
        /* 6 */

        /***/
        function (module, __webpack_exports__, __webpack_require__) {
          "use strict";

          __webpack_require__.r(__webpack_exports__); // EXTERNAL MODULE: ./node_modules/select/src/select.js


          var src_select = __webpack_require__(0);

          var select_default = /*#__PURE__*/__webpack_require__.n(src_select); // CONCATENATED MODULE: ./src/clipboard-action.js


          var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
            return _typeof2(obj);
          } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
          };

          var _createClass = function () {
            function defineProperties(target, props) {
              for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
              }
            }

            return function (Constructor, protoProps, staticProps) {
              if (protoProps) defineProperties(Constructor.prototype, protoProps);
              if (staticProps) defineProperties(Constructor, staticProps);
              return Constructor;
            };
          }();

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          /**
           * Inner class which performs selection from either `text` or `target`
           * properties and then executes copy or cut operations.
           */


          var clipboard_action_ClipboardAction = function () {
            /**
             * @param {Object} options
             */
            function ClipboardAction(options) {
              _classCallCheck(this, ClipboardAction);

              this.resolveOptions(options);
              this.initSelection();
            }
            /**
             * Defines base properties passed from constructor.
             * @param {Object} options
             */


            _createClass(ClipboardAction, [{
              key: 'resolveOptions',
              value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                this.action = options.action;
                this.container = options.container;
                this.emitter = options.emitter;
                this.target = options.target;
                this.text = options.text;
                this.trigger = options.trigger;
                this.selectedText = '';
              }
              /**
               * Decides which selection strategy is going to be applied based
               * on the existence of `text` and `target` properties.
               */

            }, {
              key: 'initSelection',
              value: function initSelection() {
                if (this.text) {
                  this.selectFake();
                } else if (this.target) {
                  this.selectTarget();
                }
              }
              /**
               * Creates a fake textarea element, sets its value from `text` property,
               * and makes a selection on it.
               */

            }, {
              key: 'selectFake',
              value: function selectFake() {
                var _this = this;

                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';
                this.removeFake();

                this.fakeHandlerCallback = function () {
                  return _this.removeFake();
                };

                this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;
                this.fakeElem = document.createElement('textarea'); // Prevent zooming on iOS

                this.fakeElem.style.fontSize = '12pt'; // Reset box model

                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0'; // Move element out of screen horizontally

                this.fakeElem.style.position = 'absolute';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.fakeElem.style.top = yPosition + 'px';
                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = this.text;
                this.container.appendChild(this.fakeElem);
                this.selectedText = select_default()(this.fakeElem);
                this.copyText();
              }
              /**
               * Only removes the fake element after another click event, that way
               * a user can hit `Ctrl+C` to copy because selection still exists.
               */

            }, {
              key: 'removeFake',
              value: function removeFake() {
                if (this.fakeHandler) {
                  this.container.removeEventListener('click', this.fakeHandlerCallback);
                  this.fakeHandler = null;
                  this.fakeHandlerCallback = null;
                }

                if (this.fakeElem) {
                  this.container.removeChild(this.fakeElem);
                  this.fakeElem = null;
                }
              }
              /**
               * Selects the content from element passed on `target` property.
               */

            }, {
              key: 'selectTarget',
              value: function selectTarget() {
                this.selectedText = select_default()(this.target);
                this.copyText();
              }
              /**
               * Executes the copy operation based on the current selection.
               */

            }, {
              key: 'copyText',
              value: function copyText() {
                var succeeded = void 0;

                try {
                  succeeded = document.execCommand(this.action);
                } catch (err) {
                  succeeded = false;
                }

                this.handleResult(succeeded);
              }
              /**
               * Fires an event based on the copy operation result.
               * @param {Boolean} succeeded
               */

            }, {
              key: 'handleResult',
              value: function handleResult(succeeded) {
                this.emitter.emit(succeeded ? 'success' : 'error', {
                  action: this.action,
                  text: this.selectedText,
                  trigger: this.trigger,
                  clearSelection: this.clearSelection.bind(this)
                });
              }
              /**
               * Moves focus away from `target` and back to the trigger, removes current selection.
               */

            }, {
              key: 'clearSelection',
              value: function clearSelection() {
                if (this.trigger) {
                  this.trigger.focus();
                }

                document.activeElement.blur();
                window.getSelection().removeAllRanges();
              }
              /**
               * Sets the `action` to be performed which can be either 'copy' or 'cut'.
               * @param {String} action
               */

            }, {
              key: 'destroy',

              /**
               * Destroy lifecycle.
               */
              value: function destroy() {
                this.removeFake();
              }
            }, {
              key: 'action',
              set: function set() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';
                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                  throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
              }
              /**
               * Gets the `action` property.
               * @return {String}
               */
              ,
              get: function get() {
                return this._action;
              }
              /**
               * Sets the `target` property using an element
               * that will be have its content copied.
               * @param {Element} target
               */

            }, {
              key: 'target',
              set: function set(target) {
                if (target !== undefined) {
                  if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                    if (this.action === 'copy' && target.hasAttribute('disabled')) {
                      throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                    }

                    if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                      throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                    }

                    this._target = target;
                  } else {
                    throw new Error('Invalid "target" value, use a valid Element');
                  }
                }
              }
              /**
               * Gets the `target` property.
               * @return {String|HTMLElement}
               */
              ,
              get: function get() {
                return this._target;
              }
            }]);

            return ClipboardAction;
          }();
          /* harmony default export */


          var clipboard_action = clipboard_action_ClipboardAction; // EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js

          var tiny_emitter = __webpack_require__(1);

          var tiny_emitter_default = /*#__PURE__*/__webpack_require__.n(tiny_emitter); // EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js


          var listen = __webpack_require__(2);

          var listen_default = /*#__PURE__*/__webpack_require__.n(listen); // CONCATENATED MODULE: ./src/clipboard.js


          var clipboard_typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
            return _typeof2(obj);
          } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
          };

          var clipboard_createClass = function () {
            function defineProperties(target, props) {
              for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
              }
            }

            return function (Constructor, protoProps, staticProps) {
              if (protoProps) defineProperties(Constructor.prototype, protoProps);
              if (staticProps) defineProperties(Constructor, staticProps);
              return Constructor;
            };
          }();

          function clipboard_classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _possibleConstructorReturn(self, call) {
            if (!self) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }

            return call && (_typeof2(call) === "object" || typeof call === "function") ? call : self;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function, not " + _typeof2(superClass));
            }

            subClass.prototype = Object.create(superClass && superClass.prototype, {
              constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
          }
          /**
           * Base class which takes one or more elements, adds event listeners to them,
           * and instantiates a new `ClipboardAction` on each click.
           */


          var clipboard_Clipboard = function (_Emitter) {
            _inherits(Clipboard, _Emitter);
            /**
             * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
             * @param {Object} options
             */


            function Clipboard(trigger, options) {
              clipboard_classCallCheck(this, Clipboard);

              var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

              _this.resolveOptions(options);

              _this.listenClick(trigger);

              return _this;
            }
            /**
             * Defines if attributes would be resolved using internal setter functions
             * or custom functions that were passed in the constructor.
             * @param {Object} options
             */


            clipboard_createClass(Clipboard, [{
              key: 'resolveOptions',
              value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
              }
              /**
               * Adds a click event listener to the passed trigger.
               * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
               */

            }, {
              key: 'listenClick',
              value: function listenClick(trigger) {
                var _this2 = this;

                this.listener = listen_default()(trigger, 'click', function (e) {
                  return _this2.onClick(e);
                });
              }
              /**
               * Defines a new `ClipboardAction` on each click event.
               * @param {Event} e
               */

            }, {
              key: 'onClick',
              value: function onClick(e) {
                var trigger = e.delegateTarget || e.currentTarget;

                if (this.clipboardAction) {
                  this.clipboardAction = null;
                }

                this.clipboardAction = new clipboard_action({
                  action: this.action(trigger),
                  target: this.target(trigger),
                  text: this.text(trigger),
                  container: this.container,
                  trigger: trigger,
                  emitter: this
                });
              }
              /**
               * Default `action` lookup function.
               * @param {Element} trigger
               */

            }, {
              key: 'defaultAction',
              value: function defaultAction(trigger) {
                return getAttributeValue('action', trigger);
              }
              /**
               * Default `target` lookup function.
               * @param {Element} trigger
               */

            }, {
              key: 'defaultTarget',
              value: function defaultTarget(trigger) {
                var selector = getAttributeValue('target', trigger);

                if (selector) {
                  return document.querySelector(selector);
                }
              }
              /**
               * Returns the support of the given action, or all actions if no action is
               * given.
               * @param {String} [action]
               */

            }, {
              key: 'defaultText',

              /**
               * Default `text` lookup function.
               * @param {Element} trigger
               */
              value: function defaultText(trigger) {
                return getAttributeValue('text', trigger);
              }
              /**
               * Destroy lifecycle.
               */

            }, {
              key: 'destroy',
              value: function destroy() {
                this.listener.destroy();

                if (this.clipboardAction) {
                  this.clipboardAction.destroy();
                  this.clipboardAction = null;
                }
              }
            }], [{
              key: 'isSupported',
              value: function isSupported() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
                var actions = typeof action === 'string' ? [action] : action;
                var support = !!document.queryCommandSupported;
                actions.forEach(function (action) {
                  support = support && !!document.queryCommandSupported(action);
                });
                return support;
              }
            }]);
            return Clipboard;
          }(tiny_emitter_default.a);
          /**
           * Helper function to retrieve attribute value.
           * @param {String} suffix
           * @param {Element} element
           */


          function getAttributeValue(suffix, element) {
            var attribute = 'data-clipboard-' + suffix;

            if (!element.hasAttribute(attribute)) {
              return;
            }

            return element.getAttribute(attribute);
          }
          /* harmony default export */


          var clipboard = __webpack_exports__["default"] = clipboard_Clipboard;
          /***/
        }
        /******/
        ])["default"]
      );
    });
  }, {}],
  3: [function (require, module, exports) {
    'use strict';

    var requestAnimFrame = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    }();

    function decouple(node, event, fn) {
      var eve,
          tracking = false;

      function captureEvent(e) {
        eve = e;
        track();
      }

      function track() {
        if (!tracking) {
          requestAnimFrame(update);
          tracking = true;
        }
      }

      function update() {
        fn.call(node, eve);
        tracking = false;
      }

      node.addEventListener(event, captureEvent, false);
      return captureEvent;
    }
    /**
     * Expose decouple
     */


    module.exports = decouple;
  }, {}],
  4: [function (require, module, exports) {
    "use strict";

    var _classCallCheck = function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    exports.__esModule = true;
    /**
     * Creates a new instance of Emitter.
     * @class
     * @returns {Object} Returns a new instance of Emitter.
     * @example
     * // Creates a new instance of Emitter.
     * var Emitter = require('emitter');
     *
     * var emitter = new Emitter();
     */

    var Emitter = function () {
      function Emitter() {
        _classCallCheck(this, Emitter);
      }
      /**
       * Adds a listener to the collection for the specified event.
       * @memberof! Emitter.prototype
       * @function
       * @param {String} event - The event name.
       * @param {Function} listener - A listener function to add.
       * @returns {Object} Returns an instance of Emitter.
       * @example
       * // Add an event listener to "foo" event.
       * emitter.on('foo', listener);
       */


      Emitter.prototype.on = function on(event, listener) {
        // Use the current collection or create it.
        this._eventCollection = this._eventCollection || {}; // Use the current collection of an event or create it.

        this._eventCollection[event] = this._eventCollection[event] || []; // Appends the listener into the collection of the given event

        this._eventCollection[event].push(listener);

        return this;
      };
      /**
       * Adds a listener to the collection for the specified event that will be called only once.
       * @memberof! Emitter.prototype
       * @function
       * @param {String} event - The event name.
       * @param {Function} listener - A listener function to add.
       * @returns {Object} Returns an instance of Emitter.
       * @example
       * // Will add an event handler to "foo" event once.
       * emitter.once('foo', listener);
       */


      Emitter.prototype.once = function once(event, listener) {
        var self = this;

        function fn() {
          self.off(event, fn);
          listener.apply(this, arguments);
        }

        fn.listener = listener;
        this.on(event, fn);
        return this;
      };
      /**
       * Removes a listener from the collection for the specified event.
       * @memberof! Emitter.prototype
       * @function
       * @param {String} event - The event name.
       * @param {Function} listener - A listener function to remove.
       * @returns {Object} Returns an instance of Emitter.
       * @example
       * // Remove a given listener.
       * emitter.off('foo', listener);
       */


      Emitter.prototype.off = function off(event, listener) {
        var listeners = undefined; // Defines listeners value.

        if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
          return this;
        }

        listeners.forEach(function (fn, i) {
          if (fn === listener || fn.listener === listener) {
            // Removes the given listener.
            listeners.splice(i, 1);
          }
        }); // Removes an empty event collection.

        if (listeners.length === 0) {
          delete this._eventCollection[event];
        }

        return this;
      };
      /**
       * Execute each item in the listener collection in order with the specified data.
       * @memberof! Emitter.prototype
       * @function
       * @param {String} event - The name of the event you want to emit.
       * @param {...Object} data - Data to pass to the listeners.
       * @returns {Object} Returns an instance of Emitter.
       * @example
       * // Emits the "foo" event with 'param1' and 'param2' as arguments.
       * emitter.emit('foo', 'param1', 'param2');
       */


      Emitter.prototype.emit = function emit(event) {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var listeners = undefined; // Defines listeners value.

        if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
          return this;
        } // Clone listeners


        listeners = listeners.slice(0);
        listeners.forEach(function (fn) {
          return fn.apply(_this, args);
        });
        return this;
      };

      return Emitter;
    }();
    /**
     * Exports Emitter
     */


    exports["default"] = Emitter;
    module.exports = exports["default"];
  }, {}],
  5: [function (require, module, exports) {
    'use strict';
    /**
     * Module dependencies
     */

    var decouple = require('decouple');

    var Emitter = require('emitter');
    /**
     * Privates
     */


    var scrollTimeout;
    var scrolling = false;
    var doc = window.document;
    var html = doc.documentElement;
    var msPointerSupported = window.navigator.msPointerEnabled;
    var touch = {
      'start': msPointerSupported ? 'MSPointerDown' : 'touchstart',
      'move': msPointerSupported ? 'MSPointerMove' : 'touchmove',
      'end': msPointerSupported ? 'MSPointerUp' : 'touchend'
    };

    var prefix = function prefix() {
      var regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/;
      var styleDeclaration = doc.getElementsByTagName('script')[0].style;

      for (var prop in styleDeclaration) {
        if (regex.test(prop)) {
          return '-' + prop.match(regex)[0].toLowerCase() + '-';
        }
      } // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
      // However (prop in style) returns the correct value, so we'll have to test for
      // the precence of a specific property


      if ('WebkitOpacity' in styleDeclaration) {
        return '-webkit-';
      }

      if ('KhtmlOpacity' in styleDeclaration) {
        return '-khtml-';
      }

      return '';
    }();

    function extend(destination, from) {
      for (var prop in from) {
        if (from[prop]) {
          destination[prop] = from[prop];
        }
      }

      return destination;
    }

    function inherits(child, uber) {
      child.prototype = extend(child.prototype || {}, uber.prototype);
    }

    function hasIgnoredElements(el) {
      while (el.parentNode) {
        if (el.getAttribute('data-slideout-ignore') !== null) {
          return el;
        }

        el = el.parentNode;
      }

      return null;
    }
    /**
     * Slideout constructor
     */


    function Slideout(options) {
      options = options || {}; // Sets default values

      this._startOffsetX = 0;
      this._currentOffsetX = 0;
      this._opening = false;
      this._moved = false;
      this._opened = false;
      this._preventOpen = false;
      this._touch = options.touch === undefined ? true : options.touch && true;
      this._side = options.side || 'left'; // Sets panel

      this.panel = options.panel;
      this.menu = options.menu; // Sets  classnames

      if (!this.panel.classList.contains('slideout-panel')) {
        this.panel.classList.add('slideout-panel');
      }

      if (!this.panel.classList.contains('slideout-panel-' + this._side)) {
        this.panel.classList.add('slideout-panel-' + this._side);
      }

      if (!this.menu.classList.contains('slideout-menu')) {
        this.menu.classList.add('slideout-menu');
      }

      if (!this.menu.classList.contains('slideout-menu-' + this._side)) {
        this.menu.classList.add('slideout-menu-' + this._side);
      } // Sets options


      this._fx = options.fx || 'ease';
      this._duration = parseInt(options.duration, 10) || 300;
      this._tolerance = parseInt(options.tolerance, 10) || 70;
      this._padding = this._translateTo = parseInt(options.padding, 10) || 256;
      this._orientation = this._side === 'right' ? -1 : 1;
      this._translateTo *= this._orientation; // Init touch events

      if (this._touch) {
        this._initTouchEvents();
      }
    }
    /**
     * Inherits from Emitter
     */


    inherits(Slideout, Emitter);
    /**
     * Opens the slideout menu.
     */

    Slideout.prototype.open = function () {
      var self = this;
      this.emit('beforeopen');

      if (!html.classList.contains('slideout-open')) {
        html.classList.add('slideout-open');
      }

      this._setTransition();

      this._translateXTo(this._translateTo);

      this._opened = true;
      setTimeout(function () {
        self.panel.style.transition = self.panel.style['-webkit-transition'] = '';
        self.emit('open');
      }, this._duration + 50);
      return this;
    };
    /**
     * Closes slideout menu.
     */


    Slideout.prototype.close = function () {
      var self = this;

      if (!this.isOpen() && !this._opening) {
        return this;
      }

      this.emit('beforeclose');

      this._setTransition();

      this._translateXTo(0);

      this._opened = false;
      setTimeout(function () {
        html.classList.remove('slideout-open');
        self.panel.style.transition = self.panel.style['-webkit-transition'] = self.panel.style[prefix + 'transform'] = self.panel.style.transform = '';
        self.emit('close');
      }, this._duration + 50);
      return this;
    };
    /**
     * Toggles (open/close) slideout menu.
     */


    Slideout.prototype.toggle = function () {
      return this.isOpen() ? this.close() : this.open();
    };
    /**
     * Returns true if the slideout is currently open, and false if it is closed.
     */


    Slideout.prototype.isOpen = function () {
      return this._opened;
    };
    /**
     * Translates panel and updates currentOffset with a given X point
     */


    Slideout.prototype._translateXTo = function (translateX) {
      this._currentOffsetX = translateX;
      this.panel.style[prefix + 'transform'] = this.panel.style.transform = 'translateX(' + translateX + 'px)';
      return this;
    };
    /**
     * Set transition properties
     */


    Slideout.prototype._setTransition = function () {
      this.panel.style[prefix + 'transition'] = this.panel.style.transition = prefix + 'transform ' + this._duration + 'ms ' + this._fx;
      return this;
    };
    /**
     * Initializes touch event
     */


    Slideout.prototype._initTouchEvents = function () {
      var self = this;
      /**
       * Decouple scroll event
       */

      this._onScrollFn = decouple(doc, 'scroll', function () {
        if (!self._moved) {
          clearTimeout(scrollTimeout);
          scrolling = true;
          scrollTimeout = setTimeout(function () {
            scrolling = false;
          }, 250);
        }
      });
      /**
       * Prevents touchmove event if slideout is moving
       */

      this._preventMove = function (eve) {
        if (self._moved) {
          eve.preventDefault();
        }
      };

      doc.addEventListener(touch.move, this._preventMove);
      /**
       * Resets values on touchstart
       */

      this._resetTouchFn = function (eve) {
        if (typeof eve.touches === 'undefined') {
          return;
        }

        self._moved = false;
        self._opening = false;
        self._startOffsetX = eve.touches[0].pageX;
        self._preventOpen = !self._touch || !self.isOpen() && self.menu.clientWidth !== 0;
      };

      this.panel.addEventListener(touch.start, this._resetTouchFn);
      /**
       * Resets values on touchcancel
       */

      this._onTouchCancelFn = function () {
        self._moved = false;
        self._opening = false;
      };

      this.panel.addEventListener('touchcancel', this._onTouchCancelFn);
      /**
       * Toggles slideout on touchend
       */

      this._onTouchEndFn = function () {
        if (self._moved) {
          self.emit('translateend');
          self._opening && Math.abs(self._currentOffsetX) > self._tolerance ? self.open() : self.close();
        }

        self._moved = false;
      };

      this.panel.addEventListener(touch.end, this._onTouchEndFn);
      /**
       * Translates panel on touchmove
       */

      this._onTouchMoveFn = function (eve) {
        if (scrolling || self._preventOpen || typeof eve.touches === 'undefined' || hasIgnoredElements(eve.target)) {
          return;
        }

        var dif_x = eve.touches[0].clientX - self._startOffsetX;
        var translateX = self._currentOffsetX = dif_x;

        if (Math.abs(translateX) > self._padding) {
          return;
        }

        if (Math.abs(dif_x) > 20) {
          self._opening = true;
          var oriented_dif_x = dif_x * self._orientation;

          if (self._opened && oriented_dif_x > 0 || !self._opened && oriented_dif_x < 0) {
            return;
          }

          if (!self._moved) {
            self.emit('translatestart');
          }

          if (oriented_dif_x <= 0) {
            translateX = dif_x + self._padding * self._orientation;
            self._opening = false;
          }

          if (!(self._moved && html.classList.contains('slideout-open'))) {
            html.classList.add('slideout-open');
          }

          self.panel.style[prefix + 'transform'] = self.panel.style.transform = 'translateX(' + translateX + 'px)';
          self.emit('translate', translateX);
          self._moved = true;
        }
      };

      this.panel.addEventListener(touch.move, this._onTouchMoveFn);
      return this;
    };
    /**
     * Enable opening the slideout via touch events.
     */


    Slideout.prototype.enableTouch = function () {
      this._touch = true;
      return this;
    };
    /**
     * Disable opening the slideout via touch events.
     */


    Slideout.prototype.disableTouch = function () {
      this._touch = false;
      return this;
    };
    /**
     * Destroy an instance of slideout.
     */


    Slideout.prototype.destroy = function () {
      // Close before clean
      this.close(); // Remove event listeners

      doc.removeEventListener(touch.move, this._preventMove);
      this.panel.removeEventListener(touch.start, this._resetTouchFn);
      this.panel.removeEventListener('touchcancel', this._onTouchCancelFn);
      this.panel.removeEventListener(touch.end, this._onTouchEndFn);
      this.panel.removeEventListener(touch.move, this._onTouchMoveFn);
      doc.removeEventListener('scroll', this._onScrollFn); // Remove methods

      this.open = this.close = function () {}; // Return the instance so it can be easily dereferenced


      return this;
    };
    /**
     * Expose Slideout
     */


    module.exports = Slideout;
  }, {
    "decouple": 3,
    "emitter": 4
  }],
  6: [function (require, module, exports) {
    var Glide = require("@glidejs/glide");

    var header = require("./modules/loadheader")(); // из npm


    var ClipboardJS = require("clipboard");

    new ClipboardJS(".page-menu__mail-copybox"); // мои модули

    var testWebP = require("./modules/webptest");

    testWebP();

    if (window.innerWidth > 900) {
      new Glide(".categories", {
        type: "slider",
        bound: true,
        perView: 11,
        rewind: false,
        animationDuration: 200,
        breakpoints: {
          1500: {
            perView: 9
          },
          1200: {
            perView: 7
          }
        }
      }).mount();
    }
  }, {
    "./modules/loadheader": 8,
    "./modules/webptest": 9,
    "@glidejs/glide": 1,
    "clipboard": 2
  }],
  7: [function (require, module, exports) {
    function makeHeaderHide() {
      var headerBottom = document.querySelector(".page-header__bottom");
      var fromTop = +getComputedStyle(headerBottom).top.slice(0, -2);
      var height = +getComputedStyle(headerBottom).height.slice(0, -2);
      var spaceToLeave = 32;

      function scrollHandler() {
        var delta = window.pageYOffset > height - spaceToLeave ? height - spaceToLeave : window.pageYOffset;
        headerBottom.style.top = fromTop - delta + "px";
      }

      document.addEventListener("scroll", scrollHandler);
    }

    module.exports = makeHeaderHide;
  }, {}],
  8: [function (require, module, exports) {
    var Slideout = require("slideout");

    var makeHeaderHide = require('./hidingheader');

    var desktopHeader = "<header class=\"page-header\">\n  <div class=\"page-header__top\">\n    <div class=\"container container--header-top\">\n      <div class=\"page-menu\">\n        <ul class=\"page-menu__list\">\n          <li class=\"page-menu__el\">\n            <a class=\"link\" href=\"#\">\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F</a>\n          </li>\n          <li class=\"page-menu__el\">\n            <a class=\"link\" href=\"#\">\u041F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E</a>\n          </li>\n          <li class=\"page-menu__el page-menu__el--separated\">\n            <a class=\"link\" href=\"#\">\u041F\u0440\u043E\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435</a>\n          </li>\n          <li class=\"page-menu__el\">\n            <a class=\"link\" href=\"#\">\u0420\u0435\u0441\u0442\u043E\u0440\u0430\u043D\u0430\u043C</a>\n          </li>\n          <li class=\"page-menu__el\">\n            <a class=\"link\" href=\"#\">\u0417\u0430\u0441\u0442\u0440\u043E\u0439\u0449\u0438\u043A\u0430\u043C</a>\n          </li>\n          <li class=\"page-menu__el\">\n            <a class=\"link\" href=\"#\">\u0413\u043E\u0441.\u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C</a>\n          </li>\n          <li class=\"page-menu__el page-menu__el--separated\">\n            <a class=\"link\" href=\"#\">\u0422\u0430\u0431\u043B\u0435\u0442-\u043F\u0438\u0442\u0430\u043D\u0438\u0435</a>\n          </li>\n          <li class=\"page-menu__el\">\n            <a class=\"link\" href=\"#\">\u0421\u0435\u0440\u0432\u0438\u0441</a>\n          </li>\n          <li class=\"page-menu__el\">\n            <a class=\"link\" href=\"#\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a>\n          </li>\n        </ul>\n        <div class=\"page-menu__mail\">\n          <a class=\"link\" href=\"mailto:info@stolovay.ru\">\n            <span>info@stolovay.ru</span>\n          </a>\n          <div class=\"page-menu__mail-copybox\" data-clipboard-text=\"info@stolovay.ru\">\n            <span>\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C</span>\n          </div>\n        </div>\n        <div class=\"page-menu__phone phone\">\n          <a class=\"link\" href=\"tel:+74957907205\">\n            <span>8 495 790-72-05</span>\n          </a>\n          <div class=\"phone__wrapper\">\n            <div class=\"phone__left-side\">\n              <span class=\"phone__num\">8&nbsp;495&nbsp;790-72-05</span>\n              <span class=\"phone__text1\">\n                \u041C\u044B \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u043C \u0437\u0432\u043E\u043D\u043A\u0438 \u0431\u0435\u0437 \u0432\u044B\u0445\u043E\u0434\u043D\u044B\u0445.\n              </span>\n              <span class=\"phone__text2\">\n                \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043F\u043E\u0441\u043E\u0431 \u0441\u0432\u044F\u0437\u0438:\n              </span>\n              <ul class=\"phone__list\">\n                <li class=\"phone__list-elem\">\n                  <a class=\"phone__list-link phone__list-link--phone\" href=\"tel:+74957907205\">\n                    <span class=\"phone__list-text\">\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439</span>\n                  </a>\n                </li>\n                <li class=\"phone__list-elem\">\n                  <a class=\"phone__list-link phone__list-link--viber\" href=\"#viber\">\n                    <span class=\"phone__list-text\">Viber</span>\n                  </a>\n                </li>\n                <li class=\"phone__list-elem\">\n                  <a class=\"phone__list-link phone__list-link--telegram\" href=\"#telegram\">\n                    <span class=\"phone__list-text\">Telegram</span>\n                  </a>\n                </li>\n                <li class=\"phone__list-elem\">\n                  <a class=\"phone__list-link phone__list-link--whatsapp\" href=\"#whatsapp\">\n                    <span class=\"phone__list-text\">Whatsapp</span>\n                  </a>\n                </li>\n              </ul>\n            </div>\n            <div class=\"phone__right-side\">\n              <span class=\"phone__title\">\n                \u041E\u0431\u0440\u0430\u0442\u043D\u044B\u0439 \u0437\u0432\u043E\u043D\u043E\u043A:\n              </span>\n              <span class=\"phone__text1\">\n                \u041C\u044B \u043F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u043C \u0432\u0430\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0438 \u0447\u0430\u0441\u0430\n              </span>\n              <form action=\"#\" method=\"post\" class=\"phone__form\">\n                <label  class=\"phone__label\" for=\"phone-input-name\">\u0418\u043C\u044F:</label>\n                <input class=\"phone__input\" type=\"text\" id=\"phone-input-name\" placeholder=\"\u0410\u043D\u043D\u0430\">\n                <label  class=\"phone__label\" for=\"phone-input-tel\">\n                  \u0422\u0435\u043B\u0435\u0444\u043E\u043D:\n                </label>\n                <input class=\"phone__input\" type=\"tel\" id=\"phone-input-tel\" placeholder=\"+7(123)456-78-90\">\n                <button class=\"phone__submit\" type=\"submit\">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button>\n              </form>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"page-header__middle\">\n    <div class=\"container container--header-middle\">\n      <div class=\"logo\">\n        <img class=\"logo__image\" src=\"./img/logo.png\" alt=\"logo\" />\n        <span class=\"logo__text\">\u0421\u0442\u043E\u043B\u043E\u0432\u0430\u044F.\u0420\u0423</span>\n      </div>\n      <form action=\"#\" method=\"get\" name=\"search-form\" id=\"search-form\">\n        <div class=\"select-wrapper\">\n          <select name=\"category\" id=\"search-category\">\n            <option value=\"\u0412\u0441\u0435\">\u0412\u0441\u0435</option>\n            <option value=\"\u0412\u0435\u0441\u043E\u0432\u043E\u0435\">\u0412\u0435\u0441\u043E\u0432\u043E\u0435</option>\n            <option value=\"\u0414\u043B\u044F \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u0432\">\u0414\u043B\u044F \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u0432</option>\n            <option value=\"\u0414\u043B\u044F \u043E\u0431\u0435\u0434\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u043B\u043E\u0432\">\u0414\u043B\u044F \u043E\u0431\u0435\u0434\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u043B\u043E\u0432</option>\n            <option value=\"\u041D\u0435\u0439\u0442\u0440\u0430\u043B\u044C\u043D\u043E\u0435\">\u041D\u0435\u0439\u0442\u0440\u0430\u043B\u044C\u043D\u043E\u0435</option>\n            <option value=\"\u0414\u043B\u044F \u0431\u0430\u0440\u0430\">\u0414\u043B\u044F \u0431\u0430\u0440\u0430</option>\n            <option value=\"\u0414\u043B\u044F \u0444\u0430\u0441\u0442-\u0444\u0443\u0434\">\u0414\u043B\u044F \u0444\u0430\u0441\u0442-\u0444\u0443\u0434</option>\n            <option value=\"\u041F\u043E\u0441\u0443\u0434\u043E\u043C\u043E\u0435\u0447\u043D\u043E\u0435\">\u041F\u043E\u0441\u0443\u0434\u043E\u043C\u043E\u0435\u0447\u043D\u043E\u0435</option>\n            <option value=\"\u0422\u0435\u043F\u043B\u043E\u0432\u043E\u0435\">\u0422\u0435\u043F\u043B\u043E\u0432\u043E\u0435</option>\n            <option value=\"\u0422\u0435\u0440\u043C\u043E\u043F\u043E\u0434\u043D\u043E\u0441\u044B\">\u0422\u0435\u0440\u043C\u043E\u043F\u043E\u0434\u043D\u043E\u0441\u044B</option>\n            <option value=\"\u0425\u043B\u0435\u0431\u043E\u043F\u0435\u043A\u0430\u0440\u043D\u043E\u0435\">\u0425\u043B\u0435\u0431\u043E\u043F\u0435\u043A\u0430\u0440\u043D\u043E\u0435</option>\n            <option value=\"\u0425\u043E\u043B\u043E\u0434\u0438\u043B\u044C\u043D\u043E\u0435\">\u0425\u043E\u043B\u043E\u0434\u0438\u043B\u044C\u043D\u043E\u0435</option>\n            <option value=\"\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0435\">\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0435</option>\n          </select>\n        </div>\n        <input type=\"search\" name=\"search\" id=\"search-value\" />\n        <button type=\"submit\" id=\"search-btn\"></button>\n      </form>\n      <div class=\"portal\">\n        <a class=\"link\" href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\">\n          <span>\u041C\u044B \u043D\u0430 \u043F\u043E\u0440\u0442\u0430\u043B\u0435 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u043E\u0432</span>\n        </a>\n      </div>\n      <div class=\"cart\">\n        <a class=\"link\" href=\"#\">\n          <div class=\"cart__wrapper\">\n            <span class=\"cart__sum\">\u0421\u0443\u043C\u043C\u0430</span>\n            <span class=\"cart__value\">150 000 \u0440\u0443\u0431.</span>\n          </div>\n          <span class=\"cart__amount\">12</span>\n        </a>\n      </div>\n    </div>\n  </div>\n  <div class=\"page-header__bottom\">\n    <div class=\"container\">\n      <div class=\"glide categories\">\n        <div class=\"glide__track\" data-glide-el=\"track\">\n          <ul class=\"glide__slides categories__list\">\n            <li class=\"glide__slide categories__elem\">\n              <a href=\"#teplovoe\" class=\"categories__link\">\n                <img class=\"categories__img\" src=\"./img/teplovoe.png\" alt=\"\u0422\u0435\u043F\u043B\u043E\u0432\u043E\u0435 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u0435(\u0444\u043E\u0442\u043E)\">\n                <span class=\"categories__text\">\u0422\u0435\u043F\u043B\u043E\u0432\u043E\u0435</span>\n              </a>\n            </li>\n\n            <li class=\"glide__slide categories__elem\">\n              <a href=\"#holodilnoe\" class=\"categories__link\">\n                <img class=\"categories__img\" src=\"./img/holodilnoe.png\" alt=\"\u0425\u043E\u043B\u043E\u0434\u0438\u043B\u044C\u043D\u043E\u0435 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u0435(\u0444\u043E\u0442\u043E)\">\n                <span class=\"categories__text\">\u0425\u043E\u043B\u043E\u0434\u0438\u043B\u044C\u043D\u043E\u0435</span>\n              </a>\n            </li>\n\n            <li class=\"glide__slide categories__elem\">\n              <a href=\"#elektromeh\" class=\"categories__link\">\n                <img class=\"categories__img\" src=\"./img/elektromeh.png\" alt=\"\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u0435(\u0444\u043E\u0442\u043E)\">\n                <span class=\"categories__text\">\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0435</span>\n              </a>\n            </li>\n\n            <li class=\"glide__slide categories__elem\">\n              <a href=\"#posudomoechnoe\" class=\"categories__link\">\n                <img class=\"categories__img\" src=\"./img/posudomoechnoe.png\" alt=\"\u041F\u043E\u0441\u0443\u0434\u043E\u043C\u043E\u0435\u0447\u043D\u043E\u0435 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u0435(\u0444\u043E\u0442\u043E)\">\n                <span class=\"categories__text\">\u041F\u043E\u0441\u0443\u0434\u043E\u043C\u043E\u0435\u0447\u043D\u043E\u0435</span>\n              </a>\n            </li>\n\n            <li class=\"glide__slide categories__elem\">\n              <a href=\"#hlebopekarnoe\" class=\"categories__link\">\n                <img class=\"categories__img\" src=\"./img/hlebopekarnoe.png\" alt=\"\u0425\u043B\u0435\u0431\u043E\u043F\u0435\u043A\u0430\u0440\u043D\u043E\u0435 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u0435(\u0444\u043E\u0442\u043E)\">\n                <span class=\"categories__text\">\u0425\u043B\u0435\u0431\u043E\u043F\u0435\u043A\u0430\u0440\u043D\u043E\u0435</span>\n              </a>\n            </li>\n            \n            <li class=\"glide__slide categories__elem\">\n              <a href=\"#liniirazdachi\" class=\"categories__link\">\n                <img class=\"categories__img\" src=\"./img/liniirazdachi.png\" alt=\"\u041B\u0438\u043D\u0438\u0438 \u0440\u0430\u0437\u0434\u0430\u0447\u0438(\u0444\u043E\u0442\u043E)\">\n                <span class=\"categories__text\">\u041B\u0438\u043D\u0438\u0438 \u0440\u0430\u0437\u0434\u0430\u0447\u0438</span>\n              </a>\n            </li>\n\n            <li class=\"glide__slide categories__elem\">\n              <a href=\"#neytralnoe\" class=\"categories__link\">\n                <img class=\"categories__img\" src=\"./img/neytralnoe.png\" alt=\"\u041D\u0435\u0439\u0442\u0440\u0430\u043B\u044C\u043D\u043E\u0435(\u0444\u043E\u0442\u043E)\">\n                <span class=\"categories__text\">\u041D\u0435\u0439\u0442\u0440\u0430\u043B\u044C\u043D\u043E\u0435</span>\n              </a>\n            </li>\n\n            <li class=\"glide__slide categories__elem\">\n              <a href=\"#fastfood\" class=\"categories__link\">\n                <img class=\"categories__img\" src=\"./img/fastfood.png\" alt=\"\u0414\u043B\u044F \u0444\u0430\u0441\u0442 \u0444\u0443\u0434\u0430(\u0444\u043E\u0442\u043E)\">\n                <span class=\"categories__text\">\u0414\u043B\u044F \u0444\u0430\u0441\u0442 \u0444\u0443\u0434\u0430</span>\n              </a>\n            </li>\n\n            <li class=\"glide__slide categories__elem\">\n              <a href=\"#dlyazalov\" class=\"categories__link\">\n                <img class=\"categories__img\" src=\"./img/dlyazalov.png\" alt=\"\u0414\u043B\u044F \u0437\u0430\u043B\u043E\u0432(\u0444\u043E\u0442\u043E)\">\n                <span class=\"categories__text\">\u0414\u043B\u044F \u0437\u0430\u043B\u043E\u0432</span>\n              </a>\n            </li>\n\n            <li class=\"glide__slide categories__elem\">\n              <a href=\"#vspomogatelnoe\" class=\"categories__link\">\n                <img class=\"categories__img\" src=\"./img/vspomogatelnoe.png\" alt=\"\u0412\u0441\u043F\u043E\u043C\u043E\u0433\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435(\u0444\u043E\u0442\u043E)\">\n                <span class=\"categories__text\">\u0412\u0441\u043F\u043E\u043C\u043E\u0433\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435</span>\n              </a>\n            </li>\n\n            <li class=\"glide__slide categories__elem\">\n              <a href=\"#dlyamagazinov\" class=\"categories__link\">\n                <img class=\"categories__img\" src=\"./img/dlyamagazinov.png\" alt=\"\u0414\u043B\u044F \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u0432(\u0444\u043E\u0442\u043E)\">\n                <span class=\"categories__text\">\u0414\u043B\u044F \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u0432</span>\n              </a>\n            </li>\n          </ul>\n        </div>\n        <div class=\"glide__arrows categories__arrows\" data-glide-el=\"controls\">\n          <button class=\"glide__arrow glide__arrow--left categories__arrow categories__arrow--left\" data-glide-dir=\"<\"></button>\n          <button class=\"glide__arrow glide__arrow--right categories__arrow categories__arrow--right\" data-glide-dir=\">\"></button>\n        </div>\n      </div>\n    </div>\n  </div>\n  </header>";
    var mobileHeader = "<header class=\"page-header-mobile\">\n  <div class=\"container-mobile\">\n    <div class=\"page-header-mobile__wrapper\">\n      <div class=\"page-header-mobile__burger\">\n        <div class=\"page-header-mobile__burger-line\"></div>\n    </div>\n    <div class=\"page-header-mobile__logo\">\n      <img class=\"page-header-mobile__logo-image\" src=\"./img/logo-mobile.png\" alt=\"logo\" />\n      <div class=\"page-header-mobile__logo-text\">\n        <span class=\"page-header-mobile__logo-text1\">\u0421\u0442\u043E\u043B\u043E\u0432\u0430\u044F.\u0420\u0423</span>\n        <span class=\"page-header-mobile__logo-text2\">\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043F\u0438\u0449\u0435\u0431\u043B\u043E\u043A\u043E\u0432</span>\n      </div>\n    </div>\n    <div class=\"page-header-mobile__search\">\n      <img src=\"./img/search-mobile.svg\" alt=\"\u043F\u043E\u0438\u0441\u043A\" class=\"page-header-mobile__search-img\">\n      <form action=\"#\" method=\"get\" name=\"search-form\" id=\"search-form-mobile\">\n        <input type=\"search\" name=\"search\" id=\"search-value-mobile\" />\n      </form>\n    </div>\n    <div class=\"page-header-mobile__phone\">\n      <a class=\"link\" href=\"tel:+74957907205\">\n        <img class=\"page-header-mobile__phone-img\" src=\"./img/phone-mobile.png\" alt=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\">\n      </a>\n    </div>\n    <div class=\"page-header-mobile__cart\">\n      <a class=\"link\" href=\"#\">\n        <img class=\"page-header-mobile__cart-img\" src=\"./img/cart-mobile.png\" alt=\"\u041A\u043E\u0440\u0437\u0438\u043D\u0430\">\n        <span class=\"page-header-mobile__cart-amount\">12</span>\n      </a>\n    </div>\n    </div>\n  </div>\n</header>";

    function loadheader() {
      if (window.innerWidth <= 900) {
        document.querySelector('#main-wrapper').insertAdjacentHTML("afterbegin", mobileHeader);
        var burger = document.querySelector(".page-header-mobile__burger");
        var slideout = new Slideout({
          panel: document.getElementById("main-wrapper"),
          menu: document.getElementById("menu"),
          padding: 256,
          tolerance: 70
        });
        burger.addEventListener("click", function () {
          return slideout.toggle();
        }); // burger.addEventListener = () => {
        //   burger.classList.toggle("page-header-mobile__burger--opened");
        // };
      } else {
        document.querySelector("#main-wrapper").insertAdjacentHTML("afterbegin", desktopHeader);
        makeHeaderHide();
      }
    }

    module.exports = loadheader;
  }, {
    "./hidingheader": 7,
    "slideout": 5
  }],
  9: [function (require, module, exports) {
    // добавляем .webp к html, если webp поддерживается
    // и .no-webp, если наоборот
    function testWebP() {
      var webP = new Image();
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

      webP.onload = webP.onerror = function () {
        document.documentElement.classList.add(webP.height === 2 ? "webp" : "no-webp");
      };
    }

    module.exports = testWebP;
  }, {}]
}, {}, [6]);