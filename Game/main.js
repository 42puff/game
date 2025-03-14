//Заполнение массива элементами

let map = [
    [0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,3,0,3,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,3,0,0,1,0,0,0,0,0,0,0,0,0],
    [1,1,1,0,1,3,1,1,0,1,0,0,0,1,1,1,1,1,1],
    [1,0,0,0,1,0,1,1,0,1,1,1,1,1,0,0,2,2,1],
    [1,0,3,0,0,0,0,0,0,0,0,0,0,0,4,0,2,3,1],
    [1,1,1,1,1,0,1,1,1,0,1,0,1,1,0,0,2,2,1],
    [0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]
]

const gameArea = document.querySelector('#map'); // Выбираем элемент с селектором 'map'

//Функция поиска человечка 

function findManPosition(map) {
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            if (map[x][y] === 4) {
                return { x, y }; 
            }
        }
    }
}

let manPosition = findManPosition(map);

//Функция передвижения человечка

function MoveMan(x, y){
    const currentX = manPosition.x + x;
    const currentY = manPosition.y + y;
    
    //Проверка, не является ли след. ход стеной
    if (map[currentX][currentY] === 1){
        return 
    }
    //Проверяем можно ли передвинуть ящик, если след. позиция - позиция ящика
    if (map[currentX][currentY] === 3) {
        const currentBoxX = currentX + x;
        const currentBoxY = currentY + y;
        
        //Проверка, есть ли перед коробкой стена или другая коробка
        if (map[currentBoxX][currentBoxY] === 1 || map[currentBoxX][currentBoxY] === 3){
            return
        }
        map[currentBoxX][currentBoxY] = 3;
    }
    map[manPosition.x][manPosition.y] = 0
    manPosition.x = currentX
    manPosition.y = currentY
    map[manPosition.x][manPosition.y] = 4;

    renderMap();
}
//Отслеживание нажатых клавиш 

let i = 0;
const span = document.querySelector('.lesson');
document.addEventListener('keydown', function(event) {
    switch(event.code){
        case 'ArrowUp':
            MoveMan(-1, 0);
            break
        case 'ArrowDown':
            MoveMan(1, 0);
            break
        case 'ArrowLeft':
            MoveMan(0, -1);
            break
        case 'ArrowRight':
            MoveMan(0, 1);
            break
        case 'KeyW':
            MoveMan(-1, 0);
            break
        case 'KeyS':
            MoveMan(1, 0);
            break
        case 'KeyA':
            MoveMan(0, -1);
            break
        case 'KeyD':
            MoveMan(0, 1);
            break
    }
});

function renderMap(){
    gameArea.innerHTML = ''; //Отчиска игрового поля перед перерисовкой

    for(let x = 0; x < map.length; x++) { // Проходим по каждой строке массива
        const row = document.createElement('div'); // Создаем новый div для строки
        row.className = 'row'; // Добавляем класс 'row' к строке
    
        for(let y = 0; y < map[x].length; y++) { // Проходим по каждой ячейке в строке
            const cell = document.createElement('div'); // Создаем новый div для ячейки
            cell.className = 'cell'; // Добавляем класс 'cell' к ячейке
    
            if(map[x][y] == 1) {
                cell.classList.add('wall'); // Если значение 1, добавляем класc 'wall'
            } else if(map[x][y] == 2){
                cell.classList.add('finish') // Если значение 2, добавляем класс 'finish'
            } else if(map[x][y] == 3) {
                cell.classList.add('box'); // Если значение 3, добавляем класс 'box'
            } else if(map[x][y] == 4) {
                cell.classList.add('man'); // Если значение 4, добавляем класс 'man'
            }
    
            row.append(cell); // Добавляем ячейку к строке
        }
    
        gameArea.append(row); // Добавляем строку к игровому полю
    }
}
renderMap();