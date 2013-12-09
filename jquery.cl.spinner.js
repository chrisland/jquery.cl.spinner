
/*

v 0.0.1


by Christian Marienfeld
post@chrisland.de

*/


(function ( $ ) {


	$.fn.clSpinner = function() {

		this.each(function(i,k) {
			var that = $(k),
				spinnerDiv = $('<div></div>', {'class': 'spinner_wrap'}),
				spinnerUp = $('<div>+</div>', {'class': 'spinner_up'}),
				spinnerDown = $('<div>-</div>', {'class': 'spinner_down'});
				
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
				
				var value = parseInt(that.val());
				if (!value) {
					value = 0;
				}
				if (type == 'add') {
					if (oldEvent.shiftKey) {
						value += 10;
					} else {
						value += 1;
					}
				} else if (type == 'sub') {
					if (oldEvent.shiftKey) {
						value -= 10;
					} else {
						value -= 1;
					}
				}
				that.val( value );
			});
			
			spinnerDiv.append(spinnerUp).append(spinnerDown);
			$(k).after(spinnerDiv);
			
		});	
		return this;
	};		
		
	
}( jQuery ));