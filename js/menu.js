var menu = {
	init: function() {
		
		// Update total when a selection is made
		$('input:radio').change(menu.updateTotal);
		
		// Validate menu choices on submit
		$('button').click(menu.validate);
	},
	
	updateTotal: function() {
		
		var totalCost = parseFloat(0);
		
		// get price of all selected menu options
		$('input:radio:checked').each(function() {
			totalCost = totalCost + parseFloat($(this).attr('data-price'));
		});
		
		// update new total
		$('#js-total').text((totalCost).toFixed(2));
	},
	
	validate: function() {
		
		var messages = '';		
		
		// Each person must have at least two courses, one of which must be a main.
		messages += menu.twoCourses();
		
		// There is only one piece of cheesecake left.
		messages += menu.noMoreCheesecake();
		
		// Pierre the snobby waiter will not let you have prawn cocktail and salmon fillet in the same meal.
		messages += menu.somethingFishy();
		
		// Append error messages
		if(messages) {
			$('#js-success').addClass('hide');
			$('#js-error-handling').html(messages).removeClass('hide');
		}
		else {
			$('#js-error-handling').empty().addClass('hide');
			$('#js-success').removeClass('hide');
		}
	},
	
	twoCourses: function() {
		
		var message = '';
		var firstForm = menu.getSelections('one', ["starter", "main", "dessert"]);
		var secondForm = menu.getSelections('two', ["starter", "main", "dessert"]);
		if(firstForm < 2 || secondForm < 2) {
			message = 'Each diner must select at least two courses.<br />';
		}
		
		return message;
			
	},
	
	noMoreCheesecake: function() {

		var message = "";
		
		// Only one diner can have cheesecake
		if($('input[id*="cheesecake"]:checked').length > 1) {
			message = 'There is only one piece of cheesecake left. Please change your selection.<br />';
		}
		
		return message;
	},
	
	somethingFishy: function() {
		
		var message = "";
		
		if(($('#one-starter-prawn').is(':checked') && $('#one-main-salmon').is(':checked')) || ($('#two-starter-prawn').is(':checked') && $('#two-main-salmon').is(':checked'))) {
			message = 'You cannot have the prawn cocktail and salmon in the same meal.'
		}
		
		return message;
	},
	
	getSelections: function (term, courses) {
		courses.forEach(function(c, i) {
			courses[i] = $('input[name=' + term + '-' + c + ']:checked').length;
		});
		return courses.reduce(function(a, b) { return a + b; });
	}

}

menu.init();