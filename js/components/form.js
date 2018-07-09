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