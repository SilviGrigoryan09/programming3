var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs')

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


function game(){

        
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

setInterval(game,300)

io.on('connection',function(){
        createObject()
})

var  statistics = {}
setInterval(function(){
        statistics.grass = grassArr.length
        statistics.grassEater = grassEaterArr.length
        statistics.flower = flowerArr.length
        statistics.gardener = gardenerArr.length
        statistics.predator = predatorArr.length
        fs.writeFile('statistics.json', JSON.stringify(statistics), function () {

        })
}, 1000); 

