var expect = chai.expect;

describe('Restaurant Menu', function() {
	describe('menu.init', function() {
		before(function() {
			sinon.stub(menu, 'updateTotal');
			sinon.stub(menu, 'validate');
		});
		
		after(function() {
			menu.updateTotal.restore();
			menu.validate.restore();
		})
		
		it('should validate form on button click', function() {
			menu.init();
			$('button').trigger('click');
			expect(menu.validate.called).to.be.true;
		});
		
		it('should update total on selection change', function() {
			menu.init();
			$('input:radio').trigger('change');
			expect(menu.updateTotal.called).to.be.true;
		});
	});
	
	describe('menu.getSelections', function() {
		it('should return the number of menu courses selected', function() {
			$('#one-starter-soup').trigger('click');
			$('#one-main-steak').trigger('click');
			var formOne = menu.getSelections('one', ["starter", "main", "dessert"]);
			expect(formOne).to.equal(2);
		});
	});
	
});