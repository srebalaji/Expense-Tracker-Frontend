// view
var app = app || {};

app.Expense = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#expense_template').html()),
	render:  function() {
		let present_categories_in_object = this.model.get('categories') || [];
		this.present_categories = [];
		for(let i=0; i<present_categories_in_object.length; i++) {
			let element = present_categories_in_object[i]._id || present_categories_in_object[i].id
			this.present_categories.push(element);
		}

		this.$el.html(this.template({model: this.model.toJSON(), categories: app.categories, present_categories: this.present_categories}));
		this.input_title = this.$('#expense_edit_title');
		this.input_amount = this.$('#expense_edit_amount');
		this.categories = this.$('#expense_categories_update');
    return this; 
	},
	initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  events: {
    'click #edit_expense_details' : 'edit',
    'click #update_expense_details' : 'update',
    'click #cancel': 'cancel',
    'blur .expensess' : 'close',
    'click .destroy': 'destroy'
  },
  edit: function(){
    this.$el.addClass('expense_editing');
    this.categories.focus();
  },
  cancel: function(){
  	this.$el.removeClass('expense_editing');
  },
  close: function(){
    var title = this.input_title.val().trim();
		var amount = this.input_amount.val().trim();
		var categories = this.categories.val() || [];

		let categories_array = [];
		for(let i=0; i<categories.length; i++) {
			categories_array.push(JSON.parse(categories[i]));
		}
    if(title || amount || categories_array) {
    	var collection = app.ExpensesInstance.get(this.model);
    	let element_id = this.model.get('_id') || this.model.get('id');
    	collection.set({title: title, amount: amount, categories: categories_array});
      collection.save({}, {validate: true},{
      	url: 'http://localhost:3000/v1/expenses/'+element_id,
      	type: 'PUT',
      	success: function() {
      		console.log("success in updating  in expenses");
      	},
      	error: function(){
      		console.log("error in updating in expenses");
      	}
      });
    }
    this.$el.removeClass('expense_editing');
  },
  update: function(e){
    this.close();
   },
   destroy: function(){
	    var category_id = this.model.get('_id');
	    this.model.set({id: category_id});
	    var collection = app.CategoriesInstance.get(this.model);

	    collection.destroy({}, {
	    	url: 'http://localhost:3000/v1/categories/'+category_id,
      	type: 'DELETE',
      	success: function(model) {
      		console.log("success in deleting");
      	},
      	error: function(){
      		console.log("error in deleting");
      	}
	    });
    } 
});