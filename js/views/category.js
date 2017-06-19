// view
var app = app || {};

app.Category = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#category_template').html()),
	render:  function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.input = this.$('.edit');
    return this; 
	},
	initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  events: {
    'dblclick h4' : 'edit',
    'keypress .edit' : 'updateOnEnter',
    'blur .edit' : 'close',
    'click .destroy': 'destroy'
  },
  edit: function(){
    this.$el.addClass('editing');
    this.input.focus();
  },
  close: function(){
    var value = this.input.val().trim();
    if(value) {
    	var collection = app.CategoriesInstance.get(this.model);

    	collection.set({title: value});
      collection.save({}, {validate: true}, {
      	url: 'http://localhost:3000/v1/categories/'+this.model.get('_id'),
      	type: 'PUT',
      	success: function() {
      		console.log("success in updating");
      	},
      	error: function(){
      		console.log("error in updating");
      	}
      });
    }
    this.$el.removeClass('editing');
  },
  updateOnEnter: function(e){
    if(e.which == 13){
      this.close();
    }
   },
   destroy: function(){
	    //this.model.destroy();
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