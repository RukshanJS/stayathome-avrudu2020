var myGamePiece;
var pole = new Image();
pole.src = "poleDone.png";
var climberMan = new Image();
climberMan.src = "man.png";
//var climberMan=document.getElementById("image");
var background = new Image();
background.src = "back.jpeg";
var isGameOver=false;
const gameWidth=window.screen.availWidth*0.9;
const gameHeight=window.screen.availHeight*0.9;
var mySpriteWidth;
var mySpriteHeight;

function startGame() {
    var HW_RATIO = gameHeight/gameWidth;
    mySpriteWidth=100*HW_RATIO;
    mySpriteHeight=100*HW_RATIO;
    myGamePiece = new mySprite(mySpriteWidth, mySpriteHeight, climberMan, gameWidth/2, gameHeight);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.getElementById("game"),
    start : function() {
        this.canvas.position="absolute";
        this.canvas.width = gameWidth;
        this.canvas.height = gameHeight;
        this.context = this.canvas.getContext("2d");
        
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        if (!isGameOver){
            this.interval = setInterval( function() { updateGameArea(); }, 20);
        }
        else{
            this.interval.clear();
        }
        
    },
    /*stop : function() {
        clearInterval(this.interval);
    },*/    
    /*clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },   */ 
}

function mySprite(width, height, img, x, y, type){
    let tmpImgX, tempImgY;
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = 0.1;
    this.gravitySpeed = 0;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.drawImage(background, 0, 0, gameWidth, gameHeight);
        ctx.drawImage(pole, gameWidth/4, 0, gameWidth/2, gameHeight);
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        isAtStart = false;
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            myGamePiece.gravity=0;
            isAtStart = true;
        }
    }
    this.hitTop = function() {
        var winTop = 30;//bad to hardcode. need some way to get it automatically.
        if (this.y < winTop) {
            this.y = winTop;
            alert("CONGRATULATIONS!!! YOU HAVE WON THE LISSANA GAHA AVRUDU CHALLENGE!!!");//exit the program.
            isGameOver=true;           
        }
    }
}

function updateGameArea() {
    //myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function accelerate(n) {
    //animateScript();
    if (isAtStart){
        myGamePiece.gravity = -1.0;
        
    }
    else{
        myGamePiece.gravity = n;
    }

    animateScript();

    //myGamePiece.gravity = n;
    var delayInMilliseconds = 50.0; //48.0 milisecond. decrease to increase difficulty. got by trial and error.
    setTimeout(function(n) {
        //your code to be executed after 1 second
        myGamePiece.gravity = 0.1;//initial gravity value
    }, delayInMilliseconds);     
}

//sprite animation
var tID; //we will use this variable to clear the setInterval()

function stopAnimate() {
  clearInterval(tID);
} //end of stopAnimate()

function animateScript() {
    var    position = 233; //start position for the image slicer
    const  interval = 100; //100 ms of interval for the setInterval()
    tID = setInterval ( () => {
        document.getElementById("image").style.backgroundPosition = 
            `-${position}px 0px`;
        //we use the ES6 template literal to insert the variable "position"
        if (position < 1400)
            { position = position + 233;}
            //we increment the position by 256 each time
        else
            { position = 233; }
            //reset the position to 256px, once position exceeds 1536px
        }
    , interval ); //end of setInterval
}   //end of animateScript()



