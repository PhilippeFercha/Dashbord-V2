var scroll = {

	menuPosition : function() {
        /****
	    *****
	    CHANGE POSITION OF MENU
	    *****
	    *****/
	    
	    var menuHeight = 0;
	    if($(window).width() > desktopWidth - 70) {
	        menuHeight = blockMenu.outerHeight();
	    }

	    var userHeight = 0;
	    if(blockUser.length > 0) {
	        userHeight = blockUser.outerHeight();
	    }

	    if ($(window).scrollTop() >= userHeight) {
	        // CHANGE INSIDE MENU POSITION
	        if(blockInsideNavigation.length) {
	            blockInsideNavigation.css('top', 0);
	            blockInsideNavigation.css('padding-top', menuHeight);
	        }
	    } else {
	        // RESET INSIDE MENU POSITION
	        if(blockInsideNavigation.length) {
	            blockInsideNavigation.css('top', userHeight - $(window).scrollTop());
	            blockInsideNavigation.css('padding-top', menuHeight);
	        }
	    }
    },

	init : function() {
		scroll.menuPosition();
	}
};