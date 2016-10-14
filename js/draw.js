var drawM = (function(){
	var snakeBody = function(x,y){
		ctx.strokeStyle = "darkgreen";
		ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
		ctx.fillStyle ="green";
		ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
	}

	var pizza = function(x,y){
		ctx.fillStyle = "red";
		ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
	}

	var scoreText = function(){
		var _scoreText = "Your Score: " + score;
		ctx.fillStyle = "black";
		ctx.fillText(_scoreText, 145, height-5);
	}

	var drawSnake = function(){
		var length = 5;
		snake = [];

		for( var i = 0; i < length; i ++ )
		{
			snake.push({x:i,y:0});
		}
	}

	var createFood = function() {
		food = {
			x: Math.floor(Math.random()*30),
			y: Math.floor(Math.random()*30)
		}

		for (var i = 0; i < snake.length; i++) {
			 var snakeX = snake[i].x;
			 var snakeY = snake[i].y;

			 if ( food.x === snakeX || food.y === snakeY || (food.x === snakeX && food.y === snakeY ) ) 
			 {
			 		food.x = Math.floor( Math.random()*30 );
			 		food.y = Math.floor( Math.random()*30 );
			 }
		}
	}

	var checkCollision = function(x, y, array) {
		for( var i = 0; i < array.length; i++ )
		{
			if (array[i].x === x && array[i].y === y) 
			{
				return true;
			}

			return false;
		}
	}

	var paint = function() {
		ctx.fillStyle = "lightgrey";
		ctx.fillRect(0,0, width, height);

		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, width, height);

		btn.setAttribute("disabled", true);

		var snakeX = snake[0].x;
		var snakeY = snake[0].y;

		if ( direction === "right") 
		{
			snakeX ++;
		}
		else if ( direction === "left")
		{
			snakeX --;
		}
		else if ( direction === "up")
		{
			snakeY --;
		}
		else if ( direction === "down")
		{
			snakeY ++;
		}

		if ( snakeX === -1 || snakeX === width/snakeSize || snakeY === -1 || snakeY === height/snakeSize || checkCollision(snakeX, snakeY, snake) )
		{
			btn.removeAttribute("disabled", true);

			ctx.clearRect(0,0, width, height);
			score = 0;
			gameloop = clearInterval(gameloop);
			return;
		}

		if ( snakeX === food.x && snakeY === food.y) 
		{
			var tail = {
				x: snakeX,
				y: snakeY
			};

			score++;

			createFood();
		} else {
			var tail = snake.pop();
			tail.x = snakeX;
			tail.y = snakeY;
		}

		snake.unshift(tail);

		for ( var i = 0; i < snake.length; i++ ) {
			snakeBody(snake[i].x, snake[i].y);
		}

		pizza(food.x, food.y);

		scoreText();
	}

	var init = function() {
		direction = "down";
		drawSnake();
		createFood();
		gameloop = setInterval(paint, 120);
	}

	return {
		init: init
	};


}());