/****
*****
VARIABLES
*****
*****/

// RESPONSIVE GRID 
var mobileWidth = 480;
var tabletWidth = 768;
var largeWidth = 960;
var desktopWidth = 1170;

// HTML ELEMENTS
var blockBody = $('body');
var blockFilter = $('.block-filter');
var blockFilterSearch = $('.block-filter-search');
var blockMenu = $('.block-menu');
var blockInsideNavigation = $('.block-inside-navigation');
var blockTransactions = $('.block-transactions');
var blockHeader = $('header[role="banner"]');
var blockUser = $('.block-user');
var blockUserDetailsSummary = $('.block-user-details-summary');
var blockUserDetailsFilter = $('.block-user-details-filter');

// TRANSITION END
var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';


/****
*****
GET POSITION OF HTML ELEMENTS
*****
*****/

function getElementPosition(element) {
    var val = 0;
   
    if(element.length > 0) {
        val = element.offset().top;
    }

    return val;
}

var transactionPosition = getElementPosition(blockTransactions);



/****
*****
GET HEIGHT OF HTML ELEMENTS
*****
*****/

function getElementHeight(element) {
    var val = 0;
   
    if(element.length > 0) {
        val = element.outerHeight();
    }

    return val;
}

var menuHeight = getElementHeight(blockMenu);
if($(window).width() <= largeWidth) {
   menuHeight = 0; 
}

var insideNavigationHeight = getElementHeight(blockInsideNavigation);
if($(window).width() > desktopWidth) {
   insideNavigationHeight = 0; 
}

var headerHeight = getElementHeight(blockHeader);
var filterHeight = getElementHeight(blockFilterSearch);
var userHeight = getElementHeight(blockUser);
var userDetailsSummaryHeight = getElementHeight(blockUserDetailsSummary);
var userDetailsFilterHeight = getElementHeight(blockUserDetailsFilter);
var transactionsHeight = getElementHeight(blockTransactions);

var filterPosition = userHeight + menuHeight + userDetailsSummaryHeight + userDetailsFilterHeight + insideNavigationHeight;


/****
*****
DOCUMENT READY
*****
*****/
$(function() {
    
    /****
    *****
    INIT FORM
    *****
    *****/
    form.init();

    /****
    *****
    INIT SCROLL MENU POSITION
    *****
    *****/
    scroll.menuPosition();
});



/****
*****
DOCUMENT LOAD
*****
*****/
$(window).load(function(e) {

    /****
    *****
    INIT MENU
    *****
    *****/
    menu.init();

    /****
    *****
    INIT FILTER ACTIONS
    *****
    *****/
    filter.init();

    /****
    *****
    INIT PANEL
    *****
    *****/
    panel.init();

    /****
    *****
    INIT MODAL
    *****
    *****/
    modal.init();

    /****
    *****
    INIT ARRAY ACTIONS
    *****
    *****/
    array.init();

    /****
    *****
    INIT CREATE TRANSACTION
    *****
    *****/
    createTransaction.init();

    /****
    *****
    INIT NOTIFICATION
    *****
    *****/
    notification.init();

    /****
    *****
    TRIGGER WINDOW SCROLL
    *****
    *****/
    $(window).scroll();

});



/****
*****
DOCUMENT RESIZE
*****
*****/
$(window).resize(function(e) {

    /****
    *****
    INIT SCROLL MENU POSITION
    *****
    *****/
    scroll.menuPosition();


    /****
    *****
    RESET MEUN/FILTER POSITION
    *****
    *****/
    if($(window).width() < largeWidth) {
        $('.block-filter, .block-menu').removeClass('is-fixed');

        // RESET PAGE CONTENT STYLE
        $('.block-filter').next().removeAttr('style');

        // CLOSE TRANSACTION PANEL ON MOBILE IF IS OPEN
        if(blockTransactions.hasClass('is-open')) {
            menu.closePanelTransaction(e);
        }
    }


    /****
    *****
    RE-CAlCULATE ELEMENT HEIGHT ON RESIZE
    *****
    *****/
    
    if($(window).width() <= largeWidth) {
        menuHeight = 0; 
    } else {
        menuHeight = getElementHeight(blockMenu);
    }

    var insideNavigationHeight = getElementHeight(blockInsideNavigation);
    if($(window).width() > desktopWidth) {
       insideNavigationHeight = 0; 
    }

    headerHeight = getElementHeight(blockHeader);
    filterHeight = getElementHeight(blockFilterSearch);
    userHeight = getElementHeight(blockUser);
    userDetailsSummaryHeight = getElementHeight(blockUserDetailsSummary);
    userDetailsFilterHeight = getElementHeight(blockUserDetailsFilter);


    /****
    *****
    RE-CAlCULATE ELEMENT POSITION ON RESIZE
    *****
    *****/

    // POSITION OF FILTER BLOCK
    filterPosition = userHeight + menuHeight + userDetailsSummaryHeight + userDetailsFilterHeight + insideNavigationHeight;


    // POSITION OF CREATE TRANSACTION BLOCK
    var stepActive = blockTransactions.find('.block-transaction.is-active').data('step');
    blockTransactions.scrollLeft($(window).width() * (stepActive - 1));


    /****
    *****
    CHANGE POSITION OF TRANSACTION BLOCK ON RESIZE
    *****
    *****/
    var myHeight = menuHeight + userHeight;
    blockTransactions.css('top', myHeight);

});



/****
*****
DOCUMENT SCROLL
*****
*****/
$(window).scroll(function() {

    /****
    *****
    INIT MENU POSITION ON SCROLL
    *****
    *****/
    scroll.menuPosition();


    /****
    *****
    SHOW FOOTER WHEN SCROLL BOTTOM PAGE
    *****
    *****/
    if($(window).scrollTop() + $(window).height() === $(document).height()) {
        $('footer[role="contentinfo"]').addClass('is-active');
    } else {
        $('footer[role="contentinfo"]').removeClass('is-active');
    }


    /****
    *****
    CHANGE POSITION OF TRANSACTION BLOCK ON SCROLL
    *****
    *****/
    if($(window).scrollTop() >= $('.block-user').height() + $('.block-menu').height()) {
        blockTransactions.addClass('is-fixed');
        blockTransactions.css('top', menuHeight);
    } else {
        blockTransactions.removeClass('is-fixed');
        blockTransactions.removeAttr('style');
    }


    /****
    *****
    CHANGE POSITION OF MENU BLOCK FILTER ON SCROLL
    *****
    *****/

    if($(window).scrollTop() >= $('.block-user').height() + $('.block-menu').height() && $(window).width() > tabletWidth) {

        /****
        *****
        MENU
        *****
        *****/

        // ADD CLASS FIXED TO MENU ONLY WHEN IT'S OPEN
        $('body.menu-open header[role="banner"]').addClass('is-fixed');

        // CHANGE MENU POSITION TO FIXED
        $('.block-menu').addClass('is-fixed');

    } else if($(window).scrollTop() < $('.block-user').height() && $(window).width() > tabletWidth) {

        /****
        *****
        MENU
        *****
        *****/

        // DELETE ALL PREVIOUS CLASSES
        $('body.menu-open header[role="banner"]').removeClass('is-fixed');
        $('.block-menu').removeClass('is-fixed');

    }


    /****
    *****
    CHANGE POSITION OF FILTER BLOCK ON SCROLL
    *****
    *****/

    if($(window).scrollTop() >= filterPosition && $(window).width() > tabletWidth) {


        /****
        *****
        FILTER
        *****
        *****/

        // ADD CLASS FIXED TO FILTER
        $('.block-filter').addClass('is-fixed');

        // CHANGE POSITION OF FILTER AND NEXT ELEM
        $('.block-filter').css('top', menuHeight);

        // ADD PADDING TO NEXT ELEMENT TO REPLACE CORRECTLY IN THE PAGE
        $('.block-filter').next().css('padding-top', filterHeight);


    } else if($(window).scrollTop() < filterPosition && $(window).width() > tabletWidth) {


        /****
        *****
        FILTER
        *****
        *****/

        // DELETE ALL PREVIOUS CLASSES
        $('.block-filter').removeClass('is-fixed');

        // RESET FILTER POSITION
        $('.block-filter').removeAttr('style');

        // RESET PAGE CONTENT STYLE
        $('.block-filter').next().removeAttr('style');

    }


    /****
    *****
    CHANGE PADDING TO PAGE
    *****
    *****/
    if($(window).scrollTop() >= $('.block-user').height() && $(window).width() > tabletWidth) {

        // ADD PADDING TO PAGE CONTENT TO REPOSITION CORRECTLY IN THE PAGE
        $('.page-content').css('padding-top', menuHeight + userHeight);
    } else {
    
        // RESET PAGE CONTENT STYLE
        $('.page-content').removeAttr('style');
    }
});


/****
*****
DOCUMENT KEYUP
*****
*****/
$(document).keyup(function(e) {
    // PRESS ESC
    if (e.keyCode === 27) {
        $('.panel, .modal, .array-line').removeClass('is-open');
        $('body').removeClass('content-open show-background');
    }
});
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
var createTransaction = {

	event : function() {
        $(document).on('click', '[data-action="modify-step-create-transaction"]', this.modifyStepCreateTransaction);
        $(document).on('click', '[data-action="validate-step-create-transaction"]', this.validateStepCreateTransaction);
        $(document).on('click', '[data-action="reset-create-transaction"]', this.resetCreateTransaction);
        $(document).on('click', '[data-action="send-code-validation-create-transaction"]', this.sendCodeValidationCreateTransaction);

        //ONLY ON STEP 1
        $(document).on('click', '.block-transaction.step-1 .block-transaction-buttons .block-transaction-button', this.activeButtonTransaction);
	},

    /****
    *****
    PREVIOUS STEP CREATE TRANSACTION
    *****
    *****/
    previousStepCreateTransaction : function(time) {
        blockTransactions.animate({scrollLeft: '-=' + $(window).width()}, time, 'easeInQuad');

        return false;
    },

    /****
    *****
    NEXT STEP CREATE TRANSACTION
    *****
    *****/
    nextStepCreateTransaction : function(time) {
        blockTransactions.animate({scrollLeft: '+=' + $(window).width()}, time, 'easeOutQuad');

        return false;
    },

    /****
    *****
    VALIDATE STEP CREATE TRANSACTION
    *****
    *****/
    validateStepCreateTransaction : function(e) {
        e.preventDefault();
        
        var myTransactionSection = $(this).closest('.block-transaction');
        var myTransactionForm = $(".block-transaction-form");
        var myTransactionAnimationTime = 650;
        var validateStep = 0;

        // ONLY ON STEP 1
        if(myTransactionSection.hasClass('step-1')) {

            // NAVIGATE TO NEXT STEP
            createTransaction.nextStepCreateTransaction(myTransactionAnimationTime);

            // VALIDATE CURRENT STEP
            validateStep = 1;
        }
       
        // ONLY ON STEP 2
        if(myTransactionSection.hasClass('step-2')) {

            // CHECK VALIDATE FORM
            myTransactionForm.parsley().validate();
            if(myTransactionForm.parsley().isValid()) {

                // NAVIGATE TO NEXT STEP
                createTransaction.nextStepCreateTransaction(myTransactionAnimationTime);

                // VALIDATE CURRENT STEP
                validateStep = 1;
            }
        }

        // ONLY ON STEP 3
        if(myTransactionSection.hasClass('step-3')) {

            // NAVIGATE TO NEXT STEP
            createTransaction.nextStepCreateTransaction(myTransactionAnimationTime);

            // VALIDATE CURRENT STEP
            validateStep = 1;
        }

        // ACTIVE NEXT STEP
        if(validateStep == 1) {
            blockTransactions.find('.block-transaction').removeClass('is-active');
            myTransactionSection.next('.block-transaction').addClass('is-active');
        }
    },

    /****
    *****
    MODIFIY STEP CREATE TRANSACTION
    *****
    *****/
    modifyStepCreateTransaction : function(e) {
        e.preventDefault();
        
        var myTransactionSection = $(this).closest('.block-transaction');
        var myTransactionForm = $(".block-transaction-form");
        var myTransactionAnimationTime = 325;
       
        // ONLY ON STEP 2
        if(myTransactionSection.hasClass('step-2')) {

            // RESET FORM
            myTransactionForm.parsley().reset();
            myTransactionForm.trigger("reset");
            myTransactionForm.find('select').selectric('refresh');

            // NAVGIATE TO PREVIOUS STEP
            createTransaction.previousStepCreateTransaction(myTransactionAnimationTime);
        }

        // ONLY ON STEP 3
        if(myTransactionSection.hasClass('step-3')) {

            // NAVGIATE TO PREVIOUS STEP
            createTransaction.previousStepCreateTransaction(myTransactionAnimationTime);
        }

        // ACTIVE PREVIOUS STEP
        blockTransactions.find('.block-transaction').removeClass('is-active');
        myTransactionSection.prev('.block-transaction').addClass('is-active');
        
    },

    /****
    *****
    RESET/NEW CREATE TRANSACTION
    *****
    *****/
    resetCreateTransaction : function(e) {
        e.preventDefault();
      
        // ONLY ON STEP 1
        $('.block-transaction.step-1 .block-transaction-button').removeClass('is-active');

        // ONLY ON STEP 2
        $('.block-transaction.step-2 .block-transaction-form').parsley().reset();
        $('.block-transaction.step-2 .block-transaction-form').trigger("reset");
        $('.block-transaction.step-2 .block-transaction-form select').selectric('refresh');

        // GO BACK TO STEP 1
        blockTransactions.animate({
            scrollLeft: 0
        }, 450, "easeOutQuad");

    },

    /****
    *****
    SHOW SECURITY CODE VALIDATION BLOCK
    *****
    *****/
    sendCodeValidationCreateTransaction : function(e) {
        e.preventDefault();
      
       $('.block-transaction .confirm-code').show();

    },


    /****
    *****
    ACTIVE BUTTON TRANSACTION ON STEP 1
    *****
    *****/
    activeButtonTransaction : function(e) {
        e.preventDefault();
      
        $('.block-transaction.step-1 .block-transaction-buttons .block-transaction-button').removeClass('is-active');
        $(this).addClass('is-active');

    },


	init : function() {
		createTransaction.event();

        /* INIT BLOCK TRANSACTIONS WRAPPER WIDTH */
        var numberStepsTransactions = $('.block-transactions .block-transactions-wrapper > .block-transaction').size();
        $('.block-transactions .block-transactions-wrapper').width(numberStepsTransactions * $(window).width() + 40);

	}
};
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
var form = {

	inputFile : function() {
        $('.file-input').each( function() {
	        var $input   = $( this ),
	            $label   = $input.next( 'label' ),
	            labelVal = $label.html();

	        $input.on( 'change', function( e ) {

	            var fileName = '';

	            if( this.files && this.files.length > 1 )
	                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
	            else if( e.target.value )
	                fileName = e.target.value.split( '\\' ).pop();
	            if( fileName )
	                $label.find( 'span' ).html( fileName );
	            else
	                $label.html( labelVal );
	        });

	        // Firefox bug fix
	        $input
	        .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
	        .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
	    });
    },

    datePicker : function() {
    	$(".datepicker").datepicker({
	        firstDay: 1,
	        closeText: 'Fermer',
	        prevText: 'Précédent',
	        nextText: 'Suivant',
	        currentText: 'Aujourd\'hui',
	        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
	        monthNamesShort: ['Janv', 'Févr', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
	        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
	        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
	        dayNamesMin: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
	        weekHeader: 'Sem.',
	        dateFormat: 'dd/mm/yy'
	    });
    },

    select : function() {
    	$('select').selectric();
	    $('.custom-options').selectric({
	        optionsItemBuilder: function(itemData) {
	            return itemData.value.length ? 
	            '<div class="selectric-options-text">' + itemData.text + '</div>' + 
	            '<div class="selectric-options-value">' + itemData.value + '</div>' : 
	            '<div class="selectric-options-text">' +itemData.text  + '</div>';
	        }
	    });


	    // SHOW SPECIFIC CONTENT
	    $('#DemandTypeList').selectric().on('change', function() {
        	$('[data-type="request"] [data-section]').hide();
        	$('[data-type="request"] [data-section="' + $(this).val() + '"]').show();
    	});
    },

	init : function() {
		form.inputFile();
		form.datePicker();
		form.select();
	}
};
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