;
(function($, window, document, undefined) {

    var pluginName = "select",
        defaults = {
            eventNamespace: 'ep:custom-select'
            class: 'custom-select',
            onOpen: function() {},
            onClose: function() {}
        };

    function getPluginData(element) {
        return $.data(this, 'plugin_' + pluginName);
    }

    function setPluginData(element, value) {
        $.data(this, 'plugin_' + pluginName, value);
    }

    function fromCharCode(charCode) {
        return String.fromCharCode(charCode);
    }

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend(true, {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        destroy: function() {
            console.log('destroy', this);
            setPluginData(this.element, null);
        },
        update: function(options) {
            console.log('update', options);
            return 'update';
        },
        bindEvents: function() {
            console.log('bindEvents');

            function handleSelectClick(){
                console.log('handleSelectClick');
            }

            $(document.body)
                .on('click', eventNamespace + '.' + class, handleSelectClick)
        },
        init: function() {
            this.bindEvents();
            console.log("init");
        }
    });

    $.fn[pluginName] = function(options) {
        var instance,
            returns,
            args = arguments,
            isSetup = options === undefined || typeof options === 'object',
            isPublicFunction = typeof options === 'string' && options[0] !== '_' && options !== 'init';

        this.each(function() {
            instance = getPluginData(this);

            if (isSetup && !instance) {

                setPluginData(this, new Plugin(this, options));

            } else if (isPublicFunction) {

                returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            }
        });

        // chain jQuery functions
        return returns !== undefined ? returns : this;
    };

})(jQuery, window, document);
