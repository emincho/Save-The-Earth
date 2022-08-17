var character = document.getElementById("player");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];
var score = 0;
function moveLeft(){
    var left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    if(left>0){
        player.style.left = left - 2 + "px";
    }
}
function moveRight(){
    var left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    if(left<580){
        player.style.left = left + 2 + "px";
    }
}
document.addEventListener("keydown", (event)=>{
    if(both==0){
        both++;
        if(event.key==="a"){
            interval = setInterval(moveLeft, 1);
        }
        if(event.key==="d"){
            interval = setInterval(moveRight, 1);
        }
    }
});
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});

var blocks = setInterval(function(){
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if(blockLastTop<400||counter==0){
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 200 + "px";
        hole.style.top = holeLastTop + 200 + "px";
        var random = Math.floor(Math.random() * 560);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }
    var playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    var drop = 0;
    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
        if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop-20<playerTop && iblockTop>playerTop){
            drop++;
            if(iholeLeft<=playerLeft && iholeLeft+30>=playerLeft){
                drop = 0;
            }
        }
    }
    if(drop==0){
        if(playerTop<480){
       score++;
         document.getElementById('score').innerHTML = score;
        }
    }else{
   clearInterval(blocks);
    document.querySelector('.modal').style.display = 'block';
    document.getElementById('restart').onclick = function(){
document.location.href = ""
    }
    }
},1);