let canvas, ctx, snake, food, start = null, speed = 65;

let food_color = [
    "blue",
    "orange",
    "brown",
    "yellow",
    "purple"
];

const M_UP = 38,
      M_RIGHT = 39,
      M_DOWN = 40,
      M_LEFT = 37;

function setup(){
    canvas = document.getElementById('snake');
    canvas.width = '600';
    canvas.height = '500';

    ctx = canvas.getContext('2d');

    snake = new Snake();
    food = new Food();
    
    food.newPos(canvas.width - snake.scl, canvas.height - snake.scl);
}

function update(timestamp){
    
    if(start === null)
	start = timestamp;

    let progress = timestamp - start;

    if(progress >= speed){

	// clear all canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// snake update ---
	headPos = {x: snake.x, y: snake.y};
	snake.move();

	if(snake.isDeath()){
	    setup();
	    alert('GAME OVER');
	}
	

	if(snake.eat(food.x, food.y)){
	    food.newPos(canvas.width - snake.scl, canvas.height - snake.scl);
	    food.color = food_color[Math.floor(Math.random() * food_color.length)];

	    console.log(food.color);
	}

	ctx.fillStyle ='green';
	ctx.fillRect(snake.x, snake.y, snake.scl, snake.scl); // draw head


	ctx.fillStyle ='#ff0000';
	let i;
	for(i = snake.tail.length - 1; i > 0; i--){
	    snake.tail[i].x = snake.tail[i - 1].x;
	    snake.tail[i].y = snake.tail[i -1].y;
	    ctx.fillRect(snake.tail[i].x, snake.tail[i].y, snake.scl, snake.scl)
	}

	if(snake.tail.length > 0){
	    snake.tail[0].x = headPos.x;
	    snake.tail[0].y = headPos.y;
	    ctx.fillRect(snake.tail[0].x, snake.tail[0].y, snake.scl, snake.scl);
	}
	    

	// food update
	ctx.fillStyle = food.color;
	ctx.fillRect(food.x, food.y, food.scl, food.scl);

	// draw score
	ctx.fillStyle = 'orange';
	ctx.font = '16px sans-serif';
	ctx.fillText("Score : " + snake.tail.length, 10, 20);
	
	start = null;
    }

    requestAnimationFrame(update);  
}

function keyPressed(e){
    snake.dir = e.keyCode;
}

requestAnimationFrame(update);

document.addEventListener('keydown', function(e){keyPressed(e);});

setup();
