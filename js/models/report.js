// model
var app = app || {};
app.Report = Backbone.Model.extend({

});

app.ReportCollections = Backbone.Collection.extend({
	model: app.Report,
	url: "https://simple-expense-tracker-app.herokuapp.com/v1/report/"
});
app.ReportInstance = new app.ReportCollections();