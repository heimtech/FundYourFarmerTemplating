jQuery( function( $ ) {

	// Get markup ready for slider
	$( 'input#min_distance, input#max_distance' ).hide();
	$( '.distance_slider, .distance_label' ).show();

	// distance slider uses jquery ui
	var min_distance = $( '.distance_slider_amount #min_distance' ).data( 'min' ),
		max_distance = $( '.distance_slider_amount #max_distance' ).data( 'max' ),
		current_min_distance = parseInt( min_distance, 10 ),
		current_max_distance = parseInt( max_distance, 10 ),
		currency_pos = "right",
		currency_symbol = " KM";

	$( document.body ).on( 'distance_slider_create distance_slider_slide', function( event, min, max ) {
		if ( currency_pos === 'left' ) {

			$( '.distance_slider_amount span.to' ).html( currency_symbol + max );

		} else if ( currency_pos === 'left_space' ) {

			$( '.distance_slider_amount span.to' ).html( currency_symbol + ' ' + max );

		} else if ( currency_pos === 'right' ) {

			$( '.distance_slider_amount span.to' ).html( max + currency_symbol );

		} else if ( currency_pos === 'right_space' ) {

			$( '.distance_slider_amount span.to' ).html( max + ' ' + currency_symbol );

		}

		$( document.body ).trigger( 'distance_slider_updated', [ 0, max ] );
	});

	$( '.distance_slider' ).slider({
		range: true,
		animate: true,
		min: min_distance,
		max: max_distance,
		values: [ current_min_distance, 25 ],
		create: function() {

			$( '.distance_slider_amount #min_distance' ).val( current_min_distance );
			$( '.distance_slider_amount #max_distance' ).val( current_max_distance );

			$( document.body ).trigger( 'distance_slider_create', [ current_min_distance, 25 ] );
		},
		slide: function( event, ui ) {

			$( 'input#min_distance' ).val( ui.values[0] );
			$( 'input#max_distance' ).val( ui.values[1] );

			$( document.body ).trigger( 'distance_slider_slide', [ 0, ui.values[1] ] );
		},
		change: function( event, ui ) {

			$( document.body ).trigger( 'distance_slider_change', [ 0, ui.values[1] ] );
		}
	});

});
