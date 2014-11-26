// Based on https://github.com/firedev/jquery.keynav
! function(root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root.jQuery);
    }

}(this, function($) {

    var pluginName = 'keyboardnav',
        defaults = {
            elements: 'item',
            currentClass: pluginName + '--current',
            loop: true,
            byOrder: true
        };

    function Plugin(element, options) {
        this.element = $(element);
        this.settings = $.extend(true, {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {

        setFirstAsCurrent: function() {
            $first = this.element.find('.' + this.settings.elements).first();
            this.setCurrent($first);

            return $first;
        },

        setLastAsCurrent: function() {
            $last = this.element.find('.' + this.settings.elements).last();
            this.setCurrent($last);

            return $last;
        },

        getCurrent: function() {
            return this.element.find('.' + this.settings.currentClass);
        },

        resetCurrent: function() {
            this.getCurrent()
                .removeClass(this.settings.currentClass);
        },

        setCurrent: function($el) {
            this.resetCurrent();

            $el
                .addClass(this.settings.currentClass)
                .focus();
        },

        keyMap: {
            37: function() { // left
            },
            38: function() { // up
                var $el = this.getCurrent().prev('.' + this.settings.elements);

                if (!$el.length && this.settings.loop) {
                    this.setLastAsCurrent();
                } else {
                    this.setCurrent($el);
                }

            },
            39: function() { // right
            },
            40: function() { // down
                var $el = this.getCurrent().next('.' + this.settings.elements);

                if (!$el.length && this.settings.loop) {
                    this.setFirstAsCurrent();
                } else {
                    this.setCurrent($el);
                }
            },
            13: function() { // enter
            }
        },
        bindEvent: function() {
            var _this = this;

            $(document).keydown(function(e) {
                if (_this.keyMap[e.which]) {
                    _this.keyMap[e.which].call(_this);
                }
            });
        },
        init: function() {

            if (!this.getCurrent().length) {
                this.setFirstAsCurrent();
            }

            this.bindEvent();
        }
    });

    $.fn[pluginName] = function(options) {
        var instance,
            returns,
            isSetup = options === undefined || typeof options === 'object',
            isPublicFunction = typeof options === 'string' && options[0] !== '_' && options !== 'init';

        this.each(function() {
            instance = $.data(this, 'plugin_' + pluginName);

            if (isSetup) {

                if (!instance) {
                    $.data(this, "plugin_" + pluginName, new Plugin(this, options));
                }

            }

            if (isPublicFunction) {

                if (options === 'destroy') {
                    $.data(this, 'plugin_' + pluginName, null);
                }

                returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            }
        });

        // chain jQuery functions
        return returns !== undefined ? returns : this;
    };

});
