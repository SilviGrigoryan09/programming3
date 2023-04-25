var socket = io()
let side = 30

function setup() {
       
        createCanvas(20 * side, 20 * side)
}

function changeColor(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                fill("blue")
                        }
                        else if (matrix[y][x] == 2) {
                                fill("yellow")
                        } else if (matrix[y][x] == 3) {
                                fill("red")
                        } else if (matrix[y][x] == 4) {
                                fill("violet")
                        } else if (matrix[y][x] == 11) {
                                fill("aqua")
                        } else if (matrix[y][x] == 5) {
                                fill("magenta")
                        }else{
                                fill("gray")
                        }
                        rect(x * side, y * side, side, side)

                }

        } 
        
}

socket.on('send matrix',changeColor)

