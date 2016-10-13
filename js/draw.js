var draw = (function(){
	var snakeBody = function(x,y){
		ctx.strokeStyle = "darkgreen";
		ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
		ctx.fillstyle ="green";
		ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
	}

	var pizza = function(x,y){

	}
}());