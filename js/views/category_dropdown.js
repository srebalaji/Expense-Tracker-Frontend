var app = app || {};
app.CategoryDropDown = Backbone.View.extend({
	el: 'con',
	initialize: function(){
		app.CategoriesInstance.on('add', this.addone, this);
		app.categories = [];
	},
	addone: function(category) {
		var view = new app.Category({model: category});
		app.categories.push(category);
    let json ='<option value={"id":"'+category.get("_id")+'","title":"'+category.get("title").replace(/\s/g,'')+'"}>'+category.get("title")+'</option>';
    $('.categories_lists').append(json);
	}
});