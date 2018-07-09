var array = {

	event : function() {
		$(document).on('click', '[data-action="open-more"] > .array-item-cell', this.openMore);
        $(document).on('click', '[data-action="close-more"]', this.closeMore);
	},

	/****
    *****
    OPEN MORE
    *****
    *****/
	openMore : function(e) {
		e.preventDefault();

        // INIT VARIABLES
        var myLine = $(this).closest('.array-line');
        var myElement = myLine.find('.array-item-more');
        var docHeight = $(document).height();

        // SHOW ELEMENT IN DOM
        myElement.show();

        // CHANGE POSITION
        if((myElement.height() + myElement.offset().top) > docHeight) {
            myLine.addClass('is-bottom');
        }

        // SHOW ASIDE
        $('.block-array').find('.array-line').removeClass('is-open');
        myLine.addClass('is-open');
	},

    /****
    *****
    CLOSE MORE
    *****
    *****/
    closeMore : function(e) {
        e.preventDefault();

        $(this).closest('.array-line').removeClass('is-open');
    },

	init : function() {
		array.event();
	}
};