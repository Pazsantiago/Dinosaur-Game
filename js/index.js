class Personaje{
	constructor(posx, posy, width, height, ctx){
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.posx = posx;
		this.posy = posy;
		this.imagePos = 0;
		this.img = new Image();
		this.img.src = "img/dino.png";
		this.speedy = 5;
		this.movy = 0;
		this.jumpHeight = 18;
		this.jumping = false;
		this.falling = false;
		this.playing = true;
	}
	jump(){ //Saltar
		if(this.jumping == true && this.playing == true){
			this.imagePos = 2;
			if(this.falling == false){
				this.posy -= this.jumpHeight;
			}
			if(this.posy <= canvas.height - this.jumpHeight - this.height - 130 && this.falling == false){
				this.falling = true; 
			}
			if(this.falling == true){
				this.posy += this.jumpHeight;
			}
			if(this.posy == canvas.height && this.falling == true){
				this.posy = canvas.height;
				this.jumping = false;
				this.falling = false;
			}
		}
	}

	bend(){
		this.height -= this.height / 2;
	} //Agacharse

	update(){
		if(this.jumping == false && this.playing == true){
			this.imagePos++;
		}
		if(this.imagePos > 1 && this.playing == true && this.jumping == false){
			this.imagePos = 0;
		}
	}
	draw(){
		// ctx.fillRect(this.posx, this.posy - this.height, this.width, this.height); // Hitbox Perfecta
		if(this.imagePos == 0){
			this.ctx.drawImage(this.img, 180, 1, 80, 90, this.posx , this.posy - this.height, this.width, this.height);
		}else if(this.imagePos == 1){
			this.ctx.drawImage(this.img, 268, 1, 80, 90, this.posx , this.posy - this.height, this.width, this.height);
		}else if(this.imagePos == 2){
			this.ctx.drawImage(this.img, 4, 1, 80, 90, this.posx , this.posy - this.height, this.width, this.height);
		}else{
			this.ctx.drawImage(this.img, 356, 1, 80, 90, this.posx , this.posy - this.height, this.width, this.height);
		}
	}
}
class Obstaculo{
	constructor(posx, posy, pos, ctx){
		this.ctx = ctx;
		this.widthSize = [120, 120];
		this.heightPos = pos;
		this.size = [200, 100]
		this.width = this.widthSize[this.heightPos];
		this.height = this.size[this.heightPos];
		this.posx = posx;
		this.posy = posy;
		this.img = new Image();
		this.img.src = "img/sprites.png";
		this.movx = 0;
		this.speedx = 10;
	}
//Agacharse

	update(){
		this.posx += -this.speedx;

		if(this.posx < 0 - this.width){
			this.posx = canvas.width;
		}
	}

	draw(){
		// this.ctx.fillRect(this.posx  - this.width - 20, this.posy - this.height, this.width, this.height); // Hitbox perfecta
		this.ctx.drawImage(this.img, 455, 3, 30, 64, this.posx  - this.width - 20, this.posy - this.height - 1, this.width, this.height);
	}
}

let canvas = document.getElementById("MyCanvas");
let ctx = canvas.getContext('2d');
let stopGame;
AdaptarCanvas();
window.requestAnimationFrame(gameplay);

let altoObstaculo = Math.floor(Math.random() * (1 - 0 + 1) + 0);

let dinosaurio = new Personaje(50, canvas.height, 160, 200, ctx);
let obstaculo = new Obstaculo(canvas.width, canvas.height,  altoObstaculo, ctx);
addEventListener("keydown", function(e){
	let letraPresionada = e.keyCode;
	if(letraPresionada == 32){
		dinosaurio.jumping = true;
	}
});
setInterval(function(){dinosaurio.update();}, 100);
function gameplay(){
	//Primero el fondo del juego... Dejar espacio y luego continuar con objetos
	addEventListener("resize", AdaptarCanvas);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	dinosaurio.draw();
	dinosaurio.jump();
	obstaculo.draw();
	obstaculo.update();
	DetectarColision();
	AltoDelEnemigo();
	window.requestAnimationFrame(gameplay);
}

function AltoDelEnemigo(){
	altoObstaculo = Math.floor(Math.random() * (1 - 0 + 1) + 0);
	obstaculo.altoObstaculo = altoObstaculo;
}

function DetectarColision(){
	if(obstaculo.posx - obstaculo.width - 20 < dinosaurio.posx + dinosaurio.width - 40 && obstaculo.posx - obstaculo.width - 20 > dinosaurio.posx 
		&& obstaculo.posy - obstaculo.height >= dinosaurio.posy - dinosaurio.height
		&& dinosaurio.posy >= obstaculo.posy){
			obstaculo.speedx = 0;
			dinosaurio.playing = false;
			dinosaurio.imagePos = 3;
			ctx.drawImage(obstaculo.img, 1147, 26, 337, 17,canvas.width / 2 - 300, canvas.height / 2 - 180, 600, 200);
			setTimeout(function(){window.location.reload(true);}, 2000);
	}
}
function AdaptarCanvas(){
 	canvas.width = parseInt(getComputedStyle(document.getElementById('juego')).getPropertyValue('width'));
    canvas.height = parseInt(getComputedStyle(document.getElementById('juego')).getPropertyValue('height'));
}
