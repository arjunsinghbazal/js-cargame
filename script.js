const gameScore = document.querySelector(".gameScore");
const gameStart = document.querySelector(".gameStart");
const gameArea = document.querySelector(".gameArea");

gameStart.addEventListener('click',start);
let keys = {ArrowUp:false,ArrowDown:false,ArrowRight:false,ArrowLeft:false};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
// document.addEventListener('keyleft',keyUp);
// document.addEventListener('keyup',keyUp);

let player = {speed:5,score:0};
function keyDown(e){
e.preventDefault();
keys[e.key] = true;
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

function collide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom)||(
        aRect.bottom < bRect.top)||(
            aRect.right < bRect.left)||(
                aRect.left > bRect.right))
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
    })}

function endGame(){
player.start=false;
gameStart.classList.remove('hide');
gameStart.innerHTML="Game Over <br>final score :-  "+player.score+"<br>Press here to restart the Game"
}

function movesEnemies(car){
        let enemies=document.querySelectorAll('.enemies');
       
        //move one by one line
    
        enemies.forEach(function(items){
        if(collide(car,items)){
            console.log("boom")
            endGame();
        }
        if(items.y>=750){
            items.y=-300;
            items.style.left=Math.floor(Math.random()*350)+"px";
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
    movesEnemies(car);
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
    // console.log(player.score++);

    player.score++;
    let fscore=player.score-1;
    gameScore.innerText = "Score: "+ fscore;
}

}
function start(){
    // gameArea.classList.remove('hide');

    gameStart.classList.add('hide');
    gameArea.innerHTML="";
    player.start=true;
    player.score=0;
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
    
function randomcolor(){
    function c(){
        let hexa = Math.floor(Math.random()*256).toString(16);
        return ("0"+ String(hexa)).substr(-2);
    }
    return "#"+c()+c()+c();
}

    for(x=0;x<3;x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemies');
        enemyCar.y=((x+1)*350)*-1;
        enemyCar.style.top=(enemyCar.y)+"px";
        enemyCar.style.backgroundColor=randomcolor();
        enemyCar.style.left=Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(enemyCar);
    }
}




