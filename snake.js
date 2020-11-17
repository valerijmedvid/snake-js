// Listeners
document.addEventListener("keydown", keyPush)

// Canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const title = document.querySelector('h1')

// Game
let gameIsRunning = true

const tileSize = 30
let gameSpeed = 10
let score = 0

// Player
let snakeSpeed = tileSize
let snakeLength = 3
let snakePosX = 0
let snakePosY = canvas.height / 2

let velocityX = 1
let velocityY = 0

let tail = []

// Food
let foodPosX = 0
let foodPosY = 0

const tileCountX = canvas.width / tileSize
const tileCountY = canvas.height / tileSize


/**
* GAME LOOP
*/
function gameLoop() {
    if (gameIsRunning) {
        drawStuff()
        moveStuff()

    }

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
    if (snakePosX > canvas.width - tileSize) {
        snakePosX = 0
    }
    if (snakePosX < 0) {
        snakePosX = canvas.width
    }
    if (snakePosY > canvas.height - tileSize) {
        snakePosY = 0
    }
    if (snakePosY < 0) {
        snakePosY = canvas.height
    }


    // Game over
    tail.forEach(snakePart => {
        if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
            gameOver()
        }
    })

    // Tail
    tail.push({ x: snakePosX, y: snakePosY })
    tail = tail.slice(-1 * snakeLength)

    // Food collision
    if (snakePosX === foodPosX && snakePosY === foodPosY) {
        gameSpeed++
        snakeLength++
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
    rectangle("#00bfff", foodPosX, foodPosY, tileSize, tileSize)

    // Tail
    tail.forEach(snakePart => {
        rectangle("#555", snakePart.x, snakePart.y, tileSize, tileSize)
    })

    // Snake
    rectangle("black", snakePosX, snakePosY, tileSize, tileSize)
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
            rectangle("#fff", tileSize * i, tileSize * j, tileSize - 1, tileSize - 1)
        }
    }
}

// Randomize food position
function resetFood() {
    if (snakeLength === tileCountX * tileCountY) {
        gameOver()
    }

    foodPosX = Math.floor(Math.random() * tileCountX) * tileSize
    foodPosY = Math.floor(Math.random() * tileCountY) * tileSize

    // Don't spawn food on snake head
    if (foodPosX === snakePosX && foodPosY === snakePosY) {
        resetFood()
    }
    // Don't spawn food on any snake part
    if (tail.some(snakePart => snakePart.x === foodPosX && snakePart.y === foodPosY)) {
        resetFood()
    }
}

function gameOver() {
    title.innerHTML = `Game over. You score is <strong> ${score} </strong> `
    gameIsRunning = false
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
        default:
            if (!gameIsRunning) location.reload()
            break
    }
}
