var app = app || {};
app.ExpenseList = Backbone.View.extend({

	el: '#con',

	initialize: function(){
		this.input_title = this.$('#add_expense_title');
		this.input_amount = this.$('#add_expense_amount');
		this.categories_list = this.$('.categories_lists');
		app.ExpensesInstance.on('add', this.addone, this);
		app.ExpensesInstance.on('invalid', this.Error, this);
		app.ExpensesInstance.on('reset', this.addAll, this);
	},
	events: {
		'click #add_expense': 'create'
	},
	Error: function(model, error){
		alert(error);
		return;
	},
	create: function(e) {
		app.ExpensesInstance.create(this.newAttributes(), {validate: true},{
			success: function(response) {
				console.log("successfully added expense"+response);
			},
			error: function(model,error) {
				console.log("error adding in expense"+error);
			}
		});
		$('#add_expense_title').val('');
		$('#add_expense_amount').val('');
		$('.categories_lists').val('');
	},
	addone: function(expense) {
		var view = new app.Expense({model: expense});
    $('#list').prepend(view.render().el);
	},
	addAll: function() {
		this.$('#list').html('');
		app.ExpensesInstance.each(this.addone, this);
	},
	newAttributes: function() {
		let categories = this.categories_list.val() || [];
		let category_array = [];
		for(let i=0; i<categories.length; i++) {
			category_array.push(JSON.parse(categories[i]));
		}
		return {
			title: this.input_title.val().trim(),
			amount: this.input_amount.val().trim(),
			categories: category_array
		}
	}
});