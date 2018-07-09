animationComplete = true;
var menu = {

	event : function() {
		$(document).on('click', '[data-action="open-menu"]', this.openMenu);
        $(document).on('click', '[data-action="open-panel-transaction"]', this.openPanelTransaction);
        $(document).on('click', '[data-action="close-panel-transaction"]', this.closePanelTransaction);
	},

    /****
    *****
    OPEN MENU
    *****
    *****/
    openMenu : function(e) {
        e.preventDefault();
      
        // OPEN MENU
        $(this).toggleClass('is-open');
        blockMenu.toggleClass('is-open');
        blockBody.toggleClass('menu-open show-background');
    },

    /****
    *****
    TOGGLE TRANSACTION PANEL
    *****
    *****/
    openPanelTransaction : function(e) {
        e.preventDefault();

        // ACTIVE FIRST STEP
        if(!blockTransactions.hasClass('is-open')) {

            var transactionStep = blockTransactions.find('.block-transaction');
            var activeStep = 0;

            // CHECK IF ONE STEP IS ALREADY ACTIVATE
            transactionStep.each(function() {
                if ($(this).hasClass('is-active')) {
                    activeStep = 1;

                    return false; 
                }
            });

            if(activeStep === 0) {
                transactionStep.removeClass('is-active');
                blockTransactions.find('.block-transaction.step-1').addClass('is-active');
            }

        }

        // TOGGLE TRANSACTION PANEL
        menu.togglePanelTransaction($(this));
    },

    /****
    *****
    CLOSE TRANSACTION PANEL
    *****
    *****/
    closePanelTransaction : function(e) {
        e.preventDefault();

        // TOGGLE TRANSACTION PANEL
        menu.togglePanelTransaction();

        // RESET ALL TRANSACTION BLOCK
        createTransaction.resetCreateTransaction(e);
    },


    /****
    *****
    TOGGLE TRANSACTION PANEL
    *****
    *****/
    togglePanelTransaction : function(elem) {

        if (animationComplete) {
            animationComplete = false;

            // ANIMATE PANEL
            blockTransactions.toggleClass('is-open');

            // CHANGE APPEARENCE BUTTON
            if(elem) {
                elem.closest('li').toggleClass('is-active');
            } else {
                $('.menu-item.is-active').toggleClass('is-active');
            }

            $('body').toggleClass('transaction-open show-background');
        }
    },

	init : function() {
		menu.event();

        blockTransactions.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
            animationComplete = true;
        });
	}
};