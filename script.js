let W = 9
let H = 9
let M = 3
let leftButtonDown = false
let rightButtonDown = false

let newMatrix = new Module (W,H)  //создаем матрицу
for (i=0; i<M; i++) {newMatrix.createRandomeMine()}   //генерирую необходимое количество мин
//удаляем цифры в ячейках с минами
    for (i in newMatrix.mas){
        for (j in newMatrix.mas[i])
        {if (newMatrix.mas[i][j].mine == true && newMatrix.mas[i][j].num >0) {newMatrix.mas[i][j].num = 0}}}


let mainDiv = document.querySelector('.container')


render()


//создание ОДНОЙ ячейки для рендера
function createElement (element)
{
    cell = document.createElement('div')
    cell.oncontextmenu = () => false // убираем стандартное всплывающее меню на ПКМ
    cell.id = element.id
    // cell.innerHTML = ''
    cell.innerHTML = element.num
    cell.setAttribute('type', 'cell')
    
    //если мина добавляем класс мины
    if (element.mine && element.show) {cell.classList.add ('mine')}
    //если флаг
    if (element.flag) {cell.classList.add ('flag')}    
    //если цифра:
    if (element.num>0 && !element.mine && element.show) {for (var i=0; i<=M; i++) {if (element.num == i) {cell.classList.add (`num-${i}`)}}
    }
    //если пустая ячейка
    if (element.num==0 && !element.mine && element.show) {cell.classList.add ('open')}
    //вешаем ивент на клик
    let item = mainDiv.insertAdjacentElement("beforeend", cell)
    item.addEventListener("mousedown", mouseDown)
    item.addEventListener("mouseup", mouseUp)
}

function mouseUp(e) {
        // console.log('кнопка поднята',e.which)
        if (e.which == 1) {leftButtonDown = false;}
        if (e.which == 3) {rightButtonDown = false;}  
        // убираем подсветку потенциальных мин
        if (!rightButtonDown || !leftButtonDown) {
            let allPotDiv = document.querySelectorAll('.pot')
            for (let i =0; i<allPotDiv.length; i++) {
                allPotDiv[i].classList.remove('pot');
            }
        }      
    }

function mouseDown (e) {
    {   // console.log('нажатая кнопка:',e.which);
        if (e.which == 1) {leftButtonDown = true;}
        if (e.which == 3) {rightButtonDown = true;}
        if (rightButtonDown && leftButtonDown) {
            console.log('ДАБЛ')
            for (i in newMatrix.mas){
                for (j in newMatrix.mas[i])
                {
                    let cell = newMatrix.mas[i][j]
                    if (cell.id == e.target.id && cell.show && cell.num > 0) //нашли нужную ячейку
                    {   //подготовка списка соседей
                        let cellMass = [] // содержит всех существующих соседей
                        if (cell.id%9!=0){cellMass.push(cell.id+1)} //справа
                        if (j>0){cellMass.push(cell.id-1)} //слева
                        if (i>0){cellMass.push(cell.id-9)} //вверх
                        if (i<8){cellMass.push(cell.id+9)} //внизу
                        if (i>0 && j>0){cellMass.push(cell.id-10)} //вверх - лево+
                        if (i>0 && j<H-1){cellMass.push(cell.id-8)} //вверх - право
                        if (i<W-1 && j>0){ cellMass.push(cell.id+8)} //внизу - лево
                        if (i<W-1 && j<H-1){cellMass.push(cell.id+10)} //внизу - право
                        
                        //раздача класса всем соседям
                        
                        let mineCountAround = cell.num  //количество мин по периметру                        

                        let cellMassPot = [] //содержит всех соседей в которых может быть мина
                        for (let x = 0; x < cellMass.length; x++) 
                        {
                            for (i in newMatrix.mas){
                                for (j in newMatrix.mas[i])
                                {
                                    let cell = newMatrix.mas[i][j]
                                    if (cell.id == cellMass[x] && !cell.show && !cell.flag) 
                                    //проверка всех существующих соседей и отбор по правилам: ячейка не открыта и ячейка без флага
                                    {cellMassPot.push(cell.id)}
                                }
                            }
                        }
                        
                        let flagCountAround = 0 //количество флагов по периметру
                        for (let x = 0; x < cellMass.length; x++) 
                        {
                            for (i in newMatrix.mas){
                                for (j in newMatrix.mas[i])
                                {
                                    let cell = newMatrix.mas[i][j]
                                    if (cell.id == cellMass[x] && cell.flag) 
                                    //проверка каждого соседа на наличие флага
                                    {flagCountAround++}
                                }
                            }
                        }
                        // console.log('flagCountAround=',flagCountAround)
                        // console.log('cellMassPot.length ---->',cellMassPot.length)
                        // console.log('mineCountAround',mineCountAround)
                        
                        if (mineCountAround == flagCountAround) {
                            for (let z = 0; z < cellMassPot.length; z++) {
                                console.log('нужно открыть ячейку: ',cellMassPot[z])
                                for (i in newMatrix.mas){
                                    for (j in newMatrix.mas[i])
                                    {
                                        let cell = newMatrix.mas[i][j]
                                        if (cell.id == cellMassPot[z]) //нашли нужную ячейку
                                        {
                                            if (cell.num == 0) //если пустая
                                            {
                                                cell.show = true  
                                                around(cell) //проверяем и открываем соседей
                                                render()
                                                continue
                                            }
                                            else {
                                            cell.show = true
                                            render()
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        for (let i = 0; i < cellMassPot.length; i++) 
                        {
                            let potCell = document.getElementById(cellMassPot[i]);
                            potCell.classList.add('pot')
                        }
                    }
                }
            }
            checkWin()
        }
    //  }
     
    //  //по факту это функция mouseDown
    //  function mousezz (e) {
     //ЛКМ
        if (e.which == 1) {
        for (i in newMatrix.mas){
            for (j in newMatrix.mas[i])
            {
                let cell = newMatrix.mas[i][j]
                if (cell.id == e.target.id) //нашли нужную ячейку
                {
                    // console.log('клик попал в ячейку', cell)
                    if (cell.show) //если уже открыта
                        {
                            console.log('уже открыта, чо ты хочешь ?')
                            continue
                        }
                    else if (cell.flag) {continue;}
                    else if (cell.num > 0) {
                        cell.show = true  // если цифра
                        render()
                        continue
                    } 
                    else if (cell.mine == true) {
                        cell.show = true
                        alert("You lose, try again later")}
                  
                    else if (cell.num == 0) //если пустая
                    {
                        cell.show = true  
                        around(cell) //проверяем и открываем соседей
                        render()
                        continue
                    }
                    render()
                
                }
            }
        }
        checkWin()
    }
        //ПКМ
        if (e.which == 3) 
        {
            for (i in newMatrix.mas){
                for (j in newMatrix.mas[i])
                {
                    let cell = newMatrix.mas[i][j]
                    if (cell.id == e.target.id && !cell.show) //дошли до нужной ячейки
                    {  
                        cell.flag = !cell.flag
                        render()
                        checkWin()
                    }
                }
            }
        }
    }
}

//отрисовываем в контейнер ВСЕ предварительно созданные ячейки
function render () {
    console.log('RENDER')
    mainDiv.innerHTML = ''
    for (i in newMatrix.mas){
        for (j in newMatrix.mas[i]) createElement(newMatrix.mas[i][j])
    }
}


function eventLForAll (){
let divContainer = document.getElementsByClassName('container')
let allDivInScreen = divContainer[0].children

for (var i = 0; i < allDivInScreen.length; i++)
{
    allDivInScreen[i].addEventListener("click", function(e){
        console.log(e.target)
        for (i in newMatrix.mas){
            for (j in newMatrix.mas[i])
            {
                let cell = newMatrix.mas[i][j]
                if (cell.id == e.target.id){
                cell.show = !cell.show
                }
            }
        }
        checkWin()
        render()
    })
}
}

function around (cell) {
let aroundCells = newMatrix.allAroundCells(cell.id, newMatrix.mas)
    // console.log('aroundCells',aroundCells)
    for (z in aroundCells){
        for (i in newMatrix.mas){
            for (j in newMatrix.mas[i])
                {
                    let cell = newMatrix.mas[i][j]
                    if (cell.id == aroundCells[z] )
                    {
                        //проверки
                        if (cell.num > 0 && !cell.show) {
                            // если цыфра -> открываем
                            cell.show = true
                        }
                        if (cell.num == 0 && !cell.show) {
                            //если пустая запускаем от неё эту же функцию
                            cell.show = true
                            around(cell)                    
                        }
                    }
                }
            }
        }
}


function checkWin () {
    // let findMines = 0
    let leftCells = 0
    for (i in newMatrix.mas){
        for (j in newMatrix.mas[i])
            {
                let cell = newMatrix.mas[i][j]
                // if (cell.mine && cell.flag)
                // {
                //     findMines++
                // }
                if (!cell.show) {leftCells++}
                // if (cell.flag) {leftCells++}
            }
        }
        // if (findMines == M) {console.log('WIN')}
        if (leftCells == M) {console.log('----------------------WIN----------------------')}
        // if (leftCells == M) {console.log('WIN')}
        console.log('leftCells=',leftCells)

}