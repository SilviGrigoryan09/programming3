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

let matrix = matrixGenerator(20, 17, 7, 4, 6, 9)
let side = 30
console.log(matrix);
///օբյեկտներ պահելու զանգվածներ
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var flowerArr = []
var gardenerArr = []

function setup() {
        frameRate(15)
        createCanvas(matrix[0].length * side, matrix.length * side)
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
                        } else if (matrix[y][x] == 5) {
                                let gard = new Gardener(x, y)
                                gardenerArr.push(gard)
                        }
                }

        }

}

function draw() {
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
}



