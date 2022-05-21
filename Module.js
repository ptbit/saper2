
class Module {
    constructor(height, width){
        this.height = height;
        this.width = width;
        
        this.mas = []
        let index = 1
            for (let i = 0; i < width; i++) 
                {
                let row = []
                for (let j = 0; j < height; j++) 
                {
                    row.push(
                        {
                            id: index++,
                            mine: false,
                            num: 0,
                            flag: false,
                            // lClick: false,
                            // rClick: false,
                            pod: false,
                            show: false,
                            boom: false,
                        })
                }
                this.mas.push(row)
                }
    }

    getRandomFreeCell (){
        let freeCells = []
        for (let i = 0; i <this.width; i++)
        {
            for (let j = 0; j <this.height; j++)
            {
                let cell = this.mas[i][j];
                if (!cell.mine)
                {
                    freeCells.push(cell)
                }
            }
        }
        
        //На этом моменте в массиве freeCells находятся все ОБЬЕКТЫ БЕЗ мин
        //теперь выбираем случайный из них и возвращаем его
        let idFreeCell = Math.floor(Math.random()* freeCells.length)
        // console.log('---',freeCells)
        return freeCells[idFreeCell].id
      }
    
    createRandomeMine (){
        let cellForMine = this.getRandomFreeCell()

        console.log('Мина создана в ячейке №'+cellForMine)
        for (let i = 0; i <this.width; i++) //расставляем цифры вокруг созданной мины
        {
          for (let j = 0; j <this.height; j++)
          {
            if(this.mas[i][j].id == cellForMine)
                {
                    if(this.mas[i][j].mine == true){console.log('ОШИБКА!')}
                    this.mas[i][j].mine = true
                    if (j<this.height-1){this.mas[i][j+1].num+=1} //справа
                    if (j>0){this.mas[i][j-1].num+=1} //слева
                    if (i<this.width-1){this.mas[i+1][j].num+=1} //внизу
                    if (i>0 ){this.mas[i-1][j].num +=1} //вверх
                    if (i>0 && j>0){this.mas[i-1][j-1].num+=1} //вверх - лево
                    if (i>0 && j<this.height-1){this.mas[i-1][j+1].num +=1} //вверх - право
                    if (i<this.width-1 && j>0){this.mas[i+1][j-1].num +=1} //внизу - лево
                    if (i<this.width-1 && j<this.height-1){this.mas[i+1][j+1].num+=1} //внизу - право
                }
          }
        }
    }
    //методы
    //нужно написать метод для мин
    allAroundCells (cellId, matrix) {
        let neighbors = []
        for (i in matrix){
            for (j in matrix[i])
            {
                let cell = matrix[i][j];
                // console.log(matrix[i][j])
                if(cell.id === cellId){
                    // console.log('ты искал',cell.id, 'у неё есть соседи:')
                    if (cell.id%9!=0){neighbors.push(cell.id+1)} //справа
                    if (j>0){neighbors.push(cell.id-1)} //слева
                    if (i>0){neighbors.push(cell.id-9)} //вверх
                    if (i<8){neighbors.push(cell.id+9)} //внизу
                    if (i>0 && j>0){neighbors.push(cell.id-10)} //вверх - лево
                    if (i>0 && j<this.height-1){neighbors.push(cell.id-8)} //вверх - право
                    if (i<this.width-1 && j>0){ neighbors.push(cell.id+8)} //внизу - лево
                    if (i<this.width-1 && j<this.height-1){neighbors.push(cell.id+10)} //внизу - право
                }
            }}
        return (neighbors)
    }

}