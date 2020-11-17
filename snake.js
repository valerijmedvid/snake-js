// Listeners
document.addEventListener("keydown", keyPush)

// Canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

// Player
const snakeSize = 50

let snakeSpeed = 5
let snakePosX = 0
let snakePosY = canvas.height / 2 - snakeSize / 2

let velocityX = 1
let velocityY = 0


// loop
function gameLoop() {
    drawStuff()
    moveStuff()

    requestAnimationFrame(gameLoop)
}

gameLoop()


/**
 *  MOVE EVERYTHING
 */
function moveStuff() {
    snakePosX += snakeSpeed * velocityX
    snakePosY += snakeSpeed * velocityY

    if (snakePosX > canvas.width) {
        snakePosX = 0
    }
    if (snakePosX < -snakeSize) {
        snakePosX = canvas.width
    }
    if (snakePosY > canvas.height) {
        snakePosY = 0
    }
    if (snakePosY < - snakeSize) {
        snakePosY = canvas.height
    }
}

/**
 *  DRAW EVERYTHING  
 */
function drawStuff() {
    rectangle("white", 0, 0, canvas.width, canvas.height)
    rectangle("black", snakePosX, snakePosY, snakeSize, snakeSize)

}

// Draw rectangle
function rectangle(color, x, y, width, height) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
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
