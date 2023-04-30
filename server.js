var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


app.use(express.static("."));

app.get('/', function (req, res) {
        res.redirect('index.html');
});

server.listen(3000, function () {
        console.log('server is run');
});


function matrixGenerator(matrixSize, grass, grassEater, predator, flower, gardener) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        // 1 -եր այսինքն խոտեր քցելու հատված մատռիքսում
        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                if (matrix[y][x] == 0) {

                        matrix[y][x] = 1
                }
        }
        //GrassEater 2

        for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                if (matrix[y][x] == 0) {

                        matrix[y][x] = 2
                }
        }
        //3 predator


        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                if (matrix[y][x] == 0) {

                        matrix[y][x] = 3
                }
        }

        //4 flower


        for (let i = 0; i < flower; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                if (matrix[y][x] == 0) {

                        matrix[y][x] = 4
                }
        }


        //5 gardener


        for (let i = 0; i < gardener; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                if (matrix[y][x] == 0) {

                        matrix[y][x] = 5
                }
        }


        return matrix
}

matrix = matrixGenerator(20, 17, 7, 4, 6, 9)

io.sockets.emit('send matrix', matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
flowerArr = []
gardenerArr = []


Grass = require('./grass')
GrassEater = require('./grassEater')
Flower = require('./flower')
Gardener = require('./gardener')
Predator = require('./predator')


function kill() {
        grassArr = [];
        grassEaterArr = [];
        predatorArr = [];
        flowerArr = [];
        gardenerArr = []
        for (var y = 0; y < matrix.length; y++) {
                for (var x = 0; x < matrix[y].length; x++) {
                        matrix[y][x] = 0;
                }
        }
        io.sockets.emit("send matrix", matrix);
}
function AddGrass() {
        for (var i = 0; i < 7; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 1
                        var gr = new Grass(x, y, 1)
                        grassArr.push(gr)
                }
        }
        io.sockets.emit("send matrix", matrix);
}
function AddGrassEater() {
        for (var i = 0; i < 8; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 2
                        var grEat = new GrassEater(x, y)
                        grassEaterArr.push(grEat)
                }
        }
        io.sockets.emit("send matrix", matrix);
}

function AddPredator() {
        for (var i = 0; i < 5; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 3
                        var pr = new Predator(x, y, 3)
                        predatorArr.push(pr)
                }
        }
        io.sockets.emit("send matrix", matrix);
}
function AddFlower() {
        for (var i = 0; i < 5; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 4
                        var flow = new Flower(x, y, 4)
                        flowerArr.push(flow)
                }
        }
        io.sockets.emit("send matrix", matrix);
}
function AddGardener() {
        for (var i = 0; i < 9; i++) {
                var x = Math.floor(Math.random() * matrix[0].length)
                var y = Math.floor(Math.random() * matrix.length)
                if (matrix[y][x] == 0) {
                        matrix[y][x] = 5
                        var gard = new Gardener(x, y, 5)
                        GardenerArr.push(gard)
                }
        }
        io.sockets.emit("send matrix", matrix);
}
function createObject() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let pre = new Predator(x, y)
                                predatorArr.push(pre)
                        } else if (matrix[y][x] == 4) {
                                let flow = new Flower(x, y)
                                flowerArr.push(flow)
                                console.log(flowerArr.length);
                        } else if (matrix[y][x] == 5) {
                                let gard = new Gardener(x, y)
                                gardenerArr.push(gard)
                        }
                }

        }
        io.sockets.emit('send matrix', matrix)
}


function game() {


        for (let i in grassArr) {
                grassArr[i].mul()
        }


        for (let i in grassEaterArr) {
                grassEaterArr[i].eat()
        }


        for (let i in predatorArr) {
                predatorArr[i].eat()
        }


        for (let i in flowerArr) {
                flowerArr[i].eat()
        }

        for (let i in gardenerArr) {
                gardenerArr[i].eat()
        }

        io.sockets.emit('send matrix', matrix)
}

setInterval(game, 300)

var weath;

function Winter() {
        weath = "winter";
        io.sockets.emit('Winter', weath);
}

function Summer() {
        weath = "summer";
        io.sockets.emit('Summer', weath);
}

function Spring() {
        weath = "spring";
        io.sockets.emit('Spring', weath);
}
function Autumn() {
        weath = "autumn";
        io.sockets.emit('Autumn', weath);
}

io.on('connection', function () {
        createObject()
})

var statistics = {}
setInterval(function () {
        statistics.grass = grassArr.length
        statistics.grassEater = grassEaterArr.length
        statistics.flower = flowerArr.length
        statistics.gardener = gardenerArr.length
        statistics.predator = predatorArr.length
        fs.writeFile('statistics.json', JSON.stringify(statistics), function () {

        })
}, 1000);




function weather() {
        if (weath == "winter") {
                weath = "spring"
        }
        else if (weath == "spring") {
                weath = "summer"
        }
        else if (weath == "summer") {
                weath = "autumn"
        }
        else if (weath == "autumn") {
                weath = "winter"
        }
        io.sockets.emit('weather', weath)
}
setInterval(weather, 2000);

io.on('connection', function (socket) {
        createObject();
        socket.on("kill", kill);
        socket.on("AddGrass", AddGrass);
        socket.on("AddGrassEater", AddGrassEater);
        socket.on("AddGrassPredator", AddPredator);
        socket.on("AddFlower", AddFlower);
        socket.on("AddGardener", AddGardener);
        socket.on("spring", Spring);
        socket.on("summer", Summer);
        socket.on("autumn", Autumn);
        socket.on("winter", Winter);
});

var statistics = {};

setInterval(function () {
        statistics.grass = grassArr.length;
        statistics.grassEater = grassEaterArr.length;
        statistics.predator = predatorArr.length;
        statistics.flower = flowerArr.length;
        statistics.gardener = gardenerArr.length;
        fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
                console.log("send")
        })
}, 1000);