jQuery( function( $ ) {

	// Get markup ready for slider
	$( 'input#min_duration, input#max_duration' ).hide();
	$( '.duration_slider, .duration_label' ).show();

	// duration slider uses jquery ui
	var min_duration = $( '.duration_slider_amount #min_duration' ).data( 'min' ),
		max_duration = $( '.duration_slider_amount #max_duration' ).data( 'max' ),
		current_min_duration = parseInt( min_duration, 10 ),
		current_max_duration = parseInt( max_duration, 10 ),
		currency_pos = "right",
		currency_symbol = " Tage";

	$( document.body ).on( 'duration_slider_create duration_slider_slide', function( event, min, max ) {
		if ( currency_pos === 'left' ) {

			$( '.duration_slider_amount span.to' ).html( currency_symbol + max );

		} else if ( currency_pos === 'left_space' ) {

			$( '.duration_slider_amount span.to' ).html( currency_symbol + ' ' + max );

		} else if ( currency_pos === 'right' ) {

			$( '.duration_slider_amount span.to' ).html( max + currency_symbol );

		} else if ( currency_pos === 'right_space' ) {

			$( '.duration_slider_amount span.to' ).html( max + ' ' + currency_symbol );

		}

		$( document.body ).trigger( 'duration_slider_updated', [ 1, max ] );
	});

	$( '.duration_slider' ).slider({
		range: true,
		animate: true,
		min: min_duration,
		max: max_duration,
		values: [ current_min_duration, 5 ],
		create: function() {

			$( '.duration_slider_amount #min_duration' ).val( current_min_duration );
			$( '.duration_slider_amount #max_duration' ).val( current_max_duration );

			$( document.body ).trigger( 'duration_slider_create', [ current_min_duration, 5 ] );
		},
		slide: function( event, ui ) {

			$( 'input#min_duration' ).val( ui.values[0] );
			$( 'input#max_duration' ).val( ui.values[1] );

			$( document.body ).trigger( 'duration_slider_slide', [ 0, ui.values[1] ] );
		},
		change: function( event, ui ) {

			$( document.body ).trigger( 'duration_slider_change', [ 0, ui.values[1] ] );
		}
	});

});
