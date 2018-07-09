var filter = {

	event : function() {
		$(document).on('click', '[data-action="open-more-criteria"]', this.openMoreCriteria);
		$(document).on('click', '[data-action="close-more-criteria"]', this.closeMoreCriteria);
		$(document).on('click', '[data-action="close-callback-message"]', this.closeCallbackMessage);
	},

	/****
    *****
    OPEN BLOCK MORE CRITERIA
    *****
    *****/
	openMoreCriteria : function(e) {
		e.preventDefault();
        var $this = $(this);
      
        if($('.block-filter-more').is('.is-open')) {
            $this.text($this.data('label-open'));
        } else {
             $this.text($this.data('label-close'));
        }

        $('.block-filter-more').toggleClass('is-open');
	},

	/****
    *****
    CLOSE BLOCK MORE CRITERIA :: TO REFACTOR
    *****
    *****/
	closeMoreCriteria : function(e) {
		e.preventDefault();

        $('[data-action="open-more-criteria"]').trigger('click');
	},

	/****
    *****
    CLOSE CALLBACK MESSAGE
    *****
    *****/
	closeCallbackMessage : function(e) {
		e.preventDefault();

        $(this).closest('.callback').removeClass('is-open');
	},

	init : function() {
		filter.event();
	}
};