var socket = io()
let side = 30


function setup() {

        createCanvas(20 * side, 20 * side)
}
socket.on("Winter", function (data) {
        weath = data;
})
socket.on("Summer", function (data) {
        weath = data;
})
socket.on("Spring", function (data) {
        weath = data;
})
socket.on("Autumn", function (data) {
        weath = data;
})
var weath = "spring";
function changeColor(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {

                        if (matrix[y][x] == 1) {
                                if (weath == "spring") {
                                        fill("blue");
                                }
                                else if (weath == "summer") {
                                        fill("#79a83b");
                                }
                                else if (weath == "autumn") {
                                        fill("white");
                                }
                                if (weath == "winter") {
                                        fill("purple");
                                }
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
                        } else {
                                fill("gray")
                        }
                        rect(x * side, y * side, side, side)

                }

        }




}

socket.on('send matrix', changeColor)

function Kill() {
        socket.emit("Kill")
}
function AddGrass() {
        socket.emit("AddGrass")
}
function AddGrassEater() {
        socket.emit("AddGrassEater")
}
function AddPredator() {
        socket.emit("AddPredator")
}
function AddFlower() {
        socket.emit("AddFlower")
}
function AddGardener() {
        socket.emit("AddGardener")
}
function Summer() {
        socket.emit("Summer")
}
function Spring() {
        socket.emit("Spring")
}
function Autumn() {
        socket.emit("Autumn")
}
function Winter() {
        socket.emit("Winter")
}