var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs')

app.use(express.static("."));

app.get('/', function (req,res){
    res.redirect('index.html');
});

server.listen(3000,function(){
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
            if(matrix[y][x] == 0){

                    matrix[y][x] = 1
            }
    }
    //GrassEater 2

    for (let i = 0; i < grassEater; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            if(matrix[y][x] == 0){

                    matrix[y][x] = 2
            }
    }
    //3 predator


    for (let i = 0; i < predator; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            if(matrix[y][x] == 0){

                    matrix[y][x] = 3
            }
    }

    //4 flower


    for (let i = 0; i < flower; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            if(matrix[y][x] == 0){

                    matrix[y][x] = 4
            }
    }


    //5 gardener


    for (let i = 0; i < gardener; i++) {
            let x = Math.floor(Math.random() * matrixSize)
            let y = Math.floor(Math.random() * matrixSize)
            if(matrix[y][x] == 0){

                    matrix[y][x] = 5
            }
    }


    return matrix
}

matrix = matrixGenerator(20, 17, 7, 4, 6, 9)

io.sockets.emit('send matrix',matrix)
