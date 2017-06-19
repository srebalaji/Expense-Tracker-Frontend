var app = app || {};
app.CategoryList = Backbone.View.extend({

	el: '#con',

	initialize: function(){
		this.input = this.$('#add_category');
		app.CategoriesInstance.on('add', this.addone, this);
		app.CategoriesInstance.on('reset', this.addAll, this);
		app.CategoriesInstance.on('invalid', this.error, this);
		
	},
	events: {
		'keypress #add_category': 'create'
	},
	error: function(model, error){
		alert(error);
	},
	create: function(e) {
		if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
			return;
		}
		app.CategoriesInstance.create(this.newAttributes(), {validate: true},{
			success: function(response) {
				console.log("success added"+response);
			},
			error: function(response) {
				console.log("error adding"+response);
			}
		});
	},
	addone: function(category) {
		//$('#list').append("<li><span id>"+category.attributes.title+"</span></li>");
		var view = new app.Category({model: category});
    $('#list').prepend(view.render().el);
    //$('#categories_lists').append('<option>'+category.get("title")+'</option>');
	},
	addAll: function() {
		this.$('#list').html('');
		app.CategoriesInstance.each(this.addone, this);
	},
	newAttributes: function() {
		return {
			title: this.input.val().trim()
		}
	}
});