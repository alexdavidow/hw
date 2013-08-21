/* based on bootstrap-dropdown.js v2.0.3 
/* differences include: 
  - don't closing immediately on click of an option
  - close all other dropdowns on the page when one dropdown is open
  - no scanning the page for elements with the data-toggle="dropdown"
*/

!function ($) {

  "use strict"; // jshint ;_;

 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var Dropdown = function (element) {
        this.$el = $(element);
        this.$doc = $('html');
        if (this.$el.data('options')){
          this.$el.find(this.$el.data('options')).on('click.dropdown.data-api', function(e){e.stopPropagation()})
        }
        this.$el.find(this.$el.data('target')).on('click.dropdown.data-api', $.proxy(this.toggle, this))
        this.$doc.on('click.dropdown.data-api', $.proxy(this.close, this))
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      if (this.$el.hasClass('active')){
        this.close()
      } else {
        // close the other dropdowns
        this.$doc.trigger('click.dropdown.data-api');
        this.$el.addClass('active')
      }

      return false
    }
  , close: function(){
      this.$el.removeClass('active')
    }
  }

  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.dropdown.Constructor = Dropdown
}(window.jQuery);