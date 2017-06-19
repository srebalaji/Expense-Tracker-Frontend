var app = app || {};
app.Report = Backbone.View.extend({
	el: '#con',
	tagName: 'div',
	template: _.template($('#report_template').html()),
	initialize: function(){
		app.ReportInstance.on('add', this.addone, this);
		this.values = '';
		this.labels  ='';
	},
	render: function(){
		
	},
	addone: function(reports){
		var report = new app.Report({model: reports});
		this.labels = (report.model.get('labels'));
		this.values = (report.model.get('values'));
		this.$el.html(this.template({labels: this.labels, values: this.values}));
	}
});