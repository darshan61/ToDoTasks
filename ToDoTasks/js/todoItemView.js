var TodoItemView = Backbone.View.extend({
	tagName : "li",
	
	initialize: function(options){
		if(!options && !options.model){
			throw new Error("model is not spectified");
		}
		this.model.on("change",this.render,this);
	},
	
	events:{
		"click #toggle": "onClickToggle",
		"click #delete": "onClickDelete"
	},
	
	onClickToggle: function(){
		this.model.toggle();
		this.model.save();

	},
	
	onClickDelete: function(){
		this.model.destroy();
	},
	
	render: function(){
 		//console.log('render 1 ');
 		//console.log(this.model.get("COMPLETED"));
		var checked = this.model.get("COMPLETED") == 0 ? false: true;
		//console.log(checked);
		console.log('this.model.id ' + this.model.id);
		this.$el.attr("id",this.model.id);
		this.$el.toggleClass("completed", checked );
		var template = $("#todoItemTemplate").html();
		var modelJson =  this.model.toJSON();
		modelJson.isCompleted = modelJson.COMPLETED == 0? false: true;
		console.log(modelJson);
		var html = Mustache.render(template,modelJson);
		this.$el.html(html);
		
		return this;
	}
});