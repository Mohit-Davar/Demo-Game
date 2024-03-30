const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

const gravity = 0.5
let scrollOffset = 0

const platform = new Image()
platform.src = './Images/platform.png'
const hills = new Image()
hills.src = './Images/hills.png'
const background = new Image()
background.src = './Images/background.png'
const jump = new Image()
jump.src = './Images/platformSmallTall.png'

const RunLeft = new Image()
RunLeft.src = './Images/spriteRunLeft.png'
const RunRight = new Image()
RunRight.src = './Images/spriteRunRight.png'
const standLeft = new Image()
standLeft.src = './Images/spriteStandLeft.png'
const standRight = new Image()
standRight.src = './Images/spriteStandRight.png'


//Player
class Player {
    constructor() {
        this.speed = 5
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 20
        }
        this.width = 66
        this.height = 150
        this.frame = 0
        this.sprite = {
            stand: {
                right: standRight,
                left: standLeft,
                cropWidth: 177,
                width: 66
            },
            run: {
                right: RunRight,
                left: RunLeft,
                cropWidth: 340,
                width: 127.875
            }
        }
        this.currentSprite = this.sprite.stand.right
        this.curreentCropWidth = this.sprite.stand.cropWidth
    }
    draw() {
        c.drawImage(
            this.currentSprite,
            this.curreentCropWidth * this.frame,
            0,
            this.curreentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }
    update() {
        if (this.frame > 59 && this.currentSprite === this.sprite.stand.right) {
            this.frame = 0
        }
        if (this.frame > 29 && this.currentSprite === this.sprite.run.right) {
            this.frame = 0
        }
        if (this.frame > 59 && this.currentSprite === this.sprite.stand.left) {
            this.frame = 0
        }
        if (this.frame > 29 && this.currentSprite === this.sprite.run.left) {
            this.frame = 0
        }
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }
    }
}
let player = new Player()






//Platforms
class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
let platforms = []



//Generic Objects
class GenericObject {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
let genericObjects = []



//Keys
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}









//Restarting The game
function init() {
    player = new Player()

    platforms = [
        new Platform({
            x: platform.width * 7 + 950 - 4 - jump.width,
            y: 250 - jump.height + 120,
            image: jump
        }),
        new Platform({
            x: platform.width * 3 - jump.width + 200,
            y: 250,
            image: jump
        }),
        new Platform({
            x: platform.width * 6 + 950 - jump.width,
            y: 250,
            image: jump
        }),
        new Platform({
            x: platform.width * 6 + 950 - 4,
            y: 250,
            image: jump
        }),
        new Platform({
            x: platform.width * 7 + 950 - 4 - jump.width,
            y: 250,
            image: jump
        }),
        new Platform({
            x: platform.width * 9 + 1590 - 2,
            y: 451,
            image: jump
        }), new Platform({
            x: platform.width * 10 + 1590 - 2,
            y: 250,
            image: jump
        }), new Platform({
            x: platform.width * 11 + 1680 - 2,
            y: 250,
            image: jump
        }), new Platform({
            x: platform.width * 15 - 2,
            y: 250,
            image: jump
        }), new Platform({
            x: 0,
            y: 451,
            image: platform
        }), new Platform({
            x: platform.width - 2,
            y: 451,
            image: platform

        }), new Platform({
            x: platform.width * 2 + 200,
            y: 451,
            image: platform
        }), new Platform({
            x: platform.width * 3 + 650,
            y: 451,
            image: platform
        }), new Platform({
            x: platform.width * 4 + 800,
            y: 451 - platform.height - 100,
            image: jump
        }), new Platform({
            x: platform.width * 5 + 950,
            y: 451,
            image: platform
        }), new Platform({
            x: platform.width * 6 + 950 - 2,
            y: 451,
            image: platform
        }), new Platform({
            x: platform.width * 7 + 950 - 6,
            y: 250 - jump.height + 120,
            image: platform
        }), new Platform({
            x: platform.width * 8 + 1370 - 2,
            y: 250,
            image: platform
        }), new Platform({
            x: platform.width * 15 + jump.width + 200 - 2,
            y: 451,
            image: platform
        }), new Platform({
            x: platform.width * 16 + jump.width + 450 - 2,
            y: 230,
            image: platform
        })]


    genericObjects = [
        new GenericObject(
            {
                x: -1,
                y: -1,
                image: background
            }
        )
        ,
        new GenericObject({
            x: -1,
            y: -1,
            image: hills
        })
    ]
    scrollOffset = 0
}



//Animation(Movement) on Screen
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.width, canvas.height)
    genericObjects.forEach((genericObject) => {
        genericObject.draw()
    })
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()


    if (keys.right.pressed && player.position.x <= 450) {
        player.velocity.x = player.speed
    }
    else if ((keys.left.pressed && player.position.x >= 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed

    }
    else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= player.speed * 0.66
            })

        }
        else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += player.speed * 0.66
            })
        }
    }
    //Collision Detection between player and platform
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })



    //Win Condition
    if (scrollOffset > platform.width * 16 + jump.width + 450 - 2) {
        document.body.innerHTML="You Won"
    }


    //Lose Condition
    if (player.position.y > canvas.height) {
        init()
    }


}
init()
animate()



















//Key Updates
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case " ":
            if (e.repeat) { repeat }
            if (player.velocity.y === 0) {
                player.velocity.y -= 15
            }
            break
        case "d":
            keys.right.pressed = true
            player.currentSprite = player.sprite.run.right
            player.curreentCropWidth = player.sprite.run.cropWidth
            player.width = player.sprite.run.width
            break
        case "a":
            keys.left.pressed = true
            player.currentSprite = player.sprite.run.left
            player.curreentCropWidth = player.sprite.run.cropWidth
            player.width = player.sprite.run.width
            break
    }
})
window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "d":
            keys.right.pressed = false
            player.currentSprite = player.sprite.stand.right
            player.curreentCropWidth = player.sprite.stand.cropWidth
            player.width = player.sprite.stand.width
            break
        case "a":
            keys.left.pressed = false
            player.currentSprite = player.sprite.stand.left
            player.curreentCropWidth = player.sprite.stand.cropWidth
            player.width = player.sprite.stand.width
            break
    }
})
//Looping through frames
setInterval(() => {
    player.frame++
}, 25)
//Done in 400 lines 