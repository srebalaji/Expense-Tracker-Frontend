// model
var app = app || {};
app.Expense = Backbone.Model.extend({
	validate: function(attributes){
		if (!attributes.title){
			return "Title cant be blank";
		}
		if(!attributes.amount){
			return "Amount cant be blank";
		}
		if(attributes.title.search(/^[a-zA-Z\s]*$/) === -1){
			return "Title should contain only letters";
		}
		if(attributes.amount.search(/^[0-9]+$/) === -1){
			return "Amount should contain only numbers";
		}
	}
});

app.Expenses = Backbone.Collection.extend({
	model: app.Expense,
	url: "http://localhost:3000/v1/expenses"
});

app.ExpensesInstance = new app.Expenses();
app.ExpensesInstance.fetch({
	success: function(response) {
		console.log("success in fetching expense");
	},
	error: function(response) {
		console.log("failure in fetching expense");
	}
});