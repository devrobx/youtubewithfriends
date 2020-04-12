const canvas = document.getElementById('gameCanvas');



window.onload = function () {
    canvas.width = 650
    canvas.height = 580

    // game.appendChild(canvas)

    //Draw Elements
    pen = canvas.getContext('2d')

    //Mouse Events
    document.addEventListener('mousemove', onMouseMove, false)
    document.addEventListener('mousedown', onMouseClick, false)

    const title = document.createElement('h3');
    title.innerText = "Welcome to Space Shooter";
    canvas.appendChild(title);

    fighter = new this.Image();
    fighter.src = '/figher.jpg'

    bullet - new this.Image()
    bullet.src = '/bullet.jpg'

    enemy = new this.Image()
    enemy.src = './enemy.jpg'

    let fps = 30

    this.setInterval(update , 1000/fps);
    this.setInterval(spawn, 1000);
    
}

let x = 100;
let y = 100;
let pSpeed = 15;
let pDim = 30;

let enemies = []
let enemyDim = 25;
let enemySpeed = 10;

let shots = []
let shotDim = 4;
let shotSpeed = 7;

let lives = 3;
let score = 0;



function update() {
      //Create Background
  pen.fillStyle = "black";
  pen.fillRect(0,0,canvas.width,canvas.height);


  if(lives > 0) {
      pen.beginPath()
      pen.font = "30px Arial"
      pen.fillStyle = "white"
      pen.fillText(`Lives: ${lives} Score: ${score}`,350,30);

      pen.fillStyle = "green";
      pen.drawImage(fighter,
        x - pDim / 2,
        y - pDim / 2,
        pDim, pDim);
  }

}

function onMouseMove(){
  console.log('mouse move function')
}
function onMouseClick(){
  console.log('mouse click function')
}