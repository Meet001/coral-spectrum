(function($) {
  CUI.Pulldown = new Class(/** @lends CUI.Pulldown# */{
    toString: 'Pulldown',
    extend: CUI.Widget,
    
    defaults: {
    },
    
    timeout: null,
    popoverShown: false,
    
    /**
      @extends CUI.Widget
      @classdesc A pulldown widget
        
      @param {Object}   options                               Component options
      
    */
    construct: function(options) {
        var $link = this.$element.find('a').first();
        var $popover = this.$element.find('.popover').first();

        $link.on("click", function() {
            this.togglePopover();
            this._keepFocus();
        }.bind(this));

        $popover.on("click", function() {
            this._keepFocus();
        }.bind(this));

        $link.on("blur", function() {
            this.timeout = setTimeout(function() {
                this.timeout = null;
                this.hidePopover();
            }.bind(this), 200);
        }.bind(this));
    },

    _keepFocus: function() {
        var $link = this.$element.find('a').first();

        clearTimeout(this.timeout);
        this.timeout = null;
        $link.focus();
    },

    togglePopover: function() {
        if (this.popoverShown) {
            this.hidePopover();
        } else {
            this.showPopover();
        }
    },

    showPopover: function() {
        this._placePopover();
        this.$element.find('.popover').show();
        this.popoverShown = true;
    },

    hidePopover: function() {
        this.$element.find('.popover').hide();
        this.popoverShown = false;
    },

    _placePopover: function() {
        var $link = this.$element.find('a').first();
        var $popover = this.$element.find('.popover');
        
        var position = $link.position();
        var size = {
            width: $popover.width(),
            height: $link.height()
        };

        var top = position.top + size.height + 15;
        var left = position.left + $link.width() - size.width + 5;
        var marginLeft = size.width - 30;

        $popover.css({
            top: top,
            left: left
        });
        
        $('.popover.arrow-top::before').css({
            marginLeft: marginLeft
        });
    }
    
  });

  CUI.util.plugClass(CUI.Pulldown);

  // Data API
  if (CUI.options.dataAPI) {
    $(document).ready(function() {
        $("[data-init=pulldown]").pulldown();
    });
  }  

}(window.jQuery));
