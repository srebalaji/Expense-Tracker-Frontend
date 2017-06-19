// model
var app = app || {};
app.Report = Backbone.Model.extend({

});

app.ReportCollections = Backbone.Collection.extend({
	model: app.Report,
	url: "http://localhost:3000/v1/report/"
});
app.ReportInstance = new app.ReportCollections();