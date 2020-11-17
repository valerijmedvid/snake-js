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


function gameLoop() {
    drawStuff()
    // moveStuff()

    requestAnimationFrame(gameLoop)
}

gameLoop()


/**
 *  MOVE EVERYTHING
 */
function moveStuff() {
    snakePosX += snakeSpeed
    if (snakePosX > canvas.width) {
        snakePosX = 0
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
            snakePosX -= snakeSpeed
            break
        case "ArrowUp":
            snakePosY -= snakeSpeed
            break
        case "ArrowRight":
            snakePosX += snakeSpeed
            break
        case "ArrowDown":
            snakePosY += snakeSpeed
            break
    }
}
