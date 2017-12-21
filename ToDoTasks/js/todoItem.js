var TodoItem = Backbone.Model.extend({
	defaults:{
		COMPLETED: 0
	},
	idAttribute: "ID",
	
	//urllRoot: "https://jsonplaceholder.typicode.com/todos",
	urlRoot: function (){
		//console.log("this.ID " + this.id);
    		return this.id? "tasks.php?id=" + this.id : "tasks.php";
    		//return "tasks.php?ID=3";
  	},
	
	 validate: function(attr){
		if(!attr.TITLE){
		console.log(attr.TITLE);
			//throw new Error();
			return "Title is required";
		 }
	 },
	
	toggle: function(){
		this.set("COMPLETED",this.get("COMPLETED") == 0? 1 : 0);
	}
});