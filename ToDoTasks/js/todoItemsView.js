var TodoItemsView = Backbone.View.extend({
// Commented to make it look nice and it is in the render function
	// tagName : "ul",
	
	// id: "todoItems",
	id: "todoItemsContainer",
	initialize: function(options){
		if(!(options && options.model)){
			throw new Error("model is not specified");
		}
	this.model.on("add",this.onAddTodoItem,this);
	this.model.on("remove",this.onRemoveTodoItem,this);
	},
	
	events:{
		// Commeted as to use only enter
		// "click #add": "onClickAdd",
		"keypress #newTodoItem": "onKeyPress"
	},
	
	onKeyPress: function(e){
		if(e.keyCode == 13){
			// this.onClickAdd();
			var $textBox = this.$('#newTodoItem');
		
			if ($textBox.val()){
				var todoItem = new TodoItem({ "TITLE": $textBox.val() });
				// todoItem.save();
				// this.model.add(todoItem);
				this.model.create(todoItem);
				$textBox.val("");
			}
		}
	},
	
	onAddTodoItem: function(todoItem){
		var view = new TodoItemView({model : todoItem});

		// this.$el.append(view.render().$el);
		// Changing the el to todoItems
		this.$("#todoItems").append(view.render().$el);
	},
	
	onRemoveTodoItem: function(todoItem){
		this.$("li#"+todoItem.id).remove();
	},
	/* removed as we only use enter
	onClickAdd : function(){
		// console.log("Clicked");
		var $textBox = this.$('#newTodoItem');
		
		if ($textBox.val()){
			var todoItem = new TodoItem({ title : $textBox.val() });
			//todoItem.save();
			//this.model.add(todoItem);
			console.log(todoItem);
			this.model.create(todoItem);
			$textBox.val("");
		}
	},
	*/
	render: function(){
		var self = this;
		// commented after using template
		// this.$el.append("<input type ='text' autofocus id='newTodoItem'></input>");
		// this.$el.append("<button id='add'>Add</button>");
		// this.$el.append("<ul id ='todoItems'></ul>");
		var template = $("#todoItemsTemplate").html();
		var html = Mustache.render(template);
		
		this.$el.html(html);
		
		// Commented as this was written to use static models, after the rest api is used. onClickAdd is enough
		// this.model.each(function(todoItem){
			// var view = new TodoItemView({ model: todoItem});
			// self.$el.append(view.render().$el);
			
		// });
		return this;
	}
});