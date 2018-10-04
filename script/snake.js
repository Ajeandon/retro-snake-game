let Snake = function(){

    this.dir = null;
    
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.speed = 20;
    this.scl = 20;
    
    this.tail = [] // tail obj = {x : 0, y : 0}
}

Snake.prototype.move = function(){

    if(this.dir == M_UP){
	this.xspeed = 0;
	this.yspeed = this.speed * -1;
	
    }else if(this.dir == M_RIGHT){
	this.xspeed = this.speed;
	this.yspeed = 0;
	
    }else if(this.dir == M_DOWN){
	this.xspeed = 0;
	this.yspeed = this.speed;
	
    }else if(this.dir == M_LEFT){
	this.xspeed = this.speed * -1;
	this.yspeed = 0;
    }

    this.x += this.xspeed;
    this.y += this.yspeed;

    if(this.x >= canvas.width && this.dir == M_RIGHT){ // right
	this.x = 0;
    }else if(this.y >= canvas.height && this.dir == M_DOWN){ // bottom
	this.y = 0;
    }else if(this.x < 0 && this.dir == M_LEFT){ // left
	this.x = canvas.width - this.scl;
    }else if(this.y < 0 && this.dir == M_UP){ // top
	this.y = canvas.height - this.scl;
    }
}

Snake.prototype.eat = function(food_x, food_y){
    snake = this;
    if(this.x == food_x && this.y == food_y){
	if(this.tail.length == 0)
	    this.tail.push({x: snake.x, y: snake.y});
	else
	    this.tail.push({x: snake.tail[snake.tail.length - 1].x, y: snake.tail[snake.tail.length - 1].y});
	
	return true;
    }
    return false;
}

Snake.prototype.isDeath = function(){
    let snake = this, i = 0;
    
    for(i = 0; i < snake.tail.length; i++){
	if(snake.x == snake.tail[i].x && snake.y == snake.tail[i].y)
	    return true;
    }
    
    return false;
}


let Food = function(){
    this.x = 0;
    this.y = 0;
    this.scl = 20;
    this.color = 'orange';
}

Food.prototype.newPos = function(xMax, yMax){
   // this.x = Math.ceil(Math.random() * xMax);
   // this.y = Math.ceil(Math.random() * yMax);

    this.x = rand(xMax, this.scl);
    this.y = rand(yMax, this.scl);
}

function rand(maxNum, factorial) { 
    let n = Math.floor(Math.floor(Math.random() * (maxNum + factorial)) / factorial) * factorial;

    if(n < 0 || n > maxNum)
	n = rand(maxNum, factorial);
    
    return n;
};
