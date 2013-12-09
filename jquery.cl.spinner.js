
/*

v 0.0.4


by Christian Marienfeld
post@chrisland.de

*/


(function ( $ ) {


	$.fn.clSpinner = function(options) {

		this.each(function(i,k) {
			
			var settings = $.extend({
				// These are the defaults.
				width: "10px",
				height: "10px"
			}, options );
			
			
			var that = $(k),
				spinnerDiv = $('<div></div>', {'class': 'spinner_wrap'}),
				spinnerUp = $('<div></div>', {'class': 'spinner_trigger spinner_up'}),
				spinnerDown = $('<div></div>', {'class': 'spinner_trigger spinner_down'}); 
			

			spinnerDiv.css({'width':settings.width, 'height':settings.height});
			spinnerUp.css({'width':'100%', 'height':'100%'});
			spinnerDown.css({'width':'100%', 'height':'100%'});
			
			var newWidth = parseInt(that.css('width')) - parseInt(settings.width);
			if (parseInt(newWidth) > 0) {
				that.css('width', newWidth);
			}
			
			
			that.on('keyup', function (e) {
				if (e.keyCode == 38) {
					that.trigger( "spinner-change", [ "add", e ] );
				} else if (e.keyCode == 40) {
					that.trigger( "spinner-change", [ "sub", e ] );
				}
				
			});
			
			spinnerUp.on('click', function (e) {
				that.trigger( "spinner-change", [ "add", e ] );
			});
			
			spinnerDown.on('click', function (e) {
				that.trigger( "spinner-change", [ "sub", e ] );
			});
			
			that.on('spinner-change', function(e, type, oldEvent) {
				
				var value = parseFloat(that.val()),
					step = that.data('spinner-step');
				if (!value) {
					value = 0;
				}
				if (!step) {
					step = 1;
				}
				if (type == 'add') {
					if (oldEvent.shiftKey) {
						value += step *10;
					} else {
						value += step;
					}
				} else if (type == 'sub') {
					if (oldEvent.shiftKey) {
						value -= step *10;
					} else {
						value -= step;
					}
				}
				value = Math.round(value*Math.pow(10,2))/Math.pow(10,2);
				that.val( value );
				that.trigger('change');
			});
			
			spinnerDiv.append(spinnerUp).append(spinnerDown);
			$(k).before(spinnerDiv);
			
		});	
		return this;
	};		
		
	
}( jQuery ));