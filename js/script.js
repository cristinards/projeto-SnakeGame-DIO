let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //renderiza o desenho
let box = 32;

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

//movimento da cobrinha
let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //desenhar a caixa do jogo

}

//add elemento e retirar o ultimo - array
function criarCobrinha(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//desenho da comida da cobrinha
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}


//captar os movimentos da tecla para função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

//funcao para carregar o jogo de tempos em tempos
function iniciarJogo(){

    // evitar que a cobrinha saia da caixa
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //verificar se a cabeça da cobrinha bate no corpo
    for(i=1; i<snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("GAME OVER :( ");
            location.reload();
            
        }
    }

    criarBG();
    criarCobrinha();
    drawFood()

    //setar ponto inicial da cobrinha
    let snakeX= snake[0].x;
    let snakeY = snake[0].y;

    //coordenadas da cobrinha
    if(direction == "right") snakeX+=box;
    if(direction == "left") snakeX-=box;
    if(direction == "up") snakeY-=box;
    if(direction == "down") snakeY+=box;

    //acrescentar ou decrementar o tamanho da cobrinha
    if(snakeX != food.x || snakeY != food.y){
        //retirar o ultimo elemento do array
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    //cabeca da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);



