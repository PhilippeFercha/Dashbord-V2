var notification = {

	event : function() {
        $(document).on('click', '[data-action="close-notification"]', this.closeNotification);
	},


    /****
    *****
    CLOSE NOTIFICATION
    *****
    *****/
    closeNotification : function(e) {
        e.preventDefault();

        var elem = $(this).closest('.notification');
        var heightElem = elem.outerHeight();
        elem.css('bottom', - heightElem);
        
    },


	init : function() {
		notification.event();
	}
};