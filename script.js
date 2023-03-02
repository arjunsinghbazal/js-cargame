const gameScore = document.querySelector(".gameScore");
const gameStart = document.querySelector(".gameStart");
const gameArea = document.querySelector(".gameArea");

gameStart.addEventListener('click',start);
let keys = {ArrowUp:false,ArrowDown:false,ArrowRight:false,ArrowLeft:false};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
// document.addEventListener('keyleft',keyUp);
// document.addEventListener('keyup',keyUp);

let player = {speed:5};
function keyDown(e){
e.preventDefault();
keys[e.key] = true;
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}
function moveslines(){
    let lines=document.querySelectorAll('.lines');
   
    //move one by one line

    lines.forEach(function(items){
    if(items.y>=700){
        items.y-=750;
    }
    items.y+=player.speed;
    items.style.top=(items.y)+"px";
    })

}
function startPlay(){
    let car = document.querySelector('.car');
   let road = gameArea.getBoundingClientRect();



if(player.start){

    moveslines();

    if(keys.ArrowUp && player.y>road.top+70){
        player.y-=player.speed;
    }
    if(keys.ArrowDown && player.y<(road.bottom-70) ){
player.y+=player.speed;
    }
   if(keys.ArrowLeft && player.x>0){
        player.x-=player.speed;;
            }
   if(keys.ArrowRight &&player.x<(road.width-50)){
                player.x+=player.speed;
                    }

   car.style.top = player.y+"px";
   car.style.left = player.x+"px";

    window.requestAnimationFrame(startPlay);
}

}
function start(){
    gameArea.classList.remove('hide');
    gameStart.classList.add('hide');

    player.start=true;
    window.requestAnimationFrame(startPlay);
    
    for(x=0;x<5;x++){
        let roadline = document.createElement('div');
        roadline.setAttribute('class','lines');
        roadline.y=x*150;
        roadline.style.top=(roadline.y)+"px";
        gameArea.appendChild(roadline);
    }



    ///create div and gave class with help of js
    let car=document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText="hey i am ur car";
    gameArea.appendChild(car);
    
    player.x=car.offsetLeft;
    player.y=car.offsetTop;

    for(x=0;x<3;x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y=x*150;
        enemyCar.style.top=(enemyCar.y)+"px";
        enemyCar.style.background='blue';
        enemyCar.style.left=Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(enemyCar);
    }
}



