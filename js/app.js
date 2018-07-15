var velocity = 80;
var size = 10;

class object {
	constructor(){
		this.size = size;
	}
	end(obj){
		var difx = Math.abs(this.x - obj.x);
		var dify = Math.abs(this.y - obj.y);
		if(difx >= 0 && difx < size && dify >= 0 && dify < size){
			return true;
		} else {
			return false;
		}
	}
}

class Snake extends object {
	constructor(x,y){
		super();
		this.x = x;
		this.y = y;
		this.next = null;
	}
	paint(ctx){
		if(this.next != null){
			this.next.paint(ctx);
		}
		ctx.fillStyle = "#FC6205";
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
	setxy(x,y){
		if(this.next != null){
			this.next.setxy(this.x, this.y);
		}
		this.x = x;
		this.y = y;
	}
	add(){
		if(this.next == null){
			this.next = new Snake(this.x, this.y);
		} else {
			this.next.add();
		}
	}
	addNext(){
		return this.next;
	}
}

class Food extends object {
	constructor(){
		super();
		this.x = this.generate();
		this.y = this.generate();
	}
	generate(){
		var num = (Math.floor(Math.random() * 59))*10;
		return num;
	}
	position(){
		this.x = this.generate();
		this.y = this.generate();
	}
	paint(ctx){
		ctx.fillStyle = "#6BF33F";
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
}
//Objetos del juego
var snake = new Snake(20,20);
var food = new Food();
var ejex = true;
var ejey = true;
var xdir = 0;
var ydir = 0;
function movement(){
	var nx = snake.x+xdir;
	var ny = snake.y+ydir;
	snake.setxy(nx,ny);
}
function control(event){
	var cod = event.keyCode;
	if(ejex){
		if(cod == 38){
			ydir = -size;
			xdir = 0;
			ejex = false;
			ejey = true;
		}
		if(cod == 40){
			ydir = size;
			xdir = 0;
			ejex = false;
			ejey = true;
		}
	}
	if(ejey){
		if(cod == 37){
			ydir = 0;
			xdir = -size;
			ejey = false;
			ejex = true;
		}
		if(cod == 39){
			ydir = 0;
			xdir = size;
			ejey = false;
			ejex = true;
		}
	}
}

function gameOver(){
	xdir = 0;
	ydir = 0;
	ejex = true;
	ejey = true;
	snake = new Snake(20,20);
	food = new Food();
	alert("Perdiste");
}
function shockWall(){
	if(snake.x < 0 || snake.x > 590 || snake.y < 0 || snake.y > 590){
		gameOver();
	}
}
function bodyShock(){
	var temp = null;
	try{
		temp = snake.addNext().addNext();
	}catch(err){
		temp = null;
	}
	while(temp != null){
		if(snake.end(temp)){
			gameOver();
		} else {
			temp = temp.addNext();
		}
	}
}

function paint(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0, canvas.width, canvas.height);
	//aquí abajo va todo el dibujo
	snake.paint(ctx);
	food.paint(ctx);
}
function main(){
	bodyShock();
	shockWall();
	paint();
	movement();
	if(snake.end(food)){
		food.position();
		snake.add();
	}
}
setInterval("main()", velocity);

