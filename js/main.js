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