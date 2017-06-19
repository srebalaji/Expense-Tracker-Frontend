var app = app || {};
app.Router = Backbone.Router.extend({
	routes: {
		'category' : 'setCategory',
		'report': 'setReport',
		'': 'setExpense'
	},
	setCategory: function(id){
		app.ViewInstance = new app.CategoryList();
		app.CategoriesInstance.trigger('reset');
		$('#expense_page').addClass('hide');
		$('#expense_page').removeClass('show');
		$('#category_page').addClass('show');
		$('#category_page').removeClass('hide');
	},
	setExpense: function(id){
		app.ViewExpense = new app.ExpenseList();
		app.ViewCategoryDropdown = new app.CategoryDropDown();
		$('#expense_page').addClass('show');
		$('#expense_page').removeClass('hide');
		$('#category_page').addClass('hide');
		$('#category_page').removeClass('show');
	},
	setReport: function(id){
		app.ViewReport = new app.Report();
		app.ReportInstance.fetch({
			success: function(){
				console.log("Success in fetching reports");
			},
			error: function(){
				console.log("failure in fetching reports");
			}
		});
	}
});