var panel = {

	event : function() {
        $(document).on('click', '[data-panel]', this.openPanel);
        $(document).on('click', '[data-action="close-panel"]', this.closePanel);
	},

    /****
    *****
    OPEN PANEL
    *****
    *****/
    openPanel : function(e) {
        e.preventDefault();

        var myData = $(e.target).data('panel');

        if(!myData) {
            myData = $(e.target).closest('[data-panel]').data('panel');
        }

        $('.panel[data-type="' + myData + '"]').addClass('is-open');
        $('body').addClass('content-open show-background');

    },

    /****
    *****
    CLOSE PANEL
    *****
    *****/
    closePanel : function(e) {
        e.preventDefault();

        $(this).closest('.panel').removeClass('is-open');
        $('body').removeClass('content-open show-background');
        
    },


	init : function() {
		panel.event();
	}
};