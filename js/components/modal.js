var modal = {

	event : function() {
        $(document).on('click', '[data-modal]', this.openModal);
        $(document).on('click', '[data-action="close-modal"]', this.closeModal);
	},

    /****
    *****
    OPEN MODAL
    *****
    *****/
    openModal : function(e) {
        e.preventDefault();

        var myData = $(e.target).data('modal');

        if(!myData) {
            myData = $(e.target).closest('[data-modal]').data('modal');
        }

        $('.modal[data-type="' + myData + '"]').addClass('is-open');
        $('body').addClass('content-open show-background');

    },

    /****
    *****
    CLOSE MODAL (GLOBAL FUNCTION)
    *****
    *****/
    closeModal : function(e) {
        e.preventDefault();

        $(this).closest('.modal').removeClass('is-open');
        $('body').removeClass('content-open show-background');
        
    },

	init : function() {
		modal.event();
	}
};