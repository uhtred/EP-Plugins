;(function ( $, window, document, undefined ) {

        var pluginName = "select",
            defaults = {
            onOpen: function() {}
        };

        function getPluginData(element){
            return $.data(this, 'plugin_' + pluginName);
        }

        function setPluginData(element, value){
            $.data(this, 'plugin_' + pluginName, value);
        }

        function Plugin ( element, options ) {
            this.element = element;
            this.settings = $.extend(true, {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        $.extend(Plugin.prototype, {
                init: function () {
                    console.log("init");
                },
                destroy: function(){
                    console.log('destroy', this);
                    setPluginData(this.element, null);
                },
                open: function (options) {
                    console.log('open', options);
                    return 'bleh';
                }
        });

        $.fn[ pluginName ] = function ( options ) {
                var instance,
                    returns,
                    args = arguments,
                    isSetup = options === undefined || typeof options === 'object',
                    isPublicFunction = typeof options === 'string' && options[0] !== '_' && options !== 'init';

                this.each(function() {
                    instance = getPluginData(this);

                    if (isSetup && !instance) {

                        setPluginData(this, new Plugin( this, options ));

                    } else if(isPublicFunction) {

                        returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                    }
                });

                // chain jQuery functions
                return returns !== undefined ? returns : this;
        };

})( jQuery, window, document );