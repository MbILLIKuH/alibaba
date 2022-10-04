"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScreenSwitcher = /*#__PURE__*/function () {
  function ScreenSwitcher($container, callback, onInit) {
    _classCallCheck(this, ScreenSwitcher);

    this.$container = $container;
    this.$sections = $container.children();
    this.callback = callback;
    this.dataParam = 'param';
    this.attr = "data-".concat(this.dataParam);
    this.active = this.$container.children('.-active').data(this.dataParam);
    this.flag = false;
    this.animationClasses = {
      'up': {
        current: '-scrollCurrentDown',
        new: '-scrollNewDown'
      },
      'down': {
        current: '-scrollCurrentUp',
        new: '-scrollNewUp'
      },
      'left': {
        current: '-scrollCurrentRight',
        new: '-scrollNewRight'
      },
      'right': {
        current: '-scrollCurrentLeft',
        new: '-scrollNewLeft'
      }
    };
    this.scroll();
    this.keyPress();
    this.touch();

    if (typeof onInit === 'function') {
      setTimeout(onInit, 0);
    }
  }

  _createClass(ScreenSwitcher, [{
    key: "switcher",
    value: function switcher(id, direction) {
      var _this = this;
      //direction: up,down,left,right
      if (this.flag || this.active === id) return;
      this.flag = true;
      var $currentActiveSection = this.$sections.closest("[".concat(this.attr, "=\"").concat(this.active, "\"]"));
      var $newActiveSection = this.$sections.closest("[".concat(this.attr, "=\"").concat(id, "\"]"));
      var currentActiveSectionAnimate = this.animationClasses[direction].current;
      var newActiveSectionAnimate = this.animationClasses[direction].new;
      $currentActiveSection.addClass(currentActiveSectionAnimate);
      $newActiveSection.addClass(newActiveSectionAnimate);
      $newActiveSection.one('animationend', function () {
        _this.$sections.removeClass("".concat(currentActiveSectionAnimate, " ").concat(newActiveSectionAnimate, " -active"));

        $newActiveSection.addClass('-active');
        _this.active = id;
        _this.flag = false;

        if (typeof _this.callback === 'function') {
          _this.callback();
        }
      });
      $newActiveSection.find('.-stop').one('animationend', function (event) {
        event.stopPropagation();
      });
    }
  }, {
    key: "scroll",
    value: function scroll() {
      var _this2 = this;

      this.$container.bind('mousewheel DOMMouseScroll', function (event) {
        if ($(event.target).closest('.-inActive').length) {
          return true;
        }
        var $activeSection = _this2.$sections.closest("[".concat(_this2.attr, "=\"").concat(_this2.active, "\"]"));

        var id = null;
        var direction;

        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
          var $prevActiveSection = $activeSection.prevAll(':not(.-no-global)');

          if ($prevActiveSection.length) {
            id = $prevActiveSection.first().data(_this2.dataParam);
            direction = 'up';
          }
        } else {
          var $nextActiveSection = $activeSection.nextAll(':not(.-no-global)');

          if ($nextActiveSection.length) {
            id = $nextActiveSection.first().data(_this2.dataParam);
            direction = 'down';
          }
        }

        if (event.ctrlKey == false) {
          if (id) {
            _this2.switcher(id, direction);
          }
        }
      });
    }
  }, {
    key: "keyPress",
    value: function keyPress() {
      var _this3 = this;

      $(document).on('keydown', function (event) {
        var $activeSection = _this3.$sections.closest("[".concat(_this3.attr, "=\"").concat(_this3.active, "\"]"));

        var id = null;
        var direction;

        if (event.keyCode == 38) {
          var $prevActiveSection = $activeSection.prevAll(':not(.-no-global)');

          if ($prevActiveSection.length) {
            id = $prevActiveSection.first().data(_this3.dataParam);
            direction = 'up';
          }
        } else if (event.keyCode == 40) {
          var $nextActiveSection = $activeSection.nextAll(':not(.-no-global)');

          if ($nextActiveSection.length) {
            id = $nextActiveSection.first().data(_this3.dataParam);
            direction = 'down';
          }
        }

        if (!$(event.target).is('input')) {
          if (id) {
            _this3.switcher(id, direction);
          }
        }
      });
    }
  }, {
    key: "touch",
    value: function touch() {
      var _this4 = this;

      var id = null;
      var direction;
      var touchStart = null;
      var touchEnd = null;
      $(window).on('touchstart', function (event) {
        if ($(event.target).closest('.-inActive').length) {
          return true;
        }
        touchStart = event.originalEvent.changedTouches[0].pageY;
      });
      $(window).on('touchend', function (event) {
        if ($(event.target).closest('.-inActive').length) {
          return true;
        }
        id = null;
        touchEnd = event.originalEvent.changedTouches[0].pageY;

        var $activeSection = _this4.$sections.closest("[".concat(_this4.attr, "=\"").concat(_this4.active, "\"]"));

        var touchDifference = touchStart - touchEnd;

        if (touchDifference < -75) {
          var $prevActiveSection = $activeSection.prevAll(':not(.-no-global)');

          if ($prevActiveSection.length) {
            id = $prevActiveSection.first().data(_this4.dataParam);
            direction = 'up';
          }
        } else if (touchDifference > 75) {
          var $nextActiveSection = $activeSection.nextAll(':not(.-no-global)');

          if ($nextActiveSection.length) {
            id = $nextActiveSection.first().data(_this4.dataParam);
            direction = 'down';
          }
        }
        if (id) {
          _this4.switcher(id, direction);
        }
      });
    }
  }]);

  return ScreenSwitcher;
}();