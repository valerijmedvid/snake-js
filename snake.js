// Listeners
document.addEventListener("keydown", keyPush)

// Canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const title = document.querySelector('h1')

// Game
const snakeSize = 30
let gameSpeed = 10
let score = 0

// Player
let snakeSpeed = snakeSize
let snakePosX = 0
let snakePosY = canvas.height / 2

let velocityX = 1
let velocityY = 0

// Food
let foodPosX = 0
let foodPosY = 0

const tileCountX = canvas.width / snakeSize
const tileCountY = canvas.height / snakeSize


/**
* GAME LOOP
*/
function gameLoop() {
    drawStuff()
    moveStuff()

    setTimeout(gameLoop, 1000 / gameSpeed)
}

resetFood()
gameLoop()


/**
*  MOVE EVERYTHING
*/
function moveStuff() {
    snakePosX += snakeSpeed * velocityX
    snakePosY += snakeSpeed * velocityY

    // Wall collision
    if (snakePosX > canvas.width - snakeSize) {
        snakePosX = 0
    }
    if (snakePosX < 0) {
        snakePosX = canvas.width
    }
    if (snakePosY > canvas.height - snakeSize) {
        snakePosY = 0
    }
    if (snakePosY < 0) {
        snakePosY = canvas.height
    }

    // Food collision
    if (snakePosX === foodPosX && snakePosY === foodPosY) {
        gameSpeed++
        title.textContent = ++score
        resetFood()
    }
}


/**
 *  DRAW EVERYTHING  
 */
function drawStuff() {
    // Background
    rectangle("#ffbf00", 0, 0, canvas.width, canvas.height)

    // Grid
    drawGrid()

    // Food
    rectangle("#00bfff", foodPosX, foodPosY, snakeSize, snakeSize)

    // Snake
    rectangle("black", snakePosX, snakePosY, snakeSize, snakeSize)
}

// Draw rectangle
function rectangle(color, x, y, width, height) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

// Draw grid
function drawGrid() {
    for (let i = 0; i < tileCountX; ++i) {
        for (let j = 0; j < tileCountY; ++j) {
            rectangle("#fff", snakeSize * i, snakeSize * j, snakeSize - 1, snakeSize - 1)
        }
    }
}

// Randomize food position
function resetFood() {
    foodPosX = Math.floor(Math.random() * tileCountX) * snakeSize
    foodPosY = Math.floor(Math.random() * tileCountY) * snakeSize
}


/**
 *  KEYBOARD
 */

function keyPush(event) {
    switch (event.key) {
        case "ArrowLeft":
            if (velocityX !== 1) {
                velocityX = -1
                velocityY = 0
            }
            break
        case "ArrowUp":
            if (velocityY !== 1) {
                velocityX = 0
                velocityY = -1
            }
            break
        case "ArrowRight":
            if (velocityX !== -1) {

                velocityX = 1
                velocityY = 0
            }
            break
        case "ArrowDown":
            if (velocityY !== -1) {
                velocityX = 0
                velocityY = 1
            }
            break
    }
}
