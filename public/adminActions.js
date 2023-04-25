(function ($) {
    "use strict";

 
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    }); 
})(jQuery);