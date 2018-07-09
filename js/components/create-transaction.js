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