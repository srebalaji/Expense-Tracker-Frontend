// model
var app = app || {};
app.Category = Backbone.Model.extend({
	validate: function(attributes){
		if(!attributes.title){
			return "Title cant be blank";
		}
		if(attributes.title.search(/^[a-zA-Z]*$/) === -1){
			return "Title should contain only characters..";
		}
	}
});

app.Categories = Backbone.Collection.extend({
	model: app.Category,
	url: "http://localhost:3000/v1/categories"
});

app.CategoriesInstance = new app.Categories();
app.CategoriesInstance.fetch({
	success: function(response) {
	console.log("Success in fetching categories");
	},
	error: function(response) {
	console.log("failure in fetching categories");
	}
});
