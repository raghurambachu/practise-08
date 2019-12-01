function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}


function getCurrentPositon(object){

    let position = {};

    if( object.style.top === '' &&  object.style.left=== ''){
        position.x = 0;
        position.y = 0;
        return position
    }

    
    // availWidth = parseInt(.slice(0,-2))-150;
    // availHeight =parseInt(window.screen.availHeight.slice(0,-2))-150;

    
    position.x = parseInt( object.style.left.slice(0,-2));
    position.y = parseInt( object.style.top.slice(0,-2));

   let availWidth =(window.innerWidth) -200;
   let availHeight =(window.innerHeight) -200;

   //Code to not escape on right side of the screen
    if(position.x > availWidth)
        position.x = availWidth;
    if(position.y >  availHeight)
        position.y = availHeight;


    //code to not escape from left side of the screen
    if(position.x < 50 )
        position.x = 0;
    if(position.y < 50)
        position.y = 0;

   console.log(position); 
   
    return position;

}

function moveMario(direction){

    const currPosition = getCurrentPositon(mario);
    switch(direction){
        case 'ArrowRight':
                currPosition.x += 50;
                mario.style.left = `${currPosition.x}px` ;
                mario.style.top = `${currPosition.y}px` ;
                mario.style.transform = 'scale(1,1)';
                break;
        case 'ArrowLeft' :
                currPosition.x -= 50;
                mario.style.left = `${currPosition.x}px` ;
                mario.style.top = `${currPosition.y}px` ;
                mario.style.transform = 'scale(-1,1)';
                break;
        case 'ArrowUp'  :
                currPosition.y -= 50;
                mario.style.left = `${currPosition.x}px` ;
                mario.style.top = `${currPosition.y}px` ;
                break;
        case 'ArrowDown':
                currPosition.y += 50;
                mario.style.left = `${currPosition.x}px` ;
                mario.style.top = `${currPosition.y}px` ;

    }
}


function moveCoin(){

    let randomX = Math.floor(Math.random()* window.innerWidth)-100;
    let randomY = Math.floor(Math.random()* window.innerHeight)-100;

    // Ensure coin does'nt go on below zero on left hand side and top side
    if(randomX < 50)
        randomX += 75;
    if(randomY < 50)
        randomY += 75;

    if(randomX-150 > window.innerWidth)
        randomX -=150

    

    coin.style.left = `${randomX}px`;
    coin.style.top  = `${randomY}px`;
}

const mario = document.querySelector('.mario img');
const coin = document.querySelector('.coin img');
let scoreCard = document.querySelector('.score');
let header = document.createElement('h1');
let score = 0;

document.body.addEventListener('keyup',function(event){
       moveMario(event.key);

       if(isTouching(mario,coin)){
             score++;
             header.innerHTML = `Score : <br> <b>${score}</b>`
             scoreCard.appendChild(header);
             moveCoin();
       }
          
})

const restartButton = document.querySelector('.restart-btn');
restartButton.addEventListener('click',function(){
    console.log('entered')
    document.location.reload();
})